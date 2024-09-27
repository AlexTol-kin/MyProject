import { useState } from "react";
import { request } from "../../../../utils/request";
import styles from "../../users.module.css";

export const UserRow = ({
  id,
  login,
  registeredAt,
  roleId: userRoleId,
  roles,
  onUserRemove,
}) => {
  const [initialRoleId, setInitialRoleId] = useState(userRoleId);
  const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

  const onRoleChange = ({ target }) => {
    setSelectedRoleId(Number(target.value));
  };

  const onRoleSave = (userId, newUserRoleId) => {
    request(`/users/${userId}`, "PATCH", { roleId: newUserRoleId }).then(() => {
      setInitialRoleId(newUserRoleId);
    });
  };

  const isSaveButtonDisabled = selectedRoleId === initialRoleId;

  return (
    <div className={styles.userRow}>
      <div className={styles.loginColum}>{login}</div>
      <div className={styles.registeredAtColum}>{registeredAt}</div>
      <div className={styles.roleColum}>
        <select
          className={styles.roleSelect}
          value={selectedRoleId}
          onChange={onRoleChange}
        >
          {roles.map(({ id: roleId, name: roleName }) => (
            <option key={roleId} value={roleId}>
              {roleName}
            </option>
          ))}
        </select>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => onRoleSave(id, selectedRoleId)}
        >
          ✎
        </button>
      </div>
      <button onClick={onUserRemove}>🗑</button>
    </div>
  );
};
