import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import fetchUsers from "../fetchUsers";
import style from "./login.module.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAppDispatch } from "../../hooks/addDispatch";
import {
  logInFailed,
  logInSuccessful,
} from "../../reducers/Action Creators/action creators";
import Button from "../../common/Button/Button";

export default function Login() {
  let dispatch = useAppDispatch();
  useEffect(() => {
    dispatch((dispatch) => {
      return fetchUsers(dispatch);
    });
  }, []);
  const auth = useTypedSelector((state) => state.login.isLogged);
  const [loginState, setLoginState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  function logIn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    return () => {
      fetch(
        `http://localhost:3001/users?login=${loginState}&password=${passwordState}`
      )
        .then((res) => res.json())
        .then((res) => checker(res))
        .catch((error) => dispatch(logInFailed(error.message)));
    };
  }
  function checker(result: any[]) {
    if (result.length !== 0) {
      localStorage.setItem("loggedIn", "true");
      dispatch(
        logInSuccessful({
          login: loginState,
          password: passwordState,
          isLogged: false,
        })
      );
    } else {
      dispatch(logInFailed("Нет такого пользователя!"));
    }
  }
  return auth ? (
    <Navigate to="/profile" />
  ) : (
    <div className={style.container}>
      <nav className={style.nav}>
        <Link className={style.link} to={"/"}>
          Вход
        </Link>
        <Link className={style.link} to={"/profile"}>
          Профиль
        </Link>
      </nav>
      <div className={style.mainBlock}>
        <h1 className={style.headingOne}>Вход</h1>
        <form className={style.form} action="">
          <input
            onChange={(e) => setLoginState(e.target.value)}
            className={style.input}
            value={loginState}
            type="text"
          />
          <input
            onChange={(e) => setPasswordState(e.target.value)}
            className={style.input}
            value={passwordState}
            type="password"
          />
          <Button
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              dispatch(logIn(e))
            }
          >
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
}
