import express from 'express';
import * as clienteController from '../../controllers/public/clienteController.js';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ferramentas de Sistema
 *   description: API para retorno de dados de Ferramentas de Sistema
  */


/**
 * @swagger
 * /api/public/ferramentasistema:
 *   get:
 *     summary: Retorna todas ferramentas de sistema
 *     tags: [Ferramentas de Sistema]
 *     responses:
 *       200:
 *         description: Lista todas as ferramentas de sistema
  */
router.get('/', clienteController.getTodasFerramentasSistemas);

/**
 * @swagger
 * /api/public/ferramentasistema/datagrid:
 *   get:
 *     summary: Retorna todas ferramentas de sistema para DataGrid MUI
 *     tags: [Ferramentas de Sistema]
 *     responses:
 *       201:
 *         description: Retorna todas ferramentas de sistema para DataGrid MUI
  */
router.get('/datagrid', clienteController.getFerramentasDeSistemaParaDatagridMUI);

/**
 * @swagger
 * /api/public/ferramentasistema/:id:
 *   get:
 *     summary: Retorna uma ferramenta de sistema pelo seu id
 *     tags: [Ferramentas de Sistema]
 *     responses:
 *       200:
 *         description: Retorna uma ferramenta de sistema pelo seu id
  */
router.get('/:id', clienteController.getFerramentaSistemaPorId);

/**
 * @swagger
 * /api/public/ferramentasistema/:id/dgcadastradasnoprocesso:
 *   get:
 *     summary: Retorna as ferramentas de sistemas relacionadas ao processoId
 *     tags: [Ferramentas de Sistema]
 *     responses:
 *       200:
 *         description: Retorna as ferramentas de sistemas relacionadas ao processoId
  */
router.get('/:id/dgcadastradasnoprocesso', clienteController.getTodasFerramentaSistemaCadastradosNoProcessoParaDatagridMUI);

/**
 * @swagger
 * /api/public/ferramentasistema/:id/dgdisponiveisparaprocesso:
 *   get:
 *     summary: Retorna as ferramentas de sistemas relacionadas ao processoId
 *     tags: [Ferramentas de Sistema]
 *     responses:
 *       200:
 *         description: Retorna as ferramentas de sistemas relacionadas ao processoId
  */
router.get('/:id/dgdisponiveisparaprocesso', clienteController.getTodasFerramentaSistemaDisponiveisParaProcessoParaDatagridMUI);

/**
 * @swagger
 * /api/public/ferramentasistema/:id/processos:
 *   get:
 *     summary: Retorna todos os processos que contém a Ferramenta Sistema
 *     tags: [Ferramentas de Sistema]
 *     responses:
 *       200:
 *         description: Retorna todos os processos que contém a Ferramenta Sistema
  */
router.get('/:id/processos', clienteController.getTodosProcessosPorFerramentaSistemaId);

/**
 * @swagger
 * /api/public/ferramentasistema:
 *   post:
 *     summary: Insere uma ferramenta de sistema
 *     tags: [Ferramentas de Sistema]
 *     responses:
 *       201:
 *         description: Insere uma ferramenta de sistema
  */
router.post('/', [

  body('nome')
    .isString()
    .withMessage('Campo de nome é invalido.')
    .notEmpty()
    .withMessage('Campo de nome está vazio.')
    .isLength({ max: 180 })
    .withMessage('Tamanho máximo de nome são 180 caracteres'),

], clienteController.inserirFerramentaSistema);

/**
 * @swagger
 * /api/public/ferramentasistema/:id:
 *   put:
 *     summary: atualiza uma ferramenta de sistema
 *     tags: [Ferramentas de Sistema]
 *     responses:
 *       201:
 *         description: Atualiza uma ferramenta de sistema
  */
router.put('/:id', [

  body('nome')
    .isString()
    .withMessage('Campo de nome é invalido.')
    .notEmpty()
    .withMessage('Campo de nome está vazio.')
    .isLength({ max: 180 })
    .withMessage('Tamanho máximo de nome são 180 caracteres'),

  body('ativo')
    .isBoolean()
    .withMessage('campo ativo é inválido.'),

], clienteController.atualizarFerramentaSistema);

/**
 * @swagger
 * /api/public/ferramentasistema/:id:
 *   delete:
 *     summary: deleção lógica de uma ferramenta de sistema
 *     tags: [Ferramentas de Sistema]
 *     responses:
 *       204:
 *         description: Deleta lógicamente uma ferramenta de sistema
  */
router.delete('/:id', clienteController.excluirFerramentaSistema);

export default router;