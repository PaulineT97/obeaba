import React from 'react';
import styles from './EspaceAdmin.module.scss';
import { NavLink, Outlet } from 'react-router-dom';
import Button from '../../Components/button/Button';

export default function EspaceAdmin() {
    return (
        <main className={styles.Admin}>
            <h1 className='titreArticle'>Bienvenue sur l'espace Administrateur</h1>

            <div className={styles.container}>
                <aside>
                    <NavLink end to="" title="gestion des adhérents" >
                        <Button content="Les adhérents" />
                    </NavLink>

                    <NavLink to="chiens" title="gestion des chiens" >
                        <Button content="Les chiens" />
                    </NavLink>

                    <NavLink to="educateurs" title="gestion des éducateurs" >
                        <Button content="Les éducateurs" />
                    </NavLink>
                </aside>
                <section>
                    <Outlet />
                </section>
            </div>
        </main>
    )
}
