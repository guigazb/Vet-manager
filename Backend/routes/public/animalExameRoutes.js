import express from 'express';
import * as animalExameController from '../../controllers/public/animalExameController.js';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Animal Exames
 *   description: API para retorno de dados de exames de animais
  */


/**
 * @swagger
 * /api/public/animalexame:
 *   get:
 *     summary: Retorna todos os Exames de Animais
 *     tags: [Animal Exames]
 *     responses:
 *       200:
 *         description: Lista todos os Exames de Animais
  */
router.get('/', animalExameController.getTodosExamesAnimal);

/**
 * @swagger
 * /api/public/animalexame/datagrid:
 *   get:
 *     summary: Retorna todos os Exames de Animais para DataGrid MUI
 *     tags: [Animal Exames]
 *     responses:
 *       201:
 *         description: Retorna todos os Exames de Animais para DataGrid MUI
  */
router.get('/datagrid', animalExameController.getExamesAnimaisParaDatagridMUI);

/**
 * @swagger
 * /api/public/animalexame/:id:
 *   get:
 *     summary: Retorna um Exame de Animal
 *     tags: [Animal Exames]
 *     responses:
 *       200:
 *         description: Lista um Exame de Animal por id
  */
router.get('/:id', animalExameController.getExameAnimalPorId);

/**
 * @swagger
 * /api/public/docnormativo/:id/dgcadastradosnoprocesso:
 *   get:
 *     summary: Retorna os Normativos relacionados ao processoId
 *     tags: [Documentos Normativos]
 *     responses:
 *       200:
 *         description: Retorna os Normativos relacionados ao processoId
  */
router.get('/:id/dgcadastradosnoprocesso', animalExameController.getTodosNormativosCadastradosNoProcessoParaDatagridMUI);

/**
 * @swagger
 * /api/public/docnormativo/:id/dgdisponiveisparaprocesso:
 *   get:
 *     summary: Retorna os Normativos disponíveis para o processoId
 *     tags: [Documentos Normativos]
 *     responses:
 *       200:
 *         description: Retorna os Normativos disponíveis para o processoId
  */
router.get('/:id/dgdisponiveisparaprocesso', animalExameController.getTodosNormativosDisponiveisParaProcessoParaDatagridMUI);

/**
 * @swagger
 * /api/public/docnormativo/:id/processos:
 *   get:
 *     summary: Retorna os processos associados a um documento normativo
 *     tags: [Documentos Normativos]
 *     responses:
 *       200:
 *         description: Retorna os processos associados a um documento normativo
  */
router.get('/:id/processos', animalExameController.getExamesPorAnimalId);

/**
 * @swagger
 * /api/public/docnormativo:
 *   post:
 *     summary: Insere um Documento Normativo
 *     tags: [Documentos Normativos]
 *     responses:
 *       201:
 *         description: Insere um Documento Normativo
  */
router.post('/', [

  body('data_publicacao')
    .isISO8601()
    .withMessage('Campo de data de publicacao é invalido.')
    .notEmpty()
    .withMessage('Campo de data de publicacao está vazio.'),

  body('tipo_normativo_id')
    .isInt()
    .withMessage('Campo de id de tipo de normativo é invalido.')
    .notEmpty()
    .withMessage('Campo de id de tipo de normativo está vazio.'),


  body('ano_publicacao')
    .isInt()
    .withMessage('Campo de ano de publicacao é invalido.')
    .notEmpty()
    .withMessage('Campo de ano de publicacao está vazio.'),

  body('nome_normativo')
    .isString()
    .withMessage('Campo de nome_normativo é invalido.')
    .notEmpty()
    .withMessage('Campo de nome_normativo está vazio.')
    .isLength({ max: 255 })
    .withMessage('Tamanho máximo de nome_normativo são 255 caracteres'),


], animalExameController.inserirDocumentoNormativo);

/**
 * @swagger
 * /api/public/docnormativo/:id:
 *   out:
 *     summary: Atualiza um Documento Normativo
 *     tags: [Documentos Normativos]
 *     responses:
 *       201:
 *         description: Atualiza um Documento Normativo por id
  */
router.put('/:id', [

  body('data_publicacao')
    .isISO8601()
    .withMessage('Campo de data de publicacao é invalido.')
    .notEmpty()
    .withMessage('Campo de data de publicacao está vazio.'),

  body('tipo_normativo_id')
    .isInt()
    .withMessage('Campo de id de tipo de normativo é invalido.')
    .notEmpty()
    .withMessage('Campo de id de tipo de normativo está vazio.'),


  body('ano_publicacao')
    .isInt()
    .withMessage('Campo de ano de publicacao é invalido.')
    .notEmpty()
    .withMessage('Campo de ano de publicacao está vazio.'),

  body('nome_normativo')
    .isString()
    .withMessage('Campo de nome_normativo é invalido.')
    .notEmpty()
    .withMessage('Campo de nome_normativo está vazio.')
    .isLength({ max: 255 })
    .withMessage('Tamanho máximo de nome_normativo são 255 caracteres'),

  body('ativo')
    .isBoolean()
    .withMessage('campo ativo é inválido.'),

], animalExameController.atualizarDocumentoNormativo);

/**
 * @swagger
 * /api/public/docnormativo/:id:
 *   delete:
 *     summary: Exclui um Documento Normativo
 *     tags: [Documentos Normativos]
 *     responses:
 *       204:
 *         description: Exclui um Documento Normativo por id
  */
router.delete('/:id', animalExameController.excluirAnimalExame);

export default router;