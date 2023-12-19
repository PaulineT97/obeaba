import styles from './Header.module.scss';
import Logo from '../../Assets/Images/logo.svg';
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {

    const { user } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

    const [fixedMenu, setFixedMenu] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setFixedMenu(scrollPosition > navbarHeight);
        };

        const updateNavbarHeight = () => {
            const navbarElement = document.querySelector(`.${styles.navbar}`);
            if (navbarElement) {
                setNavbarHeight(navbarElement.offsetHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateNavbarHeight);

        updateNavbarHeight(); // Initialisation de la hauteur de la navbar

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateNavbarHeight);
        };
    }, [navbarHeight]);

    const handleMenuClick = () => {
        console.log('Hey you clicked');
    };


    return (
        <header className={`${styles.headerResponsive}`}>
            <div className={`${styles.navbar}`}>
                <nav>
                    <ul>
                        {user === null ? (
                            <li><NavLink className={`${styles.lien}`} title='se connecter' to="/Forms">Mon compte</NavLink></li>
                        ) : (
                            <>
                                <li><NavLink className={`${styles.lien}`} title='mon profil' to="/Profile"><i className="fa-solid fa-user logged"></i></NavLink></li>
                                <li><NavLink className={`${styles.lien}`} title='se déconnecter' onClick={logout}
 to="/"><i className="fa-solid fa-right-from-bracket logged"></i></NavLink></li>
                            </>
                        )}
                        <li><NavLink className={`${styles.lien}`} to="/WelcomeDog" title='conseils pour accueillir un chien chez soi'>Accueillir un chien</NavLink></li>
                        <li><NavLink className={`${styles.lien}`} to="/Education" title='éducation canine'>Education</NavLink></li>
                        <li><NavLink end to="/"><div className={`${styles.logoWidth}`}>
                            <img src={Logo} alt="linea - chien de profil" />
                        </div></NavLink></li>
                        <li><NavLink className={`${styles.lien}`} to="/Agility" title='agility'>Agility</NavLink></li>
                        <li><NavLink className={`${styles.lien}`} to="/DogDance" title='obérythmée'>Obérythmée</NavLink></li>
                        <li><NavLink className={`${styles.lien}`} to="/Walk" title='balades organisées'>Balades organisées</NavLink></li>
                    </ul>
                </nav>
            </div>

            <div className={`${styles.menu} ${fixedMenu ? styles.fixedMenu : ''}`} onClick={handleMenuClick} >
                <i className="fa-solid fa-bone"></i>
            </div>
        </header>
    )
}