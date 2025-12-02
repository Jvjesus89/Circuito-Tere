import { Router } from 'express';
import {
	createTrilha,
	deleteTrilha,
	getTrilhaById,
	listTrilhas,
	updateTrilha
} from '../controllers/trilhas.controller.js';

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Trilha:
 *       type: object
 *       properties:
 *         idtrilha:
 *           type: integer
 *         trilha:
 *           type: string
 *           maxLength: 100
 *         observacao:
 *           type: string
 *         idimagem:
 *           type: integer
 *           nullable: true
 *         idparque:
 *           type: integer
 *           nullable: true
 */

/**
 * @openapi
 * /api/trilhas:
 *   get:
 *     tags: [Trilhas]
 *     summary: Lista trilhas
 *     responses:
 *       200:
 *         description: Lista de trilhas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trilha'
 */
router.get('/', listTrilhas);

/**
 * @openapi
 * /api/trilhas/{id}:
 *   get:
 *     tags: [Trilhas]
 *     summary: Obtém trilha por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trilha encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trilha'
 *       404:
 *         description: Não encontrado
 */
router.get('/:id', getTrilhaById);

/**
 * @openapi
 * /api/trilhas:
 *   post:
 *     tags: [Trilhas]
 *     summary: Cria nova trilha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trilha'
 *     responses:
 *       201:
 *         description: Criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trilha'
 *       409:
 *         description: Conflito (FK ou PK)
 */
router.post('/', createTrilha);

/**
 * @openapi
 * /api/trilhas/{id}:
 *   put:
 *     tags: [Trilhas]
 *     summary: Atualiza trilha
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
 *             $ref: '#/components/schemas/Trilha'
 *     responses:
 *       200:
 *         description: Atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trilha'
 *       404:
 *         description: Não encontrado
 *       409:
 *         description: Conflito (FK)
 */
router.put('/:id', updateTrilha);

/**
 * @openapi
 * /api/trilhas/{id}:
 *   delete:
 *     tags: [Trilhas]
 *     summary: Exclui trilha
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
router.delete('/:id', deleteTrilha);

export default router;
