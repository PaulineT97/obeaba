import Button from '../button/Button';
import styles from './Modal.module.scss';

export default function Modal({ message, onConfirm, onCancel, style }) {
    return (
        <div className={`${styles.modalContainer}`}  style={style}>
            <div className={`box ${styles.contentContainer}`}>
                <p className={styles.message}>
                    {message}
                </p>
                <div className={styles.buttonsContainer}>
                    <Button
                        onClick={onConfirm}
                        title='Cliquez pour confirmer votre choix'
                        content="Confirmer"
                    />
                    <button
                        className="btn"
                        onClick={onCancel}
                        title='Cliquez pour annuler'>
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}