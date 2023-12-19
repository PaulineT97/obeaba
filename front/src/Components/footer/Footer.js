import styles from "./Footer.module.scss";
import Paws from "./Paws";
import List from "./List";
import Title from "./Title";
import Contact from "../contact/Contact";
import { NavLink } from "react-router-dom";

export default function Footer () {
    // const Nav = ({Title, Link1, Link2, Link3, Link4}) => ()
    return(
        <footer className={`${styles.footer}`}>
            <NavLink title="nous contacter" to="/ContactUs">
                <Contact/>
            </NavLink>
         

{/* PARTIE NAVIGATION */}

            <div className={`${styles.width}`}>
                <div className={`${styles.flex}`}>
                    <div className={`${styles.optionMenu} center`}>
                    <Title Titre="Infos et Actus"/>
                    <List Link1="Qui sommes nous" lien1="/" Link2="Accueillir un chien" lien2="/WelcomeDog" Link3="Se connecter" lien3="/Forms" Link4="Newsletter" lien4="/"/>
                    </div>
                    <Paws/>
                    <div className={`${styles.optionMenu} center`}>
                    <Title Titre="Nos activités"/>
                    <List Link1="Éducation" lien1="/Education" 
                    Link2="Agility" lien2="/Agility" 
                    Link3="Obérythmée" lien3="/DogDance" 
                    Link4="Balades organisées" lien4="/Walk" />
                    </div>
                    <Paws/>
                    <div className={`${styles.footerMobile} center`}>
                        <div className={styles.footerPart}>
                            <Title Titre="Nous contacter"/>
                            <div className={`${styles.center}`}>
                                <i className="fa-solid fa-phone"></i>
                                <p>06 00 00 00 00</p>
                            </div>
                            <div className={`${styles.center}`}>
                                <i className="fa-solid fa-envelope"></i>
                                <p>obeaba@gmail.com</p>
                            </div>
                        </div>
                        <div className={`${styles.follow} ${styles.footerPart}`}>
                            <Title Titre="Nous suivre"/>
                            <div className={`${styles.center}`}>
                            <i className="fa-brands fa-facebook-f"></i>
                            <i className="fa-brands fa-instagram"></i>
                            <i className="fa-brands fa-linkedin-in"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

{/* PARTIE MENTIONS LEGALES */}

            <div className={`${styles.mentionsLegales}`}>
                <p>© 2023 | <NavLink to="/MentionsLegales" title="mentions légales" style={{display: 'inline' }}>mentions légales</NavLink>  | <NavLink to="/CGU" title="conditions générales d'utilisation" style={{display: 'inline' }}>CGU</NavLink> | <NavLink to="confidentialite" title="politique de confidentialité" style={{display: 'inline' }}>politique de confidentialité</NavLink></p>
            </div>

        </footer>
    )
}