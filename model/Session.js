import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    email: { type: String },
    token: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: "User"},
});

module.exports =
    mongoose.models.Session ||
    mongoose.model("Session", SessionSchema);
    