import { ACTION_TYPE } from "./action-type";

export const removeOrder = (orderId) => ({
  type: ACTION_TYPE.REMOVE_ORDER,
  payload: orderId,
});
