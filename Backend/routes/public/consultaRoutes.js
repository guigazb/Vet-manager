import express from 'express';
import * as consultaController from '../../controllers/public/consultaController.js';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Local de Execucao
 *   description: API para retorno de dados de locais de execucao
  */

/**
 * @swagger
 * /api/public/localexecucao:
 *   get:
 *     summary: Retorna todos locais de execucao
 *     tags: [Local de Execucao]
 *     responses:
 *       200:
 *         description: Lista todos locais de execucao
  */
router.get('/', consultaController.getTodosLocais);

/**
 * @swagger
 * /api/public/localexecucao/datagrid:
 *   get:
 *     summary: Retorna todos locais de execucao para DataGrid MUI
 *     tags: [Local de Execucao]
 *     responses:
 *       201:
 *         description: Retorna todos locais de execucao para DataGrid MUI
  */
router.get('/datagrid', consultaController.getLocalExecucaoParaDatagridMUI);

/**
 * @swagger
 * /api/public/localexecucao/:id:
 *   get:
 *     summary: Retorna um local de execucao pelo id
 *     tags: [Local de Execucao]
 *     responses:
 *       200:
 *         description: retorna um local de execucao pelo id
  */
router.get('/:id', consultaController.getLocalExecucaoPorId);

/**
 * @swagger
 * /api/public/localexecucao/:id/unidadesfuncionais:
 *   get:
 *     summary: Retorna todas as Unidades Funcionais ligadas a um Local de Execução
 *     tags: [Local de Execucao]
 *     responses:
 *       200:
 *         description: Retorna todas as Unidades Funcionais ligadas a um Local de Execução
  */
router.get('/:id/unidadesfuncionais', consultaController.getTodasUnidadesFuncionaisPorLocalExecucaoId);

/**
 * @swagger
 * /api/public/localexecucao:
 *   post:
 *     summary: insere um local de execucao
 *     tags: [Local de Execucao]
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

  body('endereco')
    .isString()
    .withMessage('Campo de endereço é invalido.')
    .notEmpty()
    .withMessage('Campo de endereço está vazio.')
    .isLength({ max: 256 })
    .withMessage('Tamanho máximo de endereço são 256 caracteres'),

  body('bairro')
    .isString()
    .withMessage('Campo de bairro é invalido.')
    .notEmpty()
    .withMessage('Campo de bairro está vazio.')
    .isLength({ max: 100 })
    .withMessage('Tamanho máximo de bairro são 100 caracteres'),

  body('cidade_id')
    .isInt()
    .withMessage('Campo de id de cidade é invalido.')
    .notEmpty()
    .withMessage('Campo de id de cidade está vazio.'),

  body('tipo_local_execucao_id')
    .isInt()
    .withMessage('Campo de id de cidade é invalido.'),


], consultaController.inserirLocalExecucao);

/**
 * @swagger
 * /api/public/localexecucao/:id:
 *   put:
 *     summary: atualiza um local de execucao
 *     tags: [Local de Execucao]
 *     responses:
 *       201:
 *         description: atualiza um local de execucao
  */
router.put('/:id', [

  body('nome')
    .isString()
    .withMessage('Campo de nome é invalido.')
    .notEmpty()
    .withMessage('Campo de nome está vazio.')
    .isLength({ max: 100 })
    .withMessage('Tamanho máximo de nome são 100 caracteres'),

  body('endereco')
    .isString()
    .withMessage('Campo de endereço é invalido.')
    .notEmpty()
    .withMessage('Campo de endereço está vazio.')
    .isLength({ max: 256 })
    .withMessage('Tamanho máximo de endereço são 256 caracteres'),

  body('bairro')
    .isString()
    .withMessage('Campo de bairro é invalido.')
    .notEmpty()
    .withMessage('Campo de bairro está vazio.')
    .isLength({ max: 100 })
    .withMessage('Tamanho máximo de bairro são 100 caracteres'),

  body('cidade_id')
    .isInt()
    .withMessage('Campo de id de cidade é invalido.')
    .notEmpty()
    .withMessage('Campo de id de cidade está vazio.'),

  body('tipo_local_execucao_id')
    .isInt()
    .withMessage('Campo de id de cidade é invalido.'),

  body('ativo')
    .isBoolean()
    .withMessage('campo ativo é inválido.'),

], consultaController.atualizarLocalExecucao);

/**
 * @swagger
 * /api/public/localexecucao/:id:
 *   delete:
 *     summary: deleção lógica de um local de execucao
 *     tags: [Local de Execucao]
 *     responses:
 *       204:
 *         description: deleta logicamente um local de execucao
  */
router.delete('/:id', consultaController.excluirLocalExecucao);

export default router;