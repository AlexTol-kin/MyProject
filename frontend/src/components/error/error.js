import styles from "../../styles/Error.module.css";

export const Error = ({ error }) =>
  error && (
    <div className={styles.error}>
      <h2>Ошибка</h2>
      <div>{error}</div>
    </div>
  );
