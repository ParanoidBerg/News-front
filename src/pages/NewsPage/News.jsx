import React from 'react';
import styles from './news.module.css'
import { useSelector, useDispatch, } from 'react-redux';
import { getNews, changeNews } from '../../features/newsSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { FcLike } from 'react-icons/fc'

const News = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(()=>{
        dispatch(getNews())
    }, [dispatch])

    const news = useSelector((state) => state.news.news)
    const error = useSelector((state)=>state.news.error)
    const loading = useSelector((state)=>state.news.loading)
    const likes = useSelector((state)=>state.news.likes)
    return (
     <div>
        {news.map((item) => {
            if(id === item._id){
              return  (
                <>
                <div className={styles.header}>
                    <div className={styles.title}>{item.title}</div>
                </div>
                <div className={styles.picCnt}>
                    <img alt='pic' className={styles.pic} src={`http://localhost:4000/${item.pic}`}/>
                </div>
                <div className={styles.text}>{item.text}</div>
                </>
              )
            }
        })}
     </div>
    );
};

export default News;