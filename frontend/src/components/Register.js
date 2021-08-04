import React from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister, onChange, regUserData, messageOnRegister }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = regUserData;

    onRegister(email, password);

    regUserData.email = "";
    regUserData.password = "";
  };

  return (
    <section className="registration">
      <div className="registration__container">
        <div className="registration__content">
          <form
            method="POST"
            name="user-info"
            className="registration__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <h3 className="registration__title">Registration</h3>
            <div className="registration__input-container">
              <input
                value={regUserData.email}
                type="email"
                name="email"
                placeholder="Email"
                className="registration__input"
                minLength="5"
                maxLength="40"
                autoComplete="off"
                onChange={onChange}
                required
              />
              <span className="registration__error"></span>
            </div>
            <div className="registration__input-container">
              <input
                value={regUserData.password}
                type="password"
                name="password"
                placeholder="Password (only letters and numbers)"
                className="registration__input"
                minLength="2"
                maxLength="20"
                autoComplete="off"
                onChange={onChange}
                required
              />
              <span className="registration__error"></span>
            </div>
            <p className="registration__form-error">{messageOnRegister}</p>
            <button
              type="submit"
              className="registration__btn-save"
              data-submitting-label="Registration..."
              onSubmit={handleSubmit}
            >
              Register
            </button>
          </form>
          <div className="registration__logined">
            <p className="registration__notification">
              Are you already registred?{" "}
            </p>
            <Link to="/signin" className="registration__signup-link">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
