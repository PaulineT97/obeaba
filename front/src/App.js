import Header from "./Components/header/Header";
import Footer from './Components/footer/Footer';
import { Suspense } from "react";
import { Outlet, 
  // useLoaderData
 } from "react-router-dom";


function App() {

  //NOTE - Permet de récupérer les informations du user lors de sa connexion
  // const user = useLoaderData();
  // console.log(user);

  return (
    <div className="App">
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
