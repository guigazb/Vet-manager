import * as telefoneModel from '../../models/public/telefoneModel.js';
import { validationResult } from 'express-validator';

export const getTodosTiposDeUnidadeFuncionais = async (req, res) => {
    try {
        const sortCampo = req.query.sortCampo || 'tipo';
        const ordenamento = req.query.sortOrdem;
        const ordemUpperCase = ordenamento ? ordenamento.toUpperCase() : '';
        const sortOrdem = ordemUpperCase === 'DESC' ? 'DESC' : 'ASC';

        const tiposUnidades = await telefoneModel.getTodosTiposDeUnidadeFuncionais(sortCampo, sortOrdem);
        res.status(201).json(tiposUnidades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTodosTiposDeUnidadesFuncionaisParaDatagrid = async (req, res) => {
    try {

        const tipoUnidadeFuncionalDG = await telefoneModel.getTodosTiposDeUnidadesFuncionaisParaDatagrid();

        res.status(201).json(tipoUnidadeFuncionalDG);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTiposUnidadeFuncionalParaDatagridMUI = async (req, res) => {
  try {
    const tipoUnidadeFuncionalDGMUI = await telefoneModel.getTiposUnidadeFuncionalParaDatagridMUI();
    if (tipoUnidadeFuncionalDGMUI) {
      res.status(201).json(tipoUnidadeFuncionalDGMUI);
    } else {
      res.status(404).json({ message: 'Tipos de Unidades Funcionais não encontrados' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTipoDeUnidadeFuncionalPorId = async (req, res) => {
    try {
        const id = req.params.id
        const tipoUnidadeFuncional = await telefoneModel.getTipoDeUnidadeFuncionalPorId(id);
        if (tipoUnidadeFuncional) {
            res.status(201).json(tipoUnidadeFuncional);
        } else {
            res.status(404).json({ message: 'Tipo de Unidade Funcional não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const inserirTipoUnidadeFuncional = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { tipo } = req.body;

        const novaUnidadeFuncional =
            await telefoneModel.inserirTipoUnidadeFuncional(tipo);

        res.status(201).json(novaUnidadeFuncional);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const atualizarTipoUnidadeFuncional = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = req.params.id;
        const { tipo, ativo } = req.body;

        const unidadeFuncionalAtualizada =
            await telefoneModel.atualizarTipoUnidadeFuncional(id, tipo, ativo);

        if (unidadeFuncionalAtualizada) {
            res.status(201).json(unidadeFuncionalAtualizada);
        } else {
            res.status(404).json({ message: 'Tipo de Unidade Funcional não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const excluirTipoUnidadeFuncional = async (req, res) => {
    try {
        const id = req.params.id;
        const tipoUnidadeFuncionalExcluida = await telefoneModel.excluirTipoUnidadeFuncional(id);

        if (tipoUnidadeFuncionalExcluida) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Unidade funcional não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};