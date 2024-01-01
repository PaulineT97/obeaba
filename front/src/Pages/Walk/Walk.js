import React from 'react'
import Head from '../../Assets/Videos/headerBalades.mp4';
import styles from "./Walk.module.scss";
import Button from '../../Components/button/Button';
import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Walk() {

    const { user, setUser } = useContext(AuthContext);

    return (
        <>
            <div className={`${styles.banniere}`} >
                <div className='overlay'></div>
                <video autoPlay loop muted src={Head}></video>

                <div className={`${styles.titre}`}>
                    <h1 className='titreBanniere'>Balades organisées</h1>
                </div>
            </div>
            <main>
                <aside>Les balades organisées offrent aux chiens l'opportunité de socialiser avec d'autres congénères dans un environnement contrôlé. Pour les propriétaires, ces balades sont l'occasion d'échanger des expériences et de partager ce moment en plein air.</aside>

                <section className={styles.sectionWalk}>
                    <article>
                        <h2 className='titreOrange'><i className="fa-solid fa-paw Paw"></i>Niveau débutant</h2>

                        <p>Le niveau débutant, accessible aux chiots à partir de 6 mois, propose des balades de 30 minutes dans un rayon de 10 kilomètres du site'Obeaba, par groupe de 8 chiens maximum. Pensez à vous inscrire !</p>
                    </article>

                    <article>
                        <h2 className='titreOrange'><i className="fa-solid fa-paw Paw"></i>Niveau intermédiaire</h2>

                        <p>Accessible aux chiens à partir de 12 mois, le niveau intermédiaire propose des balades à la découverte de nouveaux lieux pour une durée de deux heures. Ces balades ont lieu une fois par semaine, par groupe de 10 chiens maximum. Pensez à vous inscrire !</p>
                    </article>

                    <article>
                        <h2 className='titreOrange'><i className="fa-solid fa-paw Paw"></i>Niveau confirmé</h2>

                        <p>Une fois par mois, nous vous proposons une randonnée à la journée. Cela peut être en forêt, en bord de mer, nous vous ferons découvrir les coins de balade de la région,  accessibles à nos compagons à quatre pattes, à condition qu'ils aient 18 mois ! </p>
                    </article>

                    
                        {user ? (<h3 className='titreArticle'> Evènements à venir ... </h3>) : ""}



                    <NavLink title='inscrire mon chien à une activité' end to="/RegistrationActivities">
                        <Button content="M'inscrire" className="send" />
                    </NavLink>
                </section>

            </main>
        </>
    )
}
