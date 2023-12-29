import React, { useState } from 'react';
import styles from "./Forms.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from '../../Components/button/Button';
import { useNavigate } from 'react-router-dom';
import { createUser } from "../../apis/users";
import { Link } from 'react-router-dom';

export default function Register() {

    //ANCHOR - Constantes

    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const navigate = useNavigate();
    const [cguChecked, setCguChecked] = useState(false);

    const yupSchema = yup.object({
        nom: yup
            .string()
            .required(" champ obligatoire")
            .min(2, "le champ doit contenir 2 caractères minimum")
            .max(12, "le champ doit contenir 12 caractères maximum"),
        prenom: yup
            .string()
            .required(" champ obligatoire")
            .min(2, "le champ doit contenir 2 caractères minimum")
            .max(12, "le champ doit contenir 12 caractères maximum"),
        email: yup
            .string()
            .required(" champ obligatoire")
            .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Votre email n'est pas valide"),
        motdepasse: yup
            .string()
            .required("Mot de passe obligatoire")
            .min(12, "mot de passe trop court")
            .max(64, "mot de passe trop long")
            .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, "Doit contenir au moins une majuscule, un chiffre et un caractère spécial"),
        confirmMdp: yup
            .string()
            .required("vous devez confirmer votre mot de passe")
            .oneOf([yup.ref("motdepasse"), null], "Les mots de passe doivent être identiques"),
        cgu: yup
            .boolean("Vous devez accepter les CGU")
            .oneOf([true], "Vous devez accepter les CGU")
            .required("Vous devez accepter les CGU"),
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
        <>
            <div className="notice">
                <p>
                    Tous les champs sont obligatoires. Votre mot de passe doit contenir 12 caractères dont au minimum une majuscule, un chiffre et un caractère spécial.
                </p>
            </div>
            <form onSubmit={handleSubmit(submit)} >

                {/* --- --- --- --- ---> I N P U T . N A M E . A V E C . L A B E L  <--- --- --- --- --- */}
                <div className="oneInput">
                    <label htmlFor="nom">Nom</label>
                    <input {...register("nom")} type="text" id="nom" />

                    {errors?.nom && (
                        <p className={`feedback`}> {errors.nom.message} </p>
                    )}
                </div>

                {/* --- --- --- --- ---> I N P U T . F I R S T N A M E . A V E C . L A B E L  <--- --- --- --- --- */}
                <div className="oneInput">
                    <label htmlFor="prenom">Prénom</label>
                    <input {...register("prenom")} type="text" id="prenom" />

                    {errors?.prenom && (
                        <p className={`feedback`}> {errors.prenom.message} </p>
                    )}
                </div>

                {/* --- --- --- --- ---> I N P U T . E M A I L . A V E C . L A B E L  <--- --- --- --- --- */}
                <div className="oneInput">
                    <label htmlFor="email">Adresse mail</label>
                    <input {...register("email")} type="text" id="email" />

                    {errors?.email && (
                        <p className={`feedback`}> {errors.email.message} </p>
                    )}
                </div>

                {/* --- --- --- --- ---> I N P U T . P A S S W O R D . A V E C . L A B E L  <--- --- --- --- --- */}
                <div className="oneInput">
                    <label htmlFor="motdepasse">Mot de passe</label>
                    <input {...register("motdepasse")} type="password" id="motdepasse" />

                    {errors?.motdepasse && (
                        <p className={`feedback`}> {errors.motdepasse.message} </p>
                    )}
                </div>

                {/* --- --- --- --- ---> I N P U T . C O N F I R M . P A S S W O R D . A V E C . L A B E L  <--- --- --- --- --- */}
                <div className="oneInput">
                    <label htmlFor="confirmMdp">Confirmez votre mot de passe</label>
                    <input {...register("confirmMdp")} type="password" id="confirmMdp" />

                    {errors?.confirmMdp && (
                        <p className={`feedback`}> {errors.confirmMdp.message} </p>
                    )}
                </div>


                {/* --- --- --- --- ---> I N P U T . D O G S . A V E C . L A B E L  <--- --- --- --- --- */}
                <div>
                    <label className="add" htmlFor="chien" >
                        <span className='titreArticle'>Ajouter un chien</span>
                        <Button className="btn" title="ajouter un chien" content=" + " onClick={addChien} type="button" />
                    </label>

                    <ul>
                        {fields.map((c, index) => (
                            <li key={c.id}>
                                {/* ---> NOM - DU - CHIEN <--- */}
                                <div className="oneInput">
                                    <label htmlFor="nomChien">Nom du chien</label>
                                    <input {...register(`chiens.[${index}].nomChien`)} type="text" id="nomChien" />

                                    {errors?.nomChien && (
                                        <p className={`feedback`}> {errors.nomChien.message} </p>
                                    )}
                                </div>

                                {/* ---> DATE - DE - NAISSANCE <--- */}
                                <div className="oneInput">
                                    <label htmlFor="naissance">Date de naissance</label>
                                    <input {...register(`chiens.[${index}].naissance`)} type="date" id="naissance" />

                                    {errors?.naissance && (
                                        <p className={`feedback`}> {errors.naissance.message} </p>
                                    )}
                                </div>

                                {/* ---> RACE - DU - CHIEN <--- */}
                                <div className="oneInput">
                                    <label htmlFor="race">Race</label>
                                    <input {...register(`chiens.[${index}].race`)} type="text" id="race" />

                                    {errors?.race && (
                                        <p className={`feedback`}> {errors.race.message} </p>
                                    )}
                                </div>

                                <Button className="btn" title="supprimer cette ligne" onClick={() => deleteChien(index)} content="-" type="button" />

                            </li>
                        ))}
                    </ul>


                </div>




                {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}

                {feedback && <p className={`feedback`}>{feedback}</p>}

                {feedbackGood && <p className={`feedbackGood`}>{feedbackGood}</p>}


                {/* --- --- --- --- ---> I N P U T . C G U  <--- --- --- --- --- */}
                <div className="cgu">
                    <input {...register("cgu")} type="checkbox" id="cgu" checked={cguChecked} onChange={(e) => setCguChecked(e.target.checked)} />
                    <label htmlFor="cgu">J'ai lu et j'accepte les <Link to="/CGU" title="accéder aux conditions générales d'utilisation" target="_blank" style={{ textDecoration: "underline", display: 'inline' }}>conditions générales d'utilisation</Link> et la <Link to="/confidentialite" title='accéder à la politique de confidentialité' target="_blank" style={{ textDecoration: "underline", display: 'inline' }}>politique de confidentialité</Link></label>
                </div>
                {errors?.cgu && (
                    <p className={`feedback`}> {errors.cgu.message} </p>
                )}


                {/* --- --- --- --- ---> B U T T O N <--- --- --- --- --- */}

                <Button content="Finaliser l'inscription" title="Finaliser l'inscription" />

            </form>
        </>
    )
}
