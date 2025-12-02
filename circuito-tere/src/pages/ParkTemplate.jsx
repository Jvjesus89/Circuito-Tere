import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { parksData } from "../data/parksData";
import { criarEvento, atualizarEvento, deletarEvento } from "../services/eventService";
import { apiFetch, API_BASE_URL } from "../services/api";
import "./ParkTemplate.css";

const ParkTemplate = () => {
  const { id } = useParams();
  const initialData = parksData[id];

  const [park, setPark] = useState(initialData);
  const [eventos, setEventos] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [trilhas, setTrilhas] = useState([]);
  const [parqueApi, setParqueApi] = useState(null);
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

  // Estado para Editar Itens (Admin)
  const [showEditModal, setShowEditModal] = useState(false);
  const [editType, setEditType] = useState(null);
  const [editItem, setEditItem] = useState(null);

  // Estado para Editar Horários do Parque
  const [showEditParqueModal, setShowEditParqueModal] = useState(false);

  // Estado do Slider
  const [currentSlide, setCurrentSlide] = useState(0);

  // Eventos (backend) viram os slides
  const slides = eventos.map((evt) => ({
    id: evt.idevento,
    title: evt.titulo,
    desc: evt.descricao,
    image: evt.idimagem
      ? `${API_BASE_URL}/api/imagens/${evt.idimagem}`
      : park?.image,
  }));

  // Funções de navegação do Slider
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Define isAdmin com base no usuário logado (localStorage)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("usuario");
      if (saved) {
        const user = JSON.parse(saved);
        setIsAdmin(Boolean(user.isadministrador));
      }
    } catch {
      // ignore
    }
  }, []);

  // Carrega dados do backend (parque, eventos, avaliações, trilhas)
  useEffect(() => {
    if (!initialData?.idparque) return;

    const idparque = initialData.idparque;

    async function fetchData() {
      try {
        const [parqueResp, eventosResp, avaliacoesResp, trilhasResp] =
          await Promise.all([
            apiFetch(`/api/parques/${idparque}`),
            apiFetch("/api/eventos"),
            apiFetch("/api/avaliacao"),
            apiFetch("/api/trilhas"),
          ]);

        setParqueApi(parqueResp);
        setEventos(
          (eventosResp || []).filter(
            (e) => Number(e.idparque) === Number(idparque)
          )
        );
        setAvaliacoes(
          (avaliacoesResp || []).filter(
            (a) => Number(a.idparque) === Number(idparque)
          )
        );
        setTrilhas(
          (trilhasResp || []).filter(
            (t) => Number(t.idparque) === Number(idparque)
          )
        );
      } catch (err) {
        console.error("Erro ao carregar dados do parque:", err);
      }
    }

    fetchData();
  }, [initialData]);

  // --- EFEITO DE AUTO-PLAY ---
  useEffect(() => {
    if (slides.length === 0) return; // Se não tiver slide, não faz nada

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // <--- TEMPO EM MILISSEGUNDOS

    // Limpa o intervalo quando o slide muda
    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  if (!park)
    return (
      <div style={{ padding: 80, textAlign: "center" }}>
        Parque não encontrado. <Link to="/">Voltar</Link>
      </div>
    );

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

  // Funções Admin - Editar
  const handleEdit = async (type, item) => {
    setEditType(type);
    setEditItem(item);
    setShowEditModal(true);
  };

  // Funções Admin - Deletar
  const handleDelete = async (type, id) => {
    if (!window.confirm(`Tem certeza que deseja excluir este ${type}?`)) {
      return;
    }

    try {
      if (type === "evento") {
        await deletarEvento(id);
        const eventosResp = await apiFetch("/api/eventos");
        setEventos(
          (eventosResp || []).filter(
            (e) => Number(e.idparque) === Number(initialData?.idparque)
          )
        );
        alert("Evento excluído com sucesso!");
      } else if (type === "trilha") {
        await apiFetch(`/api/trilhas/${id}`, { method: "DELETE" });
        const trilhasResp = await apiFetch("/api/trilhas");
        setTrilhas(
          (trilhasResp || []).filter(
            (t) => Number(t.idparque) === Number(initialData?.idparque)
          )
        );
        alert("Trilha excluída com sucesso!");
      } else if (type === "review") {
        await apiFetch(`/api/avaliacao/${id}`, { method: "DELETE" });
        const avaliacoesResp = await apiFetch("/api/avaliacao");
        setAvaliacoes(
          (avaliacoesResp || []).filter(
            (a) => Number(a.idparque) === Number(initialData?.idparque)
          )
        );
        alert("Avaliação excluída com sucesso!");
      }
    } catch (error) {
      console.error(`Erro ao excluir ${type}:`, error);
      alert(`Erro ao excluir ${type}: ${error.message || "Erro desconhecido"}`);
    }
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

    const formData = new FormData(e.target);
    const titulo = formData.get("titulo") || "";
    const descricao = formData.get("descricao") || "";

    if (addType === "evento" || addType === "aviso") {
      const data = formData.get("data") || "";
      const horarioinicio = formData.get("horarioinicio") || null;
      const horariofim = formData.get("horariofim") || null;
      const imageId = formData.get("image") || null;

      if (addType === "evento") {
        const novoEvento = {
          titulo: titulo,
          descricao: descricao,
          datainicio: data,
          datafim: data,
          horarioinicio: horarioinicio,
          horariofim: horariofim,
          idimagem: imageId ? parseInt(imageId) : null,
          idparque: initialData?.idparque || null,
        };

        try {
          const resposta = await criarEvento(novoEvento);
          console.log("Evento criado:", resposta);
          alert("Evento criado com sucesso!");
          // Recarrega os eventos
          const eventosResp = await apiFetch("/api/eventos");
          setEventos(
            (eventosResp || []).filter(
              (e) => Number(e.idparque) === Number(initialData?.idparque)
            )
          );
        } catch (error) {
          console.error("Erro ao criar evento:", error);
          alert("Erro ao criar evento: " + (error.message || "Erro desconhecido"));
        }
      }
    } else if (addType === "trilha") {
      const dificuldade = formData.get("dificuldade") || "";
      const tempo = formData.get("tempo") || "";

      // Inclui dificuldade e tempo na observacao
      const observacaoCompleta = descricao + 
        (dificuldade ? `\nDificuldade: ${dificuldade}` : "") + 
        (tempo ? `\nTempo: ${tempo}` : "");

      try {
        const resposta = await apiFetch("/api/trilhas", {
          method: "POST",
          body: JSON.stringify({
            trilha: titulo,
            observacao: observacaoCompleta.trim() || null,
            idparque: initialData?.idparque || null,
            idimagem: null,
          }),
        });
        console.log("Trilha criada:", resposta);
        alert("Trilha criada com sucesso!");
        // Recarrega as trilhas
        const trilhasResp = await apiFetch("/api/trilhas");
        setTrilhas(
          (trilhasResp || []).filter(
            (t) => Number(t.idparque) === Number(initialData?.idparque)
          )
        );
      } catch (error) {
        console.error("Erro ao criar trilha:", error);
        alert("Erro ao criar trilha: " + (error.message || "Erro desconhecido"));
      }
    }

    setShowAddModal(false);
  };

  // Função para salvar edições
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const titulo = formData.get("titulo") || "";
    const descricao = formData.get("descricao") || "";

    try {
      if (editType === "evento") {
        const data = formData.get("data") || "";
        const horarioinicio = formData.get("horarioinicio") || null;
        const horariofim = formData.get("horariofim") || null;
        const imageId = formData.get("image") || null;

        const eventoAtualizado = {
          titulo: titulo,
          descricao: descricao,
          datainicio: data,
          datafim: data,
          horarioinicio: horarioinicio,
          horariofim: horariofim,
          idimagem: imageId ? parseInt(imageId) : null,
        };

        await atualizarEvento(editItem.idevento, eventoAtualizado);
        alert("Evento atualizado com sucesso!");
        
        // Recarrega os eventos
        const eventosResp = await apiFetch("/api/eventos");
        setEventos(
          (eventosResp || []).filter(
            (e) => Number(e.idparque) === Number(initialData?.idparque)
          )
        );
      } else if (editType === "trilha") {
        const dificuldade = formData.get("dificuldade") || "";
        const tempo = formData.get("tempo") || "";
        const observacaoCompleta = descricao + 
          (dificuldade ? `\nDificuldade: ${dificuldade}` : "") + 
          (tempo ? `\nTempo: ${tempo}` : "");

        await apiFetch(`/api/trilhas/${editItem.idtrilha}`, {
          method: "PUT",
          body: JSON.stringify({
            trilha: titulo,
            observacao: observacaoCompleta.trim() || null,
            idimagem: null,
          }),
        });
        alert("Trilha atualizada com sucesso!");
        
        // Recarrega as trilhas
        const trilhasResp = await apiFetch("/api/trilhas");
        setTrilhas(
          (trilhasResp || []).filter(
            (t) => Number(t.idparque) === Number(initialData?.idparque)
          )
        );
      } else if (editType === "review") {
        await apiFetch(`/api/avaliacao/${editItem.idavaliacao}`, {
          method: "PUT",
          body: JSON.stringify({
            idusuario: editItem.idusuario,
            avaliacao: descricao,
            estrelas: parseInt(formData.get("stars") || "5"),
          }),
        });
        alert("Avaliação atualizada com sucesso!");
        
        // Recarrega as avaliações
        const avaliacoesResp = await apiFetch("/api/avaliacao");
        setAvaliacoes(
          (avaliacoesResp || []).filter(
            (a) => Number(a.idparque) === Number(initialData?.idparque)
          )
        );
      }

      setShowEditModal(false);
      setEditItem(null);
      setEditType(null);
    } catch (error) {
      console.error(`Erro ao atualizar ${editType}:`, error);
      alert(`Erro ao atualizar ${editType}: ${error.message || "Erro desconhecido"}`);
    }
  };

  // Função para salvar edição de horários do parque
  const handleEditParqueSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      await apiFetch(`/api/parques/${initialData?.idparque}`, {
        method: "PUT",
        body: JSON.stringify({
          horarioinicio: formData.get("horarioinicio") || null,
          horariofim: formData.get("horariofim") || null,
          observacao: formData.get("observacao") || null,
        }),
      });
      
      alert("Horários do parque atualizados com sucesso!");
      
      // Recarrega os dados do parque
      const parqueResp = await apiFetch(`/api/parques/${initialData?.idparque}`);
      setParqueApi(parqueResp);
      
      setShowEditParqueModal(false);
    } catch (error) {
      console.error("Erro ao atualizar parque:", error);
      alert("Erro ao atualizar parque: " + (error.message || "Erro desconhecido"));
    }
  };

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
          <h1>{parqueApi?.parque || park.name}</h1>
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
          <div className="section-header-flex">
            <h2>Sobre o Parque</h2>
            {isAdmin && (
              <button
                className="add-btn-small"
                onClick={() => setShowEditParqueModal(true)}
              >
                ⚙️ Editar Horários
              </button>
            )}
          </div>
          <div className="description-card">
            <h2>Sobre o Parque</h2>
            <p>{park.description}</p>
            {parqueApi && (
              <div style={{ marginTop: "20px", padding: "15px", background: "#f5f5f5", borderRadius: "8px" }}>
                <h4>Horários de Funcionamento:</h4>
                <p>
                  <strong>Abertura:</strong> {parqueApi.horarioinicio || "Não informado"}
                  <br />
                  <strong>Fechamento:</strong> {parqueApi.horariofim || "Não informado"}
                </p>
                {parqueApi.observacao && (
                  <p style={{ marginTop: "10px" }}>
                    <strong>Observações:</strong> {parqueApi.observacao}
                  </p>
                )}
              </div>
            )}
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
            {trilhas.map((trail) => (
              <div key={trail.idtrilha} className="trail-card">
                <div className="trail-header">
                  <h4>{trail.trilha}</h4>
                </div>
                <p>{trail.observacao}</p>
                {isAdmin && (
                  <div className="admin-actions">
                    <button
                      onClick={() => handleEdit("trilha", trail)}
                      className="edit-text-btn"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete("trilha", trail.idtrilha)}
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
            {eventos.map((evt) => (
              <div key={evt.idevento} className="event-card-detail">
                {evt.idimagem && (
                  <img
                    src={`${API_BASE_URL}/api/imagens/${evt.idimagem}`}
                    alt={evt.titulo}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 5px 0", fontSize: "1.2rem" }}>
                    {evt.titulo}
                  </h4>
                  <span style={{ color: "#666", fontSize: "0.9rem" }}>
                    📅{" "}
                    {evt.datainicio
                      ? evt.datainicio.split("T")[0].split("-").reverse().join("/")
                      : ""}
                  </span>
                  <p style={{ marginTop: "10px" }}>{evt.descricao}</p>
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
                      onClick={() => handleEdit("evento", evt)}
                      className="edit-text-btn"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete("evento", evt.idevento)}
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
            {avaliacoes.map((rev) => (
              <div key={rev.idavaliacao} className="review-card">
                <div className="stars">
                  {"★".repeat(rev.estrelas || 0)}
                </div>
                <p>"{rev.avaliacao}"</p>
                <small style={{ fontWeight: "bold", color: "#555" }}>
                  - Usuário {rev.idusuario}
                </small>
                {isAdmin && (
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      display: "flex",
                      gap: "5px",
                    }}
                  >
                    <button
                      onClick={() => handleEdit("review", rev)}
                      className="edit-text-btn"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete("review", rev.idavaliacao)}
                      className="delete-text-btn"
                    >
                      X
                    </button>
                  </div>
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
              <input name="titulo" required placeholder="Ex: Trilha da Pedra..." />

              {addType === "trilha" && (
                <>
                  <label>Dificuldade:</label>
                  <select name="dificuldade">
                    <option>Fácil</option>
                    <option>Moderada</option>
                    <option>Difícil</option>
                  </select>
                  <label>Tempo Estimado:</label>
                  <input name="tempo" placeholder="Ex: 2h 30min" />
                </>
              )}

              {(addType === "evento" || addType === "aviso") && (
                <>
                  <label>Data:</label>
                  <input name="data" type="date" />
                  <label>Horário de inicio:</label>
                  <input name="horarioinicio" type="time" />
                  <label>Horário de fim:</label>
                  <input name="horariofim" type="time" />
                  <label>ID da Imagem (número):</label>
                  <input name="image" type="number" placeholder="Ex: 1" />
                </>
              )}

              <label>Descrição:</label>
              <textarea name="descricao" required placeholder="Detalhes..." rows="4"></textarea>

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

      {/* 4. Editar Item */}
      {showEditModal && editItem && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>
              Editar{" "}
              {editType === "trilha"
                ? "Trilha"
                : editType === "evento"
                ? "Evento"
                : "Avaliação"}
            </h3>
            <form onSubmit={handleEditSubmit} className="modal-form">
              {editType === "evento" && (
                <>
                  <label>Título:</label>
                  <input
                    name="titulo"
                    required
                    defaultValue={editItem.titulo}
                    placeholder="Ex: Festival de Arte..."
                  />
                  <label>Data:</label>
                  <input
                    name="data"
                    type="date"
                    defaultValue={
                      editItem.datainicio
                        ? editItem.datainicio.split("T")[0]
                        : ""
                    }
                  />
                  <label>Horário de início:</label>
                  <input
                    name="horarioinicio"
                    type="time"
                    defaultValue={editItem.horarioinicio || ""}
                  />
                  <label>Horário de fim:</label>
                  <input
                    name="horariofim"
                    type="time"
                    defaultValue={editItem.horariofim || ""}
                  />
                  <label>ID da Imagem (número):</label>
                  <input
                    name="image"
                    type="number"
                    defaultValue={editItem.idimagem || ""}
                    placeholder="Ex: 1"
                  />
                  <label>Descrição:</label>
                  <textarea
                    name="descricao"
                    required
                    defaultValue={editItem.descricao || ""}
                    placeholder="Detalhes..."
                    rows="4"
                  ></textarea>
                </>
              )}

              {editType === "trilha" && (
                <>
                  <label>Nome da Trilha:</label>
                  <input
                    name="titulo"
                    required
                    defaultValue={editItem.trilha}
                    placeholder="Ex: Trilha da Pedra..."
                  />
                  <label>Dificuldade:</label>
                  <select name="dificuldade" defaultValue="">
                    <option value="">Selecione...</option>
                    <option>Fácil</option>
                    <option>Moderada</option>
                    <option>Difícil</option>
                  </select>
                  <label>Tempo Estimado:</label>
                  <input
                    name="tempo"
                    placeholder="Ex: 2h 30min"
                    defaultValue=""
                  />
                  <label>Descrição:</label>
                  <textarea
                    name="descricao"
                    required
                    defaultValue={editItem.observacao || ""}
                    placeholder="Detalhes..."
                    rows="4"
                  ></textarea>
                </>
              )}

              {editType === "review" && (
                <>
                  <label>Nota:</label>
                  <select name="stars" defaultValue={editItem.estrelas || 5}>
                    <option value="5">★★★★★ (5 Estrelas)</option>
                    <option value="4">★★★★ (4 Estrelas)</option>
                    <option value="3">★★★ (3 Estrelas)</option>
                    <option value="2">★★ (2 Estrelas)</option>
                    <option value="1">★ (1 Estrela)</option>
                  </select>
                  <label>Comentário:</label>
                  <textarea
                    name="descricao"
                    required
                    defaultValue={editItem.avaliacao || ""}
                    placeholder="Conte como foi sua visita..."
                    rows="4"
                  ></textarea>
                </>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditItem(null);
                    setEditType(null);
                  }}
                  className="cancel-btn"
                >
                  Cancelar
                </button>
                <button type="submit" className="confirm-btn">
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Editar Horários do Parque */}
      {showEditParqueModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Editar Horários do Parque</h3>
            <form onSubmit={handleEditParqueSubmit} className="modal-form">
              <label>Horário de Abertura:</label>
              <input
                name="horarioinicio"
                type="time"
                defaultValue={parqueApi?.horarioinicio || ""}
              />
              <label>Horário de Fechamento:</label>
              <input
                name="horariofim"
                type="time"
                defaultValue={parqueApi?.horariofim || ""}
              />
              <label>Observações:</label>
              <textarea
                name="observacao"
                defaultValue={parqueApi?.observacao || ""}
                placeholder="Informações adicionais sobre horários..."
                rows="4"
              ></textarea>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowEditParqueModal(false)}
                  className="cancel-btn"
                >
                  Cancelar
                </button>
                <button type="submit" className="confirm-btn">
                  Salvar Horários
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
