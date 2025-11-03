import express from 'express';
import * as tratamentoConsultaController from '../../controllers/public/tratamentoConsultaController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cidades
 *   description: API para retorno de dados de cidade
  */

/**
 * @swagger
 * /api/public/cidades:
 *   get:
 *     summary: Retorna todas cidades
 *     tags: [Cidades]
 *     responses:
 *       200:
 *         description: Lista todas as cidades
  */
router.get('/', tratamentoConsultaController.getTodasCidades);

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
router.get('/:id', tratamentoConsultaController.getCidadePorId);

export default router;