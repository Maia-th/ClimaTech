const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});