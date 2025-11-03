import * as tratamentoModel from '../../models/public/tratamentoModel.js'
import { validationResult } from 'express-validator';

export const getTodosGruposPermissao = async (req, res) => {
    try {
        const sortCampo = req.query.sortCampo || 'nome';
        const ordenamento = req.query.sortOrdem;
        const ordemUpperCase = ordenamento ? ordenamento.toUpperCase() : '';
        const sortOrdem = ordemUpperCase === 'DESC' ? 'DESC' : 'ASC';

        const grupoPermissoes = await tratamentoModel.getTodosGruposPermissao(sortCampo, sortOrdem);
        res.status(201).json(grupoPermissoes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTodaspermissoesGrupoParaDatagrid = async (req, res) => {
    try {

        const permissaoGrupoDG = await tratamentoModel.getTodaspermissoesGrupoParaDatagrid();

        res.status(201).json(permissaoGrupoDG);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPermissoesGrupoParaDatagridMUI = async (req, res) => {
  try {
    const permissaoGrupoDGMUI = await tratamentoModel.getPermissoesGrupoParaDatagridMUI();
    if (permissaoGrupoDGMUI) {
      res.status(201).json(permissaoGrupoDGMUI);
    } else {
      res.status(404).json({ message: 'Grupos de Permissão não encontrados' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGrupoPermissaoPorId = async (req, res) => {
    try {
        const id = req.params.id
        const grupoPermissaoPorId = await tratamentoModel.getGrupoPermissaoPorId(id);
        if (grupoPermissaoPorId) {
            res.status(201).json(grupoPermissaoPorId);
        } else {
            res.status(404).json({ message: 'Grupo de Permissão não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPermissaoPorGrupoId = async (req, res) => {
    try {
        const id = req.params.id
        const permissoesGrupoId = await tratamentoModel.getPermissaoPorGrupoId(id);
        if (permissoesGrupoId) {
            res.status(201).json(permissoesGrupoId);
        } else {
            res.status(404).json({ message: 'Permissoes de Grupo não encontradas' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const inserirGrupoPermissao = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nome, ordem } = req.body;
        const novaoGrupoPermissao = await tratamentoModel.inserirGrupoPermissao(nome, ordem);
        res.status(201).json(novaoGrupoPermissao);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const atualizarGrupoPermissao = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = req.params.id;
        const { nome, ordem, ativo } = req.body;

        const grupoPermissaoAtualizada =
            await tratamentoModel.atualizarGrupoPermissao(
                id, nome, ordem, ativo
            );

        if (grupoPermissaoAtualizada) {
            res.status(201).json(grupoPermissaoAtualizada);
        } else {
            res.status(404).json({ message: 'Grupo de Permissão não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const excluirPermissao = async (req, res) => {
    try {
        const id = req.params.id;
        const grupoPermissaoExcluida = await tratamentoModel.excluirPermissao(id);
        if (grupoPermissaoExcluida) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Grupo de Permissão não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};