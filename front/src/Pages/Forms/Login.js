import React from 'react'
import styles from "./Forms.module.scss";
// import HeadProfile from "../../Assets/Images/headerMonCompte.jpg";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';
import Button from '../../Components/button/Button';
import { NavLink } from 'react-router-dom';


export default function Login({ toggleLogin, getUser }) {
    // --- --- --- --- ---> C O N S T A N T E S <--- --- --- --- --- //
    const defaultValues = {
        email: "",
        motdepasse: "",
    }
    const yupSchema = yup.object({
        email: yup.string().email("Ce mail n'est pas valide"),
        motdepasse: yup.string().required("Mot de passe obligatoire"),
    });

    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        defaultValues,
        resolver: yupResolver(yupSchema),
    });

    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");



    // --- --- --- --- --->   fonction button   <--- --- --- --- --- //

    async function submit(values) {
        setFeedback("")

        try {
            const response = await fetch('http://localhost:8000/api/users/getAdherents', {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" }
            })
            if (response.ok) {

                const userBack = await response.json();
                // setUserProfile(userBack)
                console.log(userBack);
                if (userBack.message) {
                    setFeedback(userBack.message)
                } else {
                    setFeedbackGood("connection réussie, vous allez être redirigés");
                    reset(defaultValues);
                    let user = {};
                    user.nom = userBack[0].nom;
                    user.prenom = userBack[0].prenom;
                    user.email = userBack[0].email;
                    user.chien = [];
                    for (let i = 0; i < userBack.length; i++) {
                        let nomChien = userBack[i].nomChien;
                        let naissance = userBack[i].naissance;
                        let race = userBack[i].race;
                        user.chien.push({ nomChien, naissance, race });
                    }
                    user.chien.activites = [];
                    for (let i = 0; i < userBack.length; i++) {
                        let nomActivites = userBack[i].nomActivites;
                        let niveau = userBack[i].level;

                        user.chien.activites.push({ nomActivites, niveau });
                    }
                    getUser(user);
                    // userBack.map((user, index) => (user.dog[index] = user.dogName));
                    console.log("user modifié", user);
                    setTimeout(() => {
                        toggleLogin();
                    }, 1500)
                }
            }
        } catch (error) {
            console.log(error)
        }

    }

    // --- --- --- --- --->   R E T U R N   <--- --- --- --- --- //
    return (
        <form onSubmit={handleSubmit(submit)} className="">

            <div className={styles.oneInput}>
                <label htmlFor="email">Adresse mail</label>
                <input {...register("email")} type="text" id="email" />

                {errors?.email && (
                    <p style={{ color: "red" }}> {errors.email.message} </p>
                )}
            </div>

            <div className={styles.oneInput}>
                <label htmlFor="motdepasse">Mot de passe</label>
                <input {...register("motdepasse")} type="password" id="motdepasse" />

                {errors?.motdepasse && (
                    <p style={{ color: "red" }}> {errors.motdepasse.message} </p>
                )}
            </div>

            {feedback && <p className={`mb10 mt20 ${styles.feedback}`}>{feedback}</p>}

            {feedbackGood && <p className={`mb10 mt20 ${styles.feedbackGood}`}>{feedbackGood}</p>}
            <Button content="Voir mon profil" className={styles.send} />
        </form>
    )
}
