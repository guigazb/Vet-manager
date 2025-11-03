import * as animalTratamentoModel from '../../models/public/animalTratamentoModel.js'

export const getTodosEstados = async (req, res) => {
	try {
		const sortCampo = req.query.sortCampo || 'nome';
		const ordenamento = req.query.sortOrdem;
		const ordemUpperCase = ordenamento ? ordenamento.toUpperCase() : '';
		const sortOrdem = ordemUpperCase === 'DESC' ? 'DESC' : 'ASC';

		const estados = await animalTratamentoModel.getEstados(sortCampo, sortOrdem);
		res.status(201).json(estados);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getEstadoPorId = async (req, res) => {
	try {
		const id = req.params.id;
		const estado = await animalTratamentoModel.getEstadosPorId(id);
		if (estado) {
			res.status(201).json(estado);
		} else {
			res.status(404).json({ message: 'Estado não encontrado' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getCidadesPorIdEstado = async (req, res) => {
	try {
		const id = req.params.id;
		const cidades = await animalTratamentoModel.getCidadesPorIdEstado(id);
		if (cidades) {
			res.status(201).json(cidades);
		} else {
			res.status(404).json({ message: 'Cidades não encontradas para Estado fornecido' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};