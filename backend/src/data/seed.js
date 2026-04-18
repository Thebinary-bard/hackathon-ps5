import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Load env explicitly
dotenv.config({ path: new URL('../../.env', import.meta.url).pathname });

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'company', 'admin'], default: 'student' }
}, { timestamps: true });

// Avoid model recompilation errors
const User = mongoose.models.User || mongoose.model("User", userSchema);

const seedDatabase = async () => {
    try {
        console.log("Connecting to:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        // Clear existing test users to prevent unique constraint errors
        await User.deleteMany({ email: { $in: ['student@skillnest.com', 'company@skillnest.com', 'admin@skillnest.com'] } });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("password123", salt);

        const users = [
            { name: "Demo Student", email: "student@skillnest.com", password: hashedPassword, role: "student" },
            { name: "Demo Company", email: "company@skillnest.com", password: hashedPassword, role: "company" },
            { name: "Demo Admin", email: "admin@skillnest.com", password: hashedPassword, role: "admin" }
        ];

        await User.insertMany(users);
        console.log("\n✅ Database Successfully Seeded!");
        console.log("-----------------------------------------");
        console.log("You can now log in with the following credentials:");
        console.log("🔐 Password for ALL accounts is: password123\n");
        console.log("👩‍🎓 Student : student@skillnest.com");
        console.log("🏢 Company : company@skillnest.com");
        console.log("🛠️ Admin   : admin@skillnest.com");
        console.log("-----------------------------------------");

    } catch (error) {
        console.error("❌ Seed error:", error);
    } finally {
        process.exit();
    }
};

seedDatabase();
