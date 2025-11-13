import { pool } from '../config/db.js';

const baseSelect = `
	SELECT idparque, parque, horarioinicio, horariofim, observacao, idimagem, idtrilha
	FROM public.parques
`;

function toNullable(value) {
	if (value === undefined || value === null || value === '') return null;
	return value;
}

function parseNullableInt(value) {
	const normalized = toNullable(value);
	return normalized === null ? null : Number(normalized);
}

export async function listParques(_req, res, next) {
	try {
		const result = await pool.query(`${baseSelect} ORDER BY idparque ASC`);
		res.json(result.rows);
	} catch (err) {
		next(err);
	}
}

export async function getParqueById(req, res, next) {
	try {
		const { id } = req.params;
		const result = await pool.query(`${baseSelect} WHERE idparque = $1`, [Number(id)]);
		if (result.rowCount === 0) {
			return res.status(404).json({ message: 'Parque não encontrado' });
		}
		res.json(result.rows[0]);
	} catch (err) {
		next(err);
	}
}

export async function createParque(req, res, next) {
	try {
		const {
			idparque,
			parque,
			horarioinicio = null,
			horariofim = null,
			observacao = null,
			idimagem = null,
			idtrilha = null
		} = req.body || {};

		if (idparque == null || parque == null) {
			return res.status(400).json({ message: 'Campos obrigatórios: idparque, parque' });
		}

		const query = `
			INSERT INTO public.parques (idparque, parque, horarioinicio, horariofim, observacao, idimagem, idtrilha)
			VALUES ($1, $2, $3, $4, $5, $6, $7)
			RETURNING idparque, parque, horarioinicio, horariofim, observacao, idimagem, idtrilha
		`;
		const values = [
			Number(idparque),
			parque,
			toNullable(horarioinicio),
			toNullable(horariofim),
			toNullable(observacao),
			parseNullableInt(idimagem),
			parseNullableInt(idtrilha)
		];
		const result = await pool.query(query, values);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		if (err?.code === '23503') {
			return res.status(409).json({ message: 'Chave estrangeira inválida (idimagem ou idtrilha)' });
		}
		if (err?.code === '23505') {
			return res.status(409).json({ message: 'Parque com id já existente' });
		}
		next(err);
	}
}

export async function updateParque(req, res, next) {
	try {
		const { id } = req.params;
		const {
			parque,
			horarioinicio,
			horariofim,
			observacao,
			idimagem,
			idtrilha
		} = req.body || {};

		const fields = [];
		const values = [];
		let idx = 1;

		if (parque !== undefined) { fields.push(`parque = $${idx++}`); values.push(parque); }
		if (horarioinicio !== undefined) { fields.push(`horarioinicio = $${idx++}`); values.push(toNullable(horarioinicio)); }
		if (horariofim !== undefined) { fields.push(`horariofim = $${idx++}`); values.push(toNullable(horariofim)); }
		if (observacao !== undefined) { fields.push(`observacao = $${idx++}`); values.push(toNullable(observacao)); }
		if (idimagem !== undefined) { fields.push(`idimagem = $${idx++}`); values.push(parseNullableInt(idimagem)); }
		if (idtrilha !== undefined) { fields.push(`idtrilha = $${idx++}`); values.push(parseNullableInt(idtrilha)); }

		if (fields.length === 0) {
			return res.status(400).json({ message: 'Nenhum campo para atualizar' });
		}

		const query = `
			UPDATE public.parques
			SET ${fields.join(', ')}
			WHERE idparque = $${idx}
			RETURNING idparque, parque, horarioinicio, horariofim, observacao, idimagem, idtrilha
		`;
		values.push(Number(id));
		const result = await pool.query(query, values);
		if (result.rowCount === 0) {
			return res.status(404).json({ message: 'Parque não encontrado' });
		}
		res.json(result.rows[0]);
	} catch (err) {
		if (err?.code === '23503') {
			return res.status(409).json({ message: 'Chave estrangeira inválida (idimagem ou idtrilha)' });
		}
		if (err?.code === '23505') {
			return res.status(409).json({ message: 'Parque com dados conflitantes' });
		}
		next(err);
	}
}

export async function deleteParque(req, res, next) {
	try {
		const { id } = req.params;
		const result = await pool.query('DELETE FROM public.parques WHERE idparque = $1', [Number(id)]);
		if (result.rowCount === 0) {
			return res.status(404).json({ message: 'Parque não encontrado' });
		}
		res.status(204).send();
	} catch (err) {
		next(err);
	}
}


