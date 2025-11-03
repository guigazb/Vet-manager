import express from 'express';
import * as telefoneController from '../../controllers/public/telefoneController.js';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Unidades Funcionais
 *   description: API para retorno de dados de unidades funcionais
  */

/**
 * @swagger
 * /api/public/unidadefuncional:
 *   get:
 *     summary: Retorna todas unidades funcionais
 *     tags: [Unidades Funcionais]
 *     responses:
 *       200:
 *         description: Lista todas as unidadefuncional
  */
router.get('/', telefoneController.getTodasUnidadesFuncionais);

/**
 * @swagger
 * /api/public/unidadefuncional/datagrid:
 *   get:
 *     summary: Retorna todas unidades funcionais para DataGrid MUI
 *     tags: [Unidades Funcionais]
 *     responses:
 *       201:
 *         description: Retorna todas unidades funcionais para DataGrid MUI
  */
router.get('/datagrid', telefoneController.getUnidadesFuncionaisParaDatagridMUI);

/**
 * @swagger
 * /api/public/unidadefuncional/:id:
 *   get:
 *     summary: Retorna uma unidade funcional 
 *     tags: [Unidades Funcionais]
 *     responses:
 *       200:
 *         description: Retorna uma unidade funcional por id
  */
router.get('/:id', telefoneController.getUnidadeFuncionalPorId);

/**
 * @swagger
 * /api/public/unidadefuncional/:id/organograma:
 *   get:
 *     summary: Retorna uma unidade funcional 
 *     tags: [Unidades Funcionais]
 *     responses:
 *       200:
 *         description: Retorna uma unidade funcional por id
  */
router.get('/:id/organograma', telefoneController.getOrganogramaFuncionalPorId);

/**
 * @swagger
 * /api/public/unidadefuncional/:id/usuarios:
 *   get:
 *     summary: Retorna os usuarios associados a uma unidade funcional
 *     tags: [Unidades Funcionais]
 *     responses:
 *       200:
 *         description: Retorna os usuarios associados a uma unidade funcional
  */
router.get('/:id/usuarios', telefoneController.getUsuarioPorUnidadeFuncionalId);

/**
 * @swagger
 * /api/public/unidadefuncional/:id/processos:
 *   get:
 *     summary: Retorna os processos associados a uma unidade funcional
 *     tags: [Unidades Funcionais]
 *     responses:
 *       200:
 *         description: Retorna os processos associados a uma unidade funcional
  */
router.get('/:id/processos', telefoneController.getProcessosPorUnidadeFuncionalId);

/**
 * @swagger
 * /api/public/unidadefuncional/:id/matrizswot:
 *   get:
 *     summary: Retorna as matrizes swot associadas a uma unidade funcional
 *     tags: [Unidades Funcionais]
 *     responses:
 *       200:
 *         description: Retorna as matrizes swot associadas a uma unidade funcional
  */
router.get('/:id/matrizswot', telefoneController.getMatrizesSwotPorUnidadeFuncionalId);

/**
 * @swagger
 * /api/public/unidadefuncional:
 *   post:
 *     summary: Insere uma unidade funcional
 *     tags: [Unidades Funcionais]
 *     responses:
 *       201:
 *         description: Insere uma unidade funcional
  */
router.post('/',
  [
    body('local_execucao_id')
      .isInt()
      .withMessage('Campo de local de execucao é invalido, insira o id.')
      .notEmpty()
      .withMessage('Campo de local de execução está vazio.'),

    body('nome')
      .notEmpty()
      .withMessage('Campo de nome está vazio.')
      .isString()
      .withMessage('Campo de nome não é de tipo válido.')
      .isLength({ max: 100 })
      .withMessage('Tamanho máximo de nome são 100 caracteres'),

    body('unidade_funcional_pai')
      .isInt()
      .withMessage('Campo de unidade funcional pai é invalido, insira o id.')
      .notEmpty()
      .withMessage('Campo unidade funcional pai está vazio.'),

    body('organograma')
      .isBoolean()
      .withMessage('campo organograma é inválido.'),

    body('tipo_unidade_id')
      .notEmpty()
      .withMessage('Campo de tipo de unidade está vazio.')
      .isInt()
      .withMessage('Campo de tipo de unidade não é válido, deve ser um valor inteiro.'),

    body('sigla')
      .isString()
      .withMessage('tipo de sigla inválido.')
      .isLength({ max: 30 })
      .withMessage('tamanho máximo de sigla são 30 caracteres.'),


  ],
  telefoneController.inserirUnidadeFuncional);

/**
 * @swagger
 * /api/public/unidadefuncional/:id:
 *   put:
 *     summary: Atualiza uma unidade funcional
 *     tags: [Unidades Funcionais]
 *     responses:
 *       201:
 *         description: Atualiza uma unidade funcional por id
  */
router.put('/:id',
  [

    body('local_execucao_id')
      .isInt()
      .withMessage('Campo de local de execucao é invalido, insira o id.')
      .notEmpty()
      .withMessage('Campo de local de execução está vazio.'),

    body('nome')
      .notEmpty()
      .withMessage('Campo de nome está vazio.')
      .isString()
      .withMessage('Campo de nome não é de tipo válido.')
      .isLength({ max: 100 })
      .withMessage('Tamanho máximo de nome são 100 caracteres'),

    body('unidade_funcional_pai')
      .isInt()
      .withMessage('Campo de unidade funcional pai é invalido, insira o id.')
      .notEmpty()
      .withMessage('Campo unidade funcional pai está vazio.'),

    body('organograma')
      .isBoolean()
      .withMessage('campo organograma é inválido.'),

    body('tipo_unidade_id')
      .notEmpty()
      .withMessage('Campo de tipo de unidade está vazio.')
      .isInt()
      .withMessage('Campo de tipo de unidade não é válido, deve ser um valor inteiro.'),

    body('sigla')
      .isString()
      .withMessage('tipo de sigla inválido.')
      .isLength({ max: 30 })
      .withMessage('tamanho máximo de sigla são 30 caracteres.'),

    body('ativo')
      .isBoolean()
      .withMessage('Campo Ativo é inválido.')


  ], telefoneController.atualizarUnidadeFuncional);

/**
 * @swagger
 * /api/public/unidadefuncional/:id:
 *   delete:
 *     summary: Exclui uma unidade funcional
 *     tags: [Unidades Funcionais]
 *     responses:
 *       204:
 *         description: Exclui uma unidade funcional por id
  */
router.delete('/:id', telefoneController.excluirUnidadeFuncional);

export default router;