import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Activities.module.scss";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../Components/button/Button";
import { useNavigate } from "react-router-dom";
import { addActivity } from "../../apis/dogs";

//ANCHOR -  Fonctions utilitaires
const calculateAgeDifference = (selectedChien) => {
    //NOTE - Fonction qui permet d'obtenir l'âge des chiens en mois
    const { naissance } = selectedChien;
    const dateNaissance = new Date(naissance);
    const dateActuelle = new Date();
    return (
        (dateActuelle.getFullYear() - dateNaissance.getFullYear()) * 12 +
        dateActuelle.getMonth() -
        dateNaissance.getMonth()
    );
};

const getActivityLimits = (idActivites) => {
    //NOTE - Fonction qui renvoie les limites d'âge pour chaque niveau d'activité
    switch (idActivites) {
        case 1:
            return { debutant: 2, intermediaire: 10, confirme: 18 };
        case 2:
            return { debutant: 4, intermediaire: 8, confirme: 12 };
        case 3:
            return { debutant: 3, intermediaire: 6, confirme: 12 };
        case 4:
            return { debutant: 6, intermediaire: 12, confirme: 18 };
        default:
            return { debutant: 0, intermediaire: 0, confirme: 0 };
    }
};

export default function Registration() {

    //ANCHOR - Constantes

    const { user } = useContext(AuthContext);
    const [listActivities, setListActivities] = useState([]);
    const [isNotEligible, setIsNotEligible] = useState(false);
    const [isNotEligibleForCurrentActivity, setIsNotEligibleForCurrentActivity] =
        useState([]);
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const navigate = useNavigate();

    // Schéma de validation Yup
    const yupSchema = yup.object({
        nom: yup
            .string()
            .required("champ obligatoire")
            .min(2, "le champ doit contenir 2 caractères minimum")
            .max(12, "le champ doit contenir 12 caractères maximum"),
        prenom: yup
            .string()
            .required("champ obligatoire")
            .min(2, "le champ doit contenir 2 caractères minimum")
            .max(12, "le champ doit contenir 12 caractères maximum"),
        email: yup
            .string()
            .required("champ obligatoire")
            .matches(
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Votre email n'est pas valide"),
        motdepasse: yup
            .string()
            .required("Mot de passe obligatoire")
            .min(5, "mot de passe trop court")
            .max(10, "mot de passe trop long"),
        confirmMdp: yup
            .string()
            .required("vous devez confirmer votre mdp")
            .oneOf([
                yup.ref("motdepasse", ""),
                "les mots de passe doivent être identiques",]),
        cgu: yup.boolean().required("vous devez accepter les CGU"),
    });

    const defaultValues = {
        activites: [],
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
        name: "activites",
        control,
    });

    //ANCHOR - Fonctions 

    // Ajout d'une nouvelle activité
    function addAct() {
        append({
            activite: "",
            chien: "",
            level: "",
        });
    }

    // Suppression d'une activité
    function deleteAct(id) {
        remove(id);
    }

    // Gestion de l'activité en fonction de l'âge du chien et des critères d'éligibilité
    const handleActivity = (selectedActivity, differenceMois, selectedLevel, index) => {
        // Obtient les limites d'âge en fonction de l'activité
        const { debutantLimit, intermediaireLimit, confirmeLimit } = getActivityLimits(selectedActivity);

        // Vérifie les conditions d'éligibilité en fonction de l'âge, du niveau et de l'activité
        const isEligible =
            (differenceMois >= debutantLimit && selectedLevel === 'debutant') ||
            (differenceMois >= intermediaireLimit && selectedLevel === 'intermediaire') ||
            (differenceMois >= confirmeLimit && selectedLevel === 'confirme');

        // Met à jour l'état en conséquence
        if (isEligible) {
            setIsNotEligible(false);
            console.log(isNotEligible);
        } else {
            setIsNotEligible(true);
            setIsNotEligibleForCurrentActivity([...isNotEligibleForCurrentActivity, { index }]);
            console.log(isNotEligible);
            console.log(isNotEligibleForCurrentActivity);
        }
    };


    // Effet pour récupérer la liste des activités
    useEffect(() => {
        const getActivities = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/dogs/getActivities",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await response.json();
                setListActivities(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des activités :", error);
            }
        };

        getActivities();
    }, []);

    // Effet déclenché lorsqu'il y a des activités non éligibles
    useEffect(() => {
        const isNotEligibleEmpty = isNotEligibleForCurrentActivity.length === 0;

        if (isNotEligibleEmpty) {
            const values = getValues();
            values.idAdher = user.idAdher;

            const newActivity = addActivity(values);
            if (newActivity.message) {
                setFeedback(newActivity.message);
            } else {
                setFeedbackGood(newActivity.messageGood);
                reset(defaultValues);
                setTimeout(() => {
                    // navigate("/Profile");
                }, 2000);
            }
        } else {
            const lastItem =
                isNotEligibleForCurrentActivity[
                isNotEligibleForCurrentActivity.length - 1
                ];
            const errorMessage = `Votre chien est trop jeune pour l'activité déclarée en ligne ${lastItem.index + 1
                }.`;
            setFeedback(errorMessage);
        }
    }, [isNotEligibleForCurrentActivity, getValues]);

    // Soumission du formulaire
    async function submit() {
        setFeedback("");
        clearErrors();
        const values = getValues();

        try {
            console.log(values);
            values.activites.forEach((activite, index) => {
                const chienId = activite.chien;
                const selectedChien = user?.chiens.find(
                    (chien) => chien.idChien === chienId
                );

                if (selectedChien) {
                    const differenceMois = calculateAgeDifference(selectedChien);
                    const selectedActivity = listActivities.find(
                        (a) => a.idActivites === getValues(`activites[${index}].activite`)
                    );
                    const selectedLevel = getValues(`activites[${index}].level`);

                    handleActivity(
                        selectedActivity,
                        differenceMois,
                        selectedLevel,
                        index
                    );
                }
            });

            console.log(isNotEligibleForCurrentActivity);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main>
            <div className={styles.container}>
                <h2 className="titreOrange">Vous souhaitez vous inscrire</h2>
                <div className="box">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="d-flex flex-column mb20 mr20">
                            <label
                                htmlFor="name"
                                className="d-flex justify-content-center align-items-center mb10"
                            >
                                <span className="mr10">Nouvelle activité</span>
                                <button
                                    onClick={addAct}
                                    type="button"
                                    className="btn btn-primary-reverse"
                                >
                                    +
                                </button>
                            </label>
                            <ul>
                                {fields.map((activites, index) => (
                                    <li key={index} className="">
                                        <select
                                            id="chien"
                                            {...register(`activites[${index}].chien`)}
                                        >
                                            {user?.chiens.map((c) => (
                                                <option key={c.idChien} value={c.idChien}>
                                                    {c.nomChien}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            id="activite"
                                            {...register(`activites[${index}].activite`)}
                                        >
                                            {listActivities.map((a) => (
                                                <option key={a.idActivites} value={a.idActivites}>
                                                    {a.nomActivites}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            id="level"
                                            {...register(`activites[${index}].level`)}
                                        >
                                            <option value="debutant">debutant</option>
                                            <option value="intermediaire">intermediaire</option>
                                            <option value="confirme">confirmé</option>
                                        </select>
                                        <button
                                            onClick={() => deleteAct(index)}
                                            className="btn btn-primary"
                                        >
                                            -
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}
                            {feedback && <p className={`feedback`}>{feedback}</p>}
                            {feedbackGood && <p className={`feedbackGood`}>{feedbackGood}</p>}
                        </div>
                        <Button
                            onClick={() => submit()}
                            content="Enregistrer"
                            className="send"
                        />
                    </form>
                </div>
            </div>
        </main>
    );
}
