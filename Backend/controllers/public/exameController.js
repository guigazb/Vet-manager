import * as exameModel from '../../models/public/exameModel.js'
import { validationResult } from 'express-validator';

export const getTodosExames = async (req, res) => {
    try {
        const sortCampo = req.query.sortCampo || 'nome';
        const ordenamento = req.query.sortOrdem;
        const ordemUpperCase = ordenamento ? ordenamento.toUpperCase() : '';
        const sortOrdem = ordemUpperCase === 'DESC' ? 'DESC' : 'ASC';

        const perfil = await exameModel.getTodosPerfis(sortCampo, sortOrdem);
        res.status(201).json(perfil);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTodosPerfisParaDatagrid = async (req, res) => {
    try {

        const perfilDG = await exameModel.getTodosPerfisParaDatagrid();

        res.status(201).json(perfilDG);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPerfisParaDatagridMUI = async (req, res) => {
  try {
    const perfilDGMUI = await exameModel.getPerfisParaDatagridMUI();
    if (perfilDGMUI) {
      res.status(201).json(perfilDGMUI);
    } else {
      res.status(404).json({ message: 'Perfis não encontrados' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPerfilPorId = async (req, res) => {
    try {
        const id = req.params.id
        const perfil = await exameModel.getPerfilPorId(id);
        if (perfil) {
            res.status(201).json(perfil);
        } else {
            res.status(404).json({ message: 'Perfil não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPermissoesPorPerfilId = async (req, res) => {
    try {
        const id = req.params.id
        const permissoesPorPerfilId = await exameModel.getPermissoesPorPerfilId(id);
        res.status(201).json(permissoesPorPerfilId);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsuariosPorPerfilId = async (req, res) => {
    try {
        const id = req.params.id
        const usuariosPorPerfilId = await exameModel.getUsuariosPorPerfilId(id);
        res.status(201).json(usuariosPorPerfilId);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const inserirPerfil = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nome, descricao } = req.body;
        const novoPerfil = await exameModel.inserirPerfil(nome, descricao);
        res.status(201).json(novoPerfil);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const atualizarPerfil = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = req.params.id;

        const { nome, descricao, ativo } = req.body;

        const perfilAtualizado =
            await exameModel.atualizarPerfil(
                id, nome, descricao, ativo
            );

        if (perfilAtualizado) {
            res.status(201).json(perfilAtualizado);
        } else {
            res.status(404).json({ message: 'Perfil não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const excluirPerfil = async (req, res) => {
    try {
        const id = req.params.id;
        const perfilExcluido = await exameModel.excluirPerfil(id);
        if (perfilExcluido) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Perfil não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};