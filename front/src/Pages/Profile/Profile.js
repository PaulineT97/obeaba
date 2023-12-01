import React, { useState } from 'react'
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
import { updateUser } from "../../apis/users";

export default function Profile() {

    //ANCHOR - Constantes

    const { user } = useContext(AuthContext);
    const [modify, setModify] = useState(false);

    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const navigate = useNavigate();

    const yupSchema = yup.object({
        nom: yup.string().required(" champ obligatoire").min(2, "le champ doit contenir 2 caractères minimum").max(12, "le champ doit contenir 12 caractères maximum"),
        prenom: yup.string().required(" champ obligatoire").min(2, "le champ doit contenir 2 caractères minimum").max(12, "le champ doit contenir 12 caractères maximum"),
        email: yup.string().required(" champ obligatoire").email("ce mail n'est pas valide"),
    });

    const {
        register,
        handleSubmit,
        reset,
        control,
        getValues,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm({
        // defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });

    const { fields, append, remove } = useFieldArray({
        name: "chiens",
        control,
    })

    //ANCHOR - Fonctions 

    function addChien() {
        append({
            nomChien: "",
            naissance: "",
            race: "",
        });
    }

    function deleteChien(id) {
        remove(id);
    }

    function modifyOnClick() {
        setModify(!modify);
    }

    async function submit() {
        // console.log("Submitting form with values:");
        setFeedback("");
        const values = getValues();
        const formData = new FormData();

        // Ajoutez chaque champ individuellement à FormData
        formData.append("idAdher", values.idAdher);
        formData.append("nom", values.nom);
        formData.append("prenom", values.prenom);
        formData.append("email", values.email);

        try {
            const actualUser = await updateUser(formData);

            if (actualUser.message) {
                setFeedback(actualUser.message);
            } else {
                setFeedbackGood(actualUser.messageGood);
                // reset(defaultValues);
                setTimeout(() => {
                    navigate("/Profile");
                }, 2000);
            }
        } catch (error) {
            console.error(error);
        }
    }
    console.log(user);
    return (
        <>
            < div style={{ backgroundImage: `url(${HeadProfile})` }} className={`${styles.banniere}`}>
                <div className='overlay' ></div>
                <h1 className='titreBanniere'>Mon compte</h1>
            </div >

            <main>
                <div className={styles.container}>
                    <h2 className='titreArticle'>Bienvenue {user.prenom}</h2>

                    <div className={`${styles.box} shadow`} >
                        <div className={styles.options}>
                            <div className={styles.button}>
                                {modify ? <Button content="annuler les modifications" onClick={() => modifyOnClick()} /> : <Button content="modifier mes informations" onClick={() => modifyOnClick()} />}

                            </div>

                            <div className={`${styles.sup}`} >
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
                                        <input {...register("nom")} type="text" id="nom" placeholder={user.nom} />

                                        {errors?.nom && (
                                            <p style={{ color: "red" }}> {errors.nom.message} </p>
                                        )}
                                    </div>

                                    {/* --- --- --- --- ---> I N P U T . F I R S T N A M E . A V E C . L A B E L  <--- --- --- --- --- */}
                                    <div className="oneInput">
                                        <label htmlFor="prenom">Prénom</label>
                                        <input {...register("prenom")} type="text" id="prenom" placeholder={user.prenom} />

                                        {errors?.prenom && (
                                            <p style={{ color: "red" }}> {errors.prenom.message} </p>
                                        )}
                                    </div>

                                    {/* --- --- --- --- ---> I N P U T . E M A I L . A V E C . L A B E L  <--- --- --- --- --- */}
                                    <div className="oneInput">
                                        <label htmlFor="email">Adresse mail</label>
                                        <input {...register("email")} type="text" id="email" placeholder={user.email} />

                                        {errors?.email && (
                                            <p style={{ color: "red" }}> {errors.email.message} </p>
                                        )}
                                    </div>
                                        <Button content='enregistrer les modifications' className='send' />

                                </form> :
                                <>
                                    <p>Nom : {user.nom}</p>
                                    <p>Prénom : {user.prenom}</p>
                                    <p>Adresse mail : {user.email}</p>
                                    <NavLink style={{ fontStyle: 'italic' }}>Modifier mon mot de passe</NavLink>
                                </>
                        }
                    </div>
                    {/* {user.chiens.map((c, i) => (
                    <div className={`${styles.box}`} >
                        <h2 className='titreArticle'>{c.nomChien}</h2>
                        <p>Date de naissance : {format(new Date(c.naissance), 'dd/MM/yyyy')}</p>
                        <p>Race : {c.race}</p>
                        <p>Participe aux activités suivantes :</p>
                        {user.chien.activites.map((a, i) => (
                            <div>
                                <p>{a.nomActivites} {a.niveau === 1 ? ("au niveau découverte") : a.niveau === 2 ? ("au niveau intermédiaire") : a.niveau === 3 ? ("au niveau confirmé") : ("")}</p>
                            </div>
                        ))}
                        <div className={`${styles.sup}`} >
                            <i className="fa-solid fa-circle-xmark orangeStroke"></i>
                            <p>supprimer mon chien de ce compte</p>
                        </div>
                        <button>Modifier</button>
                    </div>
                ))} */}

                    <form>
                        {/* --- --- --- --- ---> I N P U T . D O G S . A V E C . L A B E L  <--- --- --- --- --- */}
                        <div>
                            <label className="add" htmlFor="chien" >
                                <span className='titreArticle'>Ajouter un chien</span>
                                <Button className="btn" content=" + " onClick={addChien} type="button" />
                            </label>

                            <ul>
                                {fields.map((dog, index) => (
                                    <li key={dog.idDog}>
                                        {/* ---> NOM - DU - CHIEN <--- */}
                                        <div className="oneInput">
                                            <label htmlFor="nomChien">Nom du chien</label>
                                            <input {...register("nomChien")} type="text" id="nomChien" />

                                            {errors?.nomChien && (
                                                <p style={{ color: "red" }}> {errors.nomChien.message} </p>
                                            )}
                                        </div>

                                        {/* ---> DATE - DE - NAISSANCE <--- */}
                                        <div className="oneInput">
                                            <label htmlFor="naissance">Date de naissance</label>
                                            <input {...register("naissance")} type="date" id="naissance" />

                                            {errors?.naissance && (
                                                <p style={{ color: "red" }}> {errors.naissance.message} </p>
                                            )}
                                        </div>

                                        {/* ---> RACE - DU - CHIEN <--- */}
                                        <div className="oneInput">
                                            <label htmlFor="race">Race</label>
                                            <input {...register("race")} type="text" id="race" />

                                            {errors?.race && (
                                                <p style={{ color: "red" }}> {errors.race.message} </p>
                                            )}
                                        </div>

                                        <Button className="btn" onClick={() => deleteChien(index)} content="-" type="button" />

                                    </li>
                                ))}
                            </ul>
                        </div>
                    </form>

                </div>
            </main >
        </>
    )
}