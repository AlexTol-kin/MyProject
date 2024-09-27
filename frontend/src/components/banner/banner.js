import React from "react";

import styles from "../../styles/Home.module.css";

import Sale from "../../images/Sale.jpg";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.right}>
        <img src={Sale} alt="" />
      </div>
    </section>
  );
};

export default Banner;
