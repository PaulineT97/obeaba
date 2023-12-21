import React from 'react';
import styles from './DogDance.module.scss';

export default function ObeInt() {
    return (
        <>
            <article>
                <h2 className='titreOrange'> <i className="fa-solid fa-person-running Orange"></i> Pour le niveau intermédiaire</h2>

                <div className={styles.texte}>
                    <p>
                        Edouard et Nadège travailleront des ordres de direction et de motricité plus complexes. <br />
                        Edouard vous propose de travailler des points techniques qui serviront sur les parcours :
                    </p>

                    <ul>
                        <li> ramper / rouler </li>
                        <li> le gauche / droite / en avant </li>
                        <li> faire la révérence </li>
                        <li> slalomer entre les jambes </li>
                    </ul>
                </div>
                <div className={styles.texte}>
                    <p> Nadège vous proposera tout d’abord d’effectuer des enchaînements de tricks communs pour apprendre progressivement à votre chien à espacer les récompenses.
                    Vous aurez ensuite des temps libres pour imaginer des tours qui vous seront propres. En effet, l’obérythmée est une activité artistique basée sur la créativité ! </p>
                </div>
            </article>
        </>
    )
}





