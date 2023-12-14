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

const calculateAgeDifference = (selectedChien) => {
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
    const { user } = useContext(AuthContext);
    const [listActivities, setListActivities] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const navigate = useNavigate();

    const yupSchema = yup.object({
        nom: yup
            .string()
            .required("Champ obligatoire")
            .min(2, "Le champ doit contenir 2 caractères minimum")
            .max(12, "Le champ doit contenir 12 caractères maximum"),
        prenom: yup
            .string()
            .required("Champ obligatoire")
            .min(2, "Le champ doit contenir 2 caractères minimum")
            .max(12, "Le champ doit contenir 12 caractères maximum"),
        email: yup
            .string()
            .required("Champ obligatoire")
            .matches(
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Votre email n'est pas valide"
            ),
        motdepasse: yup
            .string()
            .required("Mot de passe obligatoire")
            .min(12, "Mot de passe trop court")
            .max(64, "Mot de passe trop long")
            .matches(
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                "Doit contenir au moins une majuscule, un chiffre et un caractère spécial"
            ),
        confirmMdp: yup
            .string()
            .required("Vous devez confirmer votre mot de passe")
            .oneOf([
                yup.ref("motdepasse", ""),
                "Les mots de passe doivent être identiques",
            ]),
        cgu: yup.boolean().required("Vous devez accepter les CGU"),
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

    const addAct = () => {
        append({
            activite: "",
            chien: "",
            level: "",
        });
    };

    const deleteAct = (id) => {
        remove(id);
    };

    // Ajoutez cette fonction quelque part dans votre composant

    const checkEligibility = (selectedChien, selectedActivity, selectedLevel) => {
        console.log(selectedChien);
        console.log(selectedActivity);
        const differenceMois = calculateAgeDifference(selectedChien);
        console.log(differenceMois);
        const activityLimits = getActivityLimits(selectedActivity.idActivites);
        console.log(activityLimits);

        // Vérifier les conditions d'éligibilité en fonction de l'âge, du niveau et de l'activité
        return (
            (differenceMois >= activityLimits.debutant &&
                selectedLevel === "débutant") ||
            (differenceMois >= activityLimits.intermediaire &&
                selectedLevel === "intermédiaire") ||
            (differenceMois >= activityLimits.confirme &&
                selectedLevel === "confirmé")
        );
    };

    const submit = async () => {
        setFeedback("");
        clearErrors();
        const values = getValues();

        try {
            console.log("user", user);

            for (let index = 0; index < values.activites.length; index++) {
                const activite = values.activites[index];
                const chienId = activite.chien;
                console.log("chienId", chienId);
                const selectedChien = user?.chiens.find(
                    (chien) => chien.idChien === parseInt(chienId, 10)
                );
                console.log("selectedChien", selectedChien);
                if (selectedChien) {
                    const selectedActivity = listActivities.find(
                        (a) => a.idActivites === parseInt(activite.activite, 10)
                    );
                    console.log("selectedActivity", selectedActivity);
                    const selectedLevel = activite.level;
                    if (
                        !checkEligibility(selectedChien, selectedActivity, selectedLevel)
                    ) {
                        console.log("test4");
                        const errorMessage = `Votre chien est trop jeune pour l'activité "${selectedActivity.nomActivites}" de niveau "${selectedLevel}"`;

                        setFeedback(errorMessage);
                        return;
                    }
                }
            }
            const newActivity = await addActivity(values);

            if (newActivity.message) {
                setFeedbackGood(newActivity.message);
            } else {
                setFeedbackGood(newActivity.messageGood);
                reset(defaultValues);
                setTimeout(() => {
                    navigate("/Profile");
                }, 2000);
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                                            <option value="débutant">débutant</option>
                                            <option value="intermédiaire">intermédiaire</option>
                                            <option value="confirmé">confirmé</option>
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
                            {feedback && <p className={`feedback`}>{feedback}</p>}
                            {feedbackGood && <p className={`feedbackGood`}>{feedbackGood}</p>}
                        </div>
                        <Button
                            onClick={() => submit()}
                            type="submit"
                            content="Enregistrer"
                            className="send"
                        />
                    </form>
                </div>
            </div>
        </main>
    );
}
