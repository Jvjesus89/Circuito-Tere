import React, { useState } from "react";
import { Link } from "react-router-dom";
import PopUp from "./PopUp";
import "./Menu.css";

function Menu() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    try {
      const saved = localStorage.getItem("usuario");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (usuario) => {
    setUsuarioLogado(usuario);
    setShowPopUp(false);
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
    try {
      localStorage.removeItem("usuario");
    } catch {
      // ignore
    }
  };
  return (
    <>
      <header>
        <div className="logo menu">
          <Link to="/">Circuito Terê</Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/#parques">Parques</Link>
            </li>
            <li>
              <Link to="/#biodiversidade">Biodiversidade</Link>
            </li>
            <li>
              <Link to="/eventos">Eventos</Link>
            </li>
            <li>
              <a href="#contato">Contato</a>
            </li>
            {usuarioLogado ? (
              <li className="login">
                <span>{`Olá, ${usuarioLogado.usuario}`}</span>
                <a
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                  style={{ marginLeft: "8px" }}
                >
                  Sair
                </a>
              </li>
            ) : (
              <li className="login">
                <a
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPopUp(true);
                  }}
                >
                  Login/Cadastro
                </a>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {showPopUp && (
        <PopUp
          close={() => setShowPopUp(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}

export default Menu;
