import { useSelector } from "react-redux";

import {
  selectModaIsOpen,
  selectModaOnCancel,
  selectModaOnConfirm,
  selectModaText,
} from "../../selectors";

import styles from "./modal.module.css";

export const Modal = () => {
  const isOpen = useSelector(selectModaIsOpen);
  const text = useSelector(selectModaText);
  const onConfirm = useSelector(selectModaOnConfirm);
  const onCancel = useSelector(selectModaOnCancel);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.overlay}></div>
      <div className={styles.box}>
        <h3 className={styles.title}>{text}</h3>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={onConfirm}>
            Да
          </button>

          <button className={styles.button} onClick={onCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
