import express from 'express';
import * as exameController from '../../controllers/public/exameController.js';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Perfis
 *   description: API para retorno de dados de Perfis
  */

/**
 * @swagger
 * /api/public/perfil:
 *   get:
 *     summary: Retorna todos perfis
 *     tags: [Perfis]
 *     responses:
 *       200:
 *         description: Lista todos os perfis
  */
router.get('/', exameController.getTodosPerfis);

/**
 * @swagger
 * /api/public/perfil/datagrid:
 *   get:
 *     summary: Retorna todos perfis para DataGrid MUI
 *     tags: [Perfis]
 *     responses:
 *       201:
 *         description: Retorna todos perfis para DataGrid MUI
  */
router.get('/datagrid', exameController.getPerfisParaDatagridMUI);

/**
 * @swagger
 * /api/public/perfil/:id:
 *   get:
 *     summary: Retorna um perfil
 *     tags: [Perfis]
 *     responses:
 *       200:
 *         description: Retorna um perfil pelo id
  */
router.get('/:id', exameController.getPerfilPorId);

/**
 * @swagger
 * /api/public/perfil:
 *   post:
 *     summary: Insere um perfil
 *     tags: [Perfis]
 *     responses:
 *       201:
 *         description: Insere um perfil novo
  */
router.post('/',[

  body('nome')
    .isString()
    .withMessage('Campo de nome é invalido.')
    .notEmpty()
    .withMessage('Campo de nome está vazio.')
    .isLength({ max: 50 })
    .withMessage('Tamanho máximo de nome são 50 caracteres'),

  body('descricao')
    .isString()
    .withMessage('Campo de descricao é invalido.')
    .notEmpty()
    .withMessage('Campo de descricao está vazio.')
    .isLength({ max: 512 })
    .withMessage('Tamanho máximo de descricao são 512 caracteres'),

], exameController.inserirPerfil);

/**
 * @swagger
 * /api/public/perfil/:id:
 *   put:
 *     summary: Atualiza um perfil
 *     tags: [Perfis]
 *     responses:
 *       201:
 *         description: Atualiza um perfil pelo id
  */
router.put('/:id',[

  body('nome')
    .isString()
    .withMessage('Campo de nome é invalido.')
    .notEmpty()
    .withMessage('Campo de nome está vazio.')
    .isLength({ max: 50 })
    .withMessage('Tamanho máximo de nome são 50 caracteres'),

  body('descricao')
    .isString()
    .withMessage('Campo de descricao é invalido.')
    .notEmpty()
    .withMessage('Campo de descricao está vazio.')
    .isLength({ max: 512 })
    .withMessage('Tamanho máximo de descricao são 512 caracteres'),

  body('ativo')
    .isBoolean()
    .withMessage('campo ativo é inválido.'),

], exameController.atualizarPerfil);

/**
 * @swagger
 * /api/public/perfil/:id:
 *    delete:
 *     summary: Exclui um perfil
 *     tags: [Perfis]
 *     responses:
 *       204:
 *         description: Exclui um perfil pelo id
  */
router.delete('/:id', exameController.excluirPerfil);

/**
* @swagger
* /api/public/perfil/:id/permissoes:
*   get:
*     summary: Retorna as permissões atribuidas a um perfil
*     tags: [Perfis]
*     responses:
*       200:
*         description: Lista todas permissões que um perfil possui
 */
router.get('/:id/permissoes', exameController.getPermissoesPorPerfilId);

/**
* @swagger
* /api/public/perfil/:id/usurios:
*   get:
*     summary: Retorna os Usuários atribuídos ao Perfil
*     tags: [Perfis]
*     responses:
*       200:
*         description: Retorna os Usuários atribuídos ao Perfil
 */
router.get('/:id/usuarios', exameController.getUsuariosPorPerfilId);

export default router;