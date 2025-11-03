import express from 'express';
import * as funcionarioController from '../../controllers/public/funcionarioController.js';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Permissões
 *   description: API para retorno de dados de Permissões
  */


/**
 * @swagger
 * /api/public/permissao:
 *   get:
 *     summary: Retorna todas permissões
 *     tags: [Permissões]
 *     responses:
 *       200:
 *         description: Lista todas as permissões
  */
router.get('/', funcionarioController.getTodasPermissoes);

/**
 * @swagger
 * /api/public/permissao/datagrid:
 *   get:
 *     summary: Lista todas as permissões para DataGrid MUI
 *     tags: [Permissões]
 *     responses:
 *       201:
 *         description: Lista todas as permissões para DataGrid MUI
  */
router.get('/datagrid', funcionarioController.getPermissoesParaDatagridMUI);

/**
 * @swagger
 * /api/public/permissao/:id/datagridMUIDisponivelPorPerfil:
 *   get:
 *     summary: Retorna todas as Permissões para fins de Datagrid MUI
 *     tags: [Permissões]
 *     responses:
 *       200:
 *         description: Retorna todas as Permissões para fins de Datagrid MUI
  */
router.get('/:id/datagridMUIDisponivelPorPerfil', funcionarioController.getTodasPermissoesParaDatagridMUIDisponiveisPorPerfil);

/**
 * @swagger
 * /api/public/permissao/:id/datagridMUICadastradasPorPerfil:
 *   get:
 *     summary: Retorna todas as Permissões Cadastradas para fins de Datagrid MUI por Perfil
 *     tags: [Permissões]
 *     responses:
 *       200:
 *         description: Retorna todas as Permissões Cadastradas para fins de Datagrid MUI por Perfil
  */
router.get('/:id/datagridMUICadastradasPorPerfil', funcionarioController.getTodasPermissoesParaDatagridMUICadastradasPorPerfil);


/**
 * @swagger
 * /api/public/permissao/:id:
 *   get:
 *     summary: Retorna uma permissão pelo ID
 *     tags: [Permissões]
 *     responses:
 *       200:
 *         description: Retorna uma permissão pelo id
  */
router.get('/:id', funcionarioController.getPermissaoPorId);

/**
 * @swagger
 * /api/public/permissao/:id/grupo:
 *   get:
 *     summary: Retorna as permissoes pelo Grupo
 *     tags: [Permissões]
 *     responses:
 *       200:
 *         description: Retorna as permissoes pelo Grupo
  */
router.get('/:id/grupo', funcionarioController.getPermissoesPorGrupoId);

/**
 * @swagger
 * /api/public/permissao/:id/perfis:
 *   get:
 *     summary: Retorna os perfis associados a uma permissao
 *     tags: [Permissões]
 *     responses:
 *       200:
 *         description: Retorna os perfis associados a uma permissao
  */
router.get('/:id/perfis', funcionarioController.getPerfisPorPermissaoId);

/**
 * @swagger
 * /api/public/permissao:
 *   post:
 *     summary: Insere uma permissão
 *     tags: [Permissões]
 *     responses:
 *       201:
 *         description: Insere uma permissão
  */
router.post('/', [

  body('nome')
    .isString()
    .withMessage('Campo de nome é invalido.')
    .notEmpty()
    .withMessage('Campo de nome está vazio.')
    .isLength({ max: 100 })
    .withMessage('Tamanho máximo de nome são 100 caracteres'),

  body('rota')
    .isString()
    .withMessage('Campo de rota é invalido.')
    .notEmpty()
    .withMessage('Campo de rota está vazio.')
    .isLength({ max: 256 })
    .withMessage('Tamanho máximo de rota são 256 caracteres'),

  body('visivel_menu')
    .isBoolean()
    .withMessage('Campo Visível Menu deverá ser ativo ou inativo'),

  body('nome_menu')
    .isString()
    .withMessage('Campo de Nome a ser exibido no menu é invalido.')
    .notEmpty()
    .withMessage('Campo de Nome a ser exibido no menu está vazio.')
    .isLength({ max: 22 })
    .withMessage('Tamanho máximo de rota são 22 caracteres'),

  body('ordem')
    .notEmpty()
    .withMessage('Campo Ordem está vazio.'),

  body('grupo_id')
    .isInt()
    .withMessage('Campo de id de grupo é invalido.')
    .notEmpty()
    .withMessage('Campo de id de grupo está vazio.'),

], funcionarioController.inserirPermissao);

/**
 * @swagger
 * /api/public/permissao/:id:
 *   put:
 *     summary: Atualiza uma permissão
 *     tags: [Permissões]
 *     responses:
 *       201:
 *         description: Atualiza uma permissão pelo id
  */
router.put('/:id', [

  body('nome')
    .isString()
    .withMessage('Campo de nome é invalido.')
    .notEmpty()
    .withMessage('Campo de nome está vazio.')
    .isLength({ max: 100 })
    .withMessage('Tamanho máximo de nome são 100 caracteres'),

  body('rota')
    .isString()
    .withMessage('Campo de rota é invalido.')
    .notEmpty()
    .withMessage('Campo de rota está vazio.')
    .isLength({ max: 256 })
    .withMessage('Tamanho máximo de rota são 256 caracteres'),

  body('visivel_menu')
    .isBoolean()
    .withMessage('Campo Visível Menu deverá ser ativo ou inativo'),

  body('nome_menu')
    .isString()
    .withMessage('Campo de Nome a ser exibido no menu é invalido.')
    .notEmpty()
    .withMessage('Campo de Nome a ser exibido no menu está vazio.')
    .isLength({ max: 22 })
    .withMessage('Tamanho máximo de rota são 22 caracteres'),

  body('ordem')
    .notEmpty()
    .withMessage('Campo Ordem está vazio.'),

  body('grupo_id')
    .isInt()
    .withMessage('Campo de id de grupo é invalido.')
    .notEmpty()
    .withMessage('Campo de id de grupo está vazio.'),

  body('ativo')
    .isBoolean()
    .withMessage('campo ativo é inválido.'),

], funcionarioController.atualizarPermissao);

/**
 * @swagger
 * /api/public/permissao/:id:
 *   delete:
 *     summary: Deleta logicamente uma permissão
 *     tags: [Permissões]
 *     responses:
 *       204:
 *         description: Deleta lógicamente uma permissão pelo id
  */
router.delete('/:id', funcionarioController.excluirPermissao);

export default router;