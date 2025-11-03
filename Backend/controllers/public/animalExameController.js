import * as animalExameModel from '../../models/public/animalExameModel.js'
import { validationResult } from 'express-validator';

export const getTodosExamesAnimal = async (req, res) => {
	try {
		const sortCampo = req.query.sortCampo || 'codigo_animal';
		const ordenamento = req.query.sortOrdem;
		const ordemUpperCase = ordenamento ? ordenamento.toUpperCase() : '';
		const sortOrdem = ordemUpperCase === 'DESC' ? 'DESC' : 'ASC';

		const examesAnimal = await animalExameModel.getTodosExamesAnimal(sortCampo, sortOrdem);
		res.status(200).json(examesAnimal);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getTodosExamesAnimalParaDataGrid = async (req, res) => {
	try {
		const id = req.params.id;
		const examesAnimalDG = await animalExameModel.getTodosExamesAnimalParaDataGrid(id);
		res.status(200).json(examesAnimalDG);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getExamesAnimalParaDatagridMUI = async (req, res) => {
  try {
	const id = req.params.id;
	const examesAnimalDGMUI = await animalExameModel.getExamesAnimalParaDatagridMUI(id);
	if (examesAnimalDGMUI) {
	  res.status(201).json(examesAnimalDGMUI);
	} else {
	  res.status(404).json({ message: 'Exames de Animais não encontrados' });
	}
  } catch (error) {
	res.status(500).json({ message: error.message });
  }
};

export const getExameAnimalPorId = async (req, res) => {
	try {
		const id = req.params.id;
		const exameAnimal = await animalExameModel.getExameAnimalPorId(id);
		if (exameAnimal) {
			res.status(200).json(exameAnimal);
		} else {
			res.status(404).json({ message: 'Exame de Animal não encontrado' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getExamesPorAnimalId = async (req, res) => {
	try {
		const id = req.params.id;
		const examesPorAnimal = await animalExameModel.getExamesPorAnimalId(id);
		if (examesPorAnimal) {
			res.status(200).json(examesPorAnimal);
		} else {
			res.status(404).json({ message: 'Exames não encontrados' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const excluirAnimalExame = async (req, res) => {
	try {
		const id = req.params.id;
		const { codigo_animal, codigo_exame } = req.body;
		const exameAnimalExcluido =
			await animalExameModel.excluirExameAnimal(codigo_animal, codigo_exame);

		if (exameAnimalExcluido) {
			res.status(204).send();
		} else {
			res.status(404).json({ message: 'exame de animal não encontrado' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
