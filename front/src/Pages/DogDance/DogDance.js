import React from 'react'
import Head from '../../Assets/Videos/headerObeR.mp4';
import styles from "./DogDance.module.scss";

export default function DogDance() {
    return (
        <>
            <div className={`${styles.banniere}`} >
                <div className='overlay' ></div>
                <video autoPlay loop muted src={Head}></video>

                <div className={`${styles.titre}`}>
                    <h1 className='titreBanniere'>Obérythmée</h1>
                </div>
            </div>
            <main>

            </main>
        </>
    )
}
