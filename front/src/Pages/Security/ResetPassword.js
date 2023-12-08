import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/button/Button';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {

    //ANCHOR - Constantes

    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');

    const yupSchema = yup.object({
        motdepasse: yup.string().required("Mot de passe obligatoire").min(5, "mot de passe trop court").max(10, "mot de passe trop long"),
        confirmMdp: yup.string().required("vous devez confirmer votre mdp").oneOf([yup.ref("motdepasse", ""), "les mots de passe doivent être identiques"]),
    });
    const defaultValues = {
        motdepasse: "",
        confirmMdp: "",
    };
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
        clearErrors,
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });

    //ANCHOR - Fonctions 
    async function submit() {

        setFeedback("");
        clearErrors();
        const values = getValues();
        const formData = new FormData();
        values.email = email;
        formData.append("motdepasse", values.motdepasse);

        try {
            console.log(values);
            const response = await fetch(`http://localhost:8000/api/users/changePassword/${values.email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const updateUser = await response.json();
                if (updateUser.message) {
                    setFeedback(updateUser.message);
                } else {
                    setFeedbackGood(updateUser.messageGood);
                    reset(defaultValues);
                    setTimeout(() => {
                        navigate("/Profile");
                    }, 2000);
                }
            } else {
                // Gérer les erreurs si la réponse n'est pas "ok"
                console.error(`Erreur HTTP : ${response.status}`);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de l'envoi de la requête :", error);
        }
    }


    return (
        <main>
            <div className='flex-fill d-flex flex-column justify-content-center align-items-center'>
                <h1 className='titreArticle'> Renouveler mon mot de passe </h1>

                <form onSubmit={handleSubmit(submit)} >
                    {/* --- --- --- --- ---> I N P U T . P A S S W O R D . A V E C . L A B E L  <--- --- --- --- --- */}
                    <div className="oneInput">
                        <label htmlFor="motdepasse">Mot de passe</label>
                        <input {...register("motdepasse")} type="password" id="motdepasse" />

                        {errors?.motdepasse && (
                            <p style={{ color: "red" }}> {errors.motdepasse.message} </p>
                        )}
                    </div>

                    {/* --- --- --- --- ---> I N P U T . C O N F I R M . P A S S W O R D . A V E C . L A B E L  <--- --- --- --- --- */}
                    <div className="oneInput">
                        <label htmlFor="confirmMdp">Confirmez votre mot de passe</label>
                        <input {...register("confirmMdp")} type="password" id="confirmMdp" />

                        {errors?.confirmMdp && (
                            <p style={{ color: "red" }}> {errors.confirmMdp.message} </p>
                        )}
                    </div>
                    {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}

                    {feedback && <p className={`feedback`}>{feedback}</p>}

                    {feedbackGood && <p className={`feedbackGood`}>{feedbackGood}</p>}

                    <Button content="Modifier mon mot de passe" className="send" />
                </form>
            </div>
        </main>
    )
}

export default ResetPassword
