import "./Menu.css";

function Menu() {
  return (
    <>
      <header>
        <div className="logo">Circuito Terê</div>
        <nav className="main-nav">
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a href="#parques">Parques</a>
            </li>
            <li>
              <a href="#biodiversidade">Biodiversidade</a>
            </li>
            <li>
              <a>Eventos</a>
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
