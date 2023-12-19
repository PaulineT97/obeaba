import React from 'react'
import styles from "./Forms.module.scss";
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


export default function Forms() {


    // --- --- --- --- --->   R E T U R N   <--- --- --- --- --- //
    return (
        <>
            <main>
                <div className={`shadow ${styles.box}`}>
                    <div className={`${styles.options}`}>
                        <div className={`${styles.left}`}>
                            <NavLink className={({ isActive }) => (isActive ? styles.active : styles.inactive)} title='je me connecte' end to="">
                                <h2 className='titreArticle'><i className="fa-solid fa-paw Paw"></i> Je me connecte </h2>
                            </NavLink>
                        </div>
                        <div className={`${styles.right}`} >
                            <NavLink className={({ isActive }) => (isActive ? styles.active : styles.inactive)} title="je m'inscris" to="register">
                                <h2 className='titreArticle'><i className="fa-solid fa-paw Paw"></i> Je m'inscris </h2>
                            </NavLink>
                        </div>

                    </div>


                    <Outlet />
                </div>
            </main>
        </>
    )
}
