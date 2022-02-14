import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
/*     userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "user",
        required: false,
    },
 */    title: {
        type: String,
        required: true,
    },
     category: {
        type: mongoose.Schema.Types.ObjectId, ref: "category",
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: mongoose.Schema.Types.ObjectId, ref: "status",
        required: true,
    },
    location: {
        number: { type: Number, required: false },
        address: { type: String, required: false },
        city: { type: String, required: false },
        postalCode: { type: String, required: false },
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
    mongoose.models.Product || mongoose.model("Product", ProductSchema);
