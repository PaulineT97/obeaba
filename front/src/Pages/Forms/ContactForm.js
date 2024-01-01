import React from 'react';
import styles from "./Forms.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';
import Button from '../../Components/button/Button';
import { useNavigate } from 'react-router-dom';

export default function ContactForm() {
  const defaultValues = {
    email: "",
    motif: "",
  }
  const yupSchema = yup.object({
    email: yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Votre email n'est pas valide"),
    motif: yup.string().required("Motif obligatoire"),
  });

  const { register, handleSubmit, getValues, clearErrors, reset, formState: { errors }, } = useForm({
    defaultValues,
    resolver: yupResolver(yupSchema),
  });

  const [feedback, setFeedback] = useState("");
  const [feedbackGood, setFeedbackGood] = useState("");
  const navigate = useNavigate();

  async function submit() {
    setFeedback("");
    clearErrors();
    const values = getValues();
    console.log(values);

    try {
      const response = await fetch(`http://localhost:8000/api/users/contactUs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log(`sending request `);
      if (response.ok) {
        const responseBody = await response.json();
        if (responseBody.message) {
          setFeedback(responseBody.message);
        } else {
          setFeedbackGood(responseBody.messageGood);
          reset(defaultValues);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } else {
        // Gérer les erreurs si la réponse n'est pas "ok"
        console.error(`Erreur HTTP : ${response.status}`);
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'envoi de la requête :", error);
    }
  }

    return (
      <main>
        <div className={`${styles.box} shadow`}>

          <h2 className='titreOrange'><i className="fa-solid fa-file-pen Orange"></i> Nous contacter</h2>

          <form onSubmit={handleSubmit(submit)} >
            <div className='oneInput'>
              <label htmlFor="email">Adresse mail</label>
              <input {...register("email")} type="email" id="email" required />

              {errors?.email && (
                <p style={{ color: "red" }}> {errors.email.message} </p>
              )}
            </div>

            <div className='oneInput'>
              <label htmlFor="motif">Expliquez votre demande</label>
              <textarea  {...register("motif")} className='motif' type="text" id="motif" maxLength={500} required />
            </div>

            {/* --- --- --- --- ---> F E E D B A C K <--- --- --- --- --- */}
            {feedback && <p className={`feedback`}>{feedback}</p>}

            {feedbackGood && (<p className={`feedbackGood`}>{feedbackGood}</p>)}

            <Button content="Envoyer votre demande" title='envoyer votre demande' className='send' onClick={submit} />
          </form >

        </div>
      </main>
    )
  }
