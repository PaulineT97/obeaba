import React from 'react';
import styles from './Agility.module.scss';

export default function AgiDebut() {
    return (
        <>
            <article>
            <h2 className='titreOrange'> <i className="fa-solid fa-person-running Orange"></i>Pour le niveau débutant</h2>

                <div className={styles.texte}>
                    <p>
                        Naëlle et Audrey vous proposent deux ateliers complémentaires pour ce niveau. <br />
                        Naëlle abordera avec vous les points suivants :
                    </p>

                    <ul>
                        <li> comment échauffer votre chien </li>
                        <li> le garder de position au départ </li>
                        <li> découvrir les haies et les tunnels </li>
                    </ul>
                </div>
                <div className={styles.texte}>
                    <p>
                    Audrey abordera avec vous les points suivants:

                    </p>

                    <ul>
                        <li> l’écoute et le rappel </li>
                        <li> le choix des récompenses </li>
                        <li> le choix des mots pour chaque obstable </li>
                        <li> découvrir les obstacles à zones </li>
                    </ul>
                </div>
            </article>
        </>
    )
}


