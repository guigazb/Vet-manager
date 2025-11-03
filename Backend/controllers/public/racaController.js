import * as racaModel from '../../models/public/racaModel.js'
import { validationResult } from 'express-validator';

export const getTodosTiposNormativos = async (req, res) => {
	try {
		const sortCampo = req.query.sortCampo || 'tipo_normativo';
		const ordenamento = req.query.sortOrdem;
		const ordemUpperCase = ordenamento ? ordenamento.toUpperCase() : '';
		const sortOrdem = ordemUpperCase === 'DESC' ? 'DESC' : 'ASC';

		const tiposNormativos = await racaModel.getTiposDeNormativos(sortCampo, sortOrdem);
		res.status(201).json(tiposNormativos);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getTodosTiposNormativosParaDataGrid = async (req, res) => {
	try {
		const docsNormativo = await racaModel.getTodosTiposNormativosParaDataGrid();
		res.status(201).json(docsNormativo);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getTodosTiposNormativosParaDatagridMUI = async (req, res) => {
  try {
	const tipoNormativoDGMUI = await racaModel.getTodosTiposNormativosParaDatagridMUI();
	if (tipoNormativoDGMUI) {
	  res.status(201).json(tipoNormativoDGMUI);
	} else {
	  res.status(404).json({ message: 'Tipos normativos não encontrados' });
	}
  } catch (error) {
	res.status(500).json({ message: error.message });
  }
};

export const getTipoNormativoPorId = async (req, res) => {
	try {
		const id = req.params.id
		const tipoNormativo = await racaModel.getTipoDeNormativoPorId(id);
		if (tipoNormativo) {
			res.status(201).json(tipoNormativo);
		} else {
			res.status(404).json({ message: 'Tipo de Normativo não encontrado' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getTodosDocsNormativosPorTipoNormativoId = async (req, res) => {
	try {
		const id = req.params.id
		const documentosNormativos = await racaModel.getDocumentosPorTipoDeNormativoId(id);
		res.status(201).json(documentosNormativos);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const inserirTipoNormativo = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { tipo_normativo } = req.body;
		const novoTipoNormativo = await racaModel.inserirTipoNormativo(tipo_normativo);
		res.status(201).json(novoTipoNormativo);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const atualizarTipoNormativo = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const id = req.params.id;
		const { tipo_normativo, ativo } = req.body;
		const tipoNormativoAtualizado = await racaModel.atualizarTipoNormativo(id, tipo_normativo, ativo);
		if (tipoNormativoAtualizado) {
			res.status(201).json(tipoNormativoAtualizado);
		} else {
			res.status(404).json({ message: 'Tipo Normativo não encontrado' });
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const excluirTipoNormativo = async (req, res) => {
	try {
		const id = req.params.id;
		const tipoNormativoExcluido = await racaModel.excluirTipoNormativo(id);
		if (tipoNormativoExcluido) {
			res.status(204).send();
		} else {
			res.status(404).json({ message: 'Tipo Normativo não encontrado' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};