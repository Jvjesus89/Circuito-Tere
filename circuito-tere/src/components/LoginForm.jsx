function LoginForm() {
  return (
    <>
      <form id="loginForm">
        <input type="email" placeholder="Insira seu email:" />
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="Insira sua senha:"
        />
        <button>ENTRAR</button>
      </form>
    </>
  );
}

export default LoginForm;
