import React from "react";
import { NavLink } from "react-router-dom";

import styles from "../../styles/Sidebar.module.css";

const Sidebar = ({ products }) => {
  const isCategory = eliminateDuplicates(
    products.map(({ category }) => category)
  );

  function eliminateDuplicates(cat) {
    return [...new Set(cat)];
  }

  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>
      <nav>
        <ul className={styles.menu}>
          {isCategory.map((category) => (
            <li key={category}>
              <NavLink
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                to={`/categories/${category}`}
              >
                {category}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <a href="/help" target="_blank" className={styles.link}>
          Help
        </a>
        <a
          href="/terms"
          target="_blank"
          className={styles.link}
          style={{ textDecoration: "underline" }}
        >
          Terms & Conditions
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
