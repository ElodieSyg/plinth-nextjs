import dbConnect from "../../../lib/dbConnect";
// MODEL IMPORTATION
import Category from "../../../model/Category";

export default function handle(req, res) {
    try {
        dbConnect();

        switch (req.method) {
            case "GET": {
                return getCategories(req, res);
            };
            case "POST": {
                return postCategory(req, res);
            };
        };
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
};

const getCategories = async (req, res) => {
    console.log("insite get method")
    try {
        const categories = await Category.find({});
        console.log("categories", categories);

        if (!categories) {
            throw "Categories not found";
        };

        return res.status(200).json({
            status: "Success",
            categories,
        });
    } catch (error) {
        if (error === "Categories not found") {
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

const postCategory = async (req, res) => {
    const { category } = req.body;

    try {
        await Category.create({ category });

        return res.status(201).json({
            status: "Success",
            message: "Category succefully created",
        });
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "An error happenned",
        });
    };
};
