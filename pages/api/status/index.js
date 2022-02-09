import dbConnect from "../../../lib/dbConnect";
// MODEL IMPORTATION
import Status from "../../../model/Status";

export default function handle(req, res) {
    try {
        dbConnect();

        switch (req.method) {
            case "GET": {
                return getStatus(req, res);
            };
            case "POST": {
                return postStatus(req, res);
            };
        };
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};

const getStatus = async (req, res) => {
    try {
        const status = await Status.find({});

        if (!status) {
            throw "Status not found";
        };

        return res.status(200).json({
            status: "Success",
            data: status,
        });
    } catch (error) {
        if (error === "Status not found") {
            return res.status(404).json({
                status: "Fail",
                message: error,
            });
        };
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};

const postStatus = async (req, res) => {
    const { status } = req.body;

    try {
        await Status.create({ status });

        return res.status(201).json({
            status: "Success",
            message: "Status succefully created",
        });
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "An error happenned",
        });
    };
};
