import { env } from "./config/env.js";
import app from "./app.js";
import { connectDB } from "./config/db.js";

/**
 * 🚀 Start Server
 */
const startServer = async () => {
    try {
        // 🗄️ Connect DB
        await connectDB();

        // 🌐 Start app
        app.listen(env.port, () => {
            console.log(`🚀 Server running on port ${env.port}`);
        });
    } catch (error) {
        console.error("❌ Server failed to start:", error.message);
        process.exit(1);
    }
};

startServer();