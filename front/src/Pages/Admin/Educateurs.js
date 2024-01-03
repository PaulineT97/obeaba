import React, { useEffect, useState } from 'react';
import styles from './EspaceAdmin.module.scss';
import Button from '../../Components/button/Button';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchAllEducateurs } from '../../apis/educators';
import { fetchCertifications, addCertification, addEducator, deleteEducBack } from '../../apis/admin';
import Modal from "../../Components/Modal/Modal";

export default function Educateurs() {

    //ANCHOR - Constantes

    const [educateurs, setEducateurs] = useState([]);
    const [certification, setCertification] = useState([]);

    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const [feedbackAjout, setFeedbackAjout] = useState("");
    const [feedbackGoodAjout, setFeedbackGoodAjout] = useState("");
    const [modify, setModify] = useState(false);
    const [editingEducateurId, setEditingEducateurId] = useState(null);
    const [addAnEduc, setAddAnEduc] = useState(false);
    // useState pour l'input de type file
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    // useState pour l'attribut src de notre balise img
    const [previewImage, setPreviewImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);


    const yupSchema = yup.object({
        prenom: yup.string().required(" champ obligatoire").min(2, "le champ doit contenir 2 caractères minimum").max(12, "le champ doit contenir 12 caractères maximum"),
        certification: yup.number().required(" champ obligatoire"),
        présentation: yup.string().required(" champ obligatoire"),
        photo: yup.mixed().test('fileType', 'Seuls les fichiers de type image sont autorisés', (value) => {
            if (!value) return true;  // La validation n'est pas requise si le champ est vide
            return value && value[0] && value[0].type.startsWith('image/');
        }).required('Champ obligatoire'),
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
            nom: "",
            certification: "",
            introduction: "",
            photo: "",
        },
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });

    //ANCHOR - Fonctions 

    function showModal(educId) {
        console.log(educId);
        setModalVisible(!modalVisible);
        setEditingEducateurId(educId);
    }
    //NOTE -- cette fonction permet de récupérer toutes les informations nécessaires à l'affichage des éducateurs
    useEffect(() => {
        async function fetchData() {
            try {
                const dataBack = await fetchAllEducateurs();
                setEducateurs(dataBack);
                console.log(dataBack);
            } catch (error) {
                console.error('Error in component:', error);
            }
        }
        getCertifications();

        fetchData();
    }, []);


    async function getCertifications() {
        try {
            const dataBack = await fetchCertifications();
            setCertification(dataBack);
        } catch (error) {
            console.error('Error in component:', error);
        }
    }

    function modifyOnClick(educateurId) {
        setModify(!modify);
        setEditingEducateurId(educateurId);
    }

    function addEducateur() {
        setAddAnEduc(!addAnEduc);
    }

    // déclaration de la fonction lors d'un changement de fichier dans l'input avant validation
    function getPhoto(event) {
        const file = event.target.files[0];
        setSelectedPhoto(file);
    }

    // déclaration de la fonction qui récupére un obket blob, le lit et le convertir en
    // une chaine de caractères base64 qui permet de coder tout tupe de données
    // une fois la promesse résolue, si aucune erreur n'a été rencontré, le fichier est codé et renvoyé
    // en retour de la fonction
    const convertBlobTobase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(blob);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            console.log(`voici log du blob apres fonction convert to base64 : ${blob}`);
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    async function SubmitChangement(educateurId) {
        setFeedback("");
        clearErrors();
        const values = getValues();
        values.idEduc = educateurId;

        try {
            // console.log(`educateur is now : ${values} `);

            const newCertification = await addCertification(values);


            if (newCertification.message) {
                setFeedback({ [educateurId]: newCertification.message });

            } else {

                setEducateurs(prevEducateurs => {

                    const updatedEducateurs = prevEducateurs.map(educateur => {
                        if (educateur.id === educateurId) {
                            // const newCertif = values.certification;

                            const selectedCertification = certification.find(c => c.idCertification === parseInt(values.certification, 10));

                            // console.log("Selected certification:", selectedCertification);

                            const certificationName = selectedCertification ? selectedCertification.nameCertification : '';

                            // console.log("Certification name:", certificationName);

                            return {
                                ...educateur,
                                certification: certificationName
                            };
                        }
                        return educateur;
                    });

                    // console.log("updatedEducateurs:", updatedEducateurs);

                    return updatedEducateurs;
                });

                setFeedbackGood({ [educateurId]: newCertification.messageGood });
                setTimeout(() => {
                    setModify(false);
                    setFeedbackGood({ [educateurId]: "" });
                }, 2000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function submit() {
        setFeedback("");
        clearErrors();

        if (!selectedPhoto) {
            setFeedbackAjout("Veuillez sélectionner un fichier");
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(selectedPhoto);

        fileReader.onload = async () => {
            const buffer = fileReader.result;
            const blob = new Blob([buffer], { type: selectedPhoto.type });

            // Convertir le Blob en base64
            const base64 = await convertBlobTobase64(blob);

            const values = getValues();
            values.photo = base64; // Utilisez la représentation base64 pour la propriété 'photo'

            try {
                const newEducator = await addEducator(values);

                if (newEducator.message) {
                    setFeedback(newEducator.message);
                } else {
                    if (newEducator.newEduc && newEducator.newEduc.length > 0) {
                        const nouvelEducateur = newEducator.newEduc[0];
                        setFeedbackGoodAjout(newEducator.messageGood);

                        // Utilisez la propriété 'photo' de nouvel éducateur pour afficher l'image
                        const photoEduc = nouvelEducateur.photo;

                        console.log({ photoEduc });
                        const uint8Array = new Uint8Array(photoEduc.data);
                        console.log({ uint8Array });
                        const blob = new Blob([uint8Array]);
                        console.log({ blob });
                        const urlImage = URL.createObjectURL(blob);
                        console.log({ urlImage });
                        fetch(urlImage)
                            .then((response) => response.text())
                            .then((text) => {
                                console.log({ text });
                                setPreviewImage(text);
                            });

                        // Mettez à jour l'état des éducateurs en ajoutant le nouvel éducateur à la liste existante
                        setEducateurs(prevEducateurs => [
                            {
                                ...nouvelEducateur,
                                certification: nouvelEducateur.nameCertification,
                                photo: previewImage
                            },
                            ...prevEducateurs
                        ]);

                        setTimeout(() => {
                            setAddAnEduc(false);
                            setFeedbackGoodAjout("");
                        }, 2000);
                    } else {
                        console.error("Erreur lors de l'ajout de l'éducateur. Nouvel éducateur non défini.");
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
    }

    async function deleteEducateur(educateurId) {

        try {
            console.log('you cliked to suppress the educator', educateurId);

            const educateurDeleted = await deleteEducBack(educateurId);
            // Envoyer une requête de suppression à votre API

            if (educateurDeleted.messageGood) {
                setFeedbackGood({ [educateurId]: educateurDeleted.messageGood });

                setTimeout(() => {
                    const updatedEducateurs = educateurs.filter(e => e.id !== educateurId);
                    setEducateurs(updatedEducateurs);
                    setFeedbackGood({ [educateurId]: "" });
                }, 3000);
            } else {
                setFeedback({ [educateurId]: "Erreur lors de la suppression de l'éducateur." });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'éducateur:', error);
        }
    }

    return (
        <>
            <h2>Les éducateurs</h2>

            <article>
                {educateurs.map((e, index) => (
                    <div className={`box ${styles.containerBox}`} id={e.id} key={index}>
                        <div className={styles.left}>
                            <img src={e.photo || previewImage} alt="" />
                        </div>
                        <div className={styles.right}>
                            <h3>{e.nom}</h3>
                            {modify && editingEducateurId === e.id ? (
                                <>
                                    <form onSubmit={handleSubmit(() => SubmitChangement(e.id))}>
                                        {/* --- --- --- --- ---> I N P U T . C E R T I F I C A T I O N . A V E C . L A B E L  <--- --- --- --- --- */}
                                        <div className="oneInput">
                                            <label htmlFor="certification">Certification</label>
                                            <select
                                                id="certification"
                                                {...register("certification", { value: e.certification })}
                                            >
                                                {certification.map((c) => (
                                                    <option key={c.idCertification} value={c.idCertification}>
                                                        {c.nameCertification}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}

                                        {feedback[e.id] && <p className={`feedback`}>{feedback[e.id]}</p>}

                                        {feedbackGood[e.id] && <p className={`feedbackGood`}>{feedbackGood[e.id]}</p>}


                                        <div className={styles.options}>
                                            <Button content='Annuler la modification' onClick={() => modifyOnClick()} />
                                            <button className="btn" onClick={() => SubmitChangement(e.id)}>Enregistrer</button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <p className={styles.certif}>{e.certification}</p>
                                    <p>{e.introduction}</p>


                                    {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}

                                    {feedback[e.id] && <p className={`feedback`}>{feedback[e.id]}</p>}

                                    {feedbackGood[e.id] && <p className={`feedbackGood`}>{feedbackGood[e.id]}</p>}

                                    <div className={styles.options}>
                                        <Button content='Modifier la certification' onClick={() => modifyOnClick(e.id)} />
                                        <button className="btn" onClick={() => showModal(e.id)}>Supprimer l'éducateur</button>
                                    </div>
                                    {
                                        modalVisible && editingEducateurId == e.id &&
                                        <Modal message={`Vous allez supprimer ${e.nom} de la liste des éducateurs. Souhaitez vous continuer ?`}
                                            onCancel={() => showModal(e.id)}
                                            onConfirm={() => deleteEducateur(e.id)} 
                                        />
                                    }
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </article>

            <article>
                <Button content="Ajouter un éducateur" type="button" onClick={addEducateur} />

                {addAnEduc ? (

                    <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
                        <div className={`box ${styles.containerBox}`}>

                            <div className={styles.left}>
                                {/* --- --- --- --- ---> I N P U T . P H O T O . A V E C . L A B E L <--- --- --- --- --- */}
                                <label>
                                    <span>Choisissez une photo : </span>
                                    <input {...register("photo")} type="file" onChange={getPhoto} />
                                </label>
                            </div>

                            <div className={styles.right}>

                                {/* --- --- --- --- ---> I N P U T . N A M E . A V E C . L A B E L  <--- --- --- --- --- */}
                                <div className="oneInput">
                                    <label htmlFor="nom">Nom</label>
                                    <input {...register("nom")} type="text" id="nom" />

                                    {errors?.nom && (
                                        <p style={{ color: "red" }}> {errors.nom.message} </p>
                                    )}
                                </div>

                                {/* --- --- --- --- ---> I N P U T . C E R T I F I C A T I O N . A V E C . L A B E L  <--- --- --- --- --- */}
                                <div className="oneInput">
                                    <label htmlFor="certification">Certification</label>
                                    <select
                                        id="certification"
                                        {...register("certification")}
                                    >
                                        {certification.map((c) => (
                                            <option key={c.idCertification} value={c.idCertification}>
                                                {c.nameCertification}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* --- --- --- --- ---> I N P U T . I N T R O D U C T I O N . A V E C . L A B E L  <--- --- --- --- --- */}
                                <div className="oneInput">
                                    <label htmlFor="introduction">Introduction</label>
                                    <input {...register("introduction")} type="text" id="introduction" />

                                    {errors?.introduction && (
                                        <p style={{ color: "red" }}> {errors.introduction.message} </p>
                                    )}
                                </div>


                                {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}

                                {feedbackAjout && <p className={`feedback`}>{feedbackAjout}</p>}

                                {feedbackGoodAjout && <p className={`feedbackGood`}>{feedbackGoodAjout}</p>}

                                {/* --- --- --- --- ---> B U T T O N S  <--- --- --- --- --- */}
                                <div className={styles.options}>
                                    <Button content="Annuler l'ajout" onClick={() => setAddAnEduc(false)} />
                                    <button className="btn" type="submit" onClick={() => submit()}>Ajouter cet éducateur</button>
                                </div>
                            </div>
                        </div>
                    </form>
                ) : ("")}
            </article>
        </>
    );
}

