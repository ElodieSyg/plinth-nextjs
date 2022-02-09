import dbConnect from "../../../lib/dbConnect";
// MODEL IMPORTATION
import Product from "../../../model/Product";

export default function handle(req, res) {
    try {
        dbConnect();

        switch (req.method) {
            case "GET": {
                return getProduct(req, res);
            };
            case "POST": {
                return postProduct(req, res);
            };
        };
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};

const getProduct = async (req, res) => {
    try {

    } catch (error) {

    };
};

const postProduct = async (req, res) => {
    try {

    } catch (error) {

    };
};
