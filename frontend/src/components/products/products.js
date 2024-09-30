import React from "react";
import { Link } from "react-router-dom";

import { ROLE } from "../../constans";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";

import styles from "../../styles/Products.module.css";

const Products = ({ products = [], selectSort, onSelectSort }) => {
  const userRole = useSelector(selectUserRole);

  const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

  return (
    <section className={styles.spriducts}>
      {isAdminOrModerator && (
        <Link to={`/products`} className={styles.product}>
          <button>Добавить продукт</button>
        </Link>
      )}

      <button
        className={selectSort !== 1 ? styles.sortUp : styles.sortDown}
        onClick={onSelectSort}
      >
        {selectSort !== 1 ? "⇵" : "⇅"}
      </button>

      <div className={styles.list}>
        {products.map(({ id, imageUrl, title, category, price, available }) => (
          <Link to={`/products/${id}`} key={id} className={styles.product}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${imageUrl})` }}
            />

            <div className={styles.wrapper}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.cat}>{category}</div>
              <div className={styles.info}>
                <div className={styles.prices}>
                  <div className={styles.price}>{price}₽</div>
                  <div className={styles.oldPrice}>
                    {Math.floor(price * 1.2)}₽
                  </div>
                  {available ? (
                    <div className={styles.purchases}>
                      {available} в наличии
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Products;
