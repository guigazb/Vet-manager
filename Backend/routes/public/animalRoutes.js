import express from 'express';
import * as animalController from '../../controllers/public/animalController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Animal
 *   description: API para retorno de dados de animais
  */

/**
 * @swagger
 * /api/public/animais:
 *   get:
 *     summary: Retorna todas cidades
 *     tags: [Cidades]
 *     responses:
 *       200:
 *         description: Lista todas as cidades
  */
router.get('/', animalController.getTodosAnimais);

/**
 * @swagger
 * /api/public/cidades/:id:
 *   get:
 *     summary: Retorna uma cidade pelo id
 *     tags: [Cidades]
 *     responses:
 *       200:
 *         description: retorna uma cidade pelo id especificado
  */
router.get('/:id', animalController.getAnimalPorId);

export default router;