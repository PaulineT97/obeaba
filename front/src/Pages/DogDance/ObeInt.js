import React, { useEffect, useState } from 'react';
import styles from './DogDance.module.scss';
import { fetchAllEducateurs } from '../../apis/educators';

export default function ObeInt() {

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
                    <p>Edouard et Nadège travailleront des ordres de direction et de motricité plus complexes.</p>
                </div>

                <div className={styles.bloc}>
                    <div className={styles.imageContainer}>
                        <div className={styles.image}>
                            <img src={educateurs[6]?.photo} alt="photo de Edouard" />
                        </div>
                    </div>
                    <div className={styles.texte}>
                        <p>Edouard vous propose de travailler des points techniques qui serviront sur les parcours :</p>

                        <ul>
                            <li> ramper / rouler </li>
                            <li> le gauche / droite / en avant </li>
                            <li> faire la révérence </li>
                            <li> slalomer entre les jambes </li>
                        </ul>
                    </div>
                </div>
                <div className={`${styles.bloc} ${styles.reverse}`}>
                    <div className={styles.imageContainer}>
                        <div className={styles.image}>
                            <img src={educateurs[7]?.photo} alt="photo de Nadège" />
                        </div>
                    </div>

                    <div className={styles.texte}>
                        <p> Nadège vous proposera tout d’abord d’effectuer des enchaînements de tricks communs pour apprendre progressivement à votre chien à espacer les récompenses.
                            Vous aurez ensuite des temps libres pour imaginer des tours qui vous seront propres. En effet, l’obérythmée est une activité artistique basée sur la créativité ! </p>
                    </div>
                </div>
            </article>
        </>
    )
}





