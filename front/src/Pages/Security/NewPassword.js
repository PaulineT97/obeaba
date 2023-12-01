import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Button from '../../Components/button/Button';

const NewPassword = () => {

    const [feedback, setFeedBack] = useState("");
    const [feedbackGood, setFeedBackGood] = useState("");
    const navigate = useNavigate();

    const yupSchema = yup.object({
        email: yup
            .string()
            .required("Le champ est obligatoire")
            .matches(
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Votre email n'est pas valide"
            ),
    });

    const defaultValues = {
        email: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    })

    async function submit(values) {
        console.log(values);
        try {
            await fetch(
                `http://localhost:8000/api/users/resetPassword/${values.email}`
            );
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <main>
            <div className="">
                <h1 className="titreArticle"> Renouveler mon mot de passe </h1>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="oneInput">
                        <label htmlFor="email" className="mb10">
                            Email
                        </label>
                        <input type="email" id="email" {...register("email")} />
                        {errors?.email && (
                            <p>{errors.email.message}</p>
                        )}
                    </div>

                    {feedback && <p className="feedback">{feedback}</p>}
                    {feedbackGood && (
                        <p className="feedbackGood">{feedbackGood}</p>
                    )}
                    <Button content="m'envoyer un mail" className="send" />
                </form>
            </div>
        </main>
    )
}

export default NewPassword
