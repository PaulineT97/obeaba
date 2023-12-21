import React, { useEffect, useState } from 'react';
import {fetchAllAdherents} from '../../apis/admin';

export default function Adherents() {

        //ANCHOR - Constantes
const [listUsers, setListUsers] = useState([]);

    //ANCHOR - Fonctions 

        //NOTE -- cette fonction permet de récupérer toutes les informations nécessaires à l'affichage des adhérents
        useEffect(() => {
            async function fetchData() {
                try {
                    const dataBack = await fetchAllAdherents();
                    setListUsers(dataBack);
                } catch (error) {
                    console.error('Error in component:', error);
                }
            }
    
            fetchData();
        }, []);
    return (
        <>
            <h3>Les adhérents</h3>

            <article>

            </article>
        </>
    )
}
