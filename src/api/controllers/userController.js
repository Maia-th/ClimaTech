const User = require('../models/userModel');

// Cadastrar Usuário
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, access } = req.body;
    const newUser = await User.create({ name, email, password, access });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
  }
};

// Editar Usuário
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, { where: { idUsers: id } });
    if (updated) {
      const updatedUser = await User.findOne({ where: { idUsers: id } });
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao editar usuário', error });
  }
};

// Visualizar Usuário
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { idUsers: id } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao visualizar usuário', error });
  }
};

// Listar Todos os Usuários
exports.getAllUsers= async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários', error });
  }
};

// Excluir Usuário
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { idUsers: id } });
    if (deleted) {
      res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir usuário', error });
  }
};