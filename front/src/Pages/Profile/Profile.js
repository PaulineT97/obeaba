import React, { useState, useEffect } from "react";
import HeadProfile from "../../Assets/Images/headerMonCompte.jpg";
import styles from "./Profile.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { format } from "date-fns";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../Components/button/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateUser, deleteUserBack } from "../../apis/users";
import DogsSection from "./DogSection/DogsSection";
import Modal from "../../Components/Modal/Modal";

export default function Profile() {

    //ANCHOR - Constantes

    const { user, setUser } = useContext(AuthContext);
    const [modify, setModify] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const [feedbackUser, setFeedbackUser] = useState("");
    const [feedbackGoodUser, setFeedbackGoodUser] = useState("");
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);

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
            .email("ce mail n'est pas valide"),
    });

    const {
        register,
        handleSubmit,
        control,
        getValues,
        reset,
        formState: { errors },
        clearErrors,
    } = useForm({
        defaultValues: {
            nom: user?.adherent?.nom || "",
            prenom: user?.adherent?.prenom || "",
            email: user?.adherent?.email || "",
            chiens: "",
        },
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });

    const { fields, append, remove } = useFieldArray({
        name: "chiens",
        control,
    });

         //ANCHOR - Fonctions 

    useEffect(() => {
        if (Array.isArray(user?.nouveauxChiens) && user.nouveauxChiens.length > 0) {
            setUser((prevUser) => {
                return {
                    ...prevUser,
                    chiens: [
                        ...prevUser.chiens,
                        ...prevUser.nouveauxChiens.map((chien) => ({
                            ...chien,
                            naissance: format(new Date(chien.naissance), "dd/MM/yyyy"),
                        })),
                    ],
                };
            });
        }
    }, [user.nouveauxChiens]);

    function showModal() {
        setModalVisible(!modalVisible);
    }

    function modifyOnClick() {
        setModify(!modify);
    }

    async function submit() {
        setFeedback("");
        clearErrors();
        const values = getValues();
        const formData = new FormData();

        values.idAdher = user.adherent.idAdher;
        formData.append("nom", values.nom);
        formData.append("prenom", values.prenom);
        formData.append("email", values.email);

        console.log(values);
        try {
            const actualUser = await updateUser(values);

            if (actualUser.message) {
                setFeedbackUser(actualUser.message);
                setTimeout(() => {
                    setFeedbackUser("");
                }, 2000);
            } else {
                setFeedbackGoodUser(actualUser.messageGood);

                setUser((prevUser) => {
                    return {
                        ...prevUser,
                        adherent: {
                            ...prevUser.adherent,
                            nom: values.nom,
                            prenom: values.prenom,
                            email: values.email,
                        },
                    };
                });

                setTimeout(() => {
                    reset();
                    navigate("/Profile");
                    setModify(false);
                    setFeedbackGoodUser('');
                }, 2000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    console.log(user);


    async function deleteUser() {
        const idAd = user.adherent.idAdher
        console.log('you clicked', idAd);
        try {

            const response = await deleteUserBack(idAd);

            if (response.messageGood) {

                setFeedbackGood(response.messageGood);
                await logout;

                setTimeout(() => {
                    setFeedbackGood("");
                    setUser(null);
                    navigate("/");

                }, 3000);
            } else {
                setFeedback('Erreur lors de la suppression du compte adhérent.');
            }
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <>
            < div style={{ backgroundImage: `url(${HeadProfile})` }} className={`${styles.banniere}`}>
                <div className='overlay' ></div>
                <h1 className='titreBanniere'>Mon compte</h1>
            </div >

            <main>
                <div className={styles.container}>
                    <h2 className="titreArticle">Bienvenue {user?.adherent?.prenom}</h2>

                    {
                        modalVisible && <Modal message="Vous allez supprimer votre compte. Souhaitez vous continuer ?"
                            onCancel={showModal}
                            onConfirm={deleteUser} />
                    }

                    <div className={`${styles.texte} box`}>
                        <div className={styles.options}>
                            <div className={styles.button}>
                                {modify ? (
                                    <Button
                                        content="annuler les modifications"
                                        onClick={() => modifyOnClick()}
                                        title="annuler les modifications"
                                    />
                                ) : (
                                    <Button
                                        content="modifier mes informations"
                                        onClick={() => modifyOnClick()}
                                        title="modifier mes informations"
                                    />
                                )}
                            </div>

                            <div onClick={() => showModal()} className={`${styles.sup}`} style={{ width: "45%" }} title='supprimer mon compte'>
                                <i className="fa-solid fa-circle-xmark orangeStroke"></i>
                                <p>supprimer mon compte</p>
                            </div>
                        </div>

                        {modify ? (
                            <>
                                <form onSubmit={handleSubmit(submit)}>
                                    {/* --- --- --- --- ---> I N P U T . N A M E . A V E C . L A B E L  <--- --- --- --- --- */}
                                    <div className="oneInput">
                                        <label htmlFor="nom">Nom</label>
                                        <input {...register("nom")} type="text" id="nom" />

                                        {errors?.nom && (
                                            <p className="feedback"> {errors.nom.message} </p>
                                        )}
                                    </div>

                                    {/* --- --- --- --- ---> I N P U T . F I R S T N A M E . A V E C . L A B E L  <--- --- --- --- --- */}
                                    <div className="oneInput">
                                        <label htmlFor="prenom">Prénom</label>
                                        <input {...register("prenom")} type="text" id="prenom" />

                                        {errors?.prenom && (
                                            <p className="feedback"> {errors.prenom.message} </p>
                                        )}
                                    </div>

                                    {/* --- --- --- --- ---> I N P U T . E M A I L . A V E C . L A B E L  <--- --- --- --- --- */}
                                    <div className="oneInput">
                                        <label htmlFor="email">Adresse mail</label>
                                        <input {...register("email")} type="text" id="email" />

                                        {errors?.email && (
                                            <p className="feedback"> {errors.email.message} </p>
                                        )}
                                    </div>

                                    {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}
                                    {feedbackUser && <p className={`feedback`}>{feedbackUser}</p>}

                                    {feedbackGoodUser && (<p className={`feedbackGood`}>{feedbackGoodUser}</p>)}

                                    <Button
                                        content="enregistrer les modifications"
                                        className="send"
                                        title="enregistrer les modifications"
                                        onClick={() => submit()}
                                    />
                                </form>
                                <NavLink title='modifier mon mot de passe' to="/NewPassword" style={{ fontStyle: "italic", marginTop: '5%' }}>
                                    Modifier mon mot de passe
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <p>Nom : {user?.adherent?.nom}</p>
                                <p>Prénom : {user?.adherent?.prenom}</p>
                                <p>Adresse mail : {user?.adherent?.email}</p>
                            </>
                        )}
                    </div>

                    {/* Affichage des chiens */}

                    <DogsSection
                        fields={fields}
                        append={append}
                        remove={remove}
                        getValues={getValues}
                        errors={errors}
                        feedback={feedback}
                        feedbackGood={feedbackGood}
                        setFeedback={setFeedback}
                        setFeedbackGood={setFeedbackGood}
                        updatedUser={user}
                        setUpdatedUser={setUser}
                        navigate={navigate}
                        register={register}
                        clearErrors={clearErrors}
                        handleSubmit={handleSubmit}
                        reset={reset}
                    />
                </div>
            </main>
        </>
    );
}