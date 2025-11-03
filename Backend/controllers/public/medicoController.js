import * as medicoModel from '../../models/public/medicoModel.js'
import { validationResult } from 'express-validator';

export const getTodasPermissoesPorPerfilId = async (req, res) => {
    try {
        const id = req.params.id;
        const permissoesPorPerfil = await medicoModel.getTodasPermissoesPorPerfilId(id);
        res.status(201).json(permissoesPorPerfil);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTodosPerfisComPermissaoId = async (req, res) => {
    try {
        const id = req.params.id
        const perfisQueContemPermissao = await medicoModel.getTodosPerfisComPermissaoId(id);
        if (perfisQueContemPermissao) {
            res.status(201).json(perfisQueContemPermissao);
        } else {
            res.status(404).json({ message: error.message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const inserirPermissaoPorPerfil = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { perfil_id, permissao_id } = req.body;
        const permissaoPorPerfil = await medicoModel.inserirPermissaoPorPerfil(perfil_id, permissao_id);
        res.status(201).json(permissaoPorPerfil);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const excluirPermissaoDePerfil = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { perfil_id, permissao_id } = req.body;
        const permissaoPorPerfil = await medicoModel.excluirPermissaoDePerfil(perfil_id, permissao_id);
        if (permissaoPorPerfil) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: error.message });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};