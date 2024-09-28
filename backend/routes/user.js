const express = require("express");
const {
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { addOrder, getOrder, deleteOrder } = require("../controllers/order");
const hasRole = require("../middlewares/hasRole");
const authenticated = require("../middlewares/authenticated");
const mapUser = require("../helpers/mapUser");
const mapOrder = require("../helpers/mapOrder");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) });
});

router.get(
  "/roles",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const roles = getRoles();

    res.send({ data: roles });
  }
);

router.patch("/:id", authenticated, async (req, res) => {
  const newUser = await updateUser(req.params.id, {
    role: req.body.roleId,
    cart: req.body.cart,
  });

  res.send({ data: mapUser(newUser) });
});

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteUser(req.params.id);

    res.send({ error: null });
  }
);

router.post(
  "/:id/orders",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]),
  async (req, res) => {
    const orders = await addOrder({
      buyer: req.params.id,
      price: req.body.price,
      orders: req.body.orders,
    });

    res.send({ data: mapOrder(orders) });
  }
);

router.get(
  "/orders",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    const order = await getOrder();

    res.send({ data: order.map(mapOrder) });
  }
);

router.delete(
  "/:id/orders/:orderid",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteOrder(req.params.orderid);

    res.send({ error: null });
  }
);

module.exports = router;
