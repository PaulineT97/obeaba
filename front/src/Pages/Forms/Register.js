import React, { useState } from 'react';
import styles from "./Forms.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from '../../Components/button/Button';
import { useNavigate } from 'react-router-dom';
import { createUser } from "../../apis/users";

export default function Register() {

    //ANCHOR - Constantes

    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const navigate = useNavigate();

    const yupSchema = yup.object({
        nom: yup.string().required(" champ obligatoire").min(2, "le champ doit contenir 2 caractères minimum").max(12, "le champ doit contenir 12 caractères maximum"),
        prenom: yup.string().required(" champ obligatoire").min(2, "le champ doit contenir 2 caractères minimum").max(12, "le champ doit contenir 12 caractères maximum"),
        email: yup.string().required(" champ obligatoire").matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Votre email n'est pas valide"),
        motdepasse: yup.string().required("Mot de passe obligatoire").min(5, "mot de passe trop court").max(10, "mot de passe trop long"),
        confirmMdp: yup.string().required("vous devez confirmer votre mdp").oneOf([yup.ref("motdepasse", ""), "les mots de passe doivent être identiques"]),
        cgu: yup.boolean().required("vous devez accepter les CGU"),
        // nomChien: yup.string().required(" champ obligatoire"),
    });

    const defaultValues = {
        nom: "",
        prenom: "",
        email: "",
        motdepasse: "",
        confirmMdp: "",
        cgu: "",
        chiens: "",
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

    async function submit() {
        setFeedback("");
        clearErrors();
        const values = getValues();
        const formData = new FormData();

        formData.append("nom", values.nom);
        formData.append("prenom", values.prenom);
        formData.append("email", values.email);
        formData.append("motdepasse", values.motdepasse);

        if (values.chiens) {
            values.chiens.forEach((c, index) => {
                formData.append("nomChien", values.chiens[index].nomChien);
                formData.append("naissance", values.chiens[index].naissance);
                formData.append("race", values.chiens[index].race);
            })
        }

        // Console.log pour vérifier le contenu de FormData
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        try {
            const newUser = await createUser(values);

            if (newUser.message) {
                setFeedback(newUser.message);
            } else {
                setFeedbackGood(newUser.messageGood);
                reset(defaultValues);
                setTimeout(() => {
                    navigate("/Forms");
                }, 2000);
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (

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


            {/* --- --- --- --- ---> I N P U T . D O G S . A V E C . L A B E L  <--- --- --- --- --- */}
            <div>
                <label className="add" htmlFor="chien" >
                    <span className='titreArticle'>Ajouter un chien</span>
                    <Button className="btn" content=" + " onClick={addChien} type="button" />
                </label>

                <ul>
                    {fields.map((c, index) => (
                        <li key={c.id}>
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
                    ))}
                </ul>


            </div>




            {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}

            {feedback && <p className={`mb10 mt20 ${styles.feedback}`}>{feedback}</p>}

            {feedbackGood && <p className={`mb10 mt20 ${styles.feedbackGood}`}>{feedbackGood}</p>}


            {/* --- --- --- --- ---> I N P U T . C G U  <--- --- --- --- --- */}
            <div className="cgu">
                <label htmlFor="cgu">J'ai lu et j'accepte les conditions générales d'utilisation</label>
                <input {...register("cgu")} type="checkbox" id="cgu" />

                {errors?.cgu && (
                    <p style={{ color: "red" }}> {errors.cgu.message} </p>
                )}
            </div>

            {/* --- --- --- --- ---> B U T T O N <--- --- --- --- --- */}

            <Button content="Finaliser l'inscription" />

        </form>

    )
}
