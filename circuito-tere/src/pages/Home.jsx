import "../index.css";
import "../App.css";
import "./home.css";
import Menu from "../components/Menu";

function Home() {
  return (
    <>
      <Menu />

      <div className="banner">
        <h1> CIRCUITO TERÊ: ONDE A MONTANHA ENCONTRA A ALMA</h1>
        <h3>Descubra paisagens deslumbrantes...</h3>
        <h3>v</h3>
      </div>

      <h2>Explore Nossos Santuários Naturais</h2>
      <section className="parque">
        <a>
          <div className="card_parque card_1">
            <h3>PARQUE NACIONAL DA SERRA DOS ÓRGÃOS (PARNASO)</h3>
          </div>
        </a>
        <a>
          <div className="card_parque card_2">
            <h3>PARQUE ESTADUAL DOS TRÊS PICOS (PETP)</h3>
          </div>
        </a>
        <a>
          <div className="card_parque card_3">
            <h3>PARQUE MUNICIPAL MONTANHAS DE TERE</h3>
          </div>
        </a>
      </section>

      <h2>Biodiversidade e Ecoturismo no Circuito Terê</h2>
      <section className="bio">
        <div className="info">
          <h3>Tesouro Natural e Aventura Sustentável</h3>
          <p>
            O Circuito Terê é um santuário de Mata Atlântica de Altitude, um
            bioma reconhecido mundialmente por sua excepcional biodiversidade.
            Protegido majoritariamente pelo PARNASO, nosso território abriga
            espécies únicas de orquídeas, bromélias e uma fauna exuberante. Esta
            riqueza natural é o cenário perfeito para o Ecoturismo: trilhas
            desafiadoras, escaladas em picos icônicos e observação de pássaros,
            tudo praticado de forma responsável para garantir a preservação do
            nosso patrimônio ambiental.
          </p>
        </div>
        <div className="images">
          <div className="img-1"></div>
          <div className="img-2"></div>
          <div className="img-3"></div>
        </div>
      </section>
    </>
  );
}

export default Home;
