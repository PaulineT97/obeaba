import React, { useContext } from 'react'
import styles from "./Forms.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';
import Button from '../../Components/button/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';

export default function Login() {
    // --- --- --- --- ---> C O N S T A N T E S <--- --- --- --- --- //

    const navigate = useNavigate();

    const defaultValues = {
        email: "",
        motdepasse: "",
    }
    const yupSchema = yup.object({
        email: yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Votre email n'est pas valide"),
        motdepasse: yup.string().required("Mot de passe obligatoire"),
    });

    const { register, handleSubmit, setError, clearErrors, reset, formState: { errors }, } = useForm({
        defaultValues,
        resolver: yupResolver(yupSchema),
    });

    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");

    const { login } = useContext(AuthContext);


    // --- --- --- --- --->   fonction button   <--- --- --- --- --- //

    async function submit(values) {
        setFeedback("");

        try {
            clearErrors();
            const userBack = await login(values);
            console.log(userBack);

            setFeedbackGood("Connexion réussie, vous allez être redirigés");
            reset(defaultValues);
            setTimeout(() => {
                navigate("/Profile");
            },
                2000);

        } catch (error) {
            setError("generic", { type: "generic", message: error });
        }
    }
    // let user = {};
    // user.nom = userBack[0].nom;
    // user.prenom = userBack[0].prenom;
    // user.email = userBack[0].email;
    // user.chien = [];
    // for (let i = 0; i < userBack.length; i++) {
    //     let nomChien = userBack[i].nomChien;
    //     let naissance = userBack[i].naissance;
    //     let race = userBack[i].race;
    //     user.chien.push({ nomChien, naissance, race });
    // }
    // user.chien.activites = [];
    // for (let i = 0; i < userBack.length; i++) {
    //     let nomActivites = userBack[i].nomActivites;
    //     let niveau = userBack[i].level;

    //     user.chien.activites.push({ nomActivites, niveau });
    // }
    // getUser(user);
    // userBack.map((user, index) => (user.dog[index] = user.dogName));


    // --- --- --- --- --->   R E T U R N   <--- --- --- --- --- //
    return (
        <form onSubmit={handleSubmit(submit)} >

            <div className="oneInput">
                <label htmlFor="email">Adresse mail</label>
                <input {...register("email")} type="text" id="email" />

                {errors?.email && (
                    <p style={{ color: "red" }}> {errors.email.message} </p>
                )}
            </div>

            <div className="oneInput">
                <label htmlFor="motdepasse">Mot de passe</label>
                <input {...register("motdepasse")} type="password" id="motdepasse" />

                {errors?.motdepasse && (
                    <p style={{ color: "red" }}> {errors.motdepasse.message} </p>
                )}
            </div>

            <NavLink to="/NewPassword" style={{ fontSize: '0.9rem', fontStyle: 'italic' }}> Mot de passe oublié ? </NavLink>

            {feedback && <p className={`mb10 mt20 ${styles.feedback}`}>{feedback}</p>}

            {feedbackGood && <p className={`mb10 mt20 ${styles.feedbackGood}`}>{feedbackGood}</p>}
            <Button content="Voir mon profil" className="send" />
        </form>
    )
}
