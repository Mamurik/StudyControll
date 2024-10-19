import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts";
import classes from "./Auth.module.css"; // Импортируем стили

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={classes.authContainer}>
      <h2 className={classes.Auth_h2}>
        {isLogin ? "Авторизация" : "Регистрация"}
      </h2>
      <form className={classes.Auth_form} onSubmit={handleSubmit}>
        <input
          className={classes.Auth_inpt}
          type="text"
          placeholder="Введите ваш username..."
          required
        />
        <input
          className={classes.Auth_inpt}
          type="password"
          placeholder="Введите ваш пароль..."
          required
        />
        <div className={classes.linkContainer}>
          {isLogin ? (
            <div>
              Нет аккаунта?{" "}
              <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
            </div>
          ) : (
            <div>
              Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
            </div>
          )}
        </div>
        <button className={classes.Auth_Button} type="submit">
          {isLogin ? "Войти" : "Регистрация"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
