import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/button/Button';

const ResetPassword = () => {

    //ANCHOR - Constantes

    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const navigate = useNavigate();

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
        control,
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


        formData.append("motdepasse", values.motdepasse);

        // try {
        //     console.log(values);
        //     // const newUser = await createUser(values);
        //     console.log(newUser);
        //     if (newUser.message) {
        //         setFeedback(newUser.message);
        //     } else {
        //         setFeedbackGood(newUser.messageGood);
        //         reset(defaultValues);
        //         setTimeout(() => {
        //             navigate("/Forms");
        //         }, 2000);
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
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
