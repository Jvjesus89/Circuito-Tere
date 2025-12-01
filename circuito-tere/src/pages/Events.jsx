import { useState, useEffect } from "react";
import "./events.css";
import EventCard from "../components/EventCard";

function Events() {
  const [parques, setParques] = useState([]);
  const [eventos, setEventos] = useState([]);

  const [filtroParque, setFiltroParque] = useState("");
  const [filtroData, setFiltroData] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:8000/api/parques")
  //     .then((res) => res.json())
  //     .then((data) => setParques(data))
  //     .catch((err) => console.error("Erro ao buscar parques:", err));

  //   fetch("http://localhost:8000/api/eventos")
  //     .then((res) => res.json())
  //     .then((data) => setEventos(data))
  //     .catch((err) => console.error("Erro ao buscar eventos:", err));
  // }, []);

  useEffect(() => {
    // --- DADOS MOCKADOS PARA TESTAR ---
    setParques([
      { idparque: 1, parque: "Parque Nacional da Serra dos Órgãos" },
      { idparque: 2, parque: "Parque do Vale Encantado" },
    ]);

    setEventos([
      {
        idevento: 1,
        titulo: "Caminhada Riacho Doce",
        descricao: "Evento de teste para validar o layout.",
        datainicio: "2025-05-10",
        datafim: "2025-05-10",
        horarioinicio: "08:00",
        horariofim: "12:00",
        idimagem: null,
        idparque: 1,
      },
      {
        idevento: 2,
        titulo: "Trilha Pedra da Tartaruga",
        descricao: "Outro evento de teste.",
        datainicio: "2025-06-01",
        datafim: "2025-06-01",
        horarioinicio: "09:00",
        horariofim: "15:00",
        idimagem: null,
        idparque: 2,
      },
    ]);
  }, []);

  const formatarData = (dataString) => {
    if (!dataString) return "";
    const [ano, mes, dia] = dataString.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const getImagemUrl = (id) => {
    if (!id) return;
    return `http://localhost:8000/api/imagens/${id}`;
  };

  const eventosFiltrados = eventos.filter((evento) => {
    const passaParque =
      filtroParque === "" || evento.idparque === Number(filtroParque);

    const passaData = filtroData === "" || evento.datainicio === filtroData;

    return passaParque && passaData;
  });

  return (
    <>
      <div className="banner event">
        <h1>EVENTOS DO CIRCUITO TERÊ</h1>
      </div>
      <section id="eventos">
        <div className="filter">
          <select
            name="opcao"
            value={filtroParque}
            onChange={(e) => setFiltroParque(e.target.value)}
          >
            <option value="">Todos os parques</option>
            {parques.map((parque) => (
              <option key={parque.idparque} value={parque.idparque}>
                {parque.parque}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
          />
        </div>

        <div className="cards-eventos">
          {eventosFiltrados.map((evento) => (
            <EventCard
              key={evento.idevento}
              titulo={evento.titulo}
              descricao={evento.descricao}
              datainicio={formatarData(evento.datainicio)}
              datafim={formatarData(evento.datafim)}
              horarioinicio={evento.horarioinicio}
              horariofim={evento.horariofim}
              imagem={getImagemUrl(evento.idimagem)}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Events;
