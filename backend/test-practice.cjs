const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: './.env'});

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const User = mongoose.connection.collection('users');
        const user = await User.findOne({role: 'student'});
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        const startRes = await fetch('http://127.0.0.1:5000/api/submissions/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ taskId: 'PRC-101' })
        });
        const startData = await startRes.json();
        console.log("Start Data:", startData);

        if (startData.success) {
            const sid = startData.data._id;
            const subRes = await fetch('http://127.0.0.1:5000/api/submissions/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ submissionId: sid, content: "test" })
            });
            const subData = await subRes.json();
            console.log("Submit Data:", subData);
        }
    } catch(err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
}
run();
