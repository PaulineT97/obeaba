import React from 'react';
import styles from './EspaceAdmin.module.scss';
import { NavLink, Outlet } from 'react-router-dom';
import Button from '../../Components/button/Button';

export default function EspaceAdmin() {
    return (
        <main className={styles.Admin}>
            <h2 className='titreArticle'>Bienvenue sur l'espace Administrateur</h2>

            <div className={styles.container}>
                <aside>
                    <NavLink end to="" title="gérer les adhérents" >
                        <Button content="Les adhérents" />
                    </NavLink>

                    <NavLink to="chiens" title="gérer les chiens" >
                        <Button content="Les chiens" />
                    </NavLink>

                    <NavLink to="educateurs" title="gérer les éducateurs" >
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
