import React from 'react';
import styles from "./Forms.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';
import Button from '../../Components/button/Button';
// import Activities from "./activities";

export default function Register({ seeLoginForm }) {


    const yupSchema = yup.object({
        nom: yup.string().required(" champ obligatoire").min(2, "le champ doit contenir 2 caractères minimum").max(12, "le champ doit contenir 12 caractères maximum"),
        prenom: yup.string().required(" champ obligatoire").min(2, "le champ doit contenir 2 caractères minimum").max(12, "le champ doit contenir 12 caractères maximum"),
        email: yup.string().required(" champ obligatoire").email("ce mail n'est pas valide"),
        motdepasse: yup.string().required("Mot de passe obligatoire").min(5, "mot de passe trop court").max(10, "mot de passe trop long"),
        confirmMdp: yup.string().required("vous devez confirmer votre mdp").oneOf([yup.ref("motdepasse", ""), "les mots de passe doivent être identiques"]),
        cgu: yup.boolean().required("vous devez accepter les CGU"),
        nomChien: yup.string().required(" champ obligatoire"),
    });

    const defaultValues = {
        nom: "",
        prenom: "",
        email: "",
        motdepasse: "",
        confirmMdp: "",
        cgu: "",
        chien: "",
    };

    //isSubmitted permet de ne valider qu'une fois le formulaire
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting }, } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });

    const { fields, append, remove } = useFieldArray({
        name: "chien",
        control,
    })

    const [feedback, setFeedback] = useState();
    const [feedbackGood, setFeedbackGood] = useState();

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

    async function submit(values) {
        setFeedback("");
        try {
            const response = await fetch("http://localhost:8000/api/users/register", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            })
            console.log(values);
            if (response.ok) {
                const userBack = await response.json();
                if (userBack.message) {
                    setFeedback(userBack.message)
                } else {
                    setFeedbackGood(userBack.messageGood);
                    reset(defaultValues);
                    setTimeout(() => {
                        seeLoginForm();
                    }, 1500)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (

        <form onSubmit={handleSubmit(submit)} action="">

            {/* --- --- --- --- ---> I N P U T . N A M E . A V E C . L A B E L  <--- --- --- --- --- */}
            <div className={styles.oneInput}>
                <label htmlFor="nom">Nom</label>
                <input {...register("nom")} type="text" id="nom" />

                {errors?.nom && (
                    <p style={{ color: "red" }}> {errors.nom.message} </p>
                )}
            </div>

            {/* --- --- --- --- ---> I N P U T . F I R S T N A M E . A V E C . L A B E L  <--- --- --- --- --- */}
            <div className={styles.oneInput}>
                <label htmlFor="prenom">Prénom</label>
                <input {...register("prenom")} type="text" id="prenom" />

                {errors?.prenom && (
                    <p style={{ color: "red" }}> {errors.prenom.message} </p>
                )}
            </div>

            {/* --- --- --- --- ---> I N P U T . E M A I L . A V E C . L A B E L  <--- --- --- --- --- */}
            <div className={styles.oneInput}>
                <label htmlFor="email">Adresse mail</label>
                <input {...register("email")} type="text" id="email" />

                {errors?.email && (
                    <p style={{ color: "red" }}> {errors.email.message} </p>
                )}
            </div>

            {/* --- --- --- --- ---> I N P U T . P A S S W O R D . A V E C . L A B E L  <--- --- --- --- --- */}
            <div className={styles.oneInput}>
                <label htmlFor="motdepasse">Mot de passe</label>
                <input {...register("motdepasse")} type="password" id="motdepasse" />

                {errors?.motdepasse && (
                    <p style={{ color: "red" }}> {errors.motdepasse.message} </p>
                )}
            </div>

            {/* --- --- --- --- ---> I N P U T . C O N F I R M . P A S S W O R D . A V E C . L A B E L  <--- --- --- --- --- */}
            <div className={styles.oneInput}>
                <label htmlFor="confirmMdp">Confirmez votre mot de passe</label>
                <input {...register("confirmMdp")} type="password" id="confirmMdp" />

                {errors?.confirmMdp && (
                    <p style={{ color: "red" }}> {errors.confirmMdp.message} </p>
                )}
            </div>


            {/* --- --- --- --- ---> I N P U T . D O G S . A V E C . L A B E L  <--- --- --- --- --- */}
            <div>
                <label className={styles.add} htmlFor="chien" >
                    <span className='titreArticle'>Ajouter un chien</span>
                    <Button className={styles.btn} content=" + " onClick={addChien} />
                </label>

                <ul>
                    {fields.map((dog, index) => (
                        <li key={dog.idDog}>
                            {/* ---> NOM - DU - CHIEN <--- */}
                            <div className={styles.oneInput}>
                                <label htmlFor="nomChien">Nom du chien</label>
                                <input {...register("nomChien")} type="text" id="nomChien" />

                                {errors?.nomChien && (
                                    <p style={{ color: "red" }}> {errors.nomChien.message} </p>
                                )}
                            </div>

                            {/* ---> DATE - DE - NAISSANCE <--- */}
                            <div className={styles.oneInput}>
                                <label htmlFor="naissance">Date de naissance</label>
                                <input {...register("naissance")} type="date" id="naissance" />

                                {errors?.naissance && (
                                    <p style={{ color: "red" }}> {errors.naissance.message} </p>
                                )}
                            </div>

                            {/* ---> RACE - DU - CHIEN <--- */}
                            <div className={styles.oneInput}>
                                <label htmlFor="race">Race</label>
                                <input {...register("race")} type="text" id="race" />

                                {errors?.race && (
                                    <p style={{ color: "red" }}> {errors.race.message} </p>
                                )}
                            </div>

                            <Button className={styles.btn} onClick={() => deleteChien(index)} content="-" />

                        </li>
                    ))}
                </ul>


            </div>




            {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}

            {feedback && <p className={`mb10 mt20 ${styles.feedback}`}>{feedback}</p>}

            {feedbackGood && <p className={`mb10 mt20 ${styles.feedbackGood}`}>{feedbackGood}</p>}


            {/* --- --- --- --- ---> I N P U T . C G U  <--- --- --- --- --- */}
            <div className={styles.cgu}>
                <label htmlFor="cgu">J'ai lu et j'accepte les conditions générales d'utilisation</label>
                <input {...register("cgu")} type="checkbox" id="cgu" />

                {errors?.cgu && (
                    <p style={{ color: "red" }}> {errors.cgu.message} </p>
                )}
            </div>

            {/* --- --- --- --- ---> B U T T O N <--- --- --- --- --- */}

            <Button disabled={isSubmitting} content="Finaliser l'inscription"/>

        </form>

    )
}
