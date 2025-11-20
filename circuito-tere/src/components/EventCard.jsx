function EventCard({ titulo, descrisao, data, local }) {
  return (
    <div className="card-event">
      <h3>{titulo}</h3>
      <p>Descrição: {descrisao}</p>
      <p>Data: {data}</p>
      <p>Local: {local}</p>
    </div>
  );
}

export default EventCard;
