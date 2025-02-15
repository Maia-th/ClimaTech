const Inscricao = require('../models/inscricaoModel');


// Função para obter todos os e-mails cadastrados
exports.getAllEmails = async (req, res) => {
    try {
      const inscricoes = await Inscricao.findAll({ attributes: ['email', 'data_cadastro'] });
      res.status(200).json(inscricoes);
    } catch (error) {
      console.error('Erro ao obter inscrições:', error);
      res.status(500).json({ message: 'Erro ao obter inscrições', error });
    }
};