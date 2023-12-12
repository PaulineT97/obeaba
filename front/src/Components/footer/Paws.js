import Prints from "../../Assets/Images/paws.svg";
import styles from './Footer.module.scss';

export default function Paws () {
    return (
        <div className={`${styles.optionMenu}`}>
            <img src={Prints} alt="quatre empreintes de chien" />
        </div>
    )
}