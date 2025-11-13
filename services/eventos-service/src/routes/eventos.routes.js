import { Router } from 'express';
import {
	createEvento,
	deleteEvento,
	getEventoById,
	listEventos,
	updateEvento
} from '../controllers/eventos.controller.js';

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Evento:
 *       type: object
 *       properties:
 *         idevento:
 *           type: integer
 *         titulo:
 *           type: string
 *           maxLength: 100
 *         descricao:
 *           type: string
 *         datainicio:
 *           type: string
 *           format: date
 *         datafim:
 *           type: string
 *           format: date
 *           nullable: true
 *         horarioinicio:
 *           type: string
 *           format: time
 *           nullable: true
 *         horariofim:
 *           type: string
 *           format: time
 *           nullable: true
 *         idimagem:
 *           type: integer
 *           nullable: true
 */

/**
 * @openapi
 * /api/eventos:
 *   get:
 *     tags: [Eventos]
 *     summary: Lista eventos
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 */
router.get('/', listEventos);

/**
 * @openapi
 * /api/eventos/{id}:
 *   get:
 *     tags: [Eventos]
 *     summary: Obtém evento por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       404:
 *         description: Não encontrado
 */
router.get('/:id', getEventoById);

/**
 * @openapi
 * /api/eventos:
 *   post:
 *     tags: [Eventos]
 *     summary: Cria novo evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       201:
 *         description: Criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       409:
 *         description: Conflito (FK ou PK)
 */
router.post('/', createEvento);

/**
 * @openapi
 * /api/eventos/{id}:
 *   put:
 *     tags: [Eventos]
 *     summary: Atualiza evento
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
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       200:
 *         description: Atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       404:
 *         description: Não encontrado
 *       409:
 *         description: Conflito (FK)
 */
router.put('/:id', updateEvento);

/**
 * @openapi
 * /api/eventos/{id}:
 *   delete:
 *     tags: [Eventos]
 *     summary: Exclui evento
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
router.delete('/:id', deleteEvento);

export default router;
