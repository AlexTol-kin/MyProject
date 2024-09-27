import React from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTES } from "../../utils/routes";
import Home from "../home/home";
import { Cart } from "../cart/cart";

import UserSignupForm from "../user/userSignupForm";
import UserLoginForm from "../user/userLoginForm";
import Product from "../products/product";
import { ProductForm } from "../products/components/product-form/product-form";
import { Users } from "../users/users";
import { Orders } from "../orders/orders";

const AppRoutes = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path={ROUTES.USERS} element={<Users />} />
    <Route path={ROUTES.CART} element={<Cart />} />
    <Route path={ROUTES.REGISTRATION} element={<UserSignupForm />} />
    <Route path={ROUTES.LOGIN} element={<UserLoginForm />} />
    <Route path={ROUTES.PRODUCT} element={<Product />} />
    <Route path={ROUTES.PRODUCT_FORM} element={<ProductForm />} />
    <Route path={ROUTES.PRODUCT_UPDATE} element={<ProductForm />} />
    <Route path={ROUTES.ORDERS} element={<Orders />} />
  </Routes>
);
export default AppRoutes;
