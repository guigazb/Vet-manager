import * as consultaModel from '../../models/public/consultaModel.js'
import { validationResult } from 'express-validator';

export const getTodosLocais = async (req, res) => {
	try {
		const sortCampo = req.query.sortCampo || 'nome';
		const ordenamento = req.query.sortOrdem;
		const ordemUpperCase = ordenamento ? ordenamento.toUpperCase() : '';
		const sortOrdem = ordemUpperCase === 'DESC' ? 'DESC' : 'ASC';

		const locais = await consultaModel.getTodosLocaisExecucao(sortCampo, sortOrdem);
		res.status(201).json(locais);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


export const getLocalExecucaoPorId = async (req, res) => {
	try {
		const id = req.params.id;
		const locais = await consultaModel.getLocalExecucaoPorId(id);
		if (locais) {
			res.status(201).json(locais);
		} else {
			res.status(404).json({ message: 'Local de Execução não encontrado' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getTodasUnidadesFuncionaisPorLocalExecucaoId = async (req, res) => {
	try {
		const id = req.params.id;
		const locais = await consultaModel.getTodasUnidadesFuncionaisPorLocalExecucaoId(id);
		if (locais) {
			res.status(201).json(locais);
		} else {
			res.status(404).json({ message: 'Não foram encontradas Unidades Funcionais para o Local de Execução selecionado.' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getTodosLocaisExecucaoParaDatagrid = async (req, res) => {
	try {

		const LocalExecucaoDG = await consultaModel.getTodosLocaisExecucaoParaDatagrid();

		res.status(201).json(LocalExecucaoDG);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getLocalExecucaoParaDatagridMUI = async (req, res) => {
  try {
	const LocalExecucaoDGMUI = await consultaModel.getLocalExecucaoParaDatagridMUI();
	if (LocalExecucaoDGMUI) {
	  res.status(201).json(LocalExecucaoDGMUI);
	} else {
	  res.status(404).json({ message: 'Locais de execução não encontrados' });
	}
  } catch (error) {
	res.status(500).json({ message: error.message });
  }
};

export const inserirLocalExecucao = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { nome, endereco, bairro, cidade_id, tipo_local_execucao_id } = req.body;

		const novoLocalExec =
			await consultaModel.inserirLocalExecucao(nome, endereco, bairro, cidade_id, tipo_local_execucao_id);

		res.status(201).json(novoLocalExec);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const atualizarLocalExecucao = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const id = req.params.id;
		const { nome, endereco, bairro, cidade_id, tipo_local_execucao_id, ativo } = req.body;

		const localExecAtualizado =
			await consultaModel.atualizarLocalExecucao(id, nome, endereco, bairro, cidade_id, tipo_local_execucao_id, ativo);

		if (localExecAtualizado) {
			res.status(201).json(localExecAtualizado);
		} else {
			res.status(404).json({ message: 'Local de Execução não encontrado' });
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const excluirLocalExecucao = async (req, res) => {
	try {
		const id = req.params.id;
		const localExcluido =
			await consultaModel.excluirLocalExecucao(id);
		if (localExcluido) {
			res.status(204).send();
		} else {
			res.status(404).json({ message: 'Local de Execução não encontrado' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

