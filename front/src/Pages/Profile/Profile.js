import React, { useState, useEffect } from 'react';
import HeadProfile from "../../Assets/Images/headerMonCompte.jpg";
import styles from "./Profile.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { format } from 'date-fns';
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from '../../Components/button/Button';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateUser, deleteUserBack } from "../../apis/users";
import DogsSection from './DogSection/DogsSection';

export default function Profile() {

    //ANCHOR - Constantes

    const { user, setUser } = useContext(AuthContext);
    const [modify, setModify] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(user);

    console.log(updatedUser);
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const yupSchema = yup.object({
        nom: yup.string().required(" champ obligatoire").min(2, "le champ doit contenir 2 caractères minimum").max(12, "le champ doit contenir 12 caractères maximum"),
        prenom: yup.string().required(" champ obligatoire").min(2, "le champ doit contenir 2 caractères minimum").max(12, "le champ doit contenir 12 caractères maximum"),
        email: yup.string().required(" champ obligatoire").email("ce mail n'est pas valide"),
        nomChien: yup.string().required(" champ obligatoire"),
        naissance: yup.date().required(" champ obligatoire"),
        race: yup.string().required(" champ obligatoire"),
    });

    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { errors },
        clearErrors,
    } = useForm({
        defaultValues: {
            nom: updatedUser.adherent.nom,
            prenom: updatedUser.adherent.prenom,
            email: updatedUser.adherent.email,
            chiens: "",
        },
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });

    const { fields, append, remove } = useFieldArray({
        name: "chiens",
        control,
    })


    //ANCHOR - Fonctions 

    useEffect(() => {
        if (Array.isArray(updatedUser?.nouveauxChiens) && updatedUser.nouveauxChiens.length > 0) {
            setUpdatedUser((updatedUser) => {
                return {
                    ...updatedUser,
                    chiens: [...updatedUser.chiens, ...updatedUser.nouveauxChiens.map(chien => ({
                        ...chien,
                        naissance: format(new Date(chien.naissance), 'dd/MM/yyyy'), // Formater la date ici
                    }))],
                };
            });
        }
    }, [updatedUser.nouveauxChiens]);

    function modifyOnClick() {
        setModify(!modify);
    }

    async function submit() {
        setFeedback("");
        clearErrors();
        const values = getValues();
        const formData = new FormData();

        values.idAdher = updatedUser.idAdher;
        formData.append("nom", values.nom);
        formData.append("prenom", values.prenom);
        formData.append("email", values.email);

        try {
            console.log(values);
            const actualUser = await updateUser(values);
            console.log(`actual user is : ${actualUser}`);

            if (actualUser.message) {
                setFeedback(actualUser.message);
            } else {
                setFeedbackGood(actualUser.messageGood);
                setTimeout(() => {
                    navigate("/Profile");
                    setModify(false);
                }, 2000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteUser() {
        const idAd = user.adherent.idAdher
        console.log('you clicked', idAd);
        try {

            const response = await deleteUserBack(idAd);

            if (response.messageGood) {

                setFeedbackGood(response.messageGood);
                await logout;

                setTimeout(() => {
                    setFeedbackGood("");
                    setUser(null);
                    navigate("/");
                    
                }, 3000);
            } else {
                setFeedback('Erreur lors de la suppression du compte adhérent.');
            }
        } catch (error) {
            console.error(error);
        }

    }

    console.log(updateUser);


    return (
        <>
            < div style={{ backgroundImage: `url(${HeadProfile})` }} className={`${styles.banniere}`}>
                <div className='overlay' ></div>
                <h1 className='titreBanniere'>Mon compte</h1>
            </div >

            <main>
                <div className={styles.container}>
                    <h2 className='titreArticle'>Bienvenue {updatedUser?.adherent?.prenom}</h2>

                    <div className={`${styles.texte} box`} >
                        <div className={styles.options}>
                            <div className={styles.button}>
                                {modify ? <Button content="annuler les modifications" onClick={() => modifyOnClick()} /> : <Button content="modifier mes informations" onClick={() => modifyOnClick()} />}

                            </div>

                            <div onClick={() => deleteUser()} className={`${styles.sup}`} style={{ width: "45%" }} >
                                <i className="fa-solid fa-circle-xmark orangeStroke"></i>
                                <p>supprimer mon compte</p>
                            </div>

                        </div>
                        {
                            modify ?
                                <form onSubmit={handleSubmit(submit)} >
                                    {/* --- --- --- --- ---> I N P U T . N A M E . A V E C . L A B E L  <--- --- --- --- --- */}
                                    <div className="oneInput">
                                        <label htmlFor="nom">Nom</label>
                                        <input {...register("nom")} type="text" id="nom" />

                                        {errors?.nom && (
                                            <p style={{ color: "red" }}> {errors.nom.message} </p>
                                        )}
                                    </div>

                                    {/* --- --- --- --- ---> I N P U T . F I R S T N A M E . A V E C . L A B E L  <--- --- --- --- --- */}
                                    <div className="oneInput">
                                        <label htmlFor="prenom">Prénom</label>
                                        <input {...register("prenom")} type="text" id="prenom" />

                                        {errors?.prenom && (
                                            <p style={{ color: "red" }}> {errors.prenom.message} </p>
                                        )}
                                    </div>

                                    {/* --- --- --- --- ---> I N P U T . E M A I L . A V E C . L A B E L  <--- --- --- --- --- */}
                                    <div className="oneInput">
                                        <label htmlFor="email">Adresse mail</label>
                                        <input {...register("email")} type="text" id="email" />

                                        {errors?.email && (
                                            <p style={{ color: "red" }}> {errors.email.message} </p>
                                        )}
                                    </div>
                                    {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}

                                    {feedback && <p className={`mb10 mt20 feedback`}>{feedback}</p>}

                                    {feedbackGood && <p className={`mb10 mt20 feedbackGood`}>{feedbackGood}</p>}

                                    <Button content='enregistrer les modifications' className='send' />

                                </form> :
                                <>
                                    <p>Nom : {updatedUser?.adherent?.nom}</p>
                                    <p>Prénom : {updatedUser?.adherent?.prenom}</p>
                                    <p>Adresse mail : {updatedUser?.adherent?.email}</p>
                                    <NavLink title='modifier mon mot de passe' to="/NewPassword" style={{ fontStyle: 'italic' }}>Modifier mon mot de passe</NavLink>
                                </>
                        }
                    </div>

                    {/* Affichage des chiens */}

                        <DogsSection
                            fields={fields}
                            append={append}
                            remove={remove}
                            getValues={getValues}
                            errors={errors}
                            feedback={feedback}
                            feedbackGood={feedbackGood}
                            setFeedback={setFeedback}
                            setFeedbackGood={setFeedbackGood}
                            updatedUser={updatedUser}
                            setUpdatedUser={setUpdatedUser}
                            navigate={navigate}
                            register={register}
                            clearErrors={clearErrors}
                            handleSubmit={handleSubmit}
                        />
                    
                </div>
            </main >
        </>
    )
}