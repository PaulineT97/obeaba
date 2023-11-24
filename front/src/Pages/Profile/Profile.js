import React from 'react'
import HeadProfile from "../../Assets/Images/headerMonCompte.jpg";
import styles from "./Profile.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {

  const [feedback, setFeedBack] = useState("");
  const [feedbackGood, setFeedBackGood] = useState("");
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const {logout} = useContext(AuthContext);

  const yupSchema = yup.object({
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .email("Vous devez saisir un email valide"),
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(5, "Mot de passe trop court")
      .max(10, "Mot de passe trop long"),
  });

  const defaultValues = {
    password: "",
    email: "",
    avatar: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  return (
    <>
      < div style={{ backgroundImage: `url(${HeadProfile})` }} className={`${styles.banniere}`}>
        <div className='overlay' ></div>
        <h1 className='titreBanniere'>Mon compte</h1>
      </div >

      <main>
        <div>
        {
          user === null ? (
            <>
              <NavLink to="/" className={`mr10 btn btn-primary-reverse`}>
                <span>Login</span>
              </NavLink>
              <NavLink to="register" className={`mr10 btn btn-primary-reverse`}>
                <span>Register</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink onClick={logout} to="/" className={`mr10 btn btn-primary-reverse`}>
                <span>Logout</span>
              </NavLink>
              <NavLink to="profile" className={`mr10 btn btn-primary-reverse`}>
                <span>Profile</span>
              </NavLink>
            </>
          )
        }
        </div>
      </main>
    </>
  )
}
