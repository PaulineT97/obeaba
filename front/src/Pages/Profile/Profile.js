import React from 'react'
import HeadProfile from "../../Assets/Images/headerMonCompte.jpg";
import styles from "./Profile.module.scss";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { format } from 'date-fns';
import Button from '../../Components/button/Button';

export default function Profile() {

    const { user } = useContext(AuthContext);

    return (
        <>
            < div style={{ backgroundImage: `url(${HeadProfile})` }} className={`${styles.banniere}`}>
                <div className='overlay' ></div>
                <h1 className='titreBanniere'>Mon compte</h1>
            </div >

            <main>
                <div className={`${styles.box} shadow`} >
                    <h2 className='titreArticle'>Mes informations</h2>
                    <p>Nom : {user.nom}</p>
                    <p>Prénom : {user.prenom}</p>
                    <p>Adresse mail : {user.email}</p>
                    {/* <p>Mot de passe</p>
      <p>Confirmer le mot de passe</p> */}
                    <div className={`${styles.sup}`} >
                        <i className="fa-solid fa-circle-xmark orangeStroke"></i>
                        <p>supprimer mon compte</p>
                    </div>
                    <Button content="modifier" />
                </div>
                {/* {user.chiens.map((c, i) => (
                    <div className={`${styles.box}`} >
                        <h2 className='titreArticle'>{c.nomChien}</h2>
                        <p>Date de naissance : {format(new Date(c.naissance), 'dd/MM/yyyy')}</p>
                        <p>Race : {c.race}</p>
                        <p>Participe aux activités suivantes :</p>
                        {user.chien.activites.map((a, i) => (
                            <div>
                                <p>{a.nomActivites} {a.niveau === 1 ? ("au niveau découverte") : a.niveau === 2 ? ("au niveau intermédiaire") : a.niveau === 3 ? ("au niveau confirmé") : ("")}</p>
                            </div>
                        ))}
                        <div className={`${styles.sup}`} >
                            <i className="fa-solid fa-circle-xmark orangeStroke"></i>
                            <p>supprimer mon chien de ce compte</p>
                        </div>
                        <button>Modifier</button>
                    </div>
                ))} */}
                <Button content="Ajouter un chien" />
            </main>
        </>
    )
}