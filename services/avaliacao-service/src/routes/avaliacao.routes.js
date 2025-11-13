import express from 'express';
import {
	listAvaliacoes,
	getAvaliacao,
	createAvaliacao,
	updateAvaliacao,
	deleteAvaliacao
} from '../controllers/avaliacao.controller.js';

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Avaliacao:
 *       type: object
 *       properties:
 *         idavaliacao:
 *           type: integer
 *         idusuario:
 *           type: integer
 *         avaliacao:
 *           type: string
 *           maxLength: 255
 *         estrelas:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 */

/**
 * @openapi
 * /api/avaliacao:
 *   get:
 *     tags: [Avaliacao]
 *     summary: Lista avaliações
 *     responses:
 *       200:
 *         description: Lista de avaliações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Avaliacao'
 */
router.get('/', listAvaliacoes);

/**
 * @openapi
 * /api/avaliacao/{id}:
 *   get:
 *     tags: [Avaliacao]
 *     summary: Obtém avaliação por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Avaliação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 *       404:
 *         description: Não encontrado
 */
router.get('/:id', getAvaliacao);

/**
 * @openapi
 * /api/avaliacao:
 *   post:
 *     tags: [Avaliacao]
 *     summary: Cria nova avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Avaliacao'
 *     responses:
 *       201:
 *         description: Criado
 *       409:
 *         description: Conflito (FK ou PK)
 */
router.post('/', createAvaliacao);

/**
 * @openapi
 * /api/avaliacao/{id}:
 *   put:
 *     tags: [Avaliacao]
 *     summary: Atualiza avaliação
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Avaliacao'
 *     responses:
 *       200:
 *         description: Atualizado
 *       404:
 *         description: Não encontrado
 */
router.put('/:id', updateAvaliacao);

/**
 * @openapi
 * /api/avaliacao/{id}:
 *   delete:
 *     tags: [Avaliacao]
 *     summary: Exclui avaliação
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Excluído
 *       404:
 *         description: Não encontrado
 */
router.delete('/:id', deleteAvaliacao);

export default router;
