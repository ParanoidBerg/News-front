import React, { useEffect, useState } from 'react';
import styles from './admin.module.css'
import { getCats } from "../../features/categoriesSlice";
import { useDispatch, useSelector } from 'react-redux';
import { postNews } from '../../features/newsSlice';

const Admin = () => {
    const dispatch = useDispatch()
    const cats = useSelector((state) => state.cats.cats);
    
    const handleSubmit = () =>{
        if (text !== "") {
            dispatch(postNews({title, text, category, pict}));
            setTitle("")
            setText("");
            setCat("")
            setPict("")
          }
    }

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [category, setCat] = useState('')
    const [pict, setPict] = useState('')

    const handleSetTitle = (e) => {
        setTitle(e.target.value);
      }
    const handleSetText = (e) => {
        setText(e.target.value);
      }

      const handleSetCat = (e) => {
        console.log(category)
        setCat(e.target.value)
      }
    return (
        <div className={styles.body}>
          <h1 className={styles.pageTitle}>Создание Новости</h1>
          <div className={styles.form}>
          <input
            type="text"
            value={title}
            onChange={handleSetTitle}
            className={styles.title}
            placeholder="Введите заголовок"
          ></input>
          <textarea
            type="text"
            value={text}
            onChange={handleSetText}
            className={styles.text}
            placeholder="Введите текст новости"
          ></textarea>
          <div className={styles.secondPart}>
            <select value={category} onChange={handleSetCat} className={styles.cats} name='categoriesId'>
                {cats.map((el)=>{
                    return (
                      <option key={el._id} value={el._id}>{el.category}</option>
                    )
                })}        
            </select>
            {/* <label htmlFor="file" className={styles.addFileBtn}>Добавить фото</label> */}
             <input
              type='file'
            //   id='file'
                // hidden
              onChange={(e) => setPict(e.target.files[0])}
              className={styles.fileInput}
              ></input>
              </div>
              <hr className={styles.line1} />
              <button onClick={handleSubmit} 
              className={text && title && category && pict ? styles.submit : styles.submitOff}
              disabled={!text || !title || !category || !pict}
              >Опубликовать
              </button>
              <div className={styles.err}>{!text || !title || !category || !pict ? 'Поля не должны быть пустыми' : null}</div>
          </div>
        </div>
    );
};

export default Admin;