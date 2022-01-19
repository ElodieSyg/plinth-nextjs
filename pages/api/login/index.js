import mongoose from "mongoose";
import User from "../../../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";

export default function handle(req, res) {
    try {
        dbConnect();

        switch (req.method) {
            case "GET": {
                return getLogin(req, res);
            };
            case "POST": {
                return postLogin(req, res);
            };
        };
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw "User not found";
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw "Invalid email or password";
        };

        const token = jwt.sign({ _id: user._id }, process.env.SECRET_AUTH, { expiresIn: "24h" });

        req.headers.token = token;

        return res.status(200).json({
            status: "Success",
            message: "Here is your token for subsequent requests",
            user,
        });
    } catch (error) {
        if (error === "User not found") {
            return res.status(404).json({
                status: "Fail",
                message: error,
            });
        };

        if (error === "Invalid email or password") {
            return res.status(401).json({
                status: "Fail",
                message: error,
            });
        };

        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        })
    };
};

const getLogin = async (req, res) => {
    console.log("Hello ", req.cookie);

    return res.status(200).json({
        status: "Success",
        message: "You are authorized",
    });
};
