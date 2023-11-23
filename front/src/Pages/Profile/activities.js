// import React from 'react'
// import styles from "./Profile.module.scss";
// import { useFieldArray } from "react-hook-form";
// import { useState, useEffect } from 'react';

// export default function activities() {
//     const defaultValues = {
//         activities: "",
//     };
//     const { fields, append, remove } = useFieldArray({
//         name: "activities",
//         control,
//     })
//     function addAct() {
//         append({
//             act: "",
//             level: "",
//         });
//     }  
//     function deleteAct(id) {
//         remove(id);
//     }

//     const [activitiz, setActivities] = useState([]);

//     useEffect(() => {
//         async function getActivities() {
//             try {
//                 const response = await fetch("http://localhost:8000/getActivities");
//                 if (response.ok) {
//                     const activities = await response.json();
//                     console.log(activities);
//                     setActivities(activities);
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//         getActivities();
//     }, []);


//   return (
//     <div>
//                   <div>
//                 <label htmlFor="name" >
//                     <span >Ajouter une activité</span>
//                     <button onClick={addAct} type="button">+</button>
//                 </label>

//                 <ul>
//                     {fields.map((activities, index) => (
//                         <li key={activities.idActivities}>

//                             <select id="activities" {...register(`activities[${index}].act`)}>
//                                 {activitiz.map((activity) => (
//                                     <option key={activity.idActivities} value={activity.idActivities}>{activity.activityName}</option>
//                                 ))}
//                             </select>
//                             <select id="level" {...register(`skills[${index}].level`)}>
//                                 <option value="debutant">découverte</option>
//                                 <option value="intermediaire">intermédiaire</option>
//                                 <option value="expert">confirmé</option>
//                             </select>

//                             <button onClick={() => deleteAct(index)} className="btn btn-primary">-</button>
//                         </li>
//                     ))}
//                 </ul>


//             </div>
//     </div>
//   )
// }
