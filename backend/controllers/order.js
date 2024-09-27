const Order = require("../models/Order");

async function addOrder(order) {
  const newOrder = await Order.create(order);

  await newOrder.populate("buyer");

  return newOrder;
}

// delete

function deleteOrder(id) {
  return Order.deleteOne({ _id: id });
}

function getOrder() {
  return Order.find();
}

module.exports = {
  addOrder,
  deleteOrder,
  getOrder,
};
