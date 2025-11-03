import express from 'express';
import * as especialidadeController from '../../controllers/public/especialidadeController.js';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Local de Execucao Tipo
 *   description: API para retorno de dados de tipos de locais de execucao
  */

/**
 * @swagger
 * /api/public/localexecucaotipo:
 *   get:
 *     summary: Retorna todos locais de execucao
 *     tags: [Local de Execucao Tipo]
 *     responses:
 *       200:
 *         description: Lista todos pos tipos de locais de execucao
  */
router.get('/', especialidadeController.getTodosTiposLocaisExecucao);

/**
 * @swagger
 * /api/public/localexecucao/:id:
 *   get:
 *     summary: Retorna um local de execucao pelo id
 *     tags: [Local de Execucao Tipo]
 *     responses:
 *       200:
 *         description: retorna um local de execucao pelo id
  */
router.get('/:id', especialidadeController.getTipoLocalExecucaoPorId);

/**
 * @swagger
 * /api/public/localexecucaotipo/:id/localexecucao:
 *   get:
 *     summary: Retorna todas os Locais de Execução ligadas a um tipo de Local de Execução
 *     tags: [Local de Execucao Tipo]
 *     responses:
 *       200:
 *         description: Retorna todas os Locais de Execução ligadas a um tipo de Local de Execução
  */
router.get('/:id/localexecucao', especialidadeController.getTodasLocaisExecucaoPorLocalExecucaoId);

/**
 * @swagger
 * /api/public/localexecucaotipo:
 *   post:
 *     summary: insere um local de execucao
 *     tags: [Local de Execucao Tipo]
 *     responses:
 *       201:
 *         description: insere um local de execucao
  */
router.post('/', [

  body('nome')
    .isString()
    .withMessage('Campo de nome é invalido.')
    .notEmpty()
    .withMessage('Campo de nome está vazio.')
    .isLength({ max: 100 })
    .withMessage('Tamanho máximo de nome são 100 caracteres'),

], especialidadeController.inserirTipoLocalExecucao);

/**
 * @swagger
 * /api/public/localexecucaotipo/:id:
 *   put:
 *     summary: atualiza um tipo de local de execucao
 *     tags: [Local de Execucao Tipo]
 *     responses:
 *       201:
 *         description: atualiza um tipo de local de execucao
  */
router.put('/:id',  [

  body('nome')
    .isString()
    .withMessage('Campo de nome é invalido.')
    .notEmpty()
    .withMessage('Campo de nome está vazio.')
    .isLength({ max: 100 })
    .withMessage('Tamanho máximo de nome são 100 caracteres'),

], especialidadeController.atualizarTipoLocalExecucao);

/**
 * @swagger
 * /api/public/localexecucaotipo/:id:
 *   delete:
 *     summary: deleção lógica de um tipo local de execucao
 *     tags: [Local de Execucao Tipo]
 *     responses:
 *       204:
 *         description: deleta logicamente um tipo local de execucao
  */
router.delete('/:id', especialidadeController.excluirTipoLocalExecucao);

export default router;