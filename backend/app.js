require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const {
  register,
  login,
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
} = require("./controllers/user");
const {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
} = require("./controllers/product");
const { addComment, deleteComment } = require("./controllers/comments");
const { getOrder, addOrder, deleteOrder } = require("./controllers/order");

const mapUser = require("./helpers/mapUser");
const authenticated = require("./middlewares/authenticated");
const hasRole = require("./middlewares/hasRole");
const ROLES = require("./constants/roles");
const mapProduct = require("./helpers/mapProduct");
const mapComment = require("./helpers/mapComment");
const mapOrder = require("./helpers/mapOrder");

const port = 3001;
const app = express();

app.use(express.static("../frontend/build"));

app.use(cookieParser());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(
      req.body.login,
      req.body.password,
      req.body.cart
    );

    res
      .cookie("token", token, { hhtpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknow error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(
      req.body.login,
      req.body.password,
      req.body.cart
    );

    res
      .cookie("token", token, { hhtpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknow error" });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "", { hhtpOnly: true }).send({});
});

app.get("/products", async (req, res) => {
  const { products, lastPage } = await getProducts(
    req.query.search,
    req.query.limit,
    req.query.page
  );
  res.send({ data: { lastPage, products: products.map(mapProduct) } });
});

app.get("/products/all", async (req, res) => {
  const products = await getAllProducts();

  res.send({ data: products.map(mapProduct) });
});

app.get("/products/:id", async (req, res) => {
  const product = await getProduct(req.params.id);

  res.send({ data: mapProduct(product) });
});

app.use(authenticated);

app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) });
});

app.get("/users/roles", hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = getRoles();

  res.send({ data: roles });
});

app.patch("/users/:id", async (req, res) => {
  const newUser = await updateUser(req.params.id, {
    role: req.body.roleId,
    cart: req.body.cart,
  });

  res.send({ data: mapUser(newUser) });
});

app.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id);

  res.send({ error: null });
});

app.post("/users/:id/orders", async (req, res) => {
  const orders = await addOrder({
    buyer: req.params.id,
    price: req.body.price,
    orders: req.body.orders,
  });

  res.send({ data: mapOrder(orders) });
});

app.get(
  "/users/orders",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    const order = await getOrder();

    res.send({ data: order.map(mapOrder) });
  }
);

app.delete(
  "/users/:id/orders/:orderid",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteOrder(req.params.orderid);

    res.send({ error: null });
  }
);

app.post("/products", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newProduct = await addProduct({
    title: req.body.title,
    category: req.body.category,
    price: req.body.price,
    available: req.body.available,
    image: req.body.imageUrl,
    content: req.body.content,
  });

  res.send({ data: mapProduct(newProduct) });
});

app.patch("/products/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const updatedProduct = await editProduct(req.params.id, {
    title: req.body.title,
    category: req.body.category,
    price: req.body.price,
    available: req.body.available,
    image: req.body.imageUrl,
    content: req.body.content,
  });
  res.send({ data: mapProduct(updatedProduct) });
});

app.delete("/products/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteProduct(req.params.id);
  res.send({ error: null });
});

app.post("/products/:id/comments", async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
    rating: req.body.rating,
  });

  res.send({ data: mapComment(newComment) });
});

app.delete(
  "/products/:postId/comments/:commentid",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentid);

    res.send({ error: null });
  }
);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
