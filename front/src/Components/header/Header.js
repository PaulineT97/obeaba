import styles from './Header.module.scss';
import Logo from '../../Assets/Images/logo.svg';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className={`${styles.header}`}>
            <div className={`${styles.navbar}`}>
                <nav>
                    <ul>
                        <li><NavLink className={`${styles.lien}`} to="/Profile">Mon compte</NavLink></li>
                        <li><NavLink className={`${styles.lien}`} to="/WelcomeDog">Accueillir un chien</NavLink></li>
                        <li><NavLink className={`${styles.lien}`} to="/Education">Education</NavLink></li>
                        <li><NavLink end to="/"><div className={`${styles.logoWidth}`}>
                            <img src={Logo} alt="linea - chien de profil" />
                        </div></NavLink></li>
                        <li><NavLink className={`${styles.lien}`} to="/Agility">Agility</NavLink></li>
                        <li><NavLink className={`${styles.lien}`} to="/DogDance">Obérythmée</NavLink></li>
                        <li><NavLink className={`${styles.lien}`} to="/Walk">Balades organisées</NavLink></li>
                    </ul>
                </nav>
            </div>

            <div className={`${styles.menu}`}>
                <i className="fa-solid fa-bone"></i>
            </div>
        </header>
    )
}