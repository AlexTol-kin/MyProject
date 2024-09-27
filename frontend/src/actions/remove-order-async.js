import { request } from "../utils/request";
import { removeOrder } from "./remove-order";

export const removeOrderAsync = (userId, id) => (dispatch) => {
  request(`/users/${userId}/orders/${id}`, "DELETE").then(() => {
    return dispatch(removeOrder(id));
  });
};
