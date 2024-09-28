const express = require("express");
const { register, login } = require("../controllers/user");
const mapUser = require("../helpers/mapUser");

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
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

router.post("/logout", (req, res) => {
  res.cookie("token", "", { hhtpOnly: true }).send({});
});

module.exports = router;
