import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useResetForm } from "../../hooks";
import { Link, Navigate } from "react-router-dom";

import { selectUserRole } from "../../selectors";
import { request } from "../../utils/request";
import { setUser } from "../../actions";
import { ROLE } from "../../constans/role";

import styles from "../../styles/User.module.css";

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .matches(
      /^\w+$/,
      "Неверно заполнен логин. Допускаются только буквы и цифры"
    )
    .min(3, "Неверно заполнен логин. Минимум 3 символа")
    .max(15, "Неверно заполнен логин. Макимум 15 символов"),
  password: yup
    .string()
    .required("Введите пароль")
    .matches(
      /^[\w#%]+$/,
      "Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %"
    )
    .min(6, "Неверно заполнен пароль. Минимум 6 символа")
    .max(30, "Неверно заполнен пароль. Макимум 30 символов"),
});

const UserLoginForm = ({ toggleCurrentFormType, closeForm }) => {
  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState(null);

  const roleId = useSelector(selectUserRole);

  useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    request("/login", "POST", { login, password }).then(({ error, user }) => {
      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
        return;
      }

      dispatch(setUser(user));
      sessionStorage.setItem("userData", JSON.stringify(user));
    });
  };

  const formError = errors?.login?.message || errors?.password?.message;

  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>
      <div className={styles.title}>Авторизация</div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.group}>
          <input
            type="text"
            placeholder="Логин..."
            {...register("login", {
              onChange: () => setServerError(null),
            })}
          />
        </div>
        <div className={styles.group}>
          <input
            type="password"
            placeholder="Пароль..."
            {...register("password", {
              onChange: () => setServerError(null),
            })}
          />
        </div>
        <div className={styles.link}>
          <Link to="/registration">Регистрация</Link>
        </div>
        <button type="submit" className={styles.submit}>
          Войти
        </button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
};
export default UserLoginForm;
