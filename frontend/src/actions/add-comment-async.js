import { request } from "../utils/request";
import { addComment } from "./add-comment";

export const addCommentAsync = (productId, content) => (dispatch) => {
  request(`/products/${productId}/comments`, "POST", { content }).then(
    (comment) => {
      dispatch(addComment(comment.data));
    }
  );
};
