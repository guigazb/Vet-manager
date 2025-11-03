import express from 'express';
import * as receitaController from '../../controllers/public/receitaController.js';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tipos de Unidades Funcionais
 *   description: API para retorno de dados de Tipos de Unidades Funcionais
  */

/**
 * @swagger
 * /api/public/unidadefuncionaltipo:
 *   get:
 *     summary: Retorna todos os Tipos de Unidades Funcionais
 *     tags: [Tipos de Unidades Funcionais]
 *     responses:
 *       200:
 *         description: Retorna todos os Tipos de Unidades Funcionais
  */
router.get('/', receitaController.getTodosTiposDeUnidadeFuncionais);

/**
 * @swagger
 * /api/public/unidadefuncionaltipo/datagrid:
 *   get:
 *     summary: Retorna todos os Tipos de Unidades Funcionais para DataGrid MUI
 *     tags: [Tipos de Unidades Funcionais]
 *     responses:
 *       201:
 *         description: Retorna todos os Tipos de Unidades Funcionais para DataGrid MUI
  */
router.get('/datagrid', receitaController.getTiposUnidadeFuncionalParaDatagridMUI);


/**
 * @swagger
 * /api/public/unidadefuncionaltipo/:id:
 *   get:
 *     summary: Retorna um tipo de unidade funcional 
 *     tags: [Tipos de Unidades Funcionais]
 *     responses:
 *       200:
 *         description: Retorna um tipo de unidade funcional 
  */
router.get('/:id', receitaController.getTipoDeUnidadeFuncionalPorId);

/**
 * @swagger
 * /api/public/unidadefuncionaltipo:
 *   post:
 *     summary: Insere um tipo de unidade funcional
 *     tags: [Tipos de Unidades Funcionais]
 *     responses:
 *       201:
 *         description: Insere um tipo de unidade funcional
  */
router.post('/',
  [

    body('tipo')
      .isString()
      .withMessage('Campo de tipo é invalido.')
      .notEmpty()
      .withMessage('Campo de tipo está vazio.')
      .isLength({ max: 50 })
      .withMessage('Tamanho máximo de tipo são 50 caracteres'),

  ], receitaController.inserirTipoUnidadeFuncional);

/**
 * @swagger
 * /api/public/unidadefuncionaltipo/:id:
 *   put:
 *     summary: Atualiza um tipo de unidade funcional
 *     tags: [Tipos de Unidades Funcionais]
 *     responses:
 *       201:
 *         description: Atualiza um tipo de unidade funcional
  */
router.put('/:id',
  [

    body('tipo')
      .isString()
      .withMessage('Campo de tipo é invalido.')
      .notEmpty()
      .withMessage('Campo de tipo está vazio.')
      .isLength({ max: 50 })
      .withMessage('Tamanho máximo de tipo  são 50 caracteres'),

    body('ativo')
      .isBoolean()
      .withMessage('Campo de ativo não é de tipo válido.'),

  ], receitaController.atualizarTipoUnidadeFuncional);

/**
 * @swagger
 * /api/public/unidadefuncionaltipo/:id:
 *   delete:
 *     summary: Exclui um tipo de unidade funcional
 *     tags: [Tipos de Unidades Funcionais]
 *     responses:
 *       204:
 *         description: Exclui um tipo de unidade funcional
  */
router.delete('/:id', receitaController.excluirTipoUnidadeFuncional);

export default router;