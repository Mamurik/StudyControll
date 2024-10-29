import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { login, registration } from "../../http/userApi";
import { setIsAuth, setUser } from "../../store/Slices/userSlice";
import {
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTRATION_ROUTE,
  USERLABPROGRESS_ROUTE,
} from "../../utils/consts";
import classes from "./Auth.module.css";
import AuthInput from "../../components/UI/AuthInput/AuthInput";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      let data;
      if (isLogin) {
        data = await login(username, password);
      } else {
        data = await registration(username, password);
      }

      dispatch(setIsAuth(true));
      dispatch(setUser(data));
      navigate(MAIN_ROUTE);
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };

  return (
    <div className={classes.authContainer}>
      <h2 className={classes.Auth_h2}>
        {isLogin ? "Авторизация" : "Регистрация"}
      </h2>
      <form className={classes.Auth_form}>
        <AuthInput
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          value={username}
          placeholder="Username"
        ></AuthInput>
        <AuthInput
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></AuthInput>
        <div className={classes.linkContainer}>
          {isLogin ? (
            <div>
              Нет аккаунта?{" "}
              <NavLink className={classes.reg_link} to={REGISTRATION_ROUTE}>
                Зарегистрируйся!
              </NavLink>
            </div>
          ) : (
            <div>
              Есть аккаунт?{" "}
              <NavLink className={classes.reg_link} to={LOGIN_ROUTE}>
                Войдите!
              </NavLink>
            </div>
          )}
        </div>
        <button className={classes.Auth_Button} onClick={handleSubmit}>
          {isLogin ? "Войти" : "Регистрация"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
