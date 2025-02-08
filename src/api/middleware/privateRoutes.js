const path = require('path');
const verifyToken = require('../utils/jwt');

const privateRoutes = (app) => {
  // Rotas protegidas
  app.get('/src/pages/config.html', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'pages', 'config.html'));
  });

  app.get('/src/pages/dashboard.html', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'pages', 'dashboard.html'));
  });

  // Outras rotas protegidas podem ser adicionadas aqui
};

module.exports = privateRoutes;