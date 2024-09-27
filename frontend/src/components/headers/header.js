import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { ROUTES } from "../../utils/routes";
import YourMarket from "../../images/YourMarket.svg";

import { selectCart, selectUserLogin, selectUserRole } from "../../selectors";
import { logout } from "../../actions";
import { ROLE } from "../../constans/role";

import styles from "../../styles/Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);
  const userRole = useSelector(selectUserRole);
  const cart = useSelector(selectCart);

  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    if (userName === "Guest") return;
    setUserName(login);
  }, [login]);

  const handleClick = () => {
    navigate(ROUTES.REGISTRATION);
  };

  const onLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userData");
    navigate(ROUTES.HOME);
  };

  const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={YourMarket} alt="" />
        </Link>
      </div>
      {isAdminOrModerator && (
        <Link to={`/users`} className={styles.product}>
          <button>👥</button>
        </Link>
      )}
      {isAdminOrModerator && (
        <Link to={`/users/orders`} className={styles.product}>
          <button>&#128722;</button>
        </Link>
      )}
      <div className={styles.info}>
        <div className={styles.account}>
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            {!!cart.length && (
              <span className={styles.count}>{cart.length}</span>
            )}
          </Link>
        </div>
        <div className={styles.username}>
          {login || userName}👤
          {roleId === ROLE.GUEST ? (
            <button className={styles.button} onClick={handleClick}>
              Войти
            </button>
          ) : (
            <button className={styles.button} onClick={onLogout}>
              Выйти
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
