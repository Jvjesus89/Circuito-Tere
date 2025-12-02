import { apiFetch } from './api';

export async function criarEvento(evento) {
    return apiFetch('/api/eventos/', {
        method: 'POST',
        body: JSON.stringify(evento),
    });
}

export async function atualizarEvento(id, evento) {
    return apiFetch(`/api/eventos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(evento),
    });
}

export async function deletarEvento(id) {
    return apiFetch(`/api/eventos/${id}`, {
        method: 'DELETE',
    });
}
