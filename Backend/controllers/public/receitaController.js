import * as receitaModel from '../../models/public/receitaModel.js'
import { validationResult } from 'express-validator';

export const getTodasUnidadesFuncionais = async (req, res) => {
    try {
        const sortCampo = req.query.sortCampo || 'nome';
        const ordenamento = req.query.sortOrdem;
        const ordemUpperCase = ordenamento ? ordenamento.toUpperCase() : '';
        const sortOrdem = ordemUpperCase === 'DESC' ? 'DESC' : 'ASC';

        const UnidadeFuncional = await receitaModel.getTodasUnidadesFuncionais(sortCampo, sortOrdem);
        res.status(201).json(UnidadeFuncional);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTodasUnidadesFuncionaisParaDatagrid = async (req, res) => {
    try {

        const unidadeFuncionalDG = await receitaModel.getTodasUnidadesFuncionaisParaDatagrid();

        res.status(201).json(unidadeFuncionalDG);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUnidadesFuncionaisParaDatagridMUI = async (req, res) => {
  try {
    const unidadeFuncionalDGMUI = await receitaModel.getUnidadesFuncionaisParaDatagridMUI();
    if (unidadeFuncionalDGMUI) {
      res.status(201).json(unidadeFuncionalDGMUI);
    } else {
      res.status(404).json({ message: 'Unidades Funcionais não encontradas' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUnidadeFuncionalPorId = async (req, res) => {
    try {
        const id = req.params.id
        const unidadeFuncional = await receitaModel.getUnidadeFuncionalPorId(id);
        if (unidadeFuncional) {
            res.status(201).json(unidadeFuncional);
        } else {
            res.status(404).json({ message: 'Unidade funcional não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrganogramaFuncionalPorId = async (req, res) => {
    try {
        const id = req.params.id
        const organograma = await receitaModel.getOrganogramaFuncionalPorId(id);
        if (organograma) {
            res.status(201).json({
                message: 'Dados relacionados encontrados',
                data: organograma,
            });
        } else {
            res.status(404).json({ message: 'Unidade funcional não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsuarioPorUnidadeFuncionalId = async (req, res) => {
    try {
        const id = req.params.id
        const usuarios = await receitaModel.getUsuarioPorUnidadeFuncionalId(id);
        if (usuarios) {
            res.status(201).json(usuarios);
        } else {
            res.status(404).json({ message: 'Usuarios não encontrados' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProcessosPorUnidadeFuncionalId = async (req, res) => {
    try {
        const id = req.params.id
        const processos = await receitaModel.getProcessosPorUnidadeFuncionalId(id);
        if (processos) {
            res.status(201).json(processos);
        } else {
            res.status(404).json({ message: 'Processos não encontrados para Unidade Funcional' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getMatrizesSwotPorUnidadeFuncionalId = async (req, res) => {
    try {
        const id = req.params.id
        const matrizes = await receitaModel.getMatrizesSwotPorUnidadeFuncionalIdParaDatagridMui(id);
        if (matrizes) {
            res.status(201).json(matrizes);
        } else {
            res.status(404).json({ message: 'Matrizes não encontradas para Unidade Funcional' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const inserirUnidadeFuncional = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { local_execucao_id, nome, unidade_funcional_pai, organograma, tipo_unidade_id, sigla } = req.body;

        const novaUnidadeFuncional =
            await receitaModel.inserirUnidadeFuncional(local_execucao_id, nome, unidade_funcional_pai, organograma, tipo_unidade_id, sigla);

        res.status(201).json(novaUnidadeFuncional);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const atualizarUnidadeFuncional = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = req.params.id;
        const { local_execucao_id, nome, unidade_funcional_pai, organograma, tipo_unidade_id, sigla, ativo } = req.body;

        const unidadeFuncionalAtualizada =
            await receitaModel.atualizarUnidadeFuncional(
                id, local_execucao_id, nome, unidade_funcional_pai, organograma, tipo_unidade_id, sigla, ativo
            );

        if (unidadeFuncionalAtualizada) {
            res.status(201).json(unidadeFuncionalAtualizada);
        } else {
            res.status(404).json({ message: 'Unidade funcional não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const excluirUnidadeFuncional = async (req, res) => {
    try {
        const id = req.params.id;
        const unidadeFuncionalExcluida = await receitaModel.excluirUnidadeFuncional(id);

        if (unidadeFuncionalExcluida) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Unidade funcional não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};