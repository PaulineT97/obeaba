import React from 'react';
import HeadEduc from "../../Assets/Images/headerAgility.jpg";
import styles from "./Agility.module.scss";
import { NavLink, Outlet } from 'react-router-dom';
import Button from '../../Components/button/Button';

export default function Agility() {


  return (
    <>
      < div style={{ backgroundImage: `url(${HeadEduc})` }
      } className={`${styles.banniere}`}>
        <div className='overlay'></div>
        <h1 className='titreBanniere'>Agility</h1>
      </div >
      <main className={styles.mainAgi}>

        <aside>L'agility met en avant la collaboration entre les propriétaires et leurs chiens. Il s'agit d'un parcours d'obstacles chronométré où le chien suit les instructions de son bipède. Cette activité renforce la confiance, la concentration et la forme physique, tout en s'amusant.</aside>
        <section>
          <div className={styles.levelChoice}>
            <NavLink end to="" title='informations pour le niveau débutant'>
              <button className='btn'>Niveau débutant</button>
            </NavLink>

            <NavLink to="agiInt" title='informations pour le niveau intermédiaire'>
              <button className='btn'>Niveau intermédiaire</button>
            </NavLink>

            <NavLink to="agiConf" title='informations pour le niveau confirmé'>
              <button className='btn'>Niveau confirmé</button>
            </NavLink>
          </div>

          <Outlet />

          <NavLink title='inscrire mon chien à une activité' end to="/RegistrationActivities">
            <Button content="Inscrire mon chien" />
          </NavLink>
        </section>
      </main>
    </>
  )
}
