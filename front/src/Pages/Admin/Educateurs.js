import React, { useEffect, useState } from 'react';
import styles from './EspaceAdmin.module.scss';
import Button from '../../Components/button/Button';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchAllEducateurs } from '../../apis/educators';
import { fetchCertifications, addCertification, addEducator, deleteEducBack } from '../../apis/admin';

export default function Educateurs() {

    //ANCHOR - Constantes

    const [educateurs, setEducateurs] = useState([]);
    const [certification, setCertification] = useState([]);

    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const [modify, setModify] = useState(false);
    const [editingEducateurId, setEditingEducateurId] = useState(null);
    const [addAnEduc, setAddAnEduc] = useState(false);
    // useState pour l'input de type file
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    // useState pour l'attribut src de notre balise img
    const [previewImage, setPreviewImage] = useState(null);

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
            console.log(`educateur is now : ${values} `);

            console.log("Before addCertification:", values.certification);
            const newCertification = await addCertification(values);
            console.log("After addCertification:", values.certification);


            if (newCertification.message) {
                setFeedback(newCertification.message);

            } else {

                setEducateurs(prevEducateurs => {
                    console.log("prevEducateurs:", prevEducateurs);

                    console.log("Certification array:", certification);

                    const updatedEducateurs = prevEducateurs.map(educateur => {
                        if (educateur.id === educateurId) {
                            const newCertif = values.certification;

                            console.log("New certification:", newCertif);

                            const selectedCertification = certification.find(c => c.idCertification === parseInt(values.certification, 10));

                            console.log("Selected certification:", selectedCertification);

                            const certificationName = selectedCertification ? selectedCertification.nameCertification : '';

                            console.log("Certification name:", certificationName);

                            return {
                                ...educateur,
                                certification: certificationName
                            };
                        }
                        return educateur;
                    });

                    console.log("updatedEducateurs:", updatedEducateurs);

                    return updatedEducateurs;
                });

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
                    if (newEducator.newEduc && newEducator.newEduc.length > 0) {
                        // Si de nouveaux éducateurs ont été ajoutés, accédez au premier éducateur du tableau
                        const nouvelEducateur = newEducator.newEduc[0];
                        console.log("Nouvel éducateur ajouté :", nouvelEducateur.nameCertification);
        
                        // Accédez au champ nameCertification de l'objet nouvelEducateur
                        const certificationName = nouvelEducateur.nameCertification;
        
                        setFeedbackGood(newEducator.messageGood);
        
                        // Mettez à jour l'état des éducateurs en ajoutant le nouvel éducateur à la liste existante
                        setEducateurs(prevEducateurs => [
                            {
                                ...nouvelEducateur,
                                certification: certificationName
                            },
                            ...prevEducateurs
                        ]);
        
                        // Affichez le nameCertification dans la console ou faites ce que vous souhaitez avec cette information
                        console.log("Certification du nouvel éducateur :", certificationName);
        
                        setTimeout(() => {
                            setAddAnEduc(false);
                            setFeedbackGood("");
                        }, 2000);
                    } else {
                        console.error("Erreur lors de l'ajout de l'éducateur. Nouvel éducateur non défini.");
                    }
                }
            } catch (error) {
                console.error(error);
            }

        }
    }

    async function deleteEducateur(educateurId) {

        try {
            console.log('you cliked to suppress the educator', educateurId);

            const educateurDeleted = await deleteEducBack(educateurId);
            // Envoyer une requête de suppression à votre API

            if (educateurDeleted.messageGood) {
                setFeedbackGood(educateurDeleted.messageGood);

                setTimeout(() => {
                    const updatedEducateurs = educateurs.filter(e => e.id !== educateurId);
                    setEducateurs(updatedEducateurs);
                    setFeedbackGood("");
                }, 3000);
            } else {
                setFeedback("Erreur lors de la suppression de l'éducateur.");
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'éducateur:', error);
        }
    }

    return (
        <>
            <h3>Les éducateurs</h3>

            <article>
                {educateurs.map((e, index) => (
                    <div className={`box ${styles.containerBox}`} id={e.id} key={index}>
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


                                    {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}

                                    {feedback && <p className={`mb10 mt20 feedback`}>{feedback}</p>}

                                    {feedbackGood && <p className={`mb10 mt20 feedbackGood`}>{feedbackGood}</p>}

                                    <div className={styles.options}>
                                        <Button content='Modifier la certification' onClick={() => modifyOnClick(e.id)} />
                                        <button className="btn" onClick={() => deleteEducateur(e.id)}>Supprimer l'éducateur</button>
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
                        <div className={`box ${styles.containerBox}`}>

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

