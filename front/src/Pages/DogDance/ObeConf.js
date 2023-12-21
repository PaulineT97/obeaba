import React from 'react';
import styles from './DogDance.module.scss';

export default function ObeConf() {
    return (
        <>
            <article>
                <h2 className='titreOrange'> <i className="fa-solid fa-person-running Orange"></i>Pour le niveau confirmé</h2>

                <div className={styles.texte}>
                    <p>
                        Emilie et Edouard vous aideront à travailler une chorégraphie complète. <br />
                        Emilie abordera les points suivants :
                    </p>

                    <ul>
                        <li> sauter dans vos bras en forme de cerceau </li>
                        <li> le rapport d’objets nommés ou non </li>
                        <li> travailler à distance </li>
                        <li> et bien d'autres encore ... </li>
                    </ul>
                </div>
                <div className={styles.texte}>
                    <p>
                        Edouard vous aidera pour choisir votre musique ; il faut en choisir une qui ait un rythme qui convienne à votre binôme.  Vous devrez ensuite réfléchir aux tricks que vous voulez utiliser pour votre chorégraphie et à l’ordre dans lequel vous souhaitez les effectuer.
                        Et maintenant, il n’y a plus qu’à tout mémoriser et persévérer !
                    </p>
                </div>
            </article>
        </>
    )
}





