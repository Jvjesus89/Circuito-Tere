import { apiFetch } from './api';

// Lista todos os usuários
export async function listarUsuarios() {
  return apiFetch('/api/usuarios');
}

// Cria um novo usuário
export async function criarUsuario({
  usuario,
  senha,
  email,
  telefone = null,
  cpf = null,
  isadministrador = false,
}) {
  return apiFetch('/api/usuarios', {
    method: 'POST',
    body: JSON.stringify({
      usuario,
      senha,
      email,
      telefone,
      cpf,
      isadministrador,
    }),
  });
}

// Login de usuário (email + senha)
export async function loginUsuario({ email, senha }) {
  return apiFetch('/api/usuarios/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
  });
}


