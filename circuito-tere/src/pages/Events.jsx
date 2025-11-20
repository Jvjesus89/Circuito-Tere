import "./events.css";
import EventCard from "../components/EventCard";

function Events() {
  return (
    <>
      <div className="banner event">
        <h1>EVENTOS DO CIRCUITO TERÊ</h1>
      </div>
      <section id="eventos">
        <div className="filter">
          <select name="opcao">
            <option value="Parque 1">Parque 1</option>
            <option value="Parque 2">Parque 2</option>
            <option value="Parque 3">Parque 3</option>
          </select>
          <input type="date"></input>
        </div>
        <div className="cards-eventos">
          <EventCard
            titulo="Concerto da Banda X"
            desricao="lorem ipsun ret post"
            data="15/12/2025"
            local="Parque Central"
          />
          <EventCard
            titulo="Piquinique"
            desricao="lorem ipsun ret post"
            data="10/08/2025"
            local="Parque tartaruga"
          />
          <EventCard
            titulo="Palestra"
            desricao="lorem ipsun ret post"
            data="16/08/2025"
            local="Montanha tartaruga"
          />
        </div>
      </section>
    </>
  );
}

export default Events;
