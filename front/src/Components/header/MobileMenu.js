import styles from './HeaderMobile.module.scss';
import Logo from '../../Assets/Images/logo.svg';
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function MenuBurger({showMenu, setShowMenu}) {
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




    return (
        <div className={`${styles.navbarMobile}`}>
            <nav>
                <ul >
                    {user === null ? (
                        <li><NavLink className={`${styles.lien}`} to="/Forms" onClick={() => setShowMenu(!showMenu)}>Mon compte</NavLink></li>
                    ) : (
                        <>
                            <li><NavLink className={`${styles.lien}`} to="/Profile" onClick={() => setShowMenu(!showMenu)}><i className="fa-solid fa-user logged"></i></NavLink></li>
                            <li><NavLink className={`${styles.lien}`} onClick={logout}
                                to="/"><i className="fa-solid fa-right-from-bracket logged"></i></NavLink></li>
                        </>
                    )}
                    <li><NavLink end to="/" className={`${styles.lien}`} onClick={() => setShowMenu(!showMenu)}> Qui sommes nous</NavLink></li>
                    <li><NavLink className={`${styles.lien}`} to="/WelcomeDog" onClick={() => setShowMenu(!showMenu)}>Accueillir un chien</NavLink></li>
                    <li><NavLink className={`${styles.lien}`} to="/Education" onClick={() => setShowMenu(!showMenu)}>Education</NavLink></li>
                    <li><NavLink className={`${styles.lien}`} to="/Agility" onClick={() => setShowMenu(!showMenu)}>Agility</NavLink></li>
                    <li><NavLink className={`${styles.lien}`} to="/DogDance" onClick={() => setShowMenu(!showMenu)}>Obérythmée</NavLink></li>
                    <li><NavLink className={`${styles.lien}`} to="/Walk" onClick={() => setShowMenu(!showMenu)}>Balades organisées</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}
