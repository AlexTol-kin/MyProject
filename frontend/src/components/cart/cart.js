import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { sumBy } from "../../utils/common";

import {
  addOrderAsync,
  addQuantity,
  clearCart,
  closeModal,
  openModal,
  removeCart,
} from "../../actions";
import { selectCart, selectUserId } from "../../selectors";

import styles from "../../styles/Cart.module.css";

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const buyerId = useSelector(selectUserId);
  const navigate = useNavigate();

  const totalPrice = sumBy(cart.map(({ quantity, price }) => quantity * price));

  const changeQuantity = (id, item, operator) => {
    item.quantity = item.quantity + operator;
    dispatch(addQuantity(id, item));
  };

  const removeItem = (item) => {
    dispatch(
      openModal({
        text: "Удалить товар?",
        onConfirm: () => {
          dispatch(removeCart(item));
          dispatch(closeModal);
        },
        onCancel: () => dispatch(closeModal),
      })
    );
  };

  const onByOrder = (cart, totalPrice, buyerId) => {
    dispatch(
      openModal({
        text: "Оформить заказ?",
        onConfirm: () => {
          dispatch(closeModal);
          dispatch(addOrderAsync(cart, totalPrice, buyerId));
          dispatch(clearCart());
          navigate(ROUTES.HOME);
        },
        onCancel: () => dispatch(closeModal),
      })
    );
  };

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Корзина</h2>
      {!cart.length ? (
        <div className={styles.empty}>Корзина пуста</div>
      ) : (
        <>
          <div className={styles.list}>
            {cart.map((item) => {
              const { title, id, images, price, quantity } = item;
              return (
                <div className={styles.item} key={Math.random() * price}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${images})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                  </div>
                  <div className={styles.prices}>{price}₽</div>
                  <div className={styles.quantity}>
                    {item.quantity === 0 ? (
                      <div></div>
                    ) : (
                      <div
                        className={styles.minus}
                        onClick={() => changeQuantity(id, item, -1)}
                      >
                        <svg className="icon">
                          <use
                            xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                          />
                        </svg>
                      </div>
                    )}
                    <span className="">{quantity}</span>
                    <div
                      className={styles.plus}
                      onClick={() => changeQuantity(id, item, +1)}
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                        />
                      </svg>
                    </div>
                  </div>
                  <div className={styles.total}>{price * quantity}₽</div>
                  <div
                    className={styles.close}
                    onClick={() => removeItem(item)}
                  >
                    <svg className="icom">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.action}>
            <div className={styles.total}>
              Общая сумма: {""}
              <span>
                {sumBy(cart.map(({ quantity, price }) => quantity * price))}₽
              </span>
            </div>
            <button
              className={styles.proceed}
              onClick={() => onByOrder(cart, totalPrice, buyerId)}
            >
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </section>
  );
};
