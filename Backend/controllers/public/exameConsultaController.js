import * as exameConsultaModel from '../../models/public/exameConsultaModel.js'
import { validationResult } from 'express-validator';

export const getTodasPermissoes = async (req, res) => {
    try {
        const sortCampo = req.query.sortCampo || 'nome';
        const ordenamento = req.query.sortOrdem;
        const ordemUpperCase = ordenamento ? ordenamento.toUpperCase() : '';
        const sortOrdem = ordemUpperCase === 'DESC' ? 'DESC' : 'ASC';

        const permissoes = await exameConsultaModel.getTodasPermissoes(sortCampo, sortOrdem);
        res.status(201).json(permissoes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTodasPermissoesParaDatagrid = async (req, res) => {
    try {

        const permissaoDG = await exameConsultaModel.getTodasPermissoesParaDatagrid();

        res.status(201).json(permissaoDG);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPermissoesParaDatagridMUI = async (req, res) => {
  try {
    const permissaoDGMUI = await exameConsultaModel.getPermissoesParaDatagridMUI();
    if (permissaoDGMUI) {
      res.status(201).json(permissaoDGMUI);
    } else {
      res.status(404).json({ message: 'Permissões não encontradas' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodasPermissoesParaDatagridMUIDisponiveisPorPerfil = async (req, res) => {
    try {
        const id = req.params.id
        const permissaoDGMUI = await exameConsultaModel.getTodasPermissoesParaDatagridMUIDisponiveisPorPerfil(id);

        res.status(201).json(permissaoDGMUI);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTodasPermissoesParaDatagridMUICadastradasPorPerfil = async (req, res) => {
    try {

        const id = req.params.id
        const permissaoDGMUI = await exameConsultaModel.getTodasPermissoesParaDatagridMUICadastradasPorPerfil(id);

        res.status(201).json(permissaoDGMUI);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPermissaoPorId = async (req, res) => {
    try {
        const id = req.params.id
        const permissaoPorId = await exameConsultaModel.getPermissaoPorId(id);
        if (permissaoPorId) {
            res.status(201).json(permissaoPorId);
        } else {
            res.status(404).json({ message: 'Permissão não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPermissoesPorGrupoId = async (req, res) => {
    try {
        const id = req.params.id
        const grupo = await exameConsultaModel.getPermissoesPorGrupoId(id);
        if (grupo) {
            res.status(201).json(grupo);
        } else {
            res.status(404).json({ message: 'Grupo não encontrado não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPerfisPorPermissaoId = async (req, res) => {
    try {
        const id = req.params.id
        const perfis = await exameConsultaModel.getPerfisPorPermissaoId(id);
        if (perfis) {
            res.status(201).json(perfis);
        } else {
            res.status(404).json({ message: 'Perfis não encontrados' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const inserirPermissao = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nome, rota, grupo_id, visivel_menu, nome_menu, ordem } = req.body;
        const novaPermissao = await exameConsultaModel.inserirPermissao(nome, rota, grupo_id, visivel_menu, nome_menu, ordem);
        res.status(201).json(novaPermissao);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const atualizarPermissao = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = req.params.id;

        const { nome, rota, grupo_id, visivel_menu, nome_menu, ordem, ativo } = req.body;

        const permissaoAtualizada =
            await exameConsultaModel.atualizarPermissao(
                id, nome, rota, grupo_id, visivel_menu, nome_menu, ordem, ativo
            );

        if (permissaoAtualizada) {
            res.status(201).json(permissaoAtualizada);
        } else {
            res.status(404).json({ message: 'Permissão não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const excluirPermissao = async (req, res) => {
    try {
        const id = req.params.id;
        const permissaoExcluida = await exameConsultaModel.excluirPermissao(id);
        if (permissaoExcluida) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Permissão não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};