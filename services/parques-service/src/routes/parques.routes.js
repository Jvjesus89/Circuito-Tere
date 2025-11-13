import { Router } from 'express';
import {
	createParque,
	deleteParque,
	getParqueById,
	listParques,
	updateParque
} from '../controllers/parques.controller.js';

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Parque:
 *       type: object
 *       properties:
 *         idparque:
 *           type: integer
 *         parque:
 *           type: string
 *           maxLength: 100
 *         horarioinicio:
 *           type: string
 *           format: time
 *         horariofim:
 *           type: string
 *           format: time
 *         observacao:
 *           type: string
 *         idimagem:
 *           type: integer
 *           nullable: true
 *         idtrilha:
 *           type: integer
 *           nullable: true
 */

/**
 * @openapi
 * /api/parques:
 *   get:
 *     tags: [Parques]
 *     summary: Lista parques
 *     responses:
 *       200:
 *         description: Lista de parques
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Parque'
 */
router.get('/', listParques);

/**
 * @openapi
 * /api/parques/{id}:
 *   get:
 *     tags: [Parques]
 *     summary: Obtém parque por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Parque encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parque'
 *       404:
 *         description: Não encontrado
 */
router.get('/:id', getParqueById);

/**
 * @openapi
 * /api/parques:
 *   post:
 *     tags: [Parques]
 *     summary: Cria novo parque
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Parque'
 *     responses:
 *       201:
 *         description: Criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parque'
 *       409:
 *         description: Conflito (FK ou PK)
 */
router.post('/', createParque);

/**
 * @openapi
 * /api/parques/{id}:
 *   put:
 *     tags: [Parques]
 *     summary: Atualiza parque
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
 *             $ref: '#/components/schemas/Parque'
 *     responses:
 *       200:
 *         description: Atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parque'
 *       404:
 *         description: Não encontrado
 *       409:
 *         description: Conflito (FK)
 */
router.put('/:id', updateParque);

/**
 * @openapi
 * /api/parques/{id}:
 *   delete:
 *     tags: [Parques]
 *     summary: Exclui parque
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
router.delete('/:id', deleteParque);

export default router;
