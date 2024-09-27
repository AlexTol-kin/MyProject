import React from "react";
import allSale from "../../images/allSale.png";

import styles from "../../styles/Home.module.css";

const Poster = () => {
  return (
    <section className={styles.home}>
      <div className={styles.title}>BIG SALE 33%</div>
      <div className={styles.product}>
        <div className={styles.text}>
          <div className={styles.subtitle}>скоро начало распродажи</div>
          <h1 className={styles.head}>
            {" "}
            Устарела техника - починить - нельзя - купить{" "}
          </h1>
          <button className={styles.button}>Купить сейчас</button>
        </div>
        <div className={styles.image}>
          <img src={allSale} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Poster;
