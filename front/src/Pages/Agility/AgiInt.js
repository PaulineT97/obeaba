import React, { useEffect, useState } from 'react';
import styles from './Agility.module.scss';
import { fetchAllEducateurs } from '../../apis/educators';

export default function AgiInt() {
    const [educateurs, setEducateurs] = useState([]);

    console.log(educateurs);
    useEffect(() => {
        async function fetchData() {
            try {
                const dataBack = await fetchAllEducateurs();
                setEducateurs(dataBack);
                console.log(dataBack);
            } catch (error) {
                console.error('Error in component:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <article>
                <h2 className='titreOrange'> <i className="fa-solid fa-person-running Orange"></i> Pour le niveau intermédiaire</h2>

                <div className={styles.bloc}>
                    <p>Christophe et Naëlle vous proposent deux ateliers de typologie différente pour ce niveau.</p>
                </div>

                <div className={styles.bloc}>
                    <div className={styles.imageContainer}>
                        <div className={styles.image}>
                            <img src={educateurs[4]?.photo} alt="photo de Christophe" />
                        </div>
                    </div>
                    <div className={styles.texte}>
                        <p>Christophe vous propose de travailler des points techniques qui serviront sur les parcours :</p>

                        <ul>
                            <li> les zones en 2on / 2off ou en running </li>
                            <li> apprendre au chien à sauter sans se blesser </li>
                            <li> contourner un obstacle </li>
                            <li> aller chercher un obstacle à distance </li>
                        </ul>
                    </div>
                </div>
                <div className={`${styles.bloc} ${styles.reverse}`}>
                    <div className={styles.imageContainer}>
                        <div className={styles.image}>
                            <img src={educateurs[5]?.photo} alt="photo de Naëlle" />
                        </div>
                    </div>
                    <div className={styles.texte}>
                        <p>
                            Naëlle vous propose un enchaînement d’obstacles qui vous permettra d’apprendre à conduire votre chien de la main gauche comme de la droite, mais aussi à effectuer des changements de mains.
                            Vous aurez également l’occasion de mettre en pratique les techniques apprises avec Christophe.
                        </p>
                    </div>
                </div>
            </article>
        </>
    )
}