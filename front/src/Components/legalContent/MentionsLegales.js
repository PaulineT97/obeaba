import React from 'react';
import styles from "./legalContent.module.scss";

export default function MentionsLegales() {
    return (
        <main>
            <div className={styles.content}>
                <div className={styles.entete}>
                    <h1>Mentions légales</h1>
                    <aside>En vigueur au 01/01/2024</aside>
                </div>
                <section>
                    <p>Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs, ci après l'<span>Utilisateur</span>, du site <span className={styles.it}>www.obeaba.fr</span>, ci après le <span>site</span> les présentes mentions légales.</p>

                    <p>La connexion et la navigation sur le site par l'Utilisateur impliquent acceptation intégrale et sans réserve des présentes mentions légales.</p>

                    <p>Ces dernières sont accessibles sur le site à la rubrique  &laquo; <span>mentions légales</span> &raquo;.</p>
                </section>

                <section>
                    <h2>Article 1 - l'éditeur</h2>

                    <p>L'édition et la direction de la publication du site sont assurées par l'équipe d'Obeaba, adresse postale Rue de l'Université, 62400 Verquigneul, dont le numéro de téléphone est le 06 00 00 00 00, et l'adresse mail obeaba@fauxmail.com. </p>

                    <p>ci après l'<span>éditeur</span>.</p>
                </section>

                <section>
                    <h2>Article 2 - l'hébergeur</h2>

                    <p>L'hébergeur du site est la société OVH Group SAS, dont le siège social est situé à Roubaix, avec le numéro de téléphone 03 00 00 00 00 et l'adresse mail ...</p>
                </section>

                <section>
                    <h2>Article 3 - Accès au site</h2>
                    <p>Le site est accessible en tout endroit, 7j / 7, 24h / 24, sauf cas de force majeure, interruption programmée ou non et pouvant découler d'une nécessité de maintenance.</p>
                </section>

                <section>

                    <p> Cette application est fictive et a été réalisée par moi-même, Pauline Todeschini, dans le cadre de ma formation de développement web et web mobile. Vous pouvez me contacter à cette adresse mail : pauline.todeschini@gmail.com. </p>

                </section>
            </div>
        </main>
    )
}
