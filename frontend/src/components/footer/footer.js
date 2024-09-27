import React from "react";
import { Link } from "react-router-dom";

import YourMarket from "../../images/YourMarket.svg";
import { ROUTES } from "../../utils/routes";

import styles from "../../styles/Footer.module.css";

const Footer = () => (
  <section className={styles.footer}>
    <div className={styles.logo}>
      <Link to={ROUTES.HOME}>
        <img src={YourMarket} alt="Market" />
      </Link>
    </div>

    <div className={styles.rights}>
      Developer by{" "}
      <a href="https://github.com/AlexTol-kin" target="_blank" rel="noreferrer">
        Aleksandr Tolstolytkin{" "}
      </a>
    </div>

    <div className={styles.socials}>
      <a href="https://github.com/AlexTol-kin" target="_blank" rel="noreferrer">
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
        </svg>
      </a>

      <a href="https://github.com/AlexTol-kin" target="_blank" rel="noreferrer">
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
        </svg>
      </a>

      <a href="https://github.com/AlexTol-kin" target="_blank" rel="noreferrer">
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
        </svg>
      </a>
    </div>
  </section>
);

export default Footer;
