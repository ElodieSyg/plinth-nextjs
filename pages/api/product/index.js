import dbConnect from "../../../lib/dbConnect";
// MODELS IMPORTATIONS
import Product from "../../../model/Product";
import Category from "../../../model/Category";
import Status from "../../../model/Status";

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
        const products = await Product.find()
            .populate({ path: "category", model: Category, select: "category" })
            .populate({ path: "status", model: Status, select: "status" });

        if (!products) throw new Error("Products not found");

        let newFormat = [];

        for (let i = 0; i < products.length; ++i) {
            let data = {
                title: products[i].title,
                category: products[i].category.category,
                description: products[i].description,
                status: products[i].status.status,
                location: products[i].location,
                startDate: products[i].startDate,
                endDate: products[i].endDate,
            };

            newFormat.push(data);
        };

        return res.status(200).json({
            status: "Success",
            products: newFormat,
        });
    } catch (error) {
        if (error === "Products not found") {
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

const postProduct = async (req, res) => {
    const { title, category, description, status, location, coordinate, startDate, endDate } = req.body;
    try {
        const product = await Product.create({ title, category, description, status, location, startDate, endDate });
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