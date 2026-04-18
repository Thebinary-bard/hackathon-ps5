import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
    try {
        let uri = env.mongoURI;
        try {
            const conn = await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
            return;
        } catch (err) {
            console.log("⚠️ Local MongoDB failed, starting MongoMemoryServer...");
            const { MongoMemoryServer } = await import("mongodb-memory-server");
            const mongoServer = await MongoMemoryServer.create();
            uri = mongoServer.getUri();
            const conn = await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log(`✅ MongoDB Memory Server Connected: ${conn.connection.host}`);
        }
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

// module.exports = connectDB;