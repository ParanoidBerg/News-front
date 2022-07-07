import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux/es/exports"
import { Link } from 'react-router-dom';
import { getCats } from '../features/categoriesSlice';
import styles from './header.module.css'
import logo from '../assets/image43.svg'

const Header = () => {
    const cats = useSelector((state)=>state.cats)
    const error = useSelector((state)=>state.error)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCats())
    }, [dispatch])

    return (
        <div className={styles.header}>
            <div className={styles.logoCnt}>
                        <Link className={styles.mainLink} to='/'> <img className={styles.logo} alt='logo' src={logo} /> </Link>
                    </div>
            {cats && cats.map((element, index)=>{
                return (
                    <div className={styles.logoCnt}>
                        <Link className={styles.mainLink} to='/'> <img className={styles.logo} alt='logo' src={logo} /> </Link>
                    </div>
                )
            })}
        </div>
    );
};

export default Header;