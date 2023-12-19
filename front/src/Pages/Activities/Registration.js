import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Activities.module.scss";
import { useForm, useFieldArray } from "react-hook-form";
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
    const [isChienSelected, setIsChienSelected] = useState(false);
    const navigate = useNavigate();

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
        setIsChienSelected(true);
    };

    const deleteAct = (id) => {
        remove(id);
        const remainingChiens = getValues().activites.some(
            (activite) => !!activite.chien
        );
        setIsChienSelected(remainingChiens);
    };

    const checkEligibility = (selectedChien, selectedActivity, selectedLevel) => {
        console.log(selectedChien);
        console.log(selectedActivity);
        const differenceMois = calculateAgeDifference(selectedChien);
        console.log(differenceMois);
        const activityLimits = getActivityLimits(selectedActivity.idActivites);
        console.log(activityLimits);

        // Vérifie les conditions d'éligibilité en fonction de l'âge, du niveau et de l'activité
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

        let selectedChien, selectedActivity, selectedLevel;  


        try {
            console.log("user", user);

            // Vérifier si chaque activité a tous les champs remplis
            const isAllActivitiesFilled = values.activites.every(
                (activite) =>
                    activite.chien !== "" &&
                    activite.activite !== "" &&
                    activite.level !== ""
            );

            // Vérifier s'il y a au moins une activité avec un chien sélectionné
            const hasAtLeastOneChien = values.activites.some(
                (activite) => !!activite.chien
            );

            // Vérifier les deux conditions en une seule
            if (!isAllActivitiesFilled || !hasAtLeastOneChien) {
                setFeedback(
                    "Veuillez remplir tous les champs pour chaque activité et sélectionner au moins un chien."
                );
                return;
            }

            for (let index = 0; index < values.activites.length; index++) {
                const activite = values.activites[index];
                const chienId = activite.chien;
                console.log("chienId", chienId);
                
                selectedChien = user?.chiens.find(
                    (chien) => chien.idChien === parseInt(chienId, 10)
                );
                console.log("selectedChien", selectedChien);

                if (selectedChien) {
                    selectedActivity = listActivities.find(
                        (a) => a.idActivites === parseInt(activite.activite, 10)
                    );
                    console.log("selectedActivity", selectedActivity);

                    selectedLevel = activite.level;
                    if (
                        !checkEligibility(selectedChien, selectedActivity, selectedLevel)
                    ) {
                        console.log("test");
                        const errorMessage = `${selectedChien.nomChien} est trop jeune pour l'activité "${selectedActivity.nomActivites}" de niveau "${selectedLevel}"`;

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
            console.error(error.message);
            const message = error.message;
            if (message === "Duplicata détecté pour l'activité du chien.") {
                const errorMessage = `${selectedChien.nomChien} est déjà inscrit à l'activité "${selectedActivity.nomActivites}" niveau "${selectedLevel}"`;

                setFeedback(errorMessage);
            } else {
                setFeedback(message);
            }
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
                                className="enteteActivity"
                            >
                                <span>Nouvelle activité</span>
                                <Button
                                    onClick={addAct}
                                    type="button"
                                    content="&nbsp; + &nbsp;"
                                />
                            </label>
                            <ul>
                                {fields.map((activites, index) => (

                                    <li key={index} className="oneActivity">
                                        <select
                                            id="chien"
                                            {...register(`activites[${index}].chien`)}
                                        >
                                            {user?.chiens.filter(c => activites[index]?.chien !== c.idChien).map((c) => (
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
                                        <Button
                                            onClick={() => deleteAct(index)}
                                            content="annuler"
                                        />
                                    </li>

                                ))}
                            </ul>
                            {feedback && <p className={`feedback`}>{feedback}</p>}
                            {feedbackGood && <p className={`feedbackGood`}>{feedbackGood}</p>}
                        </div>
                        <Button
                            content="Enregistrer"
                            className="send"
                            disabled={!isChienSelected}
                        />
                    </form>
                </div>
            </div>
        </main>
    );
}