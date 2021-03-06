import dbConnect from "../../../lib/dbConnect";
// MODELS IMPORTATIONS
import Product from "../../../model/Product";

export default async function handle(req, res) {
    try {
        dbConnect();

        switch (req.method) {
            case "GET": {
                return getProduct(req, res);
            };
            case "PATCH": {
                return patchProduct(req, res);
            };
            case "DELETE": {
                return deleteProduct(req, res);
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
    const { id } = req.params;
    try {
        const product = await Product.findById({ _id: id[0] });
        return res.status(500).json({
            status: "Success",
            product,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};

const patchProduct = async (req, res) => {
    const { id } = req.query;
    const { title, description, category, status, startDate, endDate } = req.body;
    try {
        const product = await Product.findByIdAndUpdate({ _id: id[0] }, { title, description, category, status, startDate, endDate });

        if (!product) throw new Error("Product not found");

        return res.status(200).json({
            status: "Success",
            message: "Product succefully updated",
        });
    } catch (error) {
        if (error === "Product not found") {
            res.status(404).json({
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

const deleteProduct = async (req, res) => {
    const { id } = req.query;
    try {
        const product = await Product.findByIdAndDelete({ _id: id[0] });

        if (!product) throw new Error("Product not found");

        return res.status(200).json({
            status: "Success",
            message: "Product succefully deleted",
        });
    } catch (error) {
        if (error === "Product not found") {
            res.status(404).json({
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