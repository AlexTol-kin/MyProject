import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useMatch, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ROUTES } from "../../utils/routes";

import { selectCart, selectProduct, selectUserRole } from "../../selectors";
import {
  addQuantity,
  closeModal,
  loadProductAsync,
  openModal,
  removeProductAsync,
  resetProductData,
} from "../../actions";

import { Comments } from "./components";
import { Error } from "../error/error";
import { ROLE } from "../../constans";

import { mapCart } from "../cart/utils/mapCart";
import { addCart } from "../../actions/add-cart";

import styles from "../../styles/Product.module.css";

const Product = () => {
  const [error, setError] = useState(null);
  const params = useParams();
  const cart = useSelector(selectCart);

  const dispatch = useDispatch();

  const isCreating = !!useMatch("/products/");
  const product = useSelector(selectProduct);
  const userRole = useSelector(selectUserRole);

  const navigate = useNavigate();

  const onProductRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить продукт?",
        onConfirm: () => {
          dispatch(removeProductAsync(id)).then(() => {
            navigate("/");
          });
          dispatch(closeModal);
        },
        onCancel: () => dispatch(closeModal),
      })
    );
  };

  useLayoutEffect(() => {
    dispatch(resetProductData);
  }, [dispatch, isCreating]);

  useEffect(() => {
    if (isCreating) {
      return;
    }
    dispatch(loadProductAsync(params.id)).then((productData) => {
      setError(productData.error);
    });
  }, [dispatch, params.id, isCreating]);

  const actionCart = mapCart(product);

  const onAddToCart = () => {
    const found = cart.find(({ id }) => id === actionCart.id);

    if (found) {
      found.quantity = found.quantity + 1;
      dispatch(addQuantity(actionCart.id, found));
    } else {
      dispatch(addCart(actionCart));
    }
  };

  const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);
  const isUser = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.USER].includes(userRole);

  return error ? (
    <Error error={error} />
  ) : (
    <div className={styles.product}>
      <div className={styles.images}>
        <img className={styles.image} src={product.imageUrl} alt="" />
        <div className={styles["images-list"]}>
          <div className={styles.info}>
            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.price}>{product.price}₽</div>
            <div className={styles.purchase}>
              {Math.floor(Math.random() * 98) + 2} купили
            </div>
            {isAdminOrModerator && (
              <Link
                to={`/products/${product.id}/edit`}
                className={styles.product}
                product={product}
              >
                <button>Редактировать</button>
              </Link>
            )}
            {isAdminOrModerator && (
              <div className={styles.product}>
                <button
                  className={styles.product}
                  onClick={() => onProductRemove(product.id)}
                >
                  Удалить
                </button>
              </div>
            )}
          </div>
        </div>
        <p>{product.content}</p>
        <div className={styles.buttom}>
          {isUser ? (
            <button onClick={onAddToCart} className={styles.add}>
              Добавить в корзину
            </button>
          ) : (
            <Link to={ROUTES.REGISTRATION} className={styles.title}>
              Авторизуйтесь для покупок⬏
            </Link>
          )}
        </div>
      </div>

      <div>
        <Comments comments={product.comments} productId={product.id} />
      </div>

      <div className={styles.botton}>
        <Link to={ROUTES.HOME}>↶</Link>
      </div>
    </div>
  );
};

export default Product;
