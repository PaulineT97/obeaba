import React from 'react';
import styles from './DogDance.module.scss';

export default function ObeDebut() {
    return (
        <>
            <article>
            <h2 className='titreOrange'> <i className="fa-solid fa-person-running Orange"></i>Pour le niveau débutant</h2>

                <div className={styles.texte}>
                    <p>
                    Nadège et Emilie vous proposent de travailler les ordres de motricité basiques. <br />
                    Nadège abordera avec vous les points suivants :
                    </p>

                    <ul>
                        <li> le assis / coucher </li>
                        <li> le debout et le pas bouger </li>
                        <li> faire des pas en avant et en arrière </li>
                        <li> tourner d’un côté et de l’autre </li>
                    </ul>
                </div>
                <div className={styles.texte}>
                    <p>
                    Emilie abordera avec vous les points suivants :

                    </p>

                    <ul>
                        <li> la connexion par le regard </li>
                        <li> la marche au pied sans laisse </li>
                        <li> donner la patte et le high five </li>
                        <li> toucher la main avec son museau </li>
                    </ul>
                </div>
            </article>
        </>
    )
}




