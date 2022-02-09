import mongoose from "mongoose";

const CategoryModel = new mongoose.Schema({
    category: {
        type: String, required: true,
    },
});

module.exports =
    mongoose.models.Category ||
    mongoose.model("Category", CategoryModel);
