import express from 'express';
import * as animalTratamentoController from '../../controllers/public/animalTratamentoController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Estados
 *   description: API para retorno de dados de estados
  */


/**
 * @swagger
 * /api/public/estados:
 *   get:
 *     summary: Retorna todos estados
 *     tags: [Estados]
 *     responses:
 *       200:
 *         description: Lista todos os estados
  */
router.get('/', animalTratamentoController.getTodosEstados);

/**
 * @swagger
 * /api/public/estados/:id:
 *   get:
 *     summary: Retorna um estado pelo seu id
 *     tags: [Estados]
 *     responses:
 *       200:
 *         description: Lista um estado pelo seu id
  */
router.get('/:id', animalTratamentoController.getEstadoPorId);

/**
 * @swagger
 * /api/public/estados/:id/cidades:
 *   get:
 *     summary: Retorna todas cidades de um estado
 *     tags: [Estados]
 *     responses:
 *       200:
 *         description: Lista todas cidades de um estado, dado pelo id fornecido
  */
router.get('/:id/cidades', animalTratamentoController.getCidadesPorIdEstado);

export default router;
