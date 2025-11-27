import { pool } from '../config/db.js';

const baseSelect = `
	SELECT idevento, titulo, descricao, datainicio, datafim, horarioinicio, horariofim, idimagem
	FROM public.eventos
`;

function toNullable(value) {
	if (value === undefined || value === null || value === '') return null;
	return value;
}

function parseNullableInt(value) {
	const normalized = toNullable(value);
	return normalized === null ? null : Number(normalized);
}

export async function listEventos(_req, res, next) {
	try {
		const result = await pool.query(`${baseSelect} ORDER BY datainicio DESC, idevento ASC`);
		res.json(result.rows);
	} catch (err) {
		next(err);
	}
}

export async function getEventoById(req, res, next) {
	try {
		const { id } = req.params;
		const result = await pool.query(`${baseSelect} WHERE idevento = $1`, [Number(id)]);
		if (result.rowCount === 0) {
			return res.status(404).json({ message: 'Evento não encontrado' });
		}
		res.json(result.rows[0]);
	} catch (err) {
		next(err);
	}
}

export async function createEvento(req, res, next) {
	try {
		const {
			titulo,
			descricao = null,
			datainicio,
			datafim = null,
			horarioinicio = null,
			horariofim = null,
			idimagem = null
		} = req.body || {};

		if (titulo == null || datainicio == null) {
			return res.status(400).json({ message: 'Campos obrigatórios: titulo, datainicio' });
		}

		const query = `
			INSERT INTO public.eventos (titulo, descricao, datainicio, datafim, horarioinicio, horariofim, idimagem)
			VALUES ($1, $2, $3, $4, $5, $6, $7)
			RETURNING idevento, titulo, descricao, datainicio, datafim, horarioinicio, horariofim, idimagem
		`;
		const values = [
			titulo,
			toNullable(descricao),
			datainicio,
			toNullable(datafim),
			toNullable(horarioinicio),
			toNullable(horariofim),
			parseNullableInt(idimagem)
		];
		const result = await pool.query(query, values);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		if (err?.code === '23503') {
			return res.status(409).json({ message: 'Chave estrangeira inválida (idimagem)' });
		}
		if (err?.code === '23505') {
			return res.status(409).json({ message: 'Evento com id já existente' });
		}
		next(err);
	}
}

export async function updateEvento(req, res, next) {
	try {
		const { id } = req.params;
		const {
			titulo,
			descricao,
			datainicio,
			datafim,
			horarioinicio,
			horariofim,
			idimagem
		} = req.body || {};

		const fields = [];
		const values = [];
		let idx = 1;

		if (titulo !== undefined) { fields.push(`titulo = $${idx++}`); values.push(titulo); }
		if (descricao !== undefined) { fields.push(`descricao = $${idx++}`); values.push(toNullable(descricao)); }
		if (datainicio !== undefined) { fields.push(`datainicio = $${idx++}`); values.push(datainicio); }
		if (datafim !== undefined) { fields.push(`datafim = $${idx++}`); values.push(toNullable(datafim)); }
		if (horarioinicio !== undefined) { fields.push(`horarioinicio = $${idx++}`); values.push(toNullable(horarioinicio)); }
		if (horariofim !== undefined) { fields.push(`horariofim = $${idx++}`); values.push(toNullable(horariofim)); }
		if (idimagem !== undefined) { fields.push(`idimagem = $${idx++}`); values.push(parseNullableInt(idimagem)); }

		if (fields.length === 0) {
			return res.status(400).json({ message: 'Nenhum campo para atualizar' });
		}

		const query = `
			UPDATE public.eventos
			SET ${fields.join(', ')}
			WHERE idevento = $${idx}
			RETURNING idevento, titulo, descricao, datainicio, datafim, horarioinicio, horariofim, idimagem
		`;
		values.push(Number(id));
		const result = await pool.query(query, values);
		if (result.rowCount === 0) {
			return res.status(404).json({ message: 'Evento não encontrado' });
		}
		res.json(result.rows[0]);
	} catch (err) {
		if (err?.code === '23503') {
			return res.status(409).json({ message: 'Chave estrangeira inválida (idimagem)' });
		}
		if (err?.code === '23505') {
			return res.status(409).json({ message: 'Evento com dados conflitantes' });
		}
		next(err);
	}
}

export async function deleteEvento(req, res, next) {
	try {
		const { id } = req.params;
		const result = await pool.query('DELETE FROM public.eventos WHERE idevento = $1', [Number(id)]);
		if (result.rowCount === 0) {
			return res.status(404).json({ message: 'Evento não encontrado' });
		}
		res.status(204).send();
	} catch (err) {
		next(err);
	}
}
