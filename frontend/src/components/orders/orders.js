import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { request } from "../../utils/request";
import { ROLE } from "../../constans";
import { checkAccess } from "../../utils/check-acces";

import { selectUserRole } from "../../selectors";
import { removeOrderAsync } from "../../actions";

import styles from "./orders.module.css";

export const Orders = () => {
  const [users, setUsers] = useState([]);
  const [ordersAll, setOrdersAll] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
  const userRole = useSelector(selectUserRole);

  useEffect(() => {
    Promise.all([request(`/users`), request(`/users/orders`)]).then(
      ([usersRes, orderRes]) => {
        if (usersRes.error || orderRes.error) {
          setErrorMessage(usersRes.error || orderRes.error);
          return;
        }

        setUsers(usersRes.data);
        setOrdersAll(orderRes.data);
      }
    );
  }, [shouldUpdateUserList]);

  const onOrderRemove = (userId, id) => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }

    request(`/users/${userId}/orders/${id}`, "DELETE").then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList);
    });
  };

  return (
    <div className={styles.users}>
      <h2>Пользователи</h2>
      <div>
        <div className={styles.div}>
          <div className={styles.loginColum}>Покупатель</div>
          <div className={styles.registeredAtColum}>Дата заказа</div>
          <div className={styles.roleColum}>Сумма</div>
          <div className={styles.orderDiv}>Заказано</div>
        </div>

        {ordersAll.map((item) => (
          <div key={item.id} className={styles.userRow}>
            {console.log(item.orders)}
            <div className={styles.loginColum}>
              {users.map((user) =>
                user.id === item.buyer ? user.login : null
              )}
            </div>
            <div className={styles.registeredAtColum}>{item.registeredAt}</div>
            <div className={styles.loginColum}>{item.price}</div>
            <ul className={styles.order}>
              {item.orders.map((order) => (
                <li className={styles.ul}>{order.title}</li>
              ))}
            </ul>
            <button onClick={() => onOrderRemove(item.buyer, item.id)}>
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
