import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addCommentAsync,
  closeModal,
  openModal,
  removeCommentAsync,
} from "../../../actions";
import { ROLE } from "../../../constans/role";
import { selectUserRole } from "../../../selectors";

import styles from "../../../styles/Comments.module.css";

export const Comments = ({ comments, productId, isGuest }) => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const userRole = useSelector(selectUserRole);

  const onNewCommentAdd = (productId, content) => {
    dispatch(addCommentAsync(productId, content));
    setNewComment("");
  };

  const onCommentRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить комментарий?",
        onConfirm: () => {
          dispatch(removeCommentAsync(productId, id));
          dispatch(closeModal);
        },
        onCancel: () => dispatch(closeModal),
      })
    );
  };

  const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);
  const isUser = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.USER].includes(userRole);

  return (
    <div className={styles.allComments}>
      {isUser && (
        <div className={styles.newComment}>
          <textarea
            name="comment"
            value={newComment}
            placeholder="Комментарий..."
            onChange={({ target }) => setNewComment(target.value)}
          ></textarea>
          <div>
            <button
              className={styles.buttom}
              onClick={() => onNewCommentAdd(productId, newComment)}
            >
              Отправить
            </button>
          </div>
        </div>
      )}
      <div className={styles.comments}>
        {comments.map(({ id, author, content, publishedAt }) => (
          <div className={styles.newComments} key={id}>
            <div className={styles.comment}>
              <div className={styles.informationPanel}>
                <div className={styles.author}>{author}</div>
                <div className={styles.publishedAt}>
                  {publishedAt.slice(0, 10)}
                </div>
              </div>
              <div className={styles.commentText}> {content} </div>
            </div>
            {isAdminOrModerator && (
              <button onClick={() => onCommentRemove(id)}>🗑</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
