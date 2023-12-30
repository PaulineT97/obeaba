// dogsSection.js
import React, { useState } from 'react';
import { format } from 'date-fns';
import Button from '../../../Components/button/Button';
import { deleteDogBack, addDogs } from '../../../apis/dogs';
import styles from '../Profile.module.scss';
import { NavLink } from 'react-router-dom';
import Modal from "../../../Components/Modal/Modal";

export default function DogsSection({
    fields,
    append,
    remove,
    getValues,
    errors,
    feedback,
    feedbackGood,
    setFeedback,
    setFeedbackGood,
    updatedUser,
    setUpdatedUser,
    navigate,
    register,
    clearErrors,
    handleSubmit,
}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDogId, setSelectedDogId] = useState(null);

    function showModal(dogId) {
        setModalVisible(!modalVisible);
        setSelectedDogId(dogId);
    }

    async function submitDogs() {

        setFeedback('');
        clearErrors();
        const values = getValues();
        const formData = new FormData();

        values.idAdher = updatedUser.adherent.idAdher;
        if (values.chiens) {
            values.chiens.forEach((c, index) => {
                formData.append('nomChien', values.chiens[index].nomChien);
                formData.append('naissance', values.chiens[index].naissance);
                formData.append('race', values.chiens[index].race);
            });
        }

        try {
            const addDogsResponse = await addDogs(values);

            if (addDogsResponse.messageGood) {
                setFeedbackGood(addDogsResponse.messageGood);

                if (updatedUser.chiens) {
                    const updatedChiens = [...updatedUser.chiens, ...(addDogsResponse.nouveauxChiens || [])];
                    setUpdatedUser({ ...updatedUser, chiens: updatedChiens });
                }

                setTimeout(() => {
                    navigate('/Profile');
                    setFeedbackGood('');
                }, 3000);
            } else {
                setFeedback("Erreur lors de l'ajout des chiens.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteDogFront(idChien) {
        console.log(idChien);
        try {

            const response = await deleteDogBack(idChien);

            if (response.messageGood) {

                setFeedbackGood(response.messageGood);
                const updatedChiens = updatedUser.chiens.filter(chien => chien.idChien !== idChien);
                setUpdatedUser({ ...updatedUser, chiens: updatedChiens });

                setTimeout(() => {
                    setFeedbackGood("");
                }, 3000);
            } else {
                setFeedback('Erreur lors de la suppression du chien.');
            }
        } catch (error) {
            console.error(error);
        }
    }

    function addChien() {
        append({
            nomChien: '',
            naissance: '',
            race: '',
        });
    }

    function deleteChien(id) {
        remove(id);
    }


    return (
        <>

            {
                updatedUser.chiens && updatedUser.chiens.length > 0 && (
                    <>
                        <h2 className='titreOrange'> <i class="fa-solid fa-dog Orange"></i> Mes chiens</h2>
                        {updatedUser.chiens?.filter((chien, index, array) => array.findIndex(c => c.idChien === chien.idChien) === index).map((chien, index) => (
                            <div key={chien?.idChien} className={` ${styles.texte} box`} >
                                <h3 className='titreArticle'>{chien?.nomChien}</h3>
                                <p>Date de naissance : {format(new Date(chien?.naissance), 'dd/MM/yyyy')}</p>
                                <p>Race : {chien?.race}</p>

                                {/* Liste des activités du chien */}
                                <ul>
                                    {chien?.activites.length > 0 ? (
                                        chien.activites
                                            .map((activite, activiteIndex) => (
                                                <li key={activiteIndex}>
                                                    <p>{activite?.nomActivites} {activite?.level ? `au niveau ${activite.level}` : ''}</p>
                                                </li>
                                            ))
                                    ) : (
                                        ""
                                    )}
                                </ul>

                                <NavLink to="/RegistrationActivities" title='inscrire mon chien à une nouvelle activité'>
                                    <Button content="Ajouter une activité" />
                                </NavLink>

                                <div className={`${styles.sup}`} onClick={() => showModal(chien.idChien)} >
                                    <i className="fa-solid fa-circle-xmark orangeStroke"></i>
                                    <p>supprimer {chien?.nomChien} de ce compte</p>
                                </div>


                                {
                                    modalVisible && selectedDogId == chien.idChien &&

                                    <Modal message={`Vous allez supprimer ${chien?.nomChien} de ce compte. Souhaitez vous continuer ?`}
                                        onCancel={() => showModal(chien.idChien)}
                                        onConfirm={() => deleteDogFront(selectedDogId)}>
                                        {console.log("Rendering Modal")};
                                    </Modal>
                                }
                            </div>
                        ))}
                    </>
                )}

            <form onSubmit={handleSubmit()}>
                {/* --- --- --- --- ---> I N P U T . D O G S . A V E C . L A B E L  <--- --- --- --- --- */}
                <label className="add" htmlFor="chien" >
                    <span className='titreArticle'>Ajouter un chien</span>
                    <Button className="btn" content=" + " onClick={addChien} type="button" />
                </label>

                <div className={styles.ajoutChien}>
                    {fields.map((dog, index) => (
                        <div className={` ${styles.texte} box`} style={{ marginBottom: "5%" }}>
                            <ul>
                                <li key={dog.idDog}>
                                    {/* ---> NOM - DU - CHIEN <--- */}
                                    <div className="oneInput">
                                        <label htmlFor="nomChien">Nom du chien</label>
                                        <input {...register(`chiens.[${index}].nomChien`)} type="text" id="nomChien" />

                                        {errors?.nomChien && (
                                            <p style={{ color: "red" }}> {errors.nomChien.message} </p>
                                        )}
                                    </div>

                                    {/* ---> DATE - DE - NAISSANCE <--- */}
                                    <div className="oneInput">
                                        <label htmlFor="naissance">Date de naissance</label>
                                        <input {...register(`chiens.[${index}].naissance`)} type="date" id="naissance" />

                                        {errors?.naissance && (
                                            <p style={{ color: "red" }}> {errors.naissance.message} </p>
                                        )}
                                    </div>

                                    {/* ---> RACE - DU - CHIEN <--- */}
                                    <div className="oneInput">
                                        <label htmlFor="race">Race</label>
                                        <input {...register(`chiens.[${index}].race`)} type="text" id="race" />

                                        {errors?.race && (
                                            <p style={{ color: "red" }}> {errors.race.message} </p>
                                        )}
                                    </div>

                                    <Button className="btn" onClick={() => deleteChien(index)} content="-" type="button" />

                                </li>
                            </ul>
                        </div>
                    ))}
                </div>

                {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}

                {feedback && <p className={`mb10 mt20 feedback`}>{feedback}</p>}

                {feedbackGood && <p className={`mb10 mt20 feedbackGood`}>{feedbackGood}</p>}

                {fields.length > 0 && <Button content="Ajouter" onClick={() => submitDogs()} />}
            </form>
        </>
    );
}
