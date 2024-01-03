import React, { useEffect, useState } from 'react';
import styles from './EspaceAdmin.module.scss';
import { fetchAllAdherents, deleteAdherentBack } from '../../apis/admin';
import Button from '../../Components/button/Button';
import Modal from "../../Components/Modal/Modal";

export default function Adherents() {

    //ANCHOR - Constantes
    const [listUsers, setListUsers] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const [selectedAdherentId, setSelectedAdherentId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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
                setFeedback('Erreur lors de la suppression, réessayez.')
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'adhérent:', error);
        }
    }

    function showModal(adherId) {
        console.log(adherId);
        setModalVisible(!modalVisible);
        setSelectedAdherentId(adherId);
    }

    return (
        <>
            <h2>Les adhérents</h2>

            <article>
                {listUsers.filter(user => user.admin !== 1) // Filtrer le compte administrateur
                    .map((u, index) => (
                        <div id={u.idAdher} key={u.idAdher}>
                            <div className={`box ${styles.container}`}>
                                <p>{u.nom}</p>
                                <p>{u.prenom}</p>
                                <p>{u.email}</p>
                                <Button content="supprimer l'adhérent" onClick={() => showModal(u.idAdher)} />
                            </div>
                            {
                                modalVisible && selectedAdherentId == u.idAdher &&
                                <Modal message={`Vous allez supprimer le compte de ${u.prenom} ${u.nom}. Souhaitez vous continuer ?`}
                                    onCancel={() => showModal(u.idAdher)}
                                    onConfirm={() => {
                                        deleteAdherent(u.idAdher);
                                        setSelectedAdherentId(u.idAdher);
                                    }} style={{transform: 'translateX(-12%)'}} />
                            }
                            <div className={styles.feedbackContainer}>
                                {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}
                                {u.idAdher === selectedAdherentId && feedback && (
                                    <p className={`mb10 mt20 feedback`}>{feedback}</p>
                                )}
                                {u.idAdher === selectedAdherentId && feedbackGood && (
                                    <p className={`mb10 mt20 feedbackGood`}>{feedbackGood}</p>
                                )}
                            </div>
                        </div>
                    ))}

            </article >
        </>
    )
}
