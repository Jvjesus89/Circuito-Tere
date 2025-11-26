import React from 'react';
import { Link } from 'react-router-dom';
import './atrativos.css';

// IMAGENS ALEATÓRIAS PARA TESTE
import imgParnaso from '../assets/parque-nacional-da-serra-dos-orgaos.jpg';
import imgTresPicos from '../assets/Parque-Estadual-Tres-Picos-em-Teresopolis.jpg';
import imgMontanhas from '../assets/montanhas.jpg';
import imgCachoeira from '../assets/cachoeira.jpg';
import imgOrquidia from '../assets/orquidia.jpg';
import imgTucano from '../assets/tucano.jpg';

const Atrativos = () => {
  // Lista de atrativos 
  const listaAtrativos = [
    {
      id: 'parnaso',
      titulo: "Parque Nacional Serra dos Órgãos",
      img: imgParnaso,
      desc: "O lar do Dedo de Deus. Trilhas, cachoeiras e o melhor do montanhismo.",
      link: "/parque/parnaso"
    },
    {
      id: 'tres-picos',
      titulo: "Parque Estadual dos Três Picos",
      img: imgTresPicos,
      desc: "A maior unidade de conservação do RJ. Paraíso da escalada e camping.",
      link: "/parque/tres-picos"
    },
    {
      id: 'montanhas',
      titulo: "Parque Municipal Montanhas",
      img: imgMontanhas,
      desc: "A Pedra da Tartaruga e trilhas acessíveis bem pertinho da cidade.",
      link: "/parque/montanhas"
    },
    {
      id: 'cachoeiras',
      titulo: "Banho de Cachoeira",
      img: imgCachoeira,
      desc: "Águas cristalinas para renovar as energias na serra.",
    },
    {
      id: 'fauna',
      titulo: "Observação de Aves",
      img: imgTucano,
      desc: "Tucanos, saíras e uma biodiversidade incrível para fotografar.",
    },
    {
      id: 'flora',
      titulo: "Orquídeas e Bromélias",
      img: imgOrquidia,
      desc: "A flora da Mata Atlântica em todo o seu esplendor.",
    }
  ];

  return (
    <div className="atrativos-page" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2E8B57', marginBottom: '10px' }}>Roteiros e Atrativos</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
        Escolha um dos parques para ver detalhes, trilhas e agenda de eventos.
      </p>

      <div className="atrativos-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {listaAtrativos.map((item) => (
          <div key={item.id} className="atrativo-card" style={{ border: '1px solid #eee', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }}>
            
            {/* Imagem */}
            <div style={{ height: '200px', overflow: 'hidden' }}>
              <img src={item.img} alt={item.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Conteúdo */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: 'calc(100% - 200px)' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{item.titulo}</h3>
              <p style={{ color: '#666', flex: 1 }}>{item.desc}</p>
              
              {/* Se tiver link, mostra o botão */}
              {item.link ? (
                <Link to={item.link} style={{ display: 'inline-block', marginTop: '15px', padding: '10px 20px', backgroundColor: '#2E8B57', color: 'white', textDecoration: 'none', borderRadius: '5px', textAlign: 'center', fontWeight: 'bold' }}>
                  Ver Detalhes e Trilhas
                </Link>
              ) : (
                <span style={{ display: 'inline-block', marginTop: '15px', padding: '10px', color: '#888', fontSize: '0.9rem', fontStyle: 'italic' }}>
                  Disponível em todos os parques
                </span>
              )}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Atrativos;