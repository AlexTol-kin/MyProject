import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import YourMarket from "../../images/YourMarket.svg";
import { ROUTES } from "../../utils/routes";

import styles from "../../styles/Footer.module.css";

const Footer = () => {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=52247a358f00cf77020ce26bfa558aca"
    )
      .then((res) => res.json())
      .then(({ main, name, weather }) => {
        setCity(name);
        setTemperature(Math.round(main.temp));
        setWeather(weather[0].description);
      });
  }, []);

  return (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={YourMarket} alt="Market" />
        </Link>
      </div>

      <div className={styles.rights}>
        Developer by{" "}
        <a
          href="https://github.com/AlexTol-kin"
          target="_blank"
          rel="noreferrer"
        >
          Aleksandr Tolstolytkin{" "}
        </a>
      </div>

      <div className={styles.socials}>
        <div>
          <div>
            {city},{" "}
            {new Date().toLocaleString("ru", { day: "numeric", month: "long" })}
          </div>
          {temperature} ℃, {weather}
        </div>

        <a
          href="https://github.com/AlexTol-kin"
          target="_blank"
          rel="noreferrer"
        >
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
          </svg>
        </a>

        <a
          href="https://github.com/AlexTol-kin"
          target="_blank"
          rel="noreferrer"
        >
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
          </svg>
        </a>

        <a
          href="https://github.com/AlexTol-kin"
          target="_blank"
          rel="noreferrer"
        >
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Footer;
