import React from 'react'
import HeadEduc from "../../Assets/Images/headerAgility.jpg";
import styles from "./Agility.module.scss";

export default function Agility() {
  return (
    <>
      < div style={{ backgroundImage: `url(${HeadEduc})` }
      } className={`${styles.banniere}`}>
        <div className='overlay'></div>
        <h1 className='titreBanniere'>Agility</h1>
      </div >
      <main>

      </main>
    </>
  )
}
