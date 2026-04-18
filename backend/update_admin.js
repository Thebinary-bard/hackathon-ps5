import mongoose from 'mongoose';
import { User } from './src/modules/users/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

async function updateAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const adminId = "69e32fe84240d066493dc4ff"; // Admin User ID
        const update = await User.findByIdAndUpdate(
            adminId,
            {
                name: "Rahul",
                githubUsername: "rahul_dev",
                githubLink: "https://github.com/rahul_dev",
                introVideoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            },
            { new: true }
        );
        console.log("Updated Admin User:", update);

        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

updateAdmin();
