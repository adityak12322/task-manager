const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();


connectDB();


app.use(express.json());
app.use(cors({
    origin: ["https://task-manager-lime-mu-34.vercel.app/", "http://localhost:3000"], // Apne Vercel link ko yahan dalo
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT} 🚀`));
