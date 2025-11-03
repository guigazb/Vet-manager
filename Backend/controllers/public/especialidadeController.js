import * as especialidadeModel from '../../models/public/especialidadeModel.js'
import { validationResult } from 'express-validator';

export const getTodosTiposLocaisExecucao = async (req, res) => {
	try {
		const locais = await especialidadeModel.getTodosTiposLocaisExecucao();
		res.status(201).json(locais);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getTipoLocalExecucaoPorId = async (req, res) => {
	try {
		const id = req.params.id;
		const locais = await especialidadeModel.getTipoLocalExecucaoPorId(id);
		if (locais) {
			res.status(201).json(locais);
		} else {
			res.status(404).json({ message: 'Tipo de Local de Execução não encontrado' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getTodasLocaisExecucaoPorLocalExecucaoId = async (req, res) => {
	try {
		const id = req.params.id;
		const locais = await especialidadeModel.getTodasLocaisExecucaoPorLocalExecucaoId(id);
		if (locais) {
			res.status(201).json(locais);
		} else {
			res.status(404).json({ message: 'Não foram encontradas Locais de Execução para o Tipo de Local de Execução.' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const inserirTipoLocalExecucao = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { nome } = req.body;

		const novoLocalExec =
			await especialidadeModel.inserirTipoLocalExecucao(nome);

		res.status(201).json(novoLocalExec);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const atualizarTipoLocalExecucao = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const id = req.params.id;
		const { nome } = req.body;

		const localExecAtualizado =
			await especialidadeModel.atualizarTipoLocalExecucao(id, nome);

		if (localExecAtualizado) {
			res.status(201).json(localExecAtualizado);
		} else {
			res.status(404).json({ message: 'Tipo de Local de Execução não encontrado' });
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const excluirTipoLocalExecucao = async (req, res) => {
	try {
		const id = req.params.id;
		const localExcluido =
			await especialidadeModel.excluirTipoLocalExecucao(id);
		if (localExcluido) {
			res.status(204).send();
		} else {
			res.status(404).json({ message: 'Tipo de Local de Execução não encontrado' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

