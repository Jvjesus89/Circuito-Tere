import { pool } from '../config/db.js';

export async function listAvaliacoes(_req, res) {
	try {
		const client = await pool.connect();
		try {
			const r = await client.query('SELECT * FROM avaliacao ORDER BY idavaliacao');
			res.json(r.rows);
		} finally {
			client.release();
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error listing avaliacoes' });
	}
}

export async function getAvaliacao(req, res) {
	const { id } = req.params;
	try {
		const client = await pool.connect();
		try {
			const r = await client.query('SELECT * FROM avaliacao WHERE idavaliacao=$1', [id]);
			if (r.rowCount === 0) return res.status(404).json({ message: 'Not found' });
			res.json(r.rows[0]);
		} finally {
			client.release();
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error fetching avaliacao' });
	}
}

export async function createAvaliacao(req, res) {
	const { idusuario, avaliacao, estrelas } = req.body;
	
	if (!idusuario || !estrelas) {
		return res.status(400).json({ message: 'Campos obrigatórios: idusuario, estrelas' });
	}
	
	try {
		const client = await pool.connect();
		try {
			const result = await client.query(
				'INSERT INTO avaliacao(idusuario, avaliacao, estrelas) VALUES($1,$2,$3) RETURNING idavaliacao, idusuario, avaliacao, estrelas',
				[idusuario, avaliacao, estrelas]
			);
			res.status(201).json(result.rows[0]);
		} finally {
			client.release();
		}
	} catch (err) {
		console.error(err);
		if (err?.code === '23503') {
			return res.status(409).json({ message: 'Chave estrangeira inválida (idusuario)' });
		}
		res.status(500).json({ message: 'Error creating avaliacao' });
	}
}

export async function updateAvaliacao(req, res) {
	const { id } = req.params;
	const { idusuario, avaliacao, estrelas } = req.body;
	try {
		const client = await pool.connect();
		try {
			await client.query(
				'UPDATE avaliacao SET idusuario=$1, avaliacao=$2, estrelas=$3 WHERE idavaliacao=$4',
				[idusuario, avaliacao, estrelas, id]
			);
			res.json({ message: 'Updated' });
		} finally {
			client.release();
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error updating avaliacao' });
	}
}

export async function deleteAvaliacao(req, res) {
	const { id } = req.params;
	try {
		const client = await pool.connect();
		try {
			await client.query('DELETE FROM avaliacao WHERE idavaliacao = $1', [id]);
			res.status(204).end();
		} finally {
			client.release();
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error deleting avaliacao' });
	}
}
