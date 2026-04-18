import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

async function checkModels() {
    try {
        const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.0-pro", "gemini-pro"];
        for(const m of models) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                const res = await model.generateContent("hi");
                console.log(m, "SUCCESS", res.response.text());
            } catch(e) {
                console.log(m, "FAILED", e.message.substring(0, 100));
            }
        }
    } catch(e) {
        console.error("error", e.message);
    }
}
checkModels();
