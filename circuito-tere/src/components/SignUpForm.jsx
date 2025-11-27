import { useState } from "react";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (senha !== confirmSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setErro("");

    console.log("Cadastro válido!");
    console.log({ email, senha });
  };

  return (
    <form id="loginForm" onSubmit={handleSubmit}>
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

      <button type="submit">CADASTRAR</button>
    </form>
  );
}

export default SignUpForm;
