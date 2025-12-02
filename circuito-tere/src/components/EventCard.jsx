function EventCard({
  titulo,
  descricao,
  datainicio,
  datafim,
  horarioinicio,
  horariofim,
  imagem,
  parque,
}) {
  return (
    <div className="event-card-detail">
      <div className="event-info">
        <h4>{titulo}</h4>
        <p>{descricao}</p>
        {parque && <p>📍 Parque: {parque}</p>}

        <p>
          📅 Início: {datainicio} <br />
          📅 Fim: {datafim}
        </p>
        <p>
          ⏰ Horário: {horarioinicio} — {horariofim}
        </p>
      </div>
      {imagem && <img src={imagem} className="event-img" />}
    </div>
  );
}

export default EventCard;
