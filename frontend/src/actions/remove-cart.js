import { ACTION_TYPE } from "./action-type";

export const removeCart = (cart) => ({
  type: ACTION_TYPE.REMOVE_CART,
  payload: cart,
});
