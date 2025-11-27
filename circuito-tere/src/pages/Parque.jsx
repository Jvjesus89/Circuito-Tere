import { useEffect, useState } from "react";

export default function Parques() {
  const [parques, setParques] = useState([]);

  useEffect(() => {
    // Chamada direta à API Gateway
    fetch("http://localhost:8000/api/parques")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos:", data); // DEBUG
        setParques(data);
      })
      .catch((err) => console.error("Erro ao buscar parques:", err));
  }, []);

  return (
    <div>
      <h1>Parques</h1>

      {parques.length === 0 ? (
        <p>Carregando parques...</p>
      ) : (
        <ul>
          {parques.map((item) => (
            <li key={item.id}>{item.nome}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
