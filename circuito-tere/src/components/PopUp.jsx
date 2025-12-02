import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./popUp.css";

function PopUp({ close, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("login");

  const handleLoginSuccess = (usuario) => {
    if (onLoginSuccess) {
      onLoginSuccess(usuario);
    }
    // garante que o modal fecha após login bem-sucedido
    close();
  };

  return (
    <>
      {/* <section className="overlay"> */}
      <section id="popUp">
        <button className="close-btn" onClick={close}>
          x
        </button>
        <div className="logo">
          <h3>Circuito Terê</h3>
        </div>
        <div className="topbar">
          <button
            className={activeTab === "login" ? "selected" : ""}
            onClick={() => setActiveTab("login")}
          >
            LOGIN
          </button>

          <button
            className={activeTab === "signup" ? "selected" : ""}
            onClick={() => setActiveTab("signup")}
          >
            CADASTRO
          </button>
        </div>
        {activeTab === "login" ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <SignUpForm />
        )}
      </section>
      {/* </section> */}
    </>
  );
}

export default PopUp;
