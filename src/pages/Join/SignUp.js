import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./signingup.module.css";
import { createUser } from "../../features/authSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();

  const signingUp = useSelector((state) => state.auth.signingUp);
  const error = useSelector((state) => state.auth.error);
  const fullf = useSelector((state) => state.auth.isFulf)

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
      dispatch(createUser({ login, password }));
      setLogin("");
      setPassword("");
    }
  };

  return (
    <div className={styles.join}>
    <div className={styles.border}>
      <h1>Регистрация</h1>
      <input
        type="text"
        value={login}
        onChange={handleSetLogin}
        className={styles.login}
        placeholder="Логин"
      ></input>
      <input
        type="password"
        value={password}
        onChange={handleSetPassword}
        className={styles.password}
        placeholder="Пароль"
      ></input>
      <button
        onClick={handleSubmit}
        disabled={signingUp}
        className={signingUp ? styles.btnOff : styles.btn}
      >
        Зарегистрироваться
      </button>
      {error && (
        <div className={styles.errorCnt}>
          {" "}
          <div className={styles.error}>{error}</div>
        </div>
      )}
      {fullf ? 
          <div className={styles.fullfCnt}>
            {" "}
            <div className={styles.fullf}>Вы успешно зарегестрированы, </div>
            <div className={styles.continue}>Что бы продолжить работу <Link to={'/signin'}>войдите в аккаунт</Link> </div>
          </div> : 
          <div className={styles.textCnt}>
          {" "}
          <div className={styles.text}>Уже есть аккаунт? </div>
          <div className={styles.continue2}><Link to={'/signin'}>Авторизируйтесь</Link> что бы продолжить работу </div>
        </div>
        }
    </div>
    </div>
  );
};

export default SignUp;
