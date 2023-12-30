import React, { useEffect, useState } from 'react';
import styles from './DogDance.module.scss';
import { fetchAllEducateurs } from '../../apis/educators';

export default function ObeDebut() {

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
                <p>Nadège et Emilie vous proposent de travailler les ordres de motricité basiques.</p>
            </div>

            <div className={styles.bloc}>
                <div className={styles.imageContainer}>
                    <div className={styles.image}>
                        <img src={educateurs[7]?.photo} alt="photo de Nadège" />
                    </div>
                </div>
                <div className={styles.texte}>
                    <p>
                        Nadège abordera avec vous les points suivants :
                    </p>

                    <ul>
                        <li> le assis / coucher </li>
                        <li> le debout et le pas bouger </li>
                        <li> faire des pas en avant et en arrière </li>
                        <li> tourner d’un côté et de l’autre </li>
                    </ul>
                </div>
            </div>
            <div className={`${styles.bloc} ${styles.reverse}`}>
                <div className={styles.imageContainer} style={{ marginRight: '7%' }}>
                    <div className={styles.image}>
                        <img src={educateurs[1]?.photo} alt="photo de Emilie" />
                    </div>
                </div>

                <div className={styles.texte} style={{ marginLeft: '7%' }}>
                    <p>Emilie abordera avec vous les points suivants :</p>

                    <ul>
                        <li> la connexion par le regard </li>
                        <li> la marche au pied sans laisse </li>
                        <li> donner la patte et le high five </li>
                        <li> toucher la main avec son museau </li>
                    </ul>
                </div>
            </div>
        </article>
    )
}




