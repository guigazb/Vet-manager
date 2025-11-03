import * as clienteModel from '../../models/public/clienteModel.js'
import { validationResult } from 'express-validator';

export const getTodasFerramentasSistemas = async (req, res) => {
  try {
    const sortCampo = req.query.sortCampo || 'nome';
    const ordenamento = req.query.sortOrdem;
    const ordemUpperCase = ordenamento ? ordenamento.toUpperCase() : '';
    const sortOrdem = ordemUpperCase === 'DESC' ? 'DESC' : 'ASC';

    const ferramentaSistema =
      await clienteModel.getTodasFerramentasSistemas(sortCampo, sortOrdem);

    res.status(201).json(ferramentaSistema);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodasFerramentaSistemaParaDatagrid = async (req, res) => {
  try {

    const ferramentaSistemaDG = await clienteModel.getTodasFerramentaSistemaParaDatagrid();

    res.status(201).json(ferramentaSistemaDG);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFerramentasDeSistemaParaDatagridMUI = async (req, res) => {
  try {
  const ferramentaSistemaDGMUI = await clienteModel.getFerramentasDeSistemaParaDatagridMUI();
  if (ferramentaSistemaDGMUI) {
    res.status(201).json(ferramentaSistemaDGMUI);
  } else {
    res.status(404).json({ message: 'Ferramentas de sistema não encontrados' });
  }
  } catch (error) {
  res.status(500).json({ message: error.message });
  }
};

export const getTodasFerramentaSistemaCadastradosNoProcessoParaDatagridMUI = async (req, res) => {
  try {

    const id = req.params.id
    const ferramentaSistemaDG = await clienteModel.getTodasFerramentaSistemaCadastradosNoProcessoParaDatagridMUI(id);

    res.status(201).json(ferramentaSistemaDG);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodasFerramentaSistemaDisponiveisParaProcessoParaDatagridMUI = async (req, res) => {
  try {

    const id = req.params.id
    const ferramentaSistemaDG = await clienteModel.getTodasFerramentaSistemaDisponiveisParaProcessoParaDatagridMUI(id);

    res.status(201).json(ferramentaSistemaDG);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFerramentaSistemaPorId = async (req, res) => {
  try {
    const id = req.params.id
    const ferramentaSistema =
      await clienteModel.getFerramentaSistemaPorId(id);

    if (ferramentaSistema) {
      res.status(201).json(ferramentaSistema);
    } else {
      res.status(404).json({ message: 'Ferramenta ou Sistema não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodosProcessosPorFerramentaSistemaId = async (req, res) => {
  try {
    const id = req.params.id
    const ferramentaSistema =
      await clienteModel.getTodosProcessosPorFerramentaSistemaId(id);

    if (ferramentaSistema) {
      res.status(201).json(ferramentaSistema);
    } else {
      res.status(404).json({ message: 'Não foram encontrados Processos contendo as Ferramentas ou Sistemas selecionados' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const inserirFerramentaSistema = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nome } = req.body;
    const novaFerramentaSistema = await clienteModel.inserirFerramentaSistema(nome);
    res.status(201).json(novaFerramentaSistema);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const atualizarFerramentaSistema = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = req.params.id;
    const { nome, ativo } = req.body;
    const ferramentaSistemaAtualizada =
      await clienteModel.atualizarFerramentaSistema(id, nome, ativo);

    if (ferramentaSistemaAtualizada) {
      res.status(201).json(ferramentaSistemaAtualizada);
    } else {
      res.status(404).json({ message: 'Ferramenta ou Sistema não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const excluirFerramentaSistema = async (req, res) => {
  try {
    const id = req.params.id;
    const ferramentaSistemaExcluida =
      await clienteModel.excluirFerramentaSistema(id);

    if (ferramentaSistemaExcluida) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Ferramenta ou Sistema não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};