import nodemaileur from "nodemailer";
import dbConnect from "../../../lib/dbConnect";

export default function handle(req, res) {
    try {
        dbConnect();

        switch (req.method) {
            case "POST": {
                return postContact(req, res);
            };
        };

    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};

const postContact = async (req, res) => {
    const { name, email, phoneNumber, message } = req.body;
    console.log("name", name, "email", email, "phoneNumber", phoneNumber, "message", message);

    try {
        const contactEmail = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASSWORD_EMAIL,
            },
        });

        const mail = {
            from: name,
            to: "sayavong.pro@gmail.com",
            subject: "Contact Form Submission",
            html: `<p>Name : ${name}</p>
                    <p>Email : ${email}</p>
                    <p>Phone number : ${phoneNumber}</p>
                    <p>Message : ${message}`,
        };

        contactEmail.verify(error => {
            if (error) {
                console.log(error);
            } else {
                console.log("Form readu to send !");
            };
        });

        contactEmail.sendMail(mail, error => {
            if (error) {
                res.status(400).json({
                    status: "Fail",
                    message: "An error happened, please try again in few minutes."
                });
            } else {
                res.status(200).json({
                    status: "Success",
                    message: "Message succefully sended !",
                });
            };
        });
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};