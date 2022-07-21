import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCats } from "../../features/categoriesSlice";
import styles from "./header.module.css";
import logo from "../../assets/image43.svg";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { getUser, logOut } from "../../features/authSlice";

const Header = () => {
  const cats = useSelector((state) => state.cats.cats);
  const token = useSelector((state) => state.auth.token);
  const admin = useSelector((state) => state.auth.admin);
  const name = localStorage.getItem("name");

  const handleLogOut = () => {
    dispatch(logOut());
    setOpened(false);
  };

  const rootEl = useRef(null);

  useEffect(() => {
    const onClick = (e) =>
      rootEl.current.contains(e.target) || setOpened(false);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const dispatch = useDispatch();

  const [opened, setOpened] = useState(false);
  console.log(typeof admin);

  useEffect(() => {
    dispatch(getCats());
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.navBar}>
          <div className={styles.logoCnt}>
            <Link className={styles.mainLink} to="/">
              {" "}
              <img className={styles.logo} alt="logo" src={logo} />{" "}
            </Link>
          </div>
          {cats &&
            cats.map((element, index) => {
              return (
                <div key={element._id} className={styles.catsCnt}>
                  <Link
                    to={`/categories/${element._id}`}
                    className={styles.cats}
                  >
                    {element.category}
                  </Link>
                </div>
              );
            })}
          <div className={styles.leftFlang}>
            <div
              ref={rootEl}
              className={styles.join}
              onClick={() => setOpened(!opened)}
            >
              <AiOutlineUser className={styles.join1} />
              <div className={styles.userName}>{name}</div>
            </div>
            {opened && (
              <div className={styles.joinPopUp}>
                <div className={styles.linkCnt}>
                  {token ? (
                    <div className={styles.x}>
                      {admin === "admin" && (
                        <>
                        <Link className={styles.admin} to="/admin">
                          Создание новости
                        </Link>
                        <div className={styles.a}><Link className={styles.admin2} to="/admin/userList">
                          Пользователи
                        </Link></div>
                        </>
                      )}

                      <button onClick={handleLogOut} className={styles.logOut}>
                        Выйти
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link to="/signup" className={styles.signup}>
                        Регистрация
                      </Link>
                      <hr className={styles.lLine} />
                      <Link to="/signin" className={styles.signin}>
                        Войти
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
