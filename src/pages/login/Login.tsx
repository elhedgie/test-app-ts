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
import { ILogin } from "../../reducers/loginReducer";
import Input from "../../common/Input/Input";

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
      if(loginState !== '' && passwordState !== '') {
        fetch(
          `http://localhost:3001/users?login=${loginState}&password=${passwordState}`
        )
          .then((res) => res.json())
          .then((res) => checker(res))
          .catch((error) => dispatch(logInFailed(error.message)));
      } else {
        alert('Введите пользователя')
      }
    }
  }
  function checker(result: ILogin[]) {
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
      alert('Нет такого пользователя!')
    }
  }
  // const formValidate = () => {
  //   const loginForm = document.forms.form
  //   const login = loginForm.login.value.trim()
  //   const password = loginForm.password.value.trim()
  //   if(login === '' || password === '') {

  //   }
  // }
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
        <form name="form" className={style.form} action="#">
          <Input
            onChange={(e) => setLoginState(e.target.value)}
            value={loginState}
            type="text"
            placeholder="Ваш логин"
            id="login"
          />
          <Input
            onChange={(e) => setPasswordState(e.target.value)}
            value={passwordState}
            type="password"
            placeholder="Ваш пароль"
            id="password"
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
