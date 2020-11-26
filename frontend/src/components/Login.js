import React from "react";

const Login = ({ onLogin, onChange, loginData, messageOnLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    if (!email || !password) {
      return;
    }

    onLogin(email, password);
  };

  return (
    <section className="login">
      <div className="login__container">
        <div className="login__content">
          <form
            method="POST"
            name="user-info"
            className="registration__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <h3 className="login__title">Вход</h3>
            <div className="login__input-container">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="login__input"
                minLength="5"
                maxLength="40"
                autoComplete="off"
                value={loginData.email}
                onChange={onChange}
                required
              />
              <span className="login__error"></span>
            </div>
            <div className="login__input-container">
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                className="login__input"
                minLength="2"
                maxLength="20"
                autoComplete="off"
                value={loginData.password}
                onChange={onChange}
                required
              />
              <span className="login__error"></span>
            </div>
            <p className="login__form-error">{messageOnLogin}</p>
            <button
              type="submit"
              className="login__btn-save"
              data-submitting-label="Ожидается..."
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
