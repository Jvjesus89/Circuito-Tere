import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../index.css";
import "../App.css";
import "./home.css";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const section = document.getElementById(id);

      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <div className="banner">
        <h1> CIRCUITO TERÊ: ONDE A MONTANHA ENCONTRA A ALMA</h1>
        <h3>Descubra paisagens deslumbrantes...</h3>
        <Link to="/#parques" style={{ textDecoration: "none" }}>
          <h3>v</h3>
        </Link>
      </div>

      <h2 id="parques">Explore Nossos Santuários Naturais</h2>
      <section className="parque">
        {/* CARD 1 - PARNASO */}
        <Link to="/parque/parnaso">
          <div className="card_parque card_1">
            <h3>PARQUE NACIONAL DA SERRA DOS ÓRGÃOS (PARNASO)</h3>
          </div>
        </Link>

        {/* CARD 2 - TRÊS PICOS */}
        <Link to="/parque/tres-picos">
          <div className="card_parque card_2">
            <h3>PARQUE ESTADUAL DOS TRÊS PICOS (PETP)</h3>
          </div>
        </Link>

        {/* CARD 3 - MONTANHAS MUNICIPAL */}
        <Link to="/parque/montanhas">
          <div className="card_parque card_3">
            <h3>PARQUE MUNICIPAL MONTANHAS DE TERE</h3>
          </div>
        </Link>
      </section>

      <h2 id="biodiversidade">Biodiversidade e Ecoturismo no Circuito Terê</h2>
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
