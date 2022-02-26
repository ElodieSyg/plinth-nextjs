import dbConnect from "../../../lib/dbConnect";
// MODEL IMPORTATIONS
import User from "../../../model/User";

export default function handle(req, res) {
    try {
        dbConnect();

        switch (req.method) {
            case "GET": {
                return getFavorite(req, res);
            };
            case "POST": {
                return postFavorite(req, res);
            };
            case "DELETE": {
                return deleteFavorite(req, res);
            };
        };
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};

const getFavorite = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};

const postFavorite = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};

const deleteFavorite = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};