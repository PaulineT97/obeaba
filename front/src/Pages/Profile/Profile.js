import React from 'react'
import HeadProfile from "../../Assets/Images/headerMonCompte.jpg";
import styles from "./Profile.module.scss";
import { useState } from 'react';
import Infos from "./Infos";
import Login from "./Login";
import Register from "./Register";

export default function Profile() {

  const [seeComponent, setSeeComponent] = useState(0);
  const [user, setUser] = useState(null);
  
  function seeRegisterForm() {
    setSeeComponent(1);
  }

  function seeLoginForm() {
    setSeeComponent();
  }

  function toggleLogin() {
    setSeeComponent(2);
  }

  function logout() {
    setSeeComponent();
    setUser(null);
  }
  
function getUser(userLogged) {
  setUser(userLogged);
}
  
  return (
    <>
      < div style={{ backgroundImage: `url(${HeadProfile})` }} className={`${styles.banniere}`}>
      <div className='overlay' ></div>
        <h1 className='titreBanniere'>Mon compte</h1>
      </div >

      <main>
      <div>
      {user ? (
        <ul>
            <button style={{display:'flex', alignItems:'center'}} onClick={logout} className={`mr10 btn btn-primary-reverse`}>
                <i style={{marginRight:'5%'}} className="fas fa-right-to-bracket"></i>
                <span>Déconnexion</span>
            </button>
        </ul>
            ): (
                <ul style={{display:'flex'}}>
                <button style={{display:'flex', alignItems:'center', marginRight:'10%'}} onClick={seeRegisterForm} className={`mr10 btn btn-primary`}>
                    <i style={{marginRight:'5%'}} className="fa-solid fa-user"></i>
                    <span>Inscription</span>
                </button>

                <button style={{display:'flex', alignItems:'center'}} onClick={seeLoginForm} className={`mr10 btn btn-primary-reverse`}>
                    <i style={{marginRight:'5%'}} className="fas fa-right-to-bracket"></i>
                    <span>Connexion</span>
                </button>
            </ul>
            )}
      </div>
        {seeComponent === 1 ? (<Register seeLoginForm={seeLoginForm} />) : 
        seeComponent === 2 ? (<Infos user={user}/>):(<Login toggleLogin={toggleLogin} getUser={getUser}/>)}
      </main>
    </>
  )
}
