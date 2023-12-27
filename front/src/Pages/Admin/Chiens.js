import React, { useEffect, useState } from 'react';
import styles from './EspaceAdmin.module.scss';
import { fetchAllDogs } from '../../apis/admin';
import Button from '../../Components/button/Button';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { changeLevel } from '../../apis/admin';

export default function Chiens() {
    //ANCHOR - Constantes
    const [listDogs, setListDogs] = useState([]);
    const [activityFilters, setActivityFilters] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const [modify, setModify] = useState(false);
    const [modificationChienId, setModificationChienId] = useState(null);


    const yupSchema = yup.object({
        level: yup.string().nullable(),
    });

    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { errors },
        clearErrors,
    } = useForm({
        defaultValues: {
            level: "",
        },
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });

    //ANCHOR - Fonctions 

    //NOTE -- cette fonction permet de récupérer toutes les informations nécessaires à l'affichage des chiens
    useEffect(() => {
        async function fetchData() {
            try {
                const dataBack = await fetchAllDogs();
                setListDogs(dataBack);
            } catch (error) {
                console.error('Error in component:', error);
            }
        }

        fetchData();
    }, []);

    const calculateAge = (naissance) => {
        const dateNaissance = new Date(naissance);
        const dateActuelle = new Date();

        const calculatedAge = (dateActuelle.getFullYear() - dateNaissance.getFullYear()) * 12 + dateActuelle.getMonth() - dateNaissance.getMonth();

        // Ajustement pour le cas où dateActuelle.getMonth() < dateNaissance.getMonth()
        if (dateActuelle.getMonth() < dateNaissance.getMonth()) {
            calculatedAge -= 1;
        }

        return calculatedAge;
    };

    const toggleActivityFilter = (activity) => {
        // Définir le filtre sur l'activité sélectionnée
        setActivityFilters(activity);
    };

    const resetFilters = () => {
        setActivityFilters(null);
    };

    const isDogVisible = (dog) => {
        // Si aucun filtre n'est actif, tous les chiens sont visibles
        if (activityFilters === null) {
            return true;
        }

        // Vérifie si l'activité du chien est dans les filtres actifs
        return activityFilters === dog.nomActivites;
    };

    function modifyOnClick(idChien) {
        setModify(!modify);
        setModificationChienId(idChien);
    }

    async function SubmitChangement(idChien, idActivites) {
        setFeedback("");
        clearErrors();
        const values = getValues();
        values.idChien = idChien;
        values.idActivites = idActivites;

        try {
            console.log(`dog is now level : ${values} `);
            console.log(values.idChien, values.level, values.idActivites);

            const newLevel = await changeLevel(values);

            if (newLevel.message) {
                setFeedback(newLevel.message);


            } else {
                setFeedbackGood(newLevel.messageGood);
                setTimeout(() => {
                    setModify(false);
                    setFeedbackGood("");

                    // Mettre à jour immédiatement le niveau dans l'état local
                    setListDogs(prevDogs => {
                        return prevDogs.map(dog => {
                            if (dog.idChien === idChien) {
                                return {
                                    ...dog,
                                    level: values.level
                                };
                            }
                            return dog;
                        });
                    });
                }, 2000);

            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h3>Les chiens</h3>

            <article>
                <div className={styles.choiceActivity}>
                    <button className={`btn ${activityFilters === null ? styles.active : ''}`} onClick={resetFilters}>
                        Tous les chiens
                    </button>
                    <button className={`btn ${activityFilters === 'Education' ? styles.active : ''}`} onClick={() => toggleActivityFilter('Education')}>
                        Education Canine
                    </button>
                    <button className={`btn ${activityFilters === 'Agility' ? styles.active : ''}`} onClick={() => toggleActivityFilter('Agility')}>
                        Agility
                    </button>
                    <button className={`btn ${activityFilters === 'Obérythmée' ? styles.active : ''}`} onClick={() => toggleActivityFilter('Obérythmée')}>
                        Obérythmée
                    </button>
                    <button className={`btn ${activityFilters === 'Balades' ? styles.active : ''}`} onClick={() => toggleActivityFilter('Balades')}>
                        Balades et randonnées
                    </button>
                </div>
                <div className={`box`} style={{ marginTop: "3%" }}>
                    {activityFilters === null ? (
                        listDogs
                            .filter((chien, currentIndex, chiens) => {
                                return (
                                    chiens.findIndex((c) => c.idChien === chien.idChien
                                    ) === currentIndex
                                );
                            })
                            .map((d, index) => (
                                isDogVisible(d) && (
                                    <div className={`${styles.dogList}`} key={index}>
                                        <p className={`${styles.listItem}`}>{d.nomChien}</p>
                                        <p className={`${styles.listItem}`}>{calculateAge(d.naissance)} mois</p>
                                        <p className={`${styles.listItem}`}>{d.race}</p>
                                    </div>

                                )
                            ))
                    ) : (
                        listDogs.map((d, index) => (
                            isDogVisible(d) && (
                                <div className={`${styles.dogList}`} key={index}>
                                    <p className={`${styles.listItem}`}>{d.nomChien}</p>
                                    <p className={`${styles.listItemAge}`}>{calculateAge(d.naissance)} mois</p>
                                    <p className={`${styles.listItem}`}>{d.race}</p>
                                    {modify && modificationChienId === d.idChien ? (
                                        <form onSubmit={handleSubmit(() => SubmitChangement(d.idChien, d.idActivites))}>

                                            <div className={`${styles.modifications}`}>
                                                <div className={`oneInput ${styles.select}`}>
                                                    <select
                                                        id="level"
                                                        {...register(`level`, { value: d.level })}
                                                    >
                                                        <option value="débutant">débutant</option>
                                                        <option value="intermédiaire">intermédiaire</option>
                                                        <option value="confirmé">confirmé</option>
                                                    </select>
                                                </div>
                                                <div className={styles.options}>
                                                    <Button content='Annuler' onClick={() => modifyOnClick()} />
                                                    <button className="btn" onClick={() => SubmitChangement(d.idChien, d.idActivites)}>Enregistrer</button>
                                                </div>
                                            </div>
                                            {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}

                                            <div className={styles.feedbackContainer}> <br />
                                                {feedback && <p className={`mb10 mt20 feedback`}>{feedback}</p>}

                                                {feedbackGood && <p className={`mb10 mt20 feedbackGood`}>{feedbackGood}</p>}
                                            </div>

                                        </form>
                                    ) : (
                                        <>
                                            <p className={`${styles.listItem}`}>{d.level}</p>
                                            <Button type="button" content="Modifier le niveau" onClick={() => modifyOnClick(d.idChien)} />
                                        </>
                                    )}

                                </div>
                            )
                        ))
                    )}
                </div>
            </article>
        </>
    );
}
