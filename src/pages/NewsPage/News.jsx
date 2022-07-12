import React from "react";
import styles from "./news.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getNews, changeNews } from "../../features/newsSlice";
import { useEffect } from "react";
import { useParams } from "react-router";
import { FcLike } from "react-icons/fc";
import { BiCommentX } from "react-icons/bi"
import { delComments, getComments, postComment } from "../../features/commentSlice";
import { useState } from "react";

const News = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [text, setText] = useState('')

    const handleSetText = (e) =>{
        setText(e.target.value)
    }
    const handleSubmit=(e)=> {
        e.preventDefault()
        if(text !== ''){
            dispatch(postComment(text))
        }
        setText('')
    }
    const handleDel = (id) => {
        dispatch(delComments(id));
      }

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getComments(id));
  }, [dispatch, id]);

  const news = useSelector((state) => state.news.news);
  const error = useSelector((state) => state.news.error);
  const loading = useSelector((state) => state.news.loading);
  const likes = useSelector((state) => state.news.likes);
  const comments = useSelector((state) => state.comments.comments);
  const commentsErr = useSelector((state) => state.comments.error);
  return (
    <div>
      {news.map((item) => {
        if (id === item._id) {
          return (
            <>
              <div className={styles.header}>
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
            </>
          );
        }
      })}
      <hr />
          <div className={styles.commentsSection}>
          <div className={styles.commentAmount}>
            <div className={styles.likesAm}> <FcLike /> {likes} </div>
             <div className={styles.amText}>Комментариев: {comments.length}</div>
           </div>
          {comments.map((el) => {
        return (
            <div className={styles.commentCard}>
                <div className={styles.userName}>placeholder</div>
                <div className={styles.comContent}>
                  <div className={styles.commentText}>{el.commentText}</div>
                <button className={styles.del} onClick={() => handleDel(el)}> <BiCommentX /> </button></div>
            </div>
        )
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
              <button
                className={text ? styles.add : styles.addOff}
                disabled={text && false}
                onClick={handleSubmit}
              >
                Отправить
              </button>
            </div>
          
      
      </div>
    </div>
  );
};

export default News;
