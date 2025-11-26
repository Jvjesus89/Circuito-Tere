import imgParnaso from '../assets/parque-nacional-da-serra-dos-orgaos.jpg';
import imgTresPicos from '../assets/Parque-Estadual-Tres-Picos-em-Teresopolis.jpg';
import imgMontanhas from '../assets/Pedra_da_Tartaruga,_Nova_Friburgo.jpg'; 
// Imagens aleatórias para eventos/trilhas
import imgTrilha from '../assets/trilha.jpeg';
import imgTucano from '../assets/tucano.jpg';

export const parksData = {
  "parnaso": {
    name: "Parque Nacional Serra dos Órgãos",
    image: imgParnaso,
    // DESCRIÇÃO/BIODIVERSIDADE/ECOTURISMO
    description: "Criado em 1939, o PARNASO é o terceiro parque mais antigo do Brasil e um dos marcos da história da conservação no país. Seu nome deriva da semelhança dos picos rochosos com tubos de órgãos de igreja vistos de longe. Abrange mais de 20 mil hectares protegidos entre Teresópolis, Petrópolis, Magé e Guapimirim. É mundialmente famoso por formações icônicas como o Dedo de Deus (1.692m) e a Agulha do Diabo, além de abrigar a lendária Travessia Petrópolis-Teresópolis, considerada uma das caminhadas mais bonitas do Brasil.",
    biodiversity: "Um verdadeiro santuário da Mata Atlântica. O parque protege mais de 462 espécies de aves, 105 de mamíferos (incluindo a onça-parda) e uma flora exuberante com destaque para as bromélias e orquídeas endêmicas que só existem ali.",
    ecotourism: "Referência internacional em montanhismo e escalada, possui a maior rede de trilhas do Brasil (mais de 200km). Oferece desde caminhadas leves em passarelas suspensas até escaladas técnicas em grandes paredes (big walls) e banhos de cachoeira no Rio Paquequer.",
    events: [
      { id: 1, title: "Abertura da Temporada de Montanha", date: "Maio/2025", image: imgTrilha, desc: "Celebração tradicional que marca o início do período ideal para escaladas." },
      { id: 2, title: "Workshop de Fotografia de Natureza", date: "15/06/2025", image: imgTucano, desc: "Aprenda a registrar a fauna e flora local com especialistas." }
    ],
    trails: [
      { id: 101, name: "Cartão Postal", difficulty: "Moderada", time: "2h", desc: "Trilha clássica que oferece o mirante mais famoso para o Dedo de Deus." },
      { id: 102, name: "Pedra do Sino", difficulty: "Difícil", time: "6h (ida)", desc: "O ponto culminante da Serra dos Órgãos (2.275m). Vista incrível da Baía de Guanabara." },
      { id: 103, name: "Trilha Suspensa", difficulty: "Fácil", time: "40min", desc: "Acessível e plana, caminha-se na altura da copa das árvores. Ideal para todas as idades." }
    ],
    reviews: [
      { id: 201, user: "Ana Silva", stars: 5, text: "A estrutura do parque é impecável e a vista do Dedo de Deus emociona." },
      { id: 202, user: "Carlos Souza", stars: 4, text: "As trilhas são bem sinalizadas, mas o estacionamento lota cedo nos feriados." }
    ]
  },
  "tres-picos": {
    name: "Parque Estadual dos Três Picos",
    image: imgTresPicos,
    // DESCRIÇÃO/BIODIVERSIDADE/ECOTURISMO
    description: "Com cerca de 65 mil hectares, é a maior Unidade de Conservação Estadual do Rio de Janeiro. O parque leva o nome do imponente conjunto granítico dos Três Picos, cujo ponto culminante atinge 2.366 metros, sendo o teto de toda a Serra do Mar. É um paraíso de montanhas, vales profundos e campos de altitude que protegem nascentes vitais para o abastecimento de água da região. Diferente do PARNASO, possui áreas mais selvagens e rústicas, ideais para quem busca isolamento e contato profundo com a natureza.",
    biodiversity: "Abriga remanescentes de Mata Atlântica de altitude extremamente preservados. É considerado um 'hotspot' para observadores de aves (birdwatching), sendo o lar de espécies raras como a Saudade-de-asa-cinza (*Lipaugus conditus*), endêmica da região.",
    ecotourism: "Considerado o paraíso da escalada tradicional no Brasil, com vias de classe mundial no Capacete e na Caixa de Fósforos. Também é famoso pelo Vale dos Deuses e Vale dos Frades, locais perfeitos para camping selvagem e trekking de longa distância.",
    events: [
      { id: 1, title: "Encontro de Escaladores do RJ", date: "Set/2025", image: imgTrilha, desc: "Reunião anual de montanhistas de todo o mundo para troca de experiências." }
    ],
    trails: [
      { id: 301, name: "Vale dos Deuses", difficulty: "Fácil", time: "1h", desc: "Caminhada plana em um vale de altitude belíssimo, parece cenário de filme." },
      { id: 302, name: "Cabeça de Dragão", difficulty: "Moderada", time: "3h", desc: "Uma das vistas mais bonitas da serra, panorama 360º dos Três Picos." },
      { id: 303, name: "Caixa de Fósforos", difficulty: "Difícil", time: "4h", desc: "Trilha íngreme até a curiosa formação rochosa equilibrada no topo da montanha." }
    ],
    reviews: [
      { id: 305, user: "Mariana", stars: 5, text: "O Vale dos Deuses é o lugar mais silencioso e em paz que já visitei." }
    ]
  },
  "montanhas": {
    name: "Parque Municipal Montanhas de Teresópolis",
    image: imgMontanhas,
    // DESCRIÇÃO/BIODIVERSIDADE/ECOTURISMO
    description: "Criado em 2009, este parque é uma jóia da conservação municipal, protegendo uma área de mais de 4 mil hectares que circunda a zona urbana de Teresópolis. Sua criação foi fundamental para conter o avanço urbano desordenado sobre as encostas. O parque é dividido em núcleos, sendo os principais a Pedra da Tartaruga e Santa Rita. É o parque mais acessível para a família teresopolitana, misturando lazer, educação ambiental e aventura suave bem ao lado da cidade.",
    biodiversity: "Atua na recuperação de áreas degradadas e proteção de nascentes dos rios Piabanha e Paquequer. Destaca-se pela presença do 'Labirinto de Esponjinhas' e uma rica avifauna que retorna à medida que a floresta se regenera.",
    ecotourism: "Muito procurado para rapel iniciante, escalada esportiva e lazer em família nos fins de semana. A Pedra da Tartaruga oferece uma área de camping segura e uma vista privilegiada das luzes da cidade à noite.",
    events: [
      { id: 1, title: "Educação Ambiental nas Escolas", date: "Semanal", image: imgTucano, desc: "Visitas guiadas para crianças da rede pública aprenderem sobre a mata." }
    ],
    trails: [
      { id: 401, name: "Pedra da Tartaruga", difficulty: "Fácil/Média", time: "1h", desc: "O símbolo do parque. Trilha acessível que leva ao topo da formação rochosa." },
      { id: 402, name: "Pedra do Camelo", difficulty: "Média", time: "1h30", desc: "Formação que lembra um camelo deitado. Acesso por trilha em mata mais fechada." }
    ],
    reviews: [
      { id: 405, user: "Roberto", stars: 5, text: "Ótimo para levar crianças. A trilha da Tartaruga é segura e a vista compensa." }
    ]
  }
};