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
    console.log("id", id);
    const { title, description, category, status, startDate, endDate } = req.body;
    console.log("body", title, description, category, status, startDate, endDate);

    try {
        const product = await Product.findByIdAndUpdate({ _id: id[0] }, { title, description, category, status });
        console.log("product", product);
        return res.status(200).json({
            status: "Success",
            message: "Product succefully updated",
        });
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};

const deleteProduct = async (req, res) => {
    const { id } = req.query;
    console.log("id", id)

    try {
        return res.status(200).json({
            status: "Success",
            message: "Product succefully deleted",
        });
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};