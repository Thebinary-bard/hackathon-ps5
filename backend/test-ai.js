import { connectDB } from "./src/config/db.js";
import { User } from "./src/modules/users/user.model.js";
import { generateToken } from "./src/modules/auth/auth.service.js";
import app from "./src/app.js";
import { env } from "./src/config/env.js";

const runTest = async () => {
    try {
        await connectDB();

        // 1. Start server
        const server = app.listen(env.port, () => console.log(`Test Server running on port ${env.port}`));

        // 2. Mock User
        const user = await User.create({
            name: "Test User",
            email: `test${Date.now()}@test.com`,
            password: "password123",
            role: "student",
        });

        // 3. Get JWT Token
        const token = generateToken(user);

        // 4. Hit the route
        console.log("Hitting POST /api/tasks/generate with skill: 'React'...");
        const response = await fetch(`http://localhost:${env.port}/api/tasks/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ skill: "React" })
        });

        const data = await response.json();
        console.log("Response Status:", response.status);
        console.log("Response Data:", JSON.stringify(data, null, 2));

        // Cleanup
        await User.findByIdAndDelete(user._id);
        server.close();
        process.exit(0);

    } catch (err) {
        console.error("Test failed:", err);
        process.exit(1);
    }
};

runTest();
