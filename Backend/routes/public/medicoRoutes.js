import express from 'express';
import * as medicoController from '../../controllers/public/medicoController.js';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Relação Perfil Permissão
 *   description: API para retorno de dados de Relação entre perfil e permissão
  */


/**
 * @swagger
 * /api/public/perfil-vs-permissao/:id/permissoes:
 *   get:
 *     summary: Retorna todas Permissões pelo perfil
 *     tags: [Relação Perfil Permissão]
 *     responses:
 *       200:
 *         description: Retorna todas Permissões pelo ID de um perfil
  */
router.get('/:id/permissoes', medicoController.getTodasPermissoesPorPerfilId);

/**
 * @swagger
 * /api/public/perfil-vs-permissao/:id/perfis:
 *   get:
 *     summary: Retorna todos perfis por uma permissão 
 *     tags: [Relação Perfil Permissão]
 *     responses:
 *       200:
 *         description: Retorna todos perfis pelo id de uma permissão 
  */
router.get('/:id/perfis', medicoController.getTodosPerfisComPermissaoId);

/**
 * @swagger
 * /api/public/perfil-vs-permissao:
 *   post:
 *     summary: Insere uma relação
 *     tags: [Relação Perfil Permissão]
 *     responses:
 *       201:
 *         description: Insere uma relação
  */
router.post('/', [

  body('perfil_id')
    .isInt()
    .withMessage('Campo de id de perfil é invalido.')
    .notEmpty()
    .withMessage('Campo de id de perfil está vazio.'),

  body('permissao_id')
    .isInt()
    .withMessage('Campo de id de permissao é invalido.')
    .notEmpty()
    .withMessage('Campo de id de permissao está vazio.'),

], medicoController.inserirPermissaoPorPerfil);

/**
 * @swagger
 * /api/public/perfil-vs-permissao:
 *   delete:
 *     summary: Deleta uma Relação Perfil Permissão
 *     tags: [Relação Perfil Permissão]
 *     responses:
 *       204:
 *         description: Deleta uma Relação Perfil Permissão pela permissao_id e perfil_id
  */
router.delete('/', [

  body('perfil_id')
    .isInt()
    .withMessage('Campo de id de perfil é invalido.')
    .notEmpty()
    .withMessage('Campo de id de perfil está vazio.'),

  body('permissao_id')
    .isInt()
    .withMessage('Campo de id de permissao é invalido.')
    .notEmpty()
    .withMessage('Campo de id de permissao está vazio.'),

], medicoController.excluirPermissaoDePerfil);

export default router;