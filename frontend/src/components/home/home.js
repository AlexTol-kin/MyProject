import React, { useEffect, useState } from "react";

import debounce from "debounce";

import Banner from "../banner/banner";
import Poster from "../poster/poster";
import Products from "../products/products";
import { PAGINATION_LIMIT } from "../../constans/pagination-limit";
import { request } from "../../utils/request";
import { Pagination } from "./components/pagination";

import styles from "../../styles/Header.module.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [productsAll, setProductsAll] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isCategory = eliminateDuplicates(
    productsAll.map(({ category }) => category)
  );

  function eliminateDuplicates(cat) {
    return [...new Set(cat)];
  }

  useEffect(() => {
    setIsLoading(true);
    request(
      `/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
    ).then(({ data: { products, lastPage } }) => {
      setProducts(products);
      setLastPage(lastPage);
    });
    request(`/products/all`).then(({ data: products }) => {
      setProductsAll(products);
    });
    setIsLoading(false);
  }, [page, shouldSearch, searchPhrase]);

  const updateSearchPhrase = debounce((value) => {
    if (value.length > 0) {
      setShouldSearch(true);
    } else {
      setShouldSearch(false);
    }
  }, 2000);

  const handleChange = async (e) => {
    setSearchPhrase(e.target.value);
    updateSearchPhrase(e.target.value);
    if (shouldSearch) {
      const newMap = products.filter((id) => {
        if (id.title.includes(searchPhrase)) {
          return id;
        }
      });
      setProducts(newMap);
      setLastPage(1);
    }
  };

  const onThisCategory = (category) => {
    if (!category) {
      setShouldSearch(!shouldSearch);
    }
    setProducts(productsAll.filter((id) => id.category === category));
    setProductsAll(products.filter((id) => id.category === category));
  };

  return (
    <>
      <form className={styles.form}>
        <div className={styles.icon}>
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
          </svg>
        </div>
        <div className={styles.input}>
          <input
            value={searchPhrase}
            onChange={handleChange}
            placeholder="Поиск товара"
          />
        </div>
      </form>
      <section className={styles.sidebar}>
        <div className={styles.title}>Категории</div>
        <div className={styles.menu}>
          <div className={styles.link} onClick={() => onThisCategory()}>
            Все категории
          </div>
          {isCategory.map((category) => (
            <div
              key={category}
              className={styles.link}
              onClick={() => onThisCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </section>
      {isLoading ? (
        <div className={styles.link}>Идет загрузка</div>
      ) : (
        <div>
          <Products products={products} amount={5} title="Trending" />
          {lastPage > 1 && products.length > 0 && (
            <Pagination page={page} lastPage={lastPage} setPage={setPage} />
          )}
        </div>
      )}
      <Poster />
      <Banner />
    </>
  );
};

export default Home;
