import styles from "./HeaderMobile.module.scss";
import logo from '../../Assets/Images/logo.svg';
import MobileMenu from "./MobileMenu";
import { useState } from 'react';

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className={` ${styles.headerMobile}`}>
            <div className={`${styles.bubbleMenu}`}>
                <div className={`${styles.LogoMenu}`} onClick={() => setShowMenu(!showMenu)}>
                    <img src={logo} alt="dog_linear" />
                </div>
            </div>

            {showMenu && (
                <MobileMenu showMenu={showMenu} setShowMenu={setShowMenu} />
            )}


            {/* <ul className={`${styles.boutons}`}>
                <button className={`mr10 btn btn-primary`}>
                    <i className="fas fa-star mr5"></i>
                    <span>Favoris</span>
                </button>

                <button className={`mr10 btn btn-primary-reverse`}>
                    <i className="fas fa-right-to-bracket mr5"></i>
                    <span>Connexion</span>
                </button>
            </ul> */}
        </header>
    )
}