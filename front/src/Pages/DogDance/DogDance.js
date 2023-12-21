import React from 'react'
import Head from '../../Assets/Videos/headerObeR.mp4';
import styles from "./DogDance.module.scss";
import { NavLink, Outlet } from 'react-router-dom';
import Button from '../../Components/button/Button';

export default function DogDance() {
    return (
        <>
            <div className={`${styles.banniere}`} >
                <div className='overlay' ></div>
                <video autoPlay loop muted src={Head}></video>

                <div className={`${styles.titre}`}>
                    <h1 className='titreBanniere'>Obérythmée</h1>
                </div>
            </div>
            <main className={styles.mainObe}>
                <aside>L'obérythmée est une discipline ludique, où les chiens exécutent une chorégraphie en synchronisation avec leurs propriétaires, le tout en musique. Cette forme d'expression artistique met en valeur l'agilité, la coordination et la complicité entre l'homme et le chien.</aside>

                <section>
                    <div className={styles.levelChoice}>
                        <NavLink end to="" title='informations pour le niveau débutant'>
                            <button className='btn'>Niveau débutant</button>
                        </NavLink>

                        <NavLink to="obeInt" title='informations pour le niveau intermédiaire'>
                            <button className='btn'>Niveau intermédiaire</button>
                        </NavLink>

                        <NavLink to="obeConf" title='informations pour le niveau confirmé'>
                            <button className='btn'>Niveau confirmé</button>
                        </NavLink>
                    </div>

                    <Outlet />

                    <NavLink title='inscrire mon chien à une activité' end to="/RegistrationActivities">
                        <Button content="Inscrire mon chien" />
                    </NavLink>
                </section>
            </main>
        </>
    )
}
