import { request } from "../utils/request";
import { addOrder } from "./add-order";

export const addOrderAsync = (cart, totalPrice, buyerId) => (dispatch) => {
  request(`/users/${buyerId}/orders`, "POST", {
    orders: cart,
    price: totalPrice,
  }).then((order) => {
    dispatch(addOrder(order.data));
  });
};
