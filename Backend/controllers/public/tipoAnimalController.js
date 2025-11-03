import * as tipoAnimalModel from '../../models/public/tipoAnimalModel.js'

export const getTodosTipos = async (req, res) => {
  try {
    const cidades = await tipoAnimalModel.getCidades();
    res.status(201).json(cidades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCidadePorId = async (req, res) => {
  try {
    const id = req.params.id
    const cidade = await tipoAnimalModel.getCidadePorId(id);
    if (cidade) {
      res.status(201).json(cidade);
    } else {
      res.status(404).json({ message: 'Cidade não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};