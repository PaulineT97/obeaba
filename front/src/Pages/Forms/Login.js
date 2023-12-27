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
            console.log("this is the user back", userBack);

            setFeedbackGood("Connexion réussie, vous allez être redirigés");
            reset(defaultValues);
            setTimeout(() => {
                userBack.adherent.admin ? navigate("/Admin") : navigate("/Profile");
            },
                2000);

        } catch (error) {
            setError("generic", { type: "generic", message: error });
        }
    }

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

            <NavLink to="/NewPassword" title='mot de passe oublié ?' style={{ fontSize: '0.9rem', fontStyle: 'italic' }}> Mot de passe oublié ? </NavLink>

            {feedback && <p className={`feedback`}>{feedback}</p>}

            {feedbackGood && <p className={`feedbackGood`}>{feedbackGood}</p>}
            <Button content="Voir mon profil" title="accéder à ma page de profil" className="send" />
        </form>
    )
}
