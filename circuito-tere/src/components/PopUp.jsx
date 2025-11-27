import LoginForm from "./LoginForm";
import "./popUp.css";

function PopUp({ close }) {
  return (
    <>
      <section className="overlay">
        <section id="popUp">
          <button className="close-btn" onClick={close}>
            x
          </button>
          <div className="logo">
            <h3>Circuito Terê</h3>
          </div>
          <div className="topbar">
            <a href="" className="selected">
              LOGIN
            </a>
            <a href="">CADASTRO</a>
          </div>
          <LoginForm />
        </section>
      </section>
    </>
  );
}

export default PopUp;
