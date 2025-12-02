import { useState } from "react";
import { criarUsuario } from "../services/userService";

function SignUpForm() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmSenha) {
      setErro("As senhas não coincidem.");
      setSucesso("");
      return;
    }

    try {
      setErro("");
      setSucesso("");
      await criarUsuario({ usuario, email, senha });
      setSucesso("Cadastro realizado com sucesso!");
      // Opcional: limpar campos
      // setUsuario(""); setEmail(""); setSenha(""); setConfirmSenha("");
    } catch (err) {
      setErro(err.message || "Erro ao cadastrar usuário.");
    }
  };

  return (
    <form id="loginForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Insira seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Insira sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Confirme sua senha"
        value={confirmSenha}
        onChange={(e) => setConfirmSenha(e.target.value)}
        required
      />

      {erro && <p className="erro">{erro}</p>}
      {sucesso && <p className="sucesso">{sucesso}</p>}

      <button type="submit">CADASTRAR</button>
    </form>
  );
}

export default SignUpForm;
