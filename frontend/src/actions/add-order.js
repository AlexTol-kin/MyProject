import { ACTION_TYPE } from "./action-type";

export const addOrder = (order) => ({
  type: ACTION_TYPE.ADD_ORDER,
  payload: order,
});
