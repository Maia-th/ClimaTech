const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const privateRoutes = require('./middleware/privateRoutes');

dotenv.config();
connectDB();

const cors = require('cors');
const app = express();

const allowedOrigins = [process.env.URL_FRONTEND_DEPLOY, process.env.URL_FRONTEND_LOCAL];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido por CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'src')));

// Middleware para analisar requisições JSON
app.use(express.json());

app.get('/verify-token', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Token válido' });
});

privateRoutes(app);

app.use(userRoutes);
app.use(authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});