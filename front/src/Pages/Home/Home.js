import React from 'react'
import styles from "./Home.module.scss";
import equipe from "../../Assets/Images/equipe.jpg";
import activites from "../../Assets/Images/activites.jpg";
import Map from "./Map";
import { NavLink } from 'react-router-dom';

export default function Home() {


    return (
        <>
            <div className={`${styles.banniere}`}>
                < div className={`${styles.obeaba}`}>
                    <h1>Obeaba</h1>
                </div >
            </div>

            <main className={`${styles.mainHome}`}>
                <section>
                    {/* --- ---> presentation de l'équipe <--- --- */}
                    <article>
                        <div className={`${styles.texte} shadow`}>
                            <p>Composée de 10 éducateurs, l’équipe Obeaba vous accompagne tout au long de l’éducation de votre compagnon à quatre pattes, et plus encore.</p>
                            <p>Notre méthode de travail est axée sur la relation que vous allez construire avec votre chien. Celle-ci repose sur 6 valeurs qui seront les clés de votre apprentissage : la confiance, l’écoute, la bienveillance, la patience, la communication et l’adaptation.</p>

                        </div>
                        <div className={`${styles.imgContainer}`}>
                            <h2 className='titreArticle'>Qui sommes nous ?</h2>
                            <div className={`${styles.image} shadow`}>

                                <img src={equipe} alt="" />
                            </div>
                        </div>

                    </article>

                    {/* --- ---> liste des activités <--- --- */}
                    <article className={`${styles.reverse}`}>
                        <div className={`${styles.imgContainer}`}>
                            <h2 className='titreArticle'>Quelles activités ?</h2>
                            <div className={`${styles.image} shadow`}>

                                <img src={activites} alt="" />
                            </div>
                        </div>
                        <div className={`${styles.texte} shadow`}>
                            <p>Dès votre inscription, qui se fait dans nos bureaux, vous avez accès aux cours d’<NavLink to="/Education" style={{display: 'inline' }}><span className='bold'>éducation</span></NavLink> par niveau.</p>
                            <p>Si vous le souhaitez, nous proposons également la pratique d’activités cynophiles : l’<NavLink to="/Agility" style={{display: 'inline' }}><span className='bold'>agility</span></NavLink>  et l’<NavLink to="/DogDance" style={{display: 'inline' }}><span className='bold'>obérythmée</span></NavLink>.</p>
                            <p>Pour finir, vous avez la possibilité de participer à des <NavLink to="/Walk" style={{ transition: '0.2s all', display: 'inline' }}><span className='bold'>balades organisées</span></NavLink>, sur une demi-journée ou la journée complète, sous réservation.</p>
                        </div>


                    </article>

                    {/* --- ---> adresse et contact <--- --- */}
                    <article>
                        <div className={`${styles.texte} shadow`}>
                            <p>Nous disposons de grands espaces verts qui nous permettent de pratiquer les différentes activités citées précédemment. </p>
                            <div className={`${styles.infos}`}>
                                <i className="fa-solid fa-location-dot"></i>
                                <p className={`${styles.adresse}`}>
                                    <span>Rue de l'Université</span>
                                    <span>62400 Verquigneul</span>
                                </p>
                            </div>
                            <div className={`${styles.infos}`}>
                                <i className="fa-solid fa-phone"></i>
                                <p>06 00 00 00 00</p>
                            </div>
                            <div className={`${styles.infos}`}>
                                <i className="fa-solid fa-envelope"></i>
                                <p>obeaba@fauxmail.com</p>
                            </div>

                        </div>
                        <div className={`${styles.imgContainer}`}>
                            <h2 className='titreArticle'>Où nous trouver ?</h2>
                            <div className={`${styles.image} shadow`}>

                                <Map />
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        </>
    )
}
