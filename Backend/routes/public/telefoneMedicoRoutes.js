import express from 'express';
import { body } from 'express-validator';

import authenticateToken from '../../middleware/authMiddleware.js';
import * as telefoneMedicoController from '../../controllers/public/telefoneMedicoController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: API para retorno de dados de Usuario
  */

/**
 * @swagger
 * /api/public/usuario:
 *   get:
 *     summary: Retorna todas usuarios
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Lista todas os usuarios
  */
router.get('/', telefoneMedicoController.getTodosUsuarios);

/**
 * @swagger
 * /api/public/usuario/:id/datagrid:
 *   get:
 *     summary: Retorna todas usuarios para fins de Datagrid, a partir de um Local de Execução (:id) para Datagrid MUI
 *     tags: [Usuario]
 *     responses:
 *       201:
 *         description: Retorna todas usuarios para fins de Datagrid, a partir de um Local de Execução (:id) para Datagrid MUI
  */
router.get('/:id/datagrid', telefoneMedicoController.getUsuariosParaDatagridMUI);

/**
 * @swagger
 * /api/public/usuario/:id:
 *   get:
 *     summary: Retorna um usuario 
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Retorna um usuario pelo id
  */
router.get('/:id', telefoneMedicoController.getUsuarioPorId);

/**
 * @swagger
 * /api/public/usuario/:id/permissoes:
 *   get:
 *     summary: Retorna todas permissoes de um usuario
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Retorna todas permissoes associadas a um usuario
  */
router.get('/:id/permissoes', telefoneMedicoController.getPermissoesPorUsuarioId);

/**
 * @swagger
 * /api/public/usuario/:id/perfil:
 *   get:
 *     summary: Retorna o perfil de um usuario
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Retorna o perfil de um usuario
  */
router.get('/:id/perfil', telefoneMedicoController.getPerfilPorUsuarioId);

/**
 * @swagger
 * /api/public/usuario/:id/unidadefuncional:
 *   get:
 *     summary: Retorna a Unidade Funcional (lotação) de um Usuario
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Retorna a Unidade Funcional (lotação) de um Usuario
  */
router.get('/:id/unidadefuncional', telefoneMedicoController.getUnidadeFuncionalPorUsuarioId);

/**
 * @swagger
 * /api/public/usuario:
 *   post:
 *     summary: Insere um Usuario
 *     tags: [Usuario]
 *     responses:
 *       201:
 *         description: Insere um Usuario
  */
router.post(
  '/',
  [
    body('nome')
      .notEmpty()
      .withMessage('Campo de nome está vazio.')
      .isLength({ max: 100 })
      .withMessage('Tamanho máximo do nome é de 100 caracteres'),

    body('email')
      .notEmpty()
      .withMessage('Campo de e-mail está vazio.')
      .isLength({ max: 100 })
      .withMessage('Tamanho máximo de e-mail é de 100 caracteres')
      .isEmail()
      .withMessage('E-mail inválido.'),

    body('senha')
      .notEmpty()
      .withMessage('Campo senha está vazio.')
      .isLength({ min: 8 })
      .withMessage('A senha deverá ter tamanho mínimo de 8 caracteres')
      .isLength({ max: 255 })
      .withMessage('A senha deverá ter tamanho máximo de 255 caracteres')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .withMessage('A nova Senha deve ter letras, números e caracteres especiais'),


    body('perfil_id')
      .notEmpty()
      .withMessage('Perfil deverá ser selecionado para o Usuário.')
      .isInt()
      .withMessage('Perfil deverá ter um valor válido.'),

    body('local_execucao_id')
      .notEmpty()
      .withMessage('Local de Execução deverá ser selecionado para o Usuário.')
      .isInt()
      .withMessage('Local de Execução deverá ter um valor válido.'),

    body('nome_login')
      .notEmpty()
      .withMessage('Campo Nome de Login está vazio.')
      .isString()
      .isLength({ max: 50 }),

    body('unidade_funcional_id')
      .notEmpty()
      .withMessage('Unidade Funcional deverá ser selecionada para o Usuário.')
      .isInt()
      .withMessage('Unidade Funcional deverá ter um valor válido.'),

    body('gerente_de_area')
      .isBoolean()
      .withMessage('Campo Gerente de Área deverá ser ativo ou inativo.')
  ],
  telefoneMedicoController.inserirUsuario,
);

/**
 * @swagger
 * /api/public/usuario/:id:
 *   put:
 *     summary: Atualiza um Usuario
 *     tags: [Usuario]
 *     responses:
 *       201:
 *         description:  Atualiza um Usuario por id
  */

router.put(
  '/:id',
  [
    body('nome')
      .notEmpty()
      .withMessage('Campo de nome está vazio.')
      .isLength({ max: 100 })
      .withMessage('Tamanho máximo do nome é de 100 caracteres'),

    body('email')
      .notEmpty()
      .withMessage('Campo de e-mail está vazio.')
      .isLength({ max: 100 })
      .withMessage('Tamanho máximo de e-mail é de 100 caracteres')
      .isEmail()
      .withMessage('E-mail inválido.'),

    body('ativo')
      .isBoolean()
      .withMessage('Campo Ativo deverá ser ativo ou inativo'),

    body('perfil_id')
      .notEmpty()
      .withMessage('Perfil deverá ser selecionado para o Usuário.')
      .isInt()
      .withMessage('Perfil deverá ter um valor válido.'),

    body('local_execucao_id')
      .notEmpty()
      .withMessage('Local de Execução deverá ser selecionado para o Usuário.')
      .isInt()
      .withMessage('Local de Execução deverá ter um valor válido.'),

    body('unidade_funcional_id')
      .notEmpty()
      .withMessage('Unidade Funcional deverá ser selecionada para o Usuário.')
      .isInt()
      .withMessage('Unidade Funcional deverá ter um valor válido.'),

    body('gerente_de_area')
      .isBoolean()
      .withMessage('Campo Gerente de Área deverá ser ativo ou inativo.')
  ],
  telefoneMedicoController.atualizarUsuario);

/**
 * @swagger
 * /api/public/usuario/:id:
 *   delete:
 *     summary: Exclui um Usuario
 *     tags: [Usuario]
 *     responses:
 *       204:
 *         description: Exclui um Usuario por id
  */
router.delete(
  '/:id',
  telefoneMedicoController.excluirUsuario);

/**
 * @swagger
 * /api/public/usuario/:id/atualizarsenha:
 *   put:
 *     summary: Atualiza a senha do Usuario
 *     tags: [Usuario]
 *     responses:
 *       204:
 *         description: Atualiza a senha do Usuario
  */
router.put(
  '/:id/atualizarsenha',
  authenticateToken,
  [
    body('senhaAntiga')
      .notEmpty()
      .withMessage('Campo de Senha Antiga está vazio.')
      .isLength({ min: 8 })
      .withMessage('A Senha Antiga fornecida tem menos de 8 caracteres.'),

    body('senhaNova')
      .notEmpty()
      .withMessage('Campo Nova Senha está vazio.')
      .isLength({ min: 8 })
      .withMessage('A Nova Senha fornecida precisa ter no mínimo 8 caracteres.')
      .isLength({ max: 255 })
      .withMessage('Tamanho máximo de Nova Senha é de 255 caracteres')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .withMessage('A nova Senha deve ter letras, números e caracteres especiais'),

    body('senhaRedigitada')
      .notEmpty()
      .withMessage('Campo Senha Redigitada está vazio.')
      .isLength({ min: 8 })
      .withMessage('A Senha Redigitada precisa ter no mínimo 8 caracteres.')
      .isLength({ max: 255 })
      .withMessage('Tamanho máximo da Senha Redigitada é de 255 caracteres')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .withMessage('A Senha Redigitada deve ter letras, números e caracteres especiais')
      .custom((value, { req }) => {
        if (value !== req.body.senhaNova) {
          throw new Error('A senha redigitada deve ser igual à nova senha.');
        }
        return true;
      })
  ],
  telefoneMedicoController.atualizarSenha);

/**
 * @swagger
 * /api/public/usuario/login:
 *   post:
 *     summary: Efetua o Login de Usuario
 *     tags: [Usuario]
 *     responses:
 *       204:
 *         description: Efetua o Login de Usuario
  */
router.post(
  '/login',
  [
    body('nomeLogin')
      .notEmpty()
      .withMessage('Campo de Nome de Login está vazio.')
      .isLength({ max: 50 })
      .withMessage('Tamanho máximo do Nome de Login é de 50 caracteres')
      .trim().escape()
      .matches(/^[a-zA-Z0-9_.]+$/).withMessage('Nome de Login deve conter apenas letras, números, sublinhados ou ponto final.'),

    body('senha')
      .notEmpty()
      .withMessage('Campo Senha está vazio.')
      .isLength({ max: 255 })
      .withMessage('Tamanho máximo de Nova Senha é de 255 caracteres')
      .trim().escape(),

  ], telefoneMedicoController.efetuarLogin);

export default router;