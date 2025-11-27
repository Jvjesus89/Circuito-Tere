import { pool } from '../config/db.js';

function mapUsuarioRow(row) {
	const { senha, ...rest } = row;
	return rest;
}

export async function listUsuarios(req, res, next) {
	try {
		const result = await pool.query('SELECT idusuario, usuario, senha, isadministrador, email, telefone, cpf FROM public.usuarios ORDER BY idusuario ASC');
		const data = result.rows.map(mapUsuarioRow);
		res.json(data);
	} catch (err) {
		next(err);
	}
}

export async function getUsuarioById(req, res, next) {
	try {
		const { id } = req.params;
		const result = await pool.query(
			'SELECT idusuario, usuario, senha, isadministrador, email, telefone, cpf FROM public.usuarios WHERE idusuario = $1',
			[Number(id)]
		);
		if (result.rowCount === 0) {
			return res.status(404).json({ message: 'Usuário não encontrado' });
		}
		res.json(mapUsuarioRow(result.rows[0]));
	} catch (err) {
		next(err);
	}
}

export async function createUsuario(req, res, next) {
	try {
		const { usuario, senha, isadministrador = false, email, telefone = null, cpf = null } = req.body || {};

		if (usuario == null || senha == null || email == null) {
			return res.status(400).json({ message: 'Campos obrigatórios: usuario, senha, email' });
		}

		const query = `
			INSERT INTO public.usuarios (usuario, senha, isadministrador, email, telefone, cpf)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING idusuario, usuario, isadministrador, email, telefone, cpf
		`;
		const values = [usuario, senha, Boolean(isadministrador), email, telefone, cpf];
		const result = await pool.query(query, values);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		if (err?.code === '23505') {
			// unique_violation
			return res.status(409).json({ message: 'Violação de unicidade (usuario/email/cpf já existente)' });
		}
		next(err);
	}
}

export async function updateUsuario(req, res, next) {
	try {
		const { id } = req.params;
		const { usuario, senha, isadministrador, email, telefone, cpf } = req.body || {};

		// Monta atualização somente dos campos presentes
		const fields = [];
		const values = [];
		let idx = 1;

		if (usuario !== undefined) { fields.push(`usuario = $${idx++}`); values.push(usuario); }
		if (senha !== undefined) { fields.push(`senha = $${idx++}`); values.push(senha); }
		if (isadministrador !== undefined) { fields.push(`isadministrador = $${idx++}`); values.push(Boolean(isadministrador)); }
		if (email !== undefined) { fields.push(`email = $${idx++}`); values.push(email); }
		if (telefone !== undefined) { fields.push(`telefone = $${idx++}`); values.push(telefone); }
		if (cpf !== undefined) { fields.push(`cpf = $${idx++}`); values.push(cpf); }

		if (fields.length === 0) {
			return res.status(400).json({ message: 'Nenhum campo para atualizar' });
		}

		const query = `
			UPDATE public.usuarios
			SET ${fields.join(', ')}
			WHERE idusuario = $${idx}
			RETURNING idusuario, usuario, isadministrador, email, telefone, cpf
		`;
		values.push(Number(id));
		const result = await pool.query(query, values);
		if (result.rowCount === 0) {
			return res.status(404).json({ message: 'Usuário não encontrado' });
		}
		res.json(result.rows[0]);
	} catch (err) {
		if (err?.code === '23505') {
			return res.status(409).json({ message: 'Violação de unicidade (usuario/email/cpf já existente)' });
		}
		next(err);
	}
}

export async function deleteUsuario(req, res, next) {
	try {
	 const { id } = req.params;
	 const result = await pool.query('DELETE FROM public.usuarios WHERE idusuario = $1', [Number(id)]);
	 if (result.rowCount === 0) {
		 return res.status(404).json({ message: 'Usuário não encontrado' });
	 }
	 res.status(204).send();
	} catch (err) {
	 next(err);
	}
}
