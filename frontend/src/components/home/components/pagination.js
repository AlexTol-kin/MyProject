import styles from "./pagination.module.css";

export const Pagination = ({ page, lastPage, setPage }) => {
  return (
    <div className={styles.pagination}>
      <button disabled={page === 1} onClick={() => setPage(1)}>
        В начало
      </button>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Предыдущая
      </button>
      <div className="current-page">Страница: {page}</div>
      <button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
        Следующая
      </button>
      <button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
        В конец
      </button>
    </div>
  );
};
