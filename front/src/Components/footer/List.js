import {NavLink} from 'react-router-dom';

export default function List ({Link1, Link2, Link3, Link4, lien1, lien2, lien3, lien4}){
    return(
        <div>
            <NavLink to={lien1}> <p>{Link1}</p> </NavLink>
            <NavLink to={lien2}> <p>{Link2}</p> </NavLink>
            <NavLink to={lien3}> <p>{Link3}</p> </NavLink>
            <NavLink to={lien4}> <p>{Link4}</p> </NavLink>
        </div>
    )
}