import { ACTION_TYPE } from "./action-type";

export const addQuantity = (id, quantity) => ({
  type: ACTION_TYPE.ADD_QUANTITY,
  payload: { id, quantity },
});
