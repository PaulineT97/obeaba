import React, { useEffect, useState } from 'react';
import styles from './Agility.module.scss';
import { fetchAllEducateurs } from '../../apis/educators';


export default function AgiDebut() {

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
        <article>
            <h2 className='titreOrange'> <i className="fa-solid fa-person-running Orange"></i>Pour le niveau débutant</h2>

            <div className={styles.bloc}>
                <p>Naëlle et Audrey vous proposent deux ateliers complémentaires pour ce niveau.</p>
            </div>
            <div className={styles.bloc}>
            <div className={styles.imageContainer}>
                    <div className={styles.image}>
                        <img src={educateurs[5]?.photo} alt="photo de Naëlle" />
                    </div>
                </div>
                <div className={styles.texte}>
                    <p>Naëlle abordera avec vous les points suivants :</p>

                    <ul>
                        <li> comment échauffer votre chien </li>
                        <li> le garder de position au départ </li>
                        <li> découvrir les haies et les tunnels </li>
                    </ul>
                </div>

            </div>
            <div className={`${styles.bloc} ${styles.reverse}`}>
                <div className={styles.imageContainer} style={{marginRight:'7%'}}>
                    <div className={styles.image}>
                        <img src={educateurs[0]?.photo} alt="photo de Audrey" />
                    </div>
                </div>

                <div className={styles.texte} style={{marginLeft:'7%'}}>
                    <p>Audrey abordera avec vous les points suivants:</p>

                    <ul>
                        <li> l’écoute et le rappel </li>
                        <li> le choix des récompenses </li>
                        <li> le choix des mots pour chaque obstable </li>
                        <li> découvrir les obstacles à zones </li>
                    </ul>
                </div>

            </div>
        </article>
    )
}


