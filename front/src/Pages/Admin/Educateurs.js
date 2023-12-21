import React, { useEffect, useState } from 'react';
import styles from './EspaceAdmin.module.scss';
import Button from '../../Components/button/Button';
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchAllEducateurs } from '../../apis/educators';
import { fetchCertifications, addCertification, addEducator } from '../../apis/admin';

export default function Educateurs() {

    //ANCHOR - Constantes

    const [educateurs, setEducateurs] = useState([]);
    const [certification, setCertification] = useState([]);
    const [editingEducateurId, setEditingEducateurId] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const [modify, setModify] = useState(false);
    const [addAnEduc, setAddAnEduc] = useState(false);
    // useState pour l'input de type file
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    // useState pour l'attribut src de notre balise img
    const [previewImage, setPreviewImage] = useState(null);

    const yupSchema = yup.object({
        prenom: yup.string().required(" champ obligatoire").min(2, "le champ doit contenir 2 caractères minimum").max(12, "le champ doit contenir 12 caractères maximum"),
        certification: yup.string().required(" champ obligatoire"),
        présentation: yup.string().required(" champ obligatoire"),
        photo : yup.mixed().test('fileType', 'Seuls les fichiers de type image sont autorisés', (value) => {
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

    //NOTE -- cette fonction permet de récupérer toutes les informations nécessaires à l'affichage des éducateurs
    useEffect(() => {
        async function fetchData() {
            try {
                const dataBack = await fetchAllEducateurs();
                setEducateurs(dataBack);
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
    function handlePhotoChange(event) {
        // récupération du fichier
        const file = event.target.files[0];
        setSelectedPhoto(file);
        // on place une condition pour l'attribuer à l'attribut src de la balise img ou non
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setPreviewImage(fileReader.result);
            };
        } else {
            setPreviewImage(null);
        }
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
            console.log(values);
            console.log(`educateur is now : ${values} `);

            const newCertification = await addCertification(values);


            if (newCertification.message) {
                setFeedback(newCertification.message);
            } else {
                setFeedbackGood(newCertification.messageGood);
                setTimeout(() => {
                    setModify(false);
                    setFeedbackGood("");
                }, 2000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function submit() {
        setFeedback("");
        clearErrors();

        //ANCHOR - partie qui concerne la PHOTO
        // event.preventDefault();
        if (!selectedPhoto) {
            alert("Veuillez sélectionner un fichier");
            return;
        }
        // FileReader permet de lire les fichiers de type File ou Blob
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(selectedPhoto);
        fileReader.onload = async () => {
            // récupération du fichier lu
            const buffer = fileReader.result;
            // création un objet blob à partir du fichier lu et du type de fichier
            const blob = new Blob([buffer], { type: selectedPhoto.type });
            console.log(selectedPhoto);

            // invocation de la fonction en passant en paramètre l'objet blob
            const base64 = await convertBlobTobase64(blob);
            console.log({ base64 });

            // création d'un objet avec blob et idUser
            const obj = { value: base64 };


            //ANCHOR - suite
            const values = getValues();
            values.photo = obj.value;

            try {
                console.log(values);
                const newEducator = await addEducator(values);

                if (newEducator.message) {
                    setFeedback(newEducator.message);
                } else {
                    setFeedbackGood(newEducator.messageGood);
                    setTimeout(() => {
                        setAddAnEduc(false);
                        setFeedbackGood("");
                    }, 2000);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function deleteEducateur(educateurId) {
        try {
            console.log('you cliked to suppress the educator', educateurId);
            // Envoyer une requête de suppression à votre API
            // const response = await fetch(`${API_ADMIN}/deleteEducateur/${educateurId}`, {
            //     method: 'DELETE',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // });
    
            // const result = await response.json();
    
            // if (response.ok) {
            //     // Mettez à jour l'état ou effectuez d'autres actions si la suppression réussit
            //     console.log(result.message);
            //     // Par exemple, mettez à jour la liste des éducateurs après la suppression
            //     const updatedEducateurs = educateurs.filter(e => e.id !== educateurId);
            //     setEducateurs(updatedEducateurs);
            // } else {
            //     console.error('Erreur lors de la suppression de l\'éducateur:', result.message);
            // }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'éducateur:', error);
        }
    }

    return (
        <>
            <h3>Les éducateurs</h3>

            <article>
                {educateurs.map((e, index) => (
                    <div className={`box ${styles.educContainer}`} id={e.id} key={e.id}>
                        <div className={styles.left}>
                            <img src={e.photo} alt="" />
                        </div>
                        <div className={styles.right}>
                            <h4>{e.nom}</h4>
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

                                        {feedback && <p className={`mb10 mt20 feedback`}>{feedback}</p>}

                                        {feedbackGood && <p className={`mb10 mt20 feedbackGood`}>{feedbackGood}</p>}


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
                                    <div className={styles.options}>
                                        <Button content='Modifier la certification' onClick={() => modifyOnClick(e.id)} />
                                        <button className="btn" onClick={() =>deleteEducateur(e.id)}>Supprimer l'éducateur</button>
                                    </div>
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
                        <div className={`box ${styles.educContainer}`}>

                            <div className={styles.left}>
                                {/* --- --- --- --- ---> I N P U T . P H O T O . A V E C . L A B E L <--- --- --- --- --- */}
                                <label>
                                    <span>Choisissez une photo : </span>
                                    <input {...register("photo")} type="file" onChange={handlePhotoChange} />
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

                                {feedback && <p className={`mb10 mt20 feedback`}>{feedback}</p>}

                                {feedbackGood && <p className={`mb10 mt20 feedbackGood`}>{feedbackGood}</p>}

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

