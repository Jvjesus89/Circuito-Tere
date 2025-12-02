import { useState } from "react";
import { loginUsuario } from "../services/userService";

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      const data = await loginUsuario({ email, senha });
      setSucesso("Login realizado com sucesso!");
      const usuario = data?.usuario;
      console.log("Usuário logado:", usuario);

      // Persiste usuário (opcional)
      if (usuario) {
        try {
          localStorage.setItem("usuario", JSON.stringify(usuario));
        } catch {
          // ignore erro de localStorage
        }
      }

      // Notifica componente pai (PopUp/Menu) para fechar modal e atualizar estado global
      if (onLoginSuccess && usuario) {
        onLoginSuccess(usuario);
      }
    } catch (err) {
      setErro(err.message || "Erro ao fazer login.");
    }
  };

  return (
    <>
      <form id="loginForm" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Insira seu email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="Insira sua senha:"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        {erro && <p className="erro">{erro}</p>}
        {sucesso && <p className="sucesso">{sucesso}</p>}
        <button type="submit">ENTRAR</button>
      </form>
    </>
  );
}

export default LoginForm;
