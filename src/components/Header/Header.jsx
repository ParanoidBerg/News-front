import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Link} from 'react-router-dom';
import { getCats } from '../../features/categoriesSlice';
import styles from './header.module.css'
import logo from '../../assets/image43.svg'
import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { getUser, logOut } from '../../features/authSlice';



const Header = () => {
    const cats = useSelector((state)=>state.cats.cats)

    const name = localStorage.getItem("name")

    const handleLogOut = () => {
        dispatch(logOut());
        setOpened(false)
      };
    
    const dispatch = useDispatch()

    const [opened, setOpened] = useState(false)

    useEffect(()=>{
        dispatch(getCats())
        dispatch(getUser())
    }, [dispatch])
    return (
        <>
        
        <div className={styles.header}>
            <div className={styles.navBar}>
            <div className={styles.logoCnt}>
                        <Link className={styles.mainLink} to='/'> <img className={styles.logo} alt='logo' src={logo} /> </Link>
                    </div>
            {cats && cats.map((element, index)=>{
                return (
                    <div key={element._id} className={styles.catsCnt}>
                        <Link to={`/categories/${element._id}`} className={styles.cats}>{element.category}</Link>
                    </div>
                )
            })}
            <div className={styles.leftFlang}>
                <div className={styles.join} onClick={() => setOpened(!opened)}><AiOutlineUser className={styles.join1}/></div>
                {opened && <div className={styles.joinPopUp}>
                    <div className={styles.linkCnt}>
                    <Link to='/signup' className={styles.signup}>Регистрация</Link>
                    <Link to='/signin' className={styles.signin}>Войти</Link>
                    <hr className={styles.lLine}/>
                    <button onClick={handleLogOut} className={styles.logOut}>Выйти</button>
                    </div>
                    </div>}
                <div className={styles.userName}>{name}</div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Header;