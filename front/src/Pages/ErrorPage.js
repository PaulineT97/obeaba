import React from 'react';
import Oups from '../Assets/Images/dog-bone.svg';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <main>
      <h1 className='titreArticle'>Erreur 404 : cette page n'existe pas</h1>

      <h2 style={{fontSize:'1.3rem'}}>Il semblerait que vous soyez tombé sur un os ...</h2>

      <div>
        <img src={Oups} alt="Chien qui tient un os dans sa gueule" />
      </div>

      <Link to='/' style={{display:'inline', textDecoration:'underline'}}>Retourner à la <strong>page d'accueil</strong>.</Link>
    </main>
  )
}
