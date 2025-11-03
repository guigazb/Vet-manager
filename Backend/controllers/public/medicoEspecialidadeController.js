import * as medicoEspecialidadeModel from '../../models/public/medicoEspecialidadeModel.js'
import { validationResult } from 'express-validator';

export const getTodasTags = async (req, res) => {
    try {
        const sortCampo = req.query.sortCampo || 'nome';
        const ordenamento = req.query.sortOrdem;
        const ordemUpperCase = ordenamento ? ordenamento.toUpperCase() : '';
        const sortOrdem = ordemUpperCase === 'DESC' ? 'DESC' : 'ASC';

        const tags = await medicoEspecialidadeModel.getTodasTags(sortCampo, sortOrdem);
        res.status(201).json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTodasTagsParaDatagrid = async (req, res) => {
    try {

        const tagDG = await medicoEspecialidadeModel.getTodasTagsParaDatagrid();

        res.status(201).json(tagDG);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTodasTagsParaDatagridMUI = async (req, res) => {
  try {
    const tagDGMUI = await medicoEspecialidadeModel.getTodasTagsParaDatagridMUI();
    if (tagDGMUI) {
      res.status(201).json(tagDGMUI);
    } else {
      res.status(404).json({ message: 'Tags não encontradas' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getTagPorId = async (req, res) => {
    try {
        const id = req.params.id
        const tagPorId = await medicoEspecialidadeModel.getTagPorId(id);
        if (tagPorId) {
            res.status(201).json(tagPorId);
        } else {
            res.status(404).json({ message: 'Tag não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const inserirTag = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nome } = req.body;
        const novaTag = await medicoEspecialidadeModel.inserirTag(nome);
        res.status(201).json(novaTag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const atualizarTag = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = req.params.id;

        const { nome, ativo } = req.body;

        const tagAtualizada =
            await medicoEspecialidadeModel.atualizarTag(
                id, nome, ativo
            );

        if (tagAtualizada) {
            res.status(201).json(tagAtualizada);
        } else {
            res.status(404).json({ message: 'Tag não encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const excluirTag = async (req, res) => {
    try {
        const id = req.params.id;
        const tagExcluida = await medicoEspecialidadeModel.excluirTag(id);
        if (tagExcluida) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Tag não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};