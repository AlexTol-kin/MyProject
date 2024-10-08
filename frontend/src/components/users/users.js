import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../../utils/request";
import { ROLE } from "../../constans";
import { checkAccess } from "../../utils/check-acces";
import { UserRow } from "./components";
import { selectUserRole } from "../../selectors";
import { closeModal, openModal } from "../../actions";

import styles from "./users.module.css";

export const Users = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
  const userRole = useSelector(selectUserRole);

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }
    Promise.all([request(`/users`), request(`/users/roles`)]).then(
      ([usersRes, rolesRes]) => {
        if (usersRes.error || rolesRes.error) {
          return;
        }

        setUsers(usersRes.data);
        setRoles(rolesRes.data);
      }
    );
  }, [shouldUpdateUserList, userRole]);

  const onUserRemove = (userId) => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }
    dispatch(
      openModal({
        text: "Удалить пользователя?",
        onConfirm: () => {
          request(`/users/${userId}`, "DELETE").then(() => {
            setShouldUpdateUserList(!shouldUpdateUserList);
          });
          dispatch(closeModal);
        },
        onCancel: () => dispatch(closeModal),
      })
    );
  };

  return (
    <div className={styles.users}>
      <h2>Пользователи</h2>
      <div>
        <div className={styles.div}>
          <div className={styles.loginColum}>Логин</div>
          <div className={styles.registeredAtColum}>Дата регистрации</div>
          <div className={styles.roleColum}>Роль</div>
        </div>

        {users.map(({ id, login, registeredAt, roleId }) => (
          <UserRow
            key={id}
            login={login}
            id={id}
            registeredAt={registeredAt}
            roleId={roleId}
            roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
            onUserRemove={() => onUserRemove(id)}
          />
        ))}
      </div>
    </div>
  );
};
