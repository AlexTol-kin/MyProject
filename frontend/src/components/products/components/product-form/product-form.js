import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { saveProductAsync } from "../../../../actions";
import { selectProduct } from "../../../../selectors";

import styles from "./product-form.module.css";

export const ProductForm = () => {
  const params = useParams();
  const id = params.id;

  const product = useSelector(selectProduct);

  const { title, imageUrl, category, price, available, content } = product;

  const [imageUrlValue, setImageUrlValue] = useState(id ? imageUrl : "");
  const [titleValue, setTitleValue] = useState(id ? title : "");
  const [categoryValue, setCategoryValue] = useState(id ? category : "");
  const [priceValue, setPriceValue] = useState(id ? price : "");
  const [availableValue, setАvailableValue] = useState(id ? available : "");
  const [сontentValue, setСontentValue] = useState(id ? content : "");

  useLayoutEffect(() => {
    setImageUrlValue(imageUrl);
    setTitleValue(title);
  }, [imageUrl, title]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSave = () => {
    // const newContent = sanitizeContent(contentRef.current.innerHTML);

    dispatch(
      saveProductAsync(id, {
        imageUrl: imageUrlValue,
        title: titleValue,
        category: categoryValue,
        price: priceValue,
        available: availableValue,
        content: сontentValue,
      })
    ).then(({ id }) => navigate(`/products/${id}`));
    setImageUrlValue("");
    setTitleValue("");
    setCategoryValue("");
    setPriceValue("");
    setАvailableValue("");
    setСontentValue("");
  };

  const onImageChange = ({ target }) => setImageUrlValue(target.value);
  const onTitleChange = ({ target }) => setTitleValue(target.value);
  const onCategoryChange = ({ target }) => setCategoryValue(target.value);
  const onPriceChange = ({ target }) => setPriceValue(target.value);
  const onАvailableChange = ({ target }) => setАvailableValue(target.value);
  const onСontentChange = ({ target }) => setСontentValue(target.value);
  return (
    <div>
      <h2 className={styles.title}>Добавление нового товара</h2>
      <div className={styles.productForm}>
        <input
          className={styles.input}
          value={imageUrlValue}
          placeholder="Изображение..."
          onChange={onImageChange}
        ></input>
        <input
          className={styles.input}
          value={titleValue}
          placeholder="Заголовок..."
          onChange={onTitleChange}
        ></input>
        <input
          className={styles.input}
          value={categoryValue}
          placeholder="Категория..."
          onChange={onCategoryChange}
        ></input>
        <input
          className={styles.input}
          value={priceValue}
          placeholder="Цена..."
          onChange={onPriceChange}
        ></input>
        <input
          className={styles.input}
          value={availableValue}
          placeholder="Наличие шт..."
          onChange={onАvailableChange}
        ></input>
        <input
          className={styles.input}
          value={сontentValue}
          placeholder="Описание товара..."
          onChange={onСontentChange}
        ></input>

        <button onClick={onSave}>Добавить</button>
      </div>
    </div>
  );
};
