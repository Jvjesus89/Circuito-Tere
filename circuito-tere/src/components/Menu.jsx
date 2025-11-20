import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

function Menu() {
  return (
    <>
      <header>
        <div className="logo">
          <Link to="/">Circuito Terê</Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#parques">Parques</a>
            </li>
            <li>
              <a href="#biodiversidade">Biodiversidade</a>
            </li>
            <li>
              <Link to="/eventos">Eventos</Link>
            </li>
            <li>
              <a href="#contato">Contato</a>
            </li>
            <li className="login">
              <a>Login/Cadastro</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Menu;
