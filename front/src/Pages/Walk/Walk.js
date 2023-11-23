import React from 'react'
import Head from '../../Assets/Videos/headerBalades.mp4';
import styles from "./Walk.module.scss";

export default function Walk() {
    return (
        <>
            <div className={`${styles.banniere}`} >
                <div className='overlay'></div>
                <video autoPlay loop muted src={Head}></video>

                <div className={`${styles.titre}`}>
                    <h1 className='titreBanniere'>Balades organisées</h1>
                </div>
            </div>
            <main>

            </main>
        </>
    )
}
