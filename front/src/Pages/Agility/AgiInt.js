import React from 'react';
import styles from './Agility.module.scss';

export default function AgiInt() {
    return (
        <>
            <article>
                <h2 className='titreOrange'> <i className="fa-solid fa-person-running Orange"></i> Pour le niveau intermédiaire</h2>

                <div className={styles.texte}>
                    <p>
                        Christophe et Naëlle vous proposent deux ateliers de typologie différente pour ce niveau. <br />
                        Christophe vous propose de travailler des points techniques qui serviront sur les parcours :
                    </p>

                    <ul>
                        <li> les zones en 2on / 2off ou en running </li>
                        <li> apprendre au chien à sauter sans se blesser </li>
                        <li> contourner un obstacle </li>
                        <li> aller chercher un obstacle à distance </li>
                    </ul>
                </div>
                <div className={styles.texte}>
                    <p>
                        Naëlle vous propose un enchaînement d’obstacles qui vous permettra d’apprendre à conduire votre chien de la main gauche comme de la droite, mais aussi à effectuer des changements de mains.
                        Vous aurez également l’occasion de mettre en pratique les techniques apprises avec Christophe.
                    </p>
                </div>
            </article>
        </>
    )
}