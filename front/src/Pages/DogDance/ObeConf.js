import React, { useEffect, useState } from 'react';
import styles from './DogDance.module.scss';
import { fetchAllEducateurs } from '../../apis/educators';

export default function ObeConf() {

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
            <h2 className='titreOrange'> <i className="fa-solid fa-person-running Orange"></i>Pour le niveau confirmé</h2>

            <div className={styles.bloc}>
                <p>Emilie et Edouard vous aideront à travailler une chorégraphie complète.</p>
            </div>

            <div className={styles.bloc}>
                <div className={styles.imageContainer}>
                    <div className={styles.image}>
                        <img src={educateurs[1]?.photo} alt="photo de Emilie" />
                    </div>
                </div>
                <div className={styles.texte}>
                    <p>Emilie abordera les points suivants :</p>

                    <ul>
                        <li> sauter dans vos bras en forme de cerceau </li>
                        <li> le rapport d’objets nommés ou non </li>
                        <li> travailler à distance </li>
                        <li> et bien d'autres encore ... </li>
                    </ul>
                </div>
            </div>
            <div className={`${styles.bloc} ${styles.reverse}`}>
                <div className={styles.imageContainer}>
                    <div className={styles.image}>
                        <img src={educateurs[6]?.photo} alt="photo de Edouard" />
                    </div>
                </div>

                <div className={styles.texte}>
                    <p>
                        Edouard vous aidera pour choisir votre musique ; il faut en choisir une qui ait un rythme qui convienne à votre binôme.  Vous devrez ensuite réfléchir aux tricks que vous voulez utiliser pour votre chorégraphie et à l’ordre dans lequel vous souhaitez les effectuer.
                        Et maintenant, il n’y a plus qu’à tout mémoriser et persévérer !
                    </p>
                </div>
            </div>
        </article>

    )
}





