import styles from "./Footer.module.scss";
import Paws from "./Paws";
import List from "./List";
import Title from "./Title";
import Contact from "../contact/Contact";

export default function Footer () {
    // const Nav = ({Title, Link1, Link2, Link3, Link4}) => ()
    return(
        <footer className={`${styles.footer}`}>
         <Contact/>

{/* PARTIE NAVIGATION */}

            <div className={`${styles.width}`}>
                <div className={`${styles.flex}`}>
                    <div>
                    <Title Titre="Infos et Actus"/>
                    <List Link1="Qui sommes nous" lien1="/" 
                    Link2="Accueillir un chien" lien2="/WelcomeDog" 
                    Link3="Se connecter" lien3="/Profile" 
                    Link4="Newsletter" lien4="/"/>
                    </div>
                    <Paws/>
                    <div>
                    <Title Titre="Nos activités"/>
                    <List Link1="Éducation" lien1="/Education" 
                    Link2="Agility" lien2="/Agility" 
                    Link3="Obérythmée" lien3="/DogDance" 
                    Link4="Balades organisées" lien4="/Walk" />
                    </div>
                    <Paws/>
                    <div>
                        <div>
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
                        <div className={`${styles.follow}`}>
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
                <p>© 2023 | mentions légales | CGU | CGV | politique de confidentialité</p>
            </div>

        </footer>
    )
}