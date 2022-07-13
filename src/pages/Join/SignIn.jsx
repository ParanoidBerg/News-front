import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from "./signingup.module.css";
import { authorizate } from "../../features/authSlice";
import { useState } from "react";

const SignIn = () => {
    const dispatch = useDispatch();

  const signingIn = useSelector((state) => state.auth.signingIn);
  const error = useSelector((state) => state.auth.error);
  const fullf = useSelector((state) => state.auth.isFulf);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSetLogin = (e) => {
    setLogin(e.target.value);
  };
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    if (login !== "" && password !== "") {
      dispatch(authorizate({ login, password }));
      setLogin("");
      setPassword("");
    }
  };
    return (
        <div className={styles.join}>
            <div className={styles.border}>
          <h1>Вход</h1>
          <input
            type="text"
            value={login}
            onChange={handleSetLogin}
            className={styles.login}
            placeholder="Логин"
          ></input>
          <input
            className={styles.password}
            type="password"
            value={password}
            onChange={handleSetPassword}
            placeholder="Пароль"
          ></input>
          <button
            disabled={signingIn}
            className={signingIn ? styles.btnOff : styles.btn}
            onClick={handleSubmit}
          >
            Войти
          </button>
          {error && (
            <div className={styles.errorCnt}>
              {" "}
              <div className={styles.error}>{error}</div>
            </div>
          )}
          {fullf && (
          <div className={styles.fullfCnt2}>
            {" "}
            <div className={styles.fullf}>Добро пожаловать! </div>
          </div>
        )}
        </div>
        </div>
    );
};

export default SignIn;