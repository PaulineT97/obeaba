import HeaderMobile from "./Components/header/HeaderMobile";
import Header from "./Components/header/Header";
import Footer from './Components/footer/Footer';
import { Suspense } from "react";
import {
  Outlet,
  useLoaderData
} from "react-router-dom";
import AuthProvider from "./Components/authProvider/AuthProvider"


function App() {

  //NOTE - Permet de récupérer les informations du user lors de sa connexion
  const user = useLoaderData();
  console.log(user);

  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <HeaderMobile />
          <Suspense>
            <Outlet />
          </Suspense>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
