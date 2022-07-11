import React from 'react';
import styles from './footer.module.css'
import logo from '../../assets/image 53.svg'
import wifi from '../../assets/wifi.svg'
import twitter from '../../assets/twitter.svg'
import reddit from '../../assets/reddit.svg'
import facebook from '../../assets/facebook.svg'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.leftFlang}>
                    <img className={styles.logo} alt='logo' src={logo} />
                    <div className={styles.copyright}>Copyright © 2020 | NBC NEWS</div>
                </div>
                <div className={styles.linkss}>
                    <Link to={'/cr'} className={styles.links}>Privacy Policy</Link>
                    <Link to={'/cr'} className={styles.links}>Do not sell my personal info</Link>
                    <Link to={'/cr'} className={styles.links}>Terms of Service</Link>
                    <Link to={'/cr'} className={styles.links}>nbcnews.com Site Map</Link>
                </div>
                <div className={styles.rightFlang}>
                 <div className={styles.links2}>
                    <Link to={'/about'} className={styles.links}>About</Link>
                    <Link to={'/about'} className={styles.links}>Contact</Link>
                    <Link to={'/about'} className={styles.links}>Careers</Link>
                    <Link to={'/about'} className={styles.links}>Coupons</Link>
                 </div>
                 <div className={styles.sm}>
                    <img alt='sm-logo' src={wifi} />
                    <img alt='sm-logo' src={twitter} />
                    <img alt='sm-logo' src={reddit} />
                    <img alt='sm-logo' src={facebook} />
                 </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;