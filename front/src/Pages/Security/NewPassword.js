import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from '../../Components/button/Button';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const NewPassword = () => {

    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const { user } = useContext(AuthContext);

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
        try {
            const response = await fetch(
                `http://localhost:8000/api/users/resetPassword/${values.email}`
            );
    
            if (response.ok) {
                setFeedbackGood("Un email vous a été envoyé, vérifiez votre messagerie.");
            } else if (response.status === 404) {
                setFeedback("L'email est incorrect.");
                setTimeout(() => {
                    setFeedback("");
                }, 3000);
            } else {
                setFeedback("Une erreur s'est produite. Veuillez réessayer plus tard.");
                setTimeout(() => {
                    setFeedback("");
                }, 3000);
            }
        } catch (error) {
            console.error(error);
            setFeedback("Une erreur s'est produite. Veuillez réessayer plus tard.");
        }
    }
    

    return (
        <main>
            <div className="">
                {user ?
                    <h1 className="titreArticle"> Modifier mon mot de passe </h1> :
                    <h1 className="titreArticle"> Mot de passe oublié ? </h1>
                }
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
