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
        const products = await Product.find({});

        if (!products) throw new Error("Product not found");

        return res.status(200).json({
            status: "Success",
            products,
        });
    } catch (error) {
        if (error === "Product not found") {
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

// NEED TO GET USERID WITH GETSESSION
const postProduct = async (req, res) => {
    const { title, category, description, status, location, coordinate, startDate, endDate } = req.body;
    try {
        const product = await Product.create({ userId, title, category, description, status, location, startDate, endDate });
        return res.status(201).json({
            status: "Success",
            message: "Product succefully created",
            product,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};
