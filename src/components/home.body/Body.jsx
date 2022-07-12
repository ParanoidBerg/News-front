import React from "react";
import styles from "./body.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { getNews, changeNews } from "../../features/newsSlice";
import { useEffect } from "react";
import { FcLike } from "react-icons/fc";

const Body = () => {
  const news = useSelector((state) => state.news.news);
  const error = useSelector((state) => state.news.error);
  const loading = useSelector((state) => state.news.loading);
  const likes = useSelector((state) => state.news.likes);
  const comments = useSelector((state)=>state.comments.comments)

  const dispatch = useDispatch();

  const handleLike = (id) => {
    dispatch(changeNews(id));
  };

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const { id } = useParams();

  const filteredNews = news.filter((el) => {
    if (!id) return true;

    return el.categoriesId === String(id);
  });

  return (
    <>
      {loading && <div>Loading....</div>}
      <div className={styles.body}>
        <div className={styles.cardsCnt}>
          {filteredNews.map((element, index) => {
            return (
              <div className={styles.newsCard} key={element._id}>
                <Link to={`/news/${element._id}`}>
                  <div className={styles.picCnt}>
                    <img
                      className={styles.pic}
                      alt="pic"
                      src={`http://localhost:4000/${element.pic}`}
                    />
                  </div>
                  <div className={styles.cardTitle}>{element.title}</div>
                </Link>
                <div className={styles.info}>

                  <hr className={styles.line} />
                  <div className={styles.likes}>
                    <button onClick={() => handleLike(element._id)}>
                      <FcLike className={styles.like} />
                    </button>{" "}
                    {likes}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Body;
