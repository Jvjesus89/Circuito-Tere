import { pool } from '../config/db.js';

const baseSelect = `
	SELECT idtrilha, trilha, observacao, idimagem
	FROM public.trilhas
`;

function toNullable(value) {
	if (value === undefined || value === null || value === '') return null;
	return value;
}

function parseNullableInt(value) {
	const normalized = toNullable(value);
	return normalized === null ? null : Number(normalized);
}

export async function listTrilhas(_req, res, next) {
	try {
		const result = await pool.query(`${baseSelect} ORDER BY idtrilha ASC`);
		res.json(result.rows);
	} catch (err) {
		next(err);
	}
}

export async function getTrilhaById(req, res, next) {
	try {
		const { id } = req.params;
		const result = await pool.query(`${baseSelect} WHERE idtrilha = $1`, [Number(id)]);
		if (result.rowCount === 0) {
			return res.status(404).json({ message: 'Trilha não encontrada' });
		}
		res.json(result.rows[0]);
	} catch (err) {
		next(err);
	}
}

export async function createTrilha(req, res, next) {
	try {
		const {
			idtrilha,
			trilha,
			observacao = null,
			idimagem = null
		} = req.body || {};

		if (idtrilha == null || trilha == null) {
			return res.status(400).json({ message: 'Campos obrigatórios: idtrilha, trilha' });
		}

		const query = `
			INSERT INTO public.trilhas (idtrilha, trilha, observacao, idimagem)
			VALUES ($1, $2, $3, $4)
			RETURNING idtrilha, trilha, observacao, idimagem
		`;
		const values = [
			Number(idtrilha),
			trilha,
			toNullable(observacao),
			parseNullableInt(idimagem)
		];
		const result = await pool.query(query, values);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		if (err?.code === '23503') {
			return res.status(409).json({ message: 'Chave estrangeira inválida (idimagem)' });
		}
		if (err?.code === '23505') {
			return res.status(409).json({ message: 'Trilha com id já existente' });
		}
		next(err);
	}
}

export async function updateTrilha(req, res, next) {
	try {
		const { id } = req.params;
		const {
			trilha,
			observacao,
			idimagem
		} = req.body || {};

		const fields = [];
		const values = [];
		let idx = 1;

		if (trilha !== undefined) { fields.push(`trilha = $${idx++}`); values.push(trilha); }
		if (observacao !== undefined) { fields.push(`observacao = $${idx++}`); values.push(toNullable(observacao)); }
		if (idimagem !== undefined) { fields.push(`idimagem = $${idx++}`); values.push(parseNullableInt(idimagem)); }

		if (fields.length === 0) {
			return res.status(400).json({ message: 'Nenhum campo para atualizar' });
		}

		const query = `
			UPDATE public.trilhas
			SET ${fields.join(', ')}
			WHERE idtrilha = $${idx}
			RETURNING idtrilha, trilha, observacao, idimagem
		`;
		values.push(Number(id));
		const result = await pool.query(query, values);
		if (result.rowCount === 0) {
			return res.status(404).json({ message: 'Trilha não encontrada' });
		}
		res.json(result.rows[0]);
	} catch (err) {
		if (err?.code === '23503') {
			return res.status(409).json({ message: 'Chave estrangeira inválida (idimagem)' });
		}
		if (err?.code === '23505') {
			return res.status(409).json({ message: 'Trilha com dados conflitantes' });
		}
		next(err);
	}
}

export async function deleteTrilha(req, res, next) {
	try {
		const { id } = req.params;
		const result = await pool.query('DELETE FROM public.trilhas WHERE idtrilha = $1', [Number(id)]);
		if (result.rowCount === 0) {
			return res.status(404).json({ message: 'Trilha não encontrada' });
		}
		res.status(204).send();
	} catch (err) {
		next(err);
	}
}
