import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { parksData } from "../data/parksData";
import { criarEvento } from "../services/eventService";
import "./ParkTemplate.css";

const ParkTemplate = () => {
  const { id } = useParams();
  const initialData = parksData[id];

  const [park, setPark] = useState(initialData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Estado para Avaliação
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    contact: "",
    stars: 5,
    desc: "",
  });

  // Estado para Adicionar Itens (Admin)
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState(null);

  // Estado do Slider
  const [currentSlide, setCurrentSlide] = useState(0);

  // Seus eventos viram os slides
  const slides = park ? [...park.events, ...park.events] : [];

  if (!park)
    return (
      <div style={{ padding: 80, textAlign: "center" }}>
        Parque não encontrado. <Link to="/">Voltar</Link>
      </div>
    );

  // Funções de navegação do Slider
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // --- EFEITO DE AUTO-PLAY ---
  useEffect(() => {
    if (slides.length === 0) return; // Se não tiver slide, não faz nada

    const interval = setInterval(() => {
      nextSlide(); // Chama o próximo slide
    }, 5000); // <--- TEMPO EM MILISSEGUNDOS

    // Limpa o intervalo quando o slide muda
    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  // Ações Gerais
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      e.target.email.value === "admin" &&
      e.target.password.value === "1234"
    ) {
      setIsAdmin(true);
      setShowLoginModal(false);
      alert("Bem-vindo, Administrador!");
    } else {
      alert("Senha incorreta!");
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(),
      user: reviewForm.name,
      stars: parseInt(reviewForm.stars),
      text: reviewForm.desc,
    };
    setPark({ ...park, reviews: [...park.reviews, newReview] });
    alert("Avaliação enviada!");
    setShowReviewForm(false);
  };

  // Funções Admin
  const handleDelete = (type) => {
    if (window.confirm(`Tem certeza que deseja excluir este ${type}?`))
      alert("Item excluído (Simulação).");
  };
  const handleEdit = (type) => {
    alert(`Abrir edição de ${type} (Simulação).`);
  };

  const openAddModal = (type) => {
    setAddType(type);
    setShowAddModal(true);
  };

  // const handleAddSubmit = async (e) => {
  //   e.preventDefault();
  // alert(`Novo ${addType} adicionado com sucesso!`);
  // setShowAddModal(false);

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const titulo = e.target[0].value;
    const data = e.target[1].value;
    const horarioinicio = e.target[2].value;
    const horariofim = e.target[4].value;
    const image = e.target[5].value;
    const descricao = e.target[6].value;

    if (addType === "evento") {
      const novoEvento = {
        idevento: 2,
        titulo: titulo,
        descricao: descricao,
        datainicio: data,
        datafim: data,
        horarioinicio: horarioinicio,
        horariofim: horariofim,
        idimagem: null,
      };

      try {
        const resposta = await criarEvento(novoEvento);
        console.log("Evento criado:", resposta);

        alert("Evento enviado para API!");
      } catch (error) {
        alert("Erro ao enviar evento para API");
      }
    }

    setShowAddModal(false);
  };
  // };

  return (
    <div className="park-page">
      {/* Botões Flutuantes */}
      <Link to="/" className="floating-btn-left">
        ← Circuito Terê
      </Link>
      {isAdmin ? (
        <button
          onClick={() => setIsAdmin(false)}
          className="floating-btn-right"
          style={{ background: "#d9534f", color: "white" }}
        >
          Sair Admin
        </button>
      ) : (
        <button
          onClick={() => setShowLoginModal(true)}
          className="floating-btn-right"
        >
          Login Admin
        </button>
      )}

      {/* Hero Section */}
      <header
        className="park-hero"
        style={{ backgroundImage: `url(${park.image})` }}
      >
        <div className="overlay">
          <h1>{park.name}</h1>
        </div>
      </header>

      {/* Menu Sticky */}
      <nav className="sticky-menu">
        <a href="#destaques" className="menu-link">
          Destaques
        </a>
        <a href="#sobre" className="menu-link">
          Sobre
        </a>
        <a href="#trilhas" className="menu-link">
          Trilhas
        </a>
        <a href="#avisos" className="menu-link">
          Agenda
        </a>
      </nav>

      <div className="container">
        {/* --- 1. CARROSSEL (MOVIMENTO E CLICÁVEL) --- */}
        <section
          id="destaques"
          className="section"
          style={{ marginTop: "40px" }}
        >
          <div className="section-header-flex">
            <h2>Destaques e Avisos</h2>
            {isAdmin && (
              <button
                className="add-btn-small"
                onClick={() => openAddModal("aviso")}
              >
                + Novo Destaque
              </button>
            )}
          </div>

          {slides.length > 0 && (
            <div className="hero-slider">
              {/* Botões do Slider */}
              <button
                className="slider-btn prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
              >
                &#10094;
              </button>
              <button
                className="slider-btn next"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
              >
                &#10095;
              </button>

              {/* Slide Atual */}
              <div
                className="slide-item"
                style={{
                  backgroundImage: `url(${slides[currentSlide].image})`,
                }}
                onClick={() => {
                  const section = document.getElementById("avisos");
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="slide-caption">
                  <h3>{slides[currentSlide].title}</h3>
                  <p>{slides[currentSlide].desc}</p>
                  <button
                    className="saiba-mais-btn"
                    style={{
                      marginTop: "15px",
                      padding: "10px 20px",
                      borderRadius: "30px",
                      border: "none",
                      background: "white",
                      color: "#2E8B57",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    SAIBA MAIS
                  </button>
                </div>
              </div>

              {/* Bolinhas (Dots) */}
              <div className="slider-dots">
                {slides.map((_, idx) => (
                  <span
                    key={idx}
                    className={`dot ${idx === currentSlide ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(idx);
                    }}
                  ></span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* --- 2. SOBRE --- */}
        <section id="sobre" className="section">
          <div className="description-card">
            <h2>Sobre o Parque</h2>
            <p>{park.description}</p>
          </div>
          <div className="info-grid">
            <div className="info-card">
              <h3>🌱 Biodiversidade</h3>
              <p>{park.biodiversity}</p>
            </div>
            <div className="info-card">
              <h3>🥾 Ecoturismo</h3>
              <p>{park.ecotourism}</p>
            </div>
          </div>
        </section>

        {/* --- 3. TRILHAS --- */}
        <section id="trilhas" className="section">
          <div className="section-header-flex">
            <h2>Trilhas e Roteiros</h2>
            {isAdmin && (
              <button
                className="add-btn-small"
                onClick={() => openAddModal("trilha")}
              >
                + Nova Trilha
              </button>
            )}
          </div>
          <div className="trails-grid">
            {park.trails.map((trail) => (
              <div key={trail.id} className="trail-card">
                <div className="trail-header">
                  <h4>{trail.name}</h4>
                  <span className={`badge ${trail.difficulty}`}>
                    {trail.difficulty}
                  </span>
                </div>
                <p style={{ marginTop: "0" }}>
                  <strong>Tempo:</strong> {trail.time}
                </p>
                <p>{trail.desc}</p>
                {isAdmin && (
                  <div className="admin-actions">
                    <button
                      onClick={() => handleEdit("trilha")}
                      className="edit-text-btn"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete("trilha")}
                      className="delete-text-btn"
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* --- 4. EVENTOS --- */}
        <section id="avisos" className="section">
          <div className="section-header-flex">
            <h2>Agenda Completa</h2>
            {isAdmin && (
              <button
                className="add-btn-small"
                onClick={() => openAddModal("evento")}
              >
                + Novo Evento
              </button>
            )}
          </div>
          <div>
            {park.events.map((evt) => (
              <div key={evt.id} className="event-card-detail">
                <img src={evt.image} alt={evt.title} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 5px 0", fontSize: "1.2rem" }}>
                    {evt.title}
                  </h4>
                  <span style={{ color: "#666", fontSize: "0.9rem" }}>
                    📅 {evt.date}
                  </span>
                  <p style={{ marginTop: "10px" }}>{evt.desc}</p>
                </div>
                {isAdmin && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <button
                      onClick={() => handleEdit("evento")}
                      className="edit-text-btn"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete("evento")}
                      className="delete-text-btn"
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* --- 5. AVALIAÇÕES --- */}
        <section className="reviews-section">
          <div
            className="section-header-flex"
            style={{
              borderBottom: "2px solid #ddd",
              paddingBottom: "15px",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ margin: 0, border: "none" }}>
              O que dizem os visitantes
            </h2>
            <button
              className="rate-btn-header"
              onClick={() => setShowReviewForm(true)}
            >
              ⭐ Avaliar Parque
            </button>
          </div>
          <div className="reviews-list">
            {park.reviews.map((rev) => (
              <div key={rev.id} className="review-card">
                <div className="stars">{"★".repeat(rev.stars)}</div>
                <p>"{rev.text}"</p>
                <small style={{ fontWeight: "bold", color: "#555" }}>
                  - {rev.user}
                </small>
                {isAdmin && (
                  <button
                    onClick={() => handleDelete("review")}
                    className="delete-text-btn"
                    style={{ position: "absolute", top: "20px", right: "20px" }}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* --- MODAIS --- */}

      {/* 1. Login Admin */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ maxWidth: "400px" }}>
            <h3>Acesso Administrativo</h3>
            <p style={{ textAlign: "center", marginBottom: "10px" }}>
              Admin / 1234
            </p>
            <form onSubmit={handleLogin} className="modal-form">
              <input name="email" placeholder="Usuário" />
              <input name="password" type="password" placeholder="Senha" />
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="cancel-btn"
                >
                  Cancelar
                </button>
                <button type="submit" className="confirm-btn">
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Adicionar Item */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>
              Adicionar{" "}
              {addType === "trilha"
                ? "Trilha"
                : addType === "evento"
                ? "Evento"
                : "Aviso"}
            </h3>
            <form onSubmit={handleAddSubmit} className="modal-form">
              <label>Título / Nome:</label>
              <input required placeholder="Ex: Trilha da Pedra..." />

              {addType === "trilha" && (
                <>
                  <label>Dificuldade:</label>
                  <select>
                    <option>Fácil</option>
                    <option>Moderada</option>
                    <option>Difícil</option>
                  </select>
                  <label>Tempo Estimado:</label>
                  <input placeholder="Ex: 2h 30min" />
                </>
              )}

              {(addType === "evento" || addType === "aviso") && (
                <>
                  <label>Data:</label>
                  <input type="date" />
                  <label>Horário de inicio:</label>
                  <input type="time" />
                  <label>Horário de fim:</label>
                  <input type="time" />
                  <label>URL da Imagem:</label>
                  <input placeholder="http://..." />
                </>
              )}

              <label>Descrição:</label>
              <textarea required placeholder="Detalhes..." rows="4"></textarea>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="cancel-btn"
                >
                  Cancelar
                </button>
                <button type="submit" className="confirm-btn">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Avaliação */}
      {showReviewForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Avaliar Parque</h3>
            <form onSubmit={handleReviewSubmit} className="modal-form">
              <label>Seu Nome:</label>
              <input
                placeholder="Ex: João Silva"
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, name: e.target.value })
                }
                required
              />

              <label>E-mail:</label>
              <input
                type="email"
                placeholder="Ex: joao@email.com"
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, email: e.target.value })
                }
                required
              />

              <label>Contato (WhatsApp):</label>
              <input
                type="tel"
                placeholder="Ex: (21) 99999-9999"
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, contact: e.target.value })
                }
                required
              />

              <label>Nota:</label>
              <select
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, stars: e.target.value })
                }
              >
                <option value="5">★★★★★ (5 Estrelas)</option>
                <option value="4">★★★★ (4 Estrelas)</option>
                <option value="3">★★★ (3 Estrelas)</option>
                <option value="2">★★ (2 Estrelas)</option>
                <option value="1">★ (1 Estrela)</option>
              </select>

              <label>Comentário:</label>
              <textarea
                placeholder="Conte como foi sua visita..."
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, desc: e.target.value })
                }
                required
                rows="4"
              ></textarea>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="cancel-btn"
                >
                  Cancelar
                </button>
                <button type="submit" className="confirm-btn">
                  Enviar Avaliação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkTemplate;
