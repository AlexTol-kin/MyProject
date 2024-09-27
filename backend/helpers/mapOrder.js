module.exports = function (order) {
  return {
    id: order.id,
    buyer: order.buyer,
    price: order.price,
    orders: order.orders,
    registeredAt: order.updatedAt,
  };
};
