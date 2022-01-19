import mongoose from "mongoose";

const connection = { isConnected: false };

let uri = process.env.DATABASE_URL;

if (!uri) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local",
    );
};

async function dbConnect() {
    let db;
    if (!connection.isConnected) {
        db = mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        connection.isConnected = db.connections;
        console.log("-----db isConnected-----");
    };
    return db;
};

export default dbConnect;