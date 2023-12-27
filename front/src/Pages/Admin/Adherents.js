import React, { useEffect, useState } from 'react';
import styles from './EspaceAdmin.module.scss';
import { fetchAllAdherents, deleteAdherentBack } from '../../apis/admin';
import Button from '../../Components/button/Button';

export default function Adherents() {

    //ANCHOR - Constantes
    const [listUsers, setListUsers] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");

    //ANCHOR - Fonctions 

    //NOTE -- cette fonction permet de récupérer toutes les informations nécessaires à l'affichage des adhérents
    useEffect(() => {
        async function fetchData() {
            try {
                const dataBack = await fetchAllAdherents();
                setListUsers(dataBack);
            } catch (error) {
                console.error('Error in component:', error);
            }
        }

        fetchData();
    }, []);

    async function deleteAdherent(adherentId) {
        console.log(adherentId);

        try {
            const deletedAdherent = await deleteAdherentBack(adherentId);

            if (deletedAdherent.messageGood) {
                setFeedbackGood(deletedAdherent.messageGood);

                setTimeout(() => {
                    // Mettre à jour l'état en filtrant les adhérents avec un ID différent
                    const updatedList = listUsers.filter(u => u.idAdher !== adherentId);
                    setListUsers(updatedList);
                    setFeedbackGood("");
                }, 3000);
            } else {
                console.error('Erreur lors de la suppression de l\'adhérent:', deletedAdherent.message);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'adhérent:', error);
        }
    }

    return (
        <>
            <h3>Les adhérents</h3>

            <article>
                {listUsers.filter(user => user.admin !== 1) // Filtrer le compte administrateur
                    .map((u, index) => (
                        <div id={u.idAdher} key={u.idAdher}>
                            <div className={`box ${styles.container}`}>
                                <p>{u.nom}</p>
                                <p>{u.prenom}</p>
                                <p>{u.email}</p>
                                <Button content="supprimer l'adhérent" onClick={() => deleteAdherent(u.idAdher)} />

                            </div>
                            <div className={styles.feedbackContainer}>
                                {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}

                                {feedback && <p className={`mb10 mt20 feedback`}>{feedback}</p>}

                                {feedbackGood && <p className={`mb10 mt20 feedbackGood`}>{feedbackGood}</p>}

                            </div>
                        </div>
                    ))}

            </article >
        </>
    )
}
