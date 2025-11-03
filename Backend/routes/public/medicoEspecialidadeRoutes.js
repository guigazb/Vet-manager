import express from 'express';
import * as medicoEspecialidadeController from '../../controllers/public/medicoEspecialidadeController.js';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: tags
 *   description: API para retorno de dados de tags
  */


/**
 * @swagger
 * /api/public/tag:
 *   get:
 *     summary: Retorna todas as tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Lista todas as permissões
  */
router.get('/', medicoEspecialidadeController.getTodasTags);

/**
 * @swagger
 * /api/public/tag/datagrid:
 *   get:
 *     summary: Retorna as tags para datragarid MUI
 *     tags: [Tags]
 *     responses:
 *       201:
 *         description: Retorna as tags para datragarid MUI
  */
router.get('/datagrid', medicoEspecialidadeController.getTodasTagsParaDatagridMUI);

/**
 * @swagger
 * /api/public/tag/:id:
 *   get:
 *     summary: Retorna uma tag pelo ID
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Retorna uma tag pelo id
  */
router.get('/:id', medicoEspecialidadeController.getTagPorId);


/**
 * @swagger
 * /api/public/tag:
 *   post:
 *     summary: Insere uma tag
 *     tags: [Tags]
 *     responses:
 *       201:
 *         description: Insere uma tag
  */
router.post('/', [

  body('nome')
    .isString()
    .withMessage('Campo de nome é invalido.')
    .notEmpty()
    .withMessage('Campo de nome está vazio.')
    .isLength({ max: 30 })
    .withMessage('Tamanho máximo de nome são 30 caracteres'),


], medicoEspecialidadeController.inserirTag);

/**
 * @swagger
 * /api/public/tag/:id:
 *   put:
 *     summary: Atualiza uma tag
 *     tags: [Tags]
 *     responses:
 *       201:
 *         description: Atualiza uma tag pelo id
  */
router.put('/:id', [

  body('nome')
    .isString()
    .withMessage('Campo de nome é invalido.')
    .notEmpty()
    .withMessage('Campo de nome está vazio.')
    .isLength({ max: 30 })
    .withMessage('Tamanho máximo de nome são 30 caracteres'),
 
  body('ativo')
    .isBoolean()
    .withMessage('campo ativo é inválido.'),

], medicoEspecialidadeController.atualizarTag);

/**
 * @swagger
 * /api/public/tag/:id:
 *   delete:
 *     summary: Deleta logicamente uma tag
 *     tags: [Tags]
 *     responses:
 *       204:
 *         description: Deleta lógicamente uma tag pelo id
  */
router.delete('/:id', medicoEspecialidadeController.excluirTag);

export default router;