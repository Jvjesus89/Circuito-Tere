import React, { useState } from "react";
import { Link } from "react-router-dom";
import PopUp from "./PopUp";
import "./Menu.css";

function Menu() {
  const [showPopUp, setShowPopUp] = useState(false);
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
            {/* <li className="login">
              <a role="button" onClick={() => setShowPopUp(true)}>
                Login/Cadastro
              </a>
            </li> */}
          </ul>
        </nav>
      </header>

      {showPopUp && <PopUp close={() => setShowPopUp(false)} />}
    </>
  );
}

export default Menu;
