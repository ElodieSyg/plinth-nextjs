import bcrypt from "bcrypt";
import User from "../../../model/User";
import dbConnect from "../../../lib/dbConnect";

export default async function handle(req, res) {
    try {
        dbConnect();

        switch (req.method) {
            case "POST": {
                return postUser(req, res);
            };
        };
    } catch (error) {
        return res.status(503).json({
            status: "Fail",
            message: "Service Unavaible",
        });
    };
};

const postUser = async (req, res) => {
    const { name, surname, email, password } = req.body;
    console.log("body", name, surname, email, password)
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("hashed password", hashedPassword);

    try {
        const newUser = await User.create({ name, surname, email, password: hashedPassword });
        console.log("new user", newUser)

        return res.status(201).json({
            status: "Success",
            message: "User created",
            newUser,
        })

    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};

