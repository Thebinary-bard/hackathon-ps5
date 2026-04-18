import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
    "PORT",
    "MONGO_URI",
    "JWT_SECRET"
];

requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`❌ Missing required environment variable: ${key}`);
    }
});

export const env = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173", //frontend connect
    mongoURI: process.env.MONGO_URI,

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },

    ai: {
        provider: process.env.AI_PROVIDER || "openai",
        apiKey: process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY,
        model: process.env.AI_MODEL || "gpt-4o-mini",
    }
};