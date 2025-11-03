import express from 'express';
import * as exameConsultaController from '../../controllers/public/exameConsultaController.js';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Grupos de Permissões
 *   description: API para retorno de dados de Grupos de Permissões
  */


/**
 * @swagger
 * /api/public/permissaogrupo:
 *   get:
 *     summary: Retorna todos grupos de permissão
 *     tags: [Grupos de Permissões]
 *     responses:
 *       200:
 *         description: Lista todos os grupos de permissão
  */
router.get('/', exameConsultaController.getTodosGruposPermissao);

/**
 * @swagger
 * /api/public/permissaogrupo/datagrid:
 *   get:
 *     summary: Retorna todos grupos de permissão para DataGrid MUI
 *     tags: [Grupos de Permissões]
 *     responses:
 *       201:
 *         description: Retorna todos grupos de permissão para DataGrid MUI
  */
router.get('/datagrid', exameConsultaController.getPermissoesGrupoParaDatagridMUI);

/**
 * @swagger
 * /api/public/permissaogrupo/:id:
 *   get:
 *     summary: Retorna um grupo de permissões
 *     tags: [Grupos de Permissões]
 *     responses:
 *       200:
 *         description: Retorna um grupo de permissões pelo id
  */
router.get('/:id', exameConsultaController.getGrupoPermissaoPorId);


/**
 * @swagger
 * /api/public/permissaogrupo/:id/permissoes:
 *   get:
 *     summary: Retorna as permissoes de um grupo
 *     tags: [Grupos de Permissões]
 *     responses:
 *       200:
 *         description: Retorna as permissoes associadas a um grupo pelo grupo_id
  */
router.get('/:id/permissoes', exameConsultaController.getPermissaoPorGrupoId);

/**
 * @swagger
 * /api/public/permissaogrupo:
 *   post:
 *     summary: Insere um grupo de Permissões
 *     tags: [Grupos de Permissões]
 *     responses:
 *       201:
 *         description: Insere um grupo de Permissões
  */
router.post('/', [

  body('nome')
    .isString()
    .withMessage('Campo de nome não é de tipo válido.')
    .notEmpty()
    .withMessage('Campo de nome está vazio.')
    .isLength({ max: 50 })
    .withMessage('Tamanho máximo de nome são 50 caracteres'),

  body('ordem')
    .notEmpty()
    .withMessage('Campo Ordem está vazio.')

], exameConsultaController.inserirGrupoPermissao);

/**
 * @swagger
 * /api/public/permissaogrupo/:id:
 *   put:
 *     summary: Atualiza um grupo de permissoes
 *     tags: [Grupos de Permissões]
 *     responses:
 *       201:
 *         description: atualiza um grupo de permissoes
  */
router.put('/:id', [

  body('nome')
    .isString()
    .withMessage('Campo de nome não é de tipo válido.')
    .notEmpty()
    .withMessage('Campo de nome está vazio.')
    .isLength({ max: 50 })
    .withMessage('Tamanho máximo de nome são 50 caracteres'),

  body('ordem')
    .notEmpty()
    .withMessage('Campo Ordem está vazio.'),

  body('ativo')
    .isBoolean()
    .withMessage('Campo Ativo é inválido.')


], exameConsultaController.atualizarGrupoPermissao);

/**
* @swagger
* /api/public/permissaogrupo/:id:
*   delete:
*     summary: Deleta logicamente uma permissao
*     tags: [Grupos de Permissões]
*     responses:
*       204:
*         description: Deleta logicamente uma permissao
 */
router.delete('/:id', exameConsultaController.excluirPermissao);

export default router;