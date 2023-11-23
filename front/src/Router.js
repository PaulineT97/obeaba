import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { lazy } from "react";
// import { userLoader } from "./Loaders/UserLoader";
const Home = lazy(() => import("./Pages/Home/Home"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const WelcomeDog = lazy(() => import("./Pages/WelcomeDog/WelcomeDog"));
const Education = lazy(() => import("./Pages/Education/Education"));
const Agility = lazy(() => import("./Pages/Agility/Agility"));
const DogDance = lazy(() => import("./Pages/DogDance/DogDance"));
const Walk = lazy(() => import("./Pages/Walk/Walk"));


export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // loader: userLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/Profile",
                element: <Profile />,
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
                path: "/",
                element: <Home />,
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
            }
        ]
    },
])

