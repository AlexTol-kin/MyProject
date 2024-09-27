import { request } from "../utils/request";
import { removeCommnet } from "./remove-comment";

export const removeCommentAsync = (productId, id) => (dispatch) => {
  request(`/products/${productId}/comments/${id}`, "DELETE").then(() => {
    return dispatch(removeCommnet(id));
  });
};
