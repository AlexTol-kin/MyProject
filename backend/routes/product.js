const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/product");
const { addComment, deleteComment } = require("../controllers/comments");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const mapComment = require("../helpers/mapComment");
const mapProduct = require("../helpers/mapProduct");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { products, lastPage } = await getProducts(
    req.query.search,
    req.query.limit,
    req.query.page
  );
  res.send({ data: { lastPage, products: products.map(mapProduct) } });
});

router.get("/all", async (req, res) => {
  const products = await getAllProducts();

  res.send({ data: products.map(mapProduct) });
});

router.get("/:id", async (req, res) => {
  const product = await getProduct(req.params.id);

  res.send({ data: mapProduct(product) });
});

//authenticated,
router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
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

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedProduct = await editProduct(req.params.id, {
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      available: req.body.available,
      image: req.body.imageUrl,
      content: req.body.content,
    });
    res.send({ data: mapProduct(updatedProduct) });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteProduct(req.params.id);
    res.send({ error: null });
  }
);

router.post("/:id/comments", authenticated, async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
    rating: req.body.rating,
  });

  res.send({ data: mapComment(newComment) });
});

router.delete(
  "/:postId/comments/:commentid",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentid);

    res.send({ error: null });
  }
);

module.exports = router;
