import express from 'express';
import * as racaController from '../../controllers/public/racaController.js';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tipo Normativo
 *   description: API para retorno de dados de Tipo Normativo
  */


/**
 * @swagger
 * /api/public/tiponormativo:
 *   get:
 *     summary: Retorna todos os tipos de Normativo
 *     tags: [Tipo Normativo]
 *     responses:
 *       200:
 *         description: Lista todos os tipos de Normativo
  */
router.get('/', racaController.getTodosTiposNormativos);

/**
 * @swagger
 * /api/public/tiponormativo/datagrid:
 *   get:
 *     summary: Retorna os Tipos Normativos para DataGrid MUI
 *     tags: [Tipo Normativo]
 *     responses:
 *       201:
 *         description: Retorna os Tipos Normativos para DataGrid MUI
  */
router.get('/datagrid', racaController.getTodosTiposNormativosParaDatagridMUI);

/**
 * @swagger
 * /api/public/tiponormativo/:id:
 *   get:
 *     summary: Retorna um tipo normativo 
 *     tags: [Tipo Normativo]
 *     responses:
 *       200:
 *         description: Retorna um tipo normativo pelo id
  */
router.get('/:id', racaController.getTipoNormativoPorId);

/**
 * @swagger
 * /api/public/tiponormativo/:id/documentos:
 *   get:
 *     summary: Retorna todos documentos normativos pelo tipo
 *     tags: [Tipo Normativo]
 *     responses:
 *       200:
 *         description: Retorna todos documentos normativos pelo tipo nomativo id
  */
router.get('/:id/documentos', racaController.getTodosDocsNormativosPorTipoNormativoId);

/**
 * @swagger
 * /api/public/tiponormativo:
 *   post:
 *     summary: Insere um tipo de normativo
 *     tags: [Tipo Normativo]
 *     responses:
 *       201:
 *         description: Insere um tipo de normativo
  */
router.post('/',
  [
    body('tipo_normativo')
      .notEmpty()
      .withMessage('Campo de Tipo Normativo está vazio.')
      .isLength({ max: 100 })
      .withMessage('Tamanho máximo para o Tipo Normativo é de 100 caracteres'),

  ], racaController.inserirTipoNormativo);

/**
 * @swagger
 * /api/public/tiponormativo/:id:
 *   put:
 *     summary: Atualiza um Tipo de Normativo
 *     tags: [Tipo Normativo]
 *     responses:
 *       201:
 *         description: Atualiza um Tipo de Normativo
  */
router.put('/:id',
  [
    body('tipo_normativo')
      .notEmpty()
      .withMessage('Campo de Tipo Normativo está vazio.')
      .isLength({ max: 100 })
      .withMessage('Tamanho máximo para o Tipo Normativo é de 100 caracteres'),

    body('ativo')
      .notEmpty()
      .withMessage('Campo de Ativo não está marcado.')
      .isBoolean()
      .withMessage('O valor do Campo Ativo deverá ser true ou false.')
  ], racaController.atualizarTipoNormativo);

/**
 * @swagger
 * /api/public/tiponormativo/:id:
 *   delete:
 *     summary: Exclui um tipo normativo
 *     tags: [Tipo Normativo]
 *     responses:
 *       204:
 *         description: Exclui um tipo de normativo
  */
router.delete('/:id', racaController.excluirTipoNormativo);

export default router;