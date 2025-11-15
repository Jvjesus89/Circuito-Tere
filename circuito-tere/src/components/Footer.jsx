import "./footer.css";

function Footer() {
  return (
    <footer id="contato">
      <div className="footer">
        <div className="logo">
          <h3>Circuito Terê</h3>
          <p>@circuito-Tere</p>
        </div>
        <div className="footer-info">
          <h4>Fale Conosco</h4>
          <a href="mailto:circuito.tere@verde.com">circuito.tere@verde.com</a>
          <a>+55 22 99999 - 6666</a>
        </div>
      </div>
      <div className="footer-rights">
        <p>
          © {new Date().getFullYear()} Circuito Terê. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
