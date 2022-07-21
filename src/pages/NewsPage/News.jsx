import React from "react";
import styles from "./news.module.css";
import { useSelector, useDispatch } from "react-redux";
import { delNews, getNews } from "../../features/newsSlice";
import { useEffect } from "react";
import { useParams } from "react-router";
import { BiCommentX } from "react-icons/bi";
import {
  delComments,
  getComments,
  postComment,
} from "../../features/commentSlice";
import { useState } from "react";
import { getUser } from "../../features/authSlice";
import { Link } from "react-router-dom";

const News = () => {

  const news = useSelector((state) => state.news.news);
  const loading = useSelector((state) => state.news.loading);
  const comments = useSelector((state) => state.comments.comments);
  const users = useSelector((state)=> state.auth.users)
  const token = useSelector((state)=>state.auth.token)
  const otherUser = useSelector((state)=>state.auth.user)
  const admin = useSelector((state)=>state.auth.admin)

  const dispatch = useDispatch();

  const { id } = useParams();

  const [text, setText] = useState("");

  const handleSetText = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    if (text !== "") {
      dispatch(postComment({text, id}));
      setText("");
    }
  };
  const handleDel = (id) => {
    dispatch(delComments(id));
  };

  const handleRemNews = (id) => {
    dispatch(delNews(id))
    window.location.href = '/'
  }

  useEffect(() => {
    dispatch(getNews());
    dispatch(getUser())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getComments(id));
  }, [dispatch, id]);

  return (
    <div>
      {loading && <div className={styles.loaderArea}>
   <div className={styles.loader}></div>
</div>}
      {news.map((item) => {
        if (id === item._id) {
          return (
            <div key={item._id}>
              <div className={styles.header} >
                <div className={styles.title}>{item.title}</div>
              </div>
              <div className={styles.picCnt}>
                <img
                  alt="pic"
                  className={styles.pic}
                  src={`http://localhost:4000/${item.pic}`}
                />
              </div>
              <div className={styles.text}>{item.text}</div>
              {admin === 'admin' && <div onClick={() => handleRemNews(item._id)} className={styles.remove}>Удалить</div>}
            </div>
          );
        }
      })}
      <hr />
      <div className={styles.commentsSection}>
        <div className={styles.commentAmount}>
          <div className={styles.amText}>Комментариев: {comments.length}</div>
        </div>
         {comments.map((el) => {
          return(
          users.map((user) => {
            if (user._id === el.user) {
              return (
                <div className={styles.commentCard} key={el._id} >
                  <div className={styles.userName} >{user.login}</div>
                  <div className={styles.comContent} >
                    <div className={styles.commentText}>{el.commentText}</div>
                    {(otherUser === el.user || admin === 'admin') && <button
                      className={styles.del}
                      onClick={() => handleDel(el)}
                    ><BiCommentX />
                    </button>}
                  </div>
                </div>
              );
            }
          }))
        })} 
      </div>
      <div className={styles.formMain}>
        <div className={styles.form}>
          <textarea
            type="text"
            value={text}
            onChange={handleSetText}
            className={styles.input}
            placeholder="Введите комментарий"
          ></textarea>
          {token ? 
          <button
          className={text ? styles.add : styles.addOff}
          disabled={!text || !token}
          onClick={handleSubmit}
        >
          Отправить
        </button>
         : <div><Link className={styles.loginPls} to={'/signin'}>Авторизируйтесь,</Link> 
            <div>что бы иметь возможность оставлять комментарии</div>
           </div> } 
          
        </div>
      </div>
    </div>
  );
};

export default News;
