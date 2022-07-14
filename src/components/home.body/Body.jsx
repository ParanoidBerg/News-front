import React from "react";
import styles from "./body.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getNews } from "../../features/newsSlice";
import { useEffect } from "react";
import { BiComment } from "react-icons/bi";
import { getAllComments } from "../../features/commentSlice";

const Body = () => {
  const news = useSelector((state) => state.news.news);
  const loading = useSelector((state) => state.news.loading);
  const allComments = useSelector((state)=> state.comments.allComments)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
    dispatch(getAllComments());
  }, [dispatch]);

  const { id } = useParams();

  const filteredNews = news.filter((el) => {
    if (!id) return true;

    return el.categoriesId === String(id);
  });
  return (
    <>
      {loading && <div className={styles.loaderArea}>
   <div className={styles.loader}></div>
</div>}
      <div className={styles.body}>
        <div className={styles.htCnt}>
          
        </div>
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
                  <div className={styles.coms}>
                      <BiComment className={styles.com} />
                      <div className={styles.comAm}>{allComments.filter((com)=> com.newsId === element._id).length}</div>
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
