import React from 'react';
import styles from "./Forms.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';
import Button from '../../Components/button/Button';

export default function ContactForm() {
  const defaultValues = {
    email: "",
    motif: "",
  }
  const yupSchema = yup.object({
    email: yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Votre email n'est pas valide"),
    motif: yup.string().required("Motif obligatoire"),
  });

  const { register, handleSubmit, reset, formState: { errors }, } = useForm({
    defaultValues,
    resolver: yupResolver(yupSchema),
  });

  const [feedback, setFeedback] = useState("");
  const [feedbackGood, setFeedbackGood] = useState("");

  function submit(values) {
    console.log(values);
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
            <textarea className='motif' type="text" id="motif" maxLength={500} placeholder='   . . .' required />
          </div>
          <Button content="Envoyer votre demande" title='envoyer votre demande' className='send' />
        </form >

      </div>
    </main>
  )
}
