const Inscricao = require('../models/inscricaoModel');


// Função para obter todos os e-mails cadastrados
exports.getAllEmails = async (req, res) => {
    try {
      const inscricoes = await Inscricao.findAll({ attributes: ['idInscricao', 'email', 'data_cadastro'] });
      res.status(200).json(inscricoes);
    } catch (error) {
      console.error('Erro ao obter inscrições:', error);
      res.status(500).json({ message: 'Erro ao obter inscrições', error });
    }
};

// Excluir Inscrição
exports.deleteInscricao = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("ID para exclusão:", id); 
      
      if (!id) {
        return res.status(400).json({ message: 'ID não fornecido.' });
      }
  
      const deleted = await Inscricao.destroy({ where: { idInscricao: id } });
      if (deleted) {
        res.status(200).json({ message: 'Inscrição excluída com sucesso' });
      } else {
        res.status(404).json({ message: 'Inscrição não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir inscrição', error });
    }
  };
  

// Cadastrar Inscrição
exports.createInscricao = async (req, res) => {
    try {
      const { email, data_cadastro } = req.body;
      const newInscricao = await Inscricao.create({ email, data_cadastro });
      res.status(201).json(newInscricao);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cadastrar inscrição', error });
    }
};

  // Obter inscrição por ID
exports.getInscricaoById = async (req, res) => {
    try {
      const { id } = req.params;
      const inscricao = await Inscricao.findOne({ where: { idInscricao: id } });
      if (inscricao) {
        res.status(200).json(inscricao);
      } else {
        res.status(404).json({ message: 'Inscrição não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao obter inscrição', error });
    }
};