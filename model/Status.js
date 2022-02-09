import mongoose from "mongoose";

const StatusModel = new mongoose.Schema({
    status: {
        type: String,
        required: true,
    },
});

module.exports =
    mongoose.models.Status ||
    mongoose.model("Status", StatusModel);
