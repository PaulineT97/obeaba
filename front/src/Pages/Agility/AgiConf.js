import React, { useEffect, useState } from 'react';
import styles from './Agility.module.scss';
import { fetchAllEducateurs } from '../../apis/educators';

export default function AgiConf() {
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
                <h2 className='titreOrange'> <i className="fa-solid fa-person-running Orange"></i>Pour le niveau confirmé</h2>

                <div className={styles.bloc}>
                    <p>Audrey et Christophe vous proposent deux axes de travail pour ce niveau.</p>
                </div>

                <div className={styles.bloc}>
                    <div className={styles.imageContainer}>
                        <div className={styles.image}>
                            <img src={educateurs[0]?.photo} alt="photo de Audrey" />
                        </div>
                    </div>

                    <div className={styles.texte}>
                        <p>Audrey vous propose de travailler des points techniques qui serviront sur les parcours :</p>

                        <ul>
                            <li> l’apprentissage du slalom avec la méthode couloir ou 2by2 </li>
                            <li> apprendre au chien à effectuer des sauts courts </li>
                            <li> contourner un obstacle, prendre une entrée de tunnel cachée </li>
                            <li> et bien d'autres encore ... </li>
                        </ul>
                    </div>
                </div>
                <div className={`${styles.bloc} ${styles.reverse}`}>
                    <div className={styles.imageContainer}>
                        <div className={styles.image}>
                            <img src={educateurs[4]?.photo} alt="photo de Christophe" />
                        </div>
                    </div>
                    <div className={styles.texte}>
                        <p>
                            Christophe vous propose des parcours d’agility, comme on peut en recontrer en concours. Vous devrez réaliser une reconnaissance (il s’agit de la mémorisation du parcours). Il vous donnera des conseils pour améliorer votre conduite et vous aurez l’occasion de retravailler les passages techniques qui vous poseront problème.
                        </p>
                    </div>
                </div>
            </article>
        </>
    )
}

