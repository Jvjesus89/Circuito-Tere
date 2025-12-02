export async function criarEvento(evento) {
    try {
        const response = await fetch("http://localhost:8000/api/eventos/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(evento)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("RESPOSTA DA API:", errorText);
            throw new Error("Erro ao criar evento");
        }

        return await response.json();

    } catch (erro) {
        console.error("API ERRO:", erro);
        throw erro;
    }
}
