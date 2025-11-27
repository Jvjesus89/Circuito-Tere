import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./popUp.css";

function PopUp({ close }) {
  const [activeTab, setActiveTab] = useState("login");
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
        {activeTab === "login" ? <LoginForm /> : <SignUpForm />}
      </section>
      {/* </section> */}
    </>
  );
}

export default PopUp;
