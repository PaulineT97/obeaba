import React, { useState } from 'react'
import Head from '../../Assets/Videos/headerAccueillir.mp4';
import styles from "./WelcomeDog.module.scss";
import Keys from '../../Assets/Images/keys.svg';
import { need } from './Table';

export default function WelcomeDog() {
    const Bone = <i className="fa-solid fa-bone Bone"></i>;

    // Mettre un objet de base en useState permet d'avoir un affichage par défaut
    const [besoins, setBesoins] = useState([{
        age: 2,
        repos: 4,
        socialisation: 4,
        jeux: 1,
        rencontres: 2,
        mastication: 4,
        eau: 1,
        flair: 2,
        escaliers: "interdit",
    }]);

    // 
    /**
     * cette fonction permet de filtrer dans le tableau need afin de ne récupérer qu'un objet
     * @param {Array} e 
     */
    function handleAge(e) {
        console.log(e.target.value);
        setBesoins(need.filter(n => n.age === e.target.value))
    }

    return (
        <>
            <div className={`${styles.banniere}`} >
                <div className='overlay'></div>
                <video autoPlay loop muted src={Head}></video>

                <div className={`${styles.titre}`}>
                    <h1 className='titreBanniere'>Accueillir un chien</h1>
                </div>
            </div>
            <main className={`${styles.mainWelcome}`}>
                <aside>Vous avez sauté le pas et allez accueillir un chiot ou un chien dans votre foyer : une nouvelle aventure commence ! Il n’est pas évident de penser à tout, surtout lorsqu’il s’agit de votre premier compagnon à quattre pattes. Voici un petit kit de survie ! </aside>
                <section>
                    <div className={`${styles.bloc}`}>
                        <article>
                            <h2 className='titreOrange'><i className="fa-solid fa-paw Paw"></i> Pour son arrivée</h2>
                            <ul>
                                <li>  un couchage dans un <span className='bold'>coin calme de la maison</span> pour qu’il se sente en sécurité</li>
                                <li>une gamelle d’eau fraîche</li>
                                <li>une gamelle et ses croquettes</li>
                                <li>des jouets variés (à machouiller, à lancer, ...)</li>
                                <li>une laisse</li>
                                <li>un collier si votre chien ne tire pas ou un harnais</li>
                                <li>une brosse</li>
                                <li>des friandises</li>
                                <li>  une visite chez le vétérinaire pour son passeport et sa puce d’identication</li>
                            </ul>
                        </article>
                        <article>
                            <h2 className='titreOrange'><i className="fa-solid fa-paw Paw"></i> Laissez lui du temps</h2>
                            <p>   Lorsque que votre ami canin arrive à la maison, il va devoir s’adapter ! Comptez qu’il lui faut environ :</p>
                            <ul>
                                <li>3 jours pour <span className='bold'>décompresser</span>; il perd tous ses repères et quitte sa mère et ses frères et soeurs</li>
                                <li>  3 semaines pour <span className='bold'>apprendre votre routine</span>; il apprivoise son environnement et commence à montrer sa personnalité
                                </li>
                                <li>  3 mois pour <span className='bold'>se sentir chez lui</span>; une relation de confiance s’installe, il a pris ses habitudes</li>
                            </ul>
                        </article>
                    </div>
                    <div className={`${styles.bloc} ${styles.middle}`}>
                        <article className={`${styles.milieu}`}>
                            <h2 className='titreOrange'><i className="fa-solid fa-paw Paw"></i> La balade</h2>
                            <p>La promenade est son moment, marchez <span className='bold'>à son rythme</span>. Vous pouvez lui proposer plusieurs balades par jour, mais veillez à <span className='bold'>adapter leur durée</span> en fonction de son âge :</p>
                            <ul>
                                <li> 2 mois : 15 minutes
                                </li>
                                <li>3 mois : 20 minutes
                                </li>
                                <li>4 mois : 25 minutes
                                </li>
                                <li>5 mois : 30 minutes
                                </li>
                                <li>6 mois : 45 minutes
                                </li>
                                <li>1 an et plus : 1 heure et plus</li>
                            </ul>
                        </article>
                        <div className={`${styles.Key}`} >
                            <img src={Keys} alt="illustration d'un chien avec des flèches pointant les différents items" />
                        </div>

                        <article className={`${styles.milieu}`}>
                            <h2 className='titreOrange'><i className="fa-solid fa-paw Paw"></i> Le changement d'heure</h2>
                            <p>Les seules horloges de nos fidèles compagnons sont sa vessie et son estomac ... </p>
                            <p>Pour l’aider à s’adapter au changement d’heure, modifiez sa routine physiologique par pallier de <span className='bold'>15 minutes</span> par jour.
                            </p>
                            <p>Soyez patients avec les chiots ... mais aussi les seniors !</p>
                        </article>
                    </div>
                    <div className={`${styles.bloc}`}>
                        <article>
                            <h2 className='titreOrange'><i className="fa-solid fa-paw Paw"></i> La gestion de la chaleur</h2>
                            <p>Selon l’âge, la race et la corpulence de votre chien, il sera plus ou moins sensible à la chaleur.</p>
                            <ul>
                                <li>veillez à ce qu’il dispose d’un endroit à l’abri du soleil</li>
                                <li>vérifiez la température du sol avec votre main (si vous ne pouvez pas la laisser 10 secondes, il fait trop chaud pour votre chien)</li>
                                <li>vérifiez qu’il ne manque pas d’eau (gamelles, piscine ...)</li>
                                <li>préférez les balades aux heures les plus fraîches, à l’ombre</li>
                                <li>ne rasez pas votre chien</li>
                                <li>ne le laissez pas en voiture</li>
                            </ul>
                        </article>
                        <article>
                            <h2 className='titreOrange'><i className="fa-solid fa-paw Paw"></i> Besoins et découvertes</h2>
                            <p>Ces renseignements sont donnés à titre indicatif, chaque individu a des besoins, capacités et aptitudes différentes.</p>
                            <div className={`${styles.needs}`}>
                                <div className={`${styles.tableau}`}>
                                    <ul className={`${styles.ulActivity}`}>
                                        <li className={`${styles.entete}`}>Sélectionnez l'âge de votre chien :</li>
                                        <li className={`${styles.left}`}>repos et sommeil</li>
                                        <li className={`${styles.left}`}>socialisation</li>
                                        <li className={`${styles.left}`}>jeux</li>
                                        <li className={`${styles.left}`}>rencontres canines</li>
                                        <li className={`${styles.left}`}>besoins masticatoires</li>
                                        <li className={`${styles.left}`}>découvrir l'eau et nager</li>
                                        <li className={`${styles.left}`}>utiliser son flair</li>
                                        <li className={`${styles.left}`}>escaliers et sauts</li>
                                    </ul>
                                    <ul className={`${styles.ulNeed}`}>
                                        <li>
                                            <select onChange={handleAge} name="age" id="">
                                                <option value="2">2 mois</option>
                                                <option value="3">3 mois</option>
                                                <option value="4">4 mois</option>
                                                <option value="5">5 mois</option>
                                                <option value="6">6 mois</option>
                                                <option value="12">1 an et plus</option>
                                            </select>
                                        </li>
                                        {besoins && besoins.map((b, i) => (
                                            <>
                                                <li>{[...Array(b.repos)].map(s => (Bone))}</li>
                                                <li>{[...Array(b.socialisation)].map(s => (Bone))}</li>
                                                <li>{[...Array(b.jeux)].map(s => (Bone))}</li>
                                                <li>{[...Array(b.rencontres)].map(s => (Bone))}</li>
                                                <li>{[...Array(b.mastication)].map(s => (Bone))}</li>
                                                <li>{[...Array(b.eau)].map(s => (Bone))}</li>
                                                <li>{[...Array(b.flair)].map(s => (Bone))}</li>
                                                <li>{b.escaliers}</li></>
                                        ))}
                                    </ul>

                                </div>
                                <p className={`${styles.notice}`}>Les valeurs vont de quatre à un os, ce qui représente ce dont vos chiens ont plus ou moins besoin. </p>
                            </div>

                        </article>
                    </div>
                </section >
            </main >
        </>
    )
}
