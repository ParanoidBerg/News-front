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
  const comments = useSelector((state)=>state.comments.allComments)
  const dispatch = useDispatch();
  const user = localStorage.getItem('user')


  useEffect(() => {
    dispatch(getNews());
    dispatch(getAllComments());
  }, [dispatch]);

  const { id } = useParams();

  const filteredNews = news.filter((el) => {
    if (!id) return true;
    return el.categoriesId === String(id);
  });
  if (!news.length){
    return ''
  }
  const neededComs = news.map((item)=>{
    const result = comments.filter((comm)=>comm.newsId === item._id)
    return result;
  })
  
  const topNews = () =>{
    let max = neededComs[0]   
    for (let i=0; i< neededComs.length; i++) {
      if (neededComs[i].length > max.length) {
        max = neededComs[i]
      }
    }
    return max[0]
  }
  const topic = topNews()
  if (!topic) {
    return ''
  }
  return (
    <>
    
      {loading && <div className={styles.loaderArea}>
   <div className={styles.loader}></div>
</div>}
      <div className={styles.body}>
       {!id && <div className={styles.htCnt}>
          {news.map((el)=>{
            if (el._id === topic.newsId) {
              return (
                <div key={el._id}>
                <Link className={styles.htCnt2} to={`/news/${el._id}`}>
                <div className={styles.imgCnt}>
                  <img className={styles.img} alt='img' src={`http://localhost:4000/${el.pic}`}/>
                </div>
                <div className={styles.htText}>
                  <div className={styles.top}>
                  <div className={styles.ht}>Популярное</div>
                  <div className={styles.coms}>
                      <BiComment className={styles.com} />
                      <div className={styles.comAmm}>{allComments.filter((com)=> com.newsId === el._id).length}</div>
                      </div>
                  </div>
                  <hr className={styles.topLine} />
                  <h2 className={styles.htTitle}>{el.title}</h2>
                </div>
                </Link>
                </div>
              )
            }
          })}
        </div>}
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
