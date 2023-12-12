import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { lazy } from "react";
import { userLoader } from "./Loaders/UserLoader";
import ProtectedRoute from "./Components/protectedRoute/ProtectedRoute";
const Home = lazy(() => import("./Pages/Home/Home"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage"));
const Forms = lazy(() => import("./Pages/Forms/Forms"));
const Register = lazy(() => import("./Pages/Forms/Register"));
const Login = lazy(() => import("./Pages/Forms/Login"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const WelcomeDog = lazy(() => import("./Pages/WelcomeDog/WelcomeDog"));
const Education = lazy(() => import("./Pages/Education/Education"));
const Agility = lazy(() => import("./Pages/Agility/Agility"));
const DogDance = lazy(() => import("./Pages/DogDance/DogDance"));
const Walk = lazy(() => import("./Pages/Walk/Walk"));
const NewPassword = lazy(() => import("./Pages/Security/NewPassword"));
const ResetPassword = lazy(() => import("./Pages/Security/ResetPassword"));
const ContactUs = lazy(() => import("./Pages/Forms/ContactForm"));
const MentionsLegales = lazy(() => import("./Components/legalContent/MentionsLegales"));
const CGU = lazy(() => import("./Components/legalContent/CGU"));
const Confidentialite = lazy(() => import("./Components/legalContent/politiqueConfidentialite"));
const Registration = lazy(() => import("./Pages/Activities/Registration"));


export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: userLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/Profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/Forms",
                element: <Forms />,
                children:[
                    {
                        path: "",
                        element: <Login />,
                    },
                    {
                        path: "register",
                        element: <Register />,
                    },
                ]
            },
            {
                path: "/RegistrationActivities",
                element: (
                    <ProtectedRoute>
                        <Registration />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/WelcomeDog",
                element: <WelcomeDog />,
            },
            {
                path: "/Education",
                element: <Education />,
            },
            {
                path: "/Agility",
                element: <Agility />,
            },
            {
                path: "/DogDance",
                element: <DogDance />,
            },
            {
                path: "/Walk",
                element: <Walk />,
            },
            {
                path: "/NewPassword",
                element: <NewPassword />,
            },
            {
                path: "/resetPassword",
                element: <ResetPassword/>,
            },
            {
                path:"/ContactUs",
                element: <ContactUs />,
            },
            {
                path:"/MentionsLegales",
                element: <MentionsLegales />,
            },
            {
                path:"/cgu",
                element: <CGU />,
            },
            {
                path:"/confidentialite",
                element: <Confidentialite />,
            },
        ]
    },
])

