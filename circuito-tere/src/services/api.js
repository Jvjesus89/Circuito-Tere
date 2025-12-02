const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    let message = `Erro HTTP ${res.status}`;
    try {
      const body = await res.json();
      if (body?.message) {
        message = body.message;
      } else if (body?.error) {
        message = body.error;
      }
    } catch {
      // mantém mensagem padrão
    }
    throw new Error(message);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}

export { API_BASE_URL };


