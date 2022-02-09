import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId, ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId, ref: "Category",
        require: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: mongoose.Types.ObjectId, ref: "Status",
        required: true,
    },
    location: {
        number: { type: Number, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
    },
    coordinate: {
        latitude: {
            type: String,
        },
        longitude: {
            type: String,
        },
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
});

module.exports = 
    mongoose.models.Product ||
    mongoose.model("Product", ProductSchema);
