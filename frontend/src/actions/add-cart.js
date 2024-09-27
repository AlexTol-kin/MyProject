import { ACTION_TYPE } from "./action-type";

export const addCart = (cart) => ({
  type: ACTION_TYPE.ADD_CART,
  payload: cart,
});
