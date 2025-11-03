import * as animalModel from '../../models/public/animalModel.js'

export const getTodosAnimais = async (req, res) => {
  try {
    const animais = await animalModel.getTodosAnimais();
    res.status(201).json(animais);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnimalPorId = async (req, res) => {
  try {
    const id = req.params.id
    const animal = await animalModel.getAnimalPorId(id);
    if (animal) {
      res.status(201).json(animal);
    } else {
      res.status(404).json({ message: 'Animal não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodosAnimaisParaDatagrid = async (req, res) => {
  try {
    const id = req.params.id;
    const animaisParaDG = await animalModel.getTodosAnimaisParaDatagrid(id);
    res.status(200).json(animaisParaDG);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnimaisPorDonoParaDatagridMUI = async (req, res) => {
  try {
    const id = req.params.id;
    const animaisPorDonoDGMUI = await animalModel.getAnimaisPorDonoParaDatagridMUI(id);
    if (animaisPorDonoDGMUI) {
      res.status(201).json(animaisPorDonoDGMUI);
  } else {
    res.status(404).json({ message: 'Exames de Animais não encontrados' });
  }
  } catch (error) {
  res.status(500).json({ message: error.message });
  }
};

export const inserirAnimal = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nome, descricao } = req.body;
        const novoAnimal = await animalModel.inserirAnimal(nome, descricao);
        res.status(201).json(novoAnimal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const atualizarAnimal = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = req.params.id;

        const { nome, descricao, ativo } = req.body;

        const animalAtualizado =
            await animalModel.atualizarAnimal(
                id, nome, descricao, ativo
            );

        if (animalAtualizado) {
            res.status(201).json(animalAtualizado);
        } else {
            res.status(404).json({ message: 'Animal não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const excluirAnimal = async (req, res) => {
  try {
    const id = req.params.id;
    const { codigo_animal, codigo_exame } = req.body;
    const animalExcluido =
      await animalModel.excluirExameAnimal(codigo_animal, codigo_exame);

    if (animalExcluido) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Animal não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};