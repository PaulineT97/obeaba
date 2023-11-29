import React from 'react'
import HeadEduc from "../../Assets/Images/headerEducation.jpg";
import styles from "./Education.module.scss";
import Button from '../../Components/button/Button';
import { NavLink } from 'react-router-dom';
import Slider from './Carrousel';

export default function Education() {
    return (
        <>
            < div style={{ backgroundImage: `url(${HeadEduc})` }
            } className={`${styles.banniere}`}>
                <div className='overlay'></div>
                <h1 className='titreBanniere'>Education canine</h1>
            </div >

            <main className={`${styles.mainEduc}`}>

                <aside> Notre objectif est d'enseigner à l’humain comme au chien, les comportements et les compétences nécessaires pour établir au sein de votre binôme une communication claire et un lien de confiance. Nous utilisons la méthode positive qui repose sur la récompense. </aside>

                <div className={`${styles.educateurs}`}>
                    <h2 className='titreOrange center'><i className="fa-solid fa-dog Orange"></i> Nos éducateurs</h2>
                    
                    <Slider />

                </div>

                <section>
                    <h2 className='titreOrange center'> <i className="fa-solid fa-dog Orange"></i> Les cours </h2>
                    <p className={`${styles.intro}`}>Selon le niveau et la modalité de cours, nous proposons des créneaux d’éducation les lundi, mardi, jeudi et vendredi soirs ainsi que le samedi après-midi.</p>

                    <div className={`${styles.flex} ${styles.rowReverse}`}>
                        <article>
                            <h3 className='titreArticle'>Premier chien ?</h3>
                            <div className={`${styles.txt} shadow`}>
                                <div className='overlayText'></div>
                                <div className='relative'>
                                    <p>Vous pouvez déjà retrouver nos conseils pour préparer  l’arrivée de votre compagnon, sur notre page “Un chien à la maison”.</p>
                                    <NavLink to="/WelcomeDog">
                                    <Button content= "découvrir nos conseils" /></NavLink>
                                </div>

                            </div>
                        </article>

                        <article className={`${styles.marginTopOne}`}>
                            <h3 className='titreArticle'>Première venue</h3>
                            <div className={`${styles.txt} shadow`}>
                                <div className='overlayText'></div>
                                <div className='relative'>
                                    <p> Pour votre première venue, vous serez accueillis par l’un de nos éducateurs. </p>
                                    <p> Ce moment d’échange est l’occasion pour votre compagnon et vous-même : </p>
                                    <ul>
                                        <li> de découvrir nos locaux et l’environnement dans lequel vous allez évoluer par la suite</li>
                                        <li>de rencontrer notre équipe</li>
                                        <li>de poser vos questions</li>
                                    </ul>
                                    <p> Pour <span className='bold'> prendre rendez-vous </span>, appelez nous au 06 00 00 00 00 ou contactez nous par mail : obeaba@gmail.com. </p>
                                </div>

                            </div>
                        </article>
                    </div>

                    <div className={`${styles.flex} ${styles.absolute}`}>
                        <article className={`${styles.marginTop}`}>
                            <h3 className='titreArticle'>Cours individuels</h3>
                            <div className={`${styles.txt} shadow`}>
                                <div className='overlayText'></div>
                                <div className="relative">
                                    <p>Peu importe l’âge de votre chien, cette modalité de cours peut vous apparaître nécessaire pour plusieurs raisons :</p>
                                    <ul>
                                        <li>le besoin de renforcer la  <span className='bold'>connexion</span> avec votre chien</li>
                                        <li>vous souhaitez (re)travailler une notion en particulier</li>
                                        <li>votre compagnon est  <span className='bold'>réactif</span> avec les humains  et / ou ses congénaires</li>
                                    </ul>
                                    <p>Nous étudions ensemble votre besoin et vous proposons un planning adapté.</p>
                                    <Button content = "Réserver un créneau"/>
                                </div>
                            </div>
                        </article>

                        <article>
                            <h3 className='titreArticle'>Cours collectifs</h3>
                            <div className={`${styles.txt} shadow`}>
                                <div className='overlayText'></div>
                                <div className="relative">
                                    <p>En fonction de l’âge, de l’évolution mais aussi des besoins de votre chien, nous vous proposons des cours d’éducation suivant des objectifs principaux.</p>
                                    <h4>Niveau 1 : chiots</h4>
                                    <ul>
                                        <li>créer un lien de confiance</li>
                                        <li>la familiarisation avec son environnement et ses congénères</li>
                                        <li>la sociabilisation</li>
                                    </ul>
                                    <h4>Niveau 2 : jeunes chiens</h4>
                                    <ul>
                                        <li>la communication canine</li>
                                        <li>gérer l’absence</li>
                                        <li>le calme</li>
                                    </ul>
                                    <h4>Niveau 3 : chiens adultes</h4>
                                    <ul>
                                        <li>évoluer sereinement dans son environnement quotidien (et en ville)</li>
                                        <li>croiser un congénère</li>
                                        <li>marcher en laisse</li>
                                    </ul>
                                    <p>Certains objectifs sont travaillés dès le premier niveau mais il n’est pas attendu du chien qu’ils soient “acquis”.</p>
                                    <Button content = "Inscrire mon chien"/>
                                </div>
                            </div>
                        </article>
                    </div>

                </section>
            </main>
        </>
    )
}
