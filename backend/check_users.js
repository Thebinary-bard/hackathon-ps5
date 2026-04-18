import mongoose from 'mongoose';
import { User } from './src/modules/users/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

async function checkUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({}, 'name email role');
        console.log(JSON.stringify(users, null, 2));
        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

checkUsers();
