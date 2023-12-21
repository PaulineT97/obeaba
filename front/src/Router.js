import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { lazy } from "react";
import { userLoader } from "./Loaders/UserLoader";
import ProtectedRoute from "./Components/protectedRoute/ProtectedRoute";
import ProtectedRouteAdmin from "./Components/protectedRoute/ProtectedRouteAdmin";
import ProtectedRouteLogged from './Components/protectedRoute/ProtectedRouteLogged';
const Home = lazy(() => import("./Pages/Home/Home"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage"));
const Forms = lazy(() => import("./Pages/Forms/Forms"));
const Register = lazy(() => import("./Pages/Forms/Register"));
const Login = lazy(() => import("./Pages/Forms/Login"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const WelcomeDog = lazy(() => import("./Pages/WelcomeDog/WelcomeDog"));
const Education = lazy(() => import("./Pages/Education/Education"));
const Agility = lazy(() => import("./Pages/Agility/Agility"));
const AgiDebut = lazy(() => import("./Pages/Agility/AgiDebut"));
const AgiInt = lazy(() => import("./Pages/Agility/AgiInt"));
const AgiConf = lazy(() => import("./Pages/Agility/AgiConf"));
const DogDance = lazy(() => import("./Pages/DogDance/DogDance"));
const ObeDebut = lazy(() => import("./Pages/DogDance/ObeDebut"));
const ObeInt = lazy(() => import("./Pages/DogDance/ObeInt"));
const ObeConf = lazy(() => import("./Pages/DogDance/ObeConf"));
const Walk = lazy(() => import("./Pages/Walk/Walk"));
const NewPassword = lazy(() => import("./Pages/Security/NewPassword"));
const ResetPassword = lazy(() => import("./Pages/Security/ResetPassword"));
const ContactUs = lazy(() => import("./Pages/Forms/ContactForm"));
const MentionsLegales = lazy(() => import("./Components/legalContent/MentionsLegales"));
const CGU = lazy(() => import("./Components/legalContent/CGU"));
const Confidentialite = lazy(() => import("./Components/legalContent/politiqueConfidentialite"));
const Registration = lazy(() => import("./Pages/Activities/Registration"));
const EspaceAdmin = lazy(() => import("./Pages/Admin/EspaceAdmin"));
const Adherents = lazy(() => import("./Pages/Admin/Adherents"));
const Chiens = lazy(() => import("./Pages/Admin/Chiens"));
const Educateurs = lazy(() => import("./Pages/Admin/Educateurs"));


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
                element: (
                    <ProtectedRouteLogged>
                        <Forms />
                    </ProtectedRouteLogged>
                ),
                children: [
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
                path: "/Admin",
                element: (
                    <ProtectedRouteAdmin>
                        <EspaceAdmin />
                    </ProtectedRouteAdmin>
                ),
                children: [
                    {
                        path: "",
                        element: <Adherents />,
                    },
                    {
                        path: "chiens",
                        element: <Chiens />,
                    },
                    {
                        path: "educateurs",
                        element: <Educateurs />,
                    },
                ]
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
                children: [
                    {
                        path: "",
                        element: <AgiDebut />,
                    },
                    {
                        path: "agiInt",
                        element: <AgiInt />,
                    },
                    {
                        path: "agiConf",
                        element: <AgiConf />,
                    },
                ]
            },
            {
                path: "/DogDance",
                element: <DogDance />,
                children: [
                    {
                        path: "",
                        element: <ObeDebut />,
                    },
                    {
                        path: "obeInt",
                        element: <ObeInt />,
                    },
                    {
                        path: "obeConf",
                        element: <ObeConf />,
                    },
                ]
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
                element: <ResetPassword />,
            },
            {
                path: "/ContactUs",
                element: <ContactUs />,
            },
            {
                path: "/MentionsLegales",
                element: <MentionsLegales />,
            },
            {
                path: "/cgu",
                element: <CGU />,
            },
            {
                path: "/confidentialite",
                element: <Confidentialite />,
            },
        ]
    },
])

