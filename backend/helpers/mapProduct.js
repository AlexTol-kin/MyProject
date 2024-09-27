const { default: mongoose } = require("mongoose");
const mapComment = require("./mapComment");

module.exports = function (product) {
  return {
    id: product.id,
    title: product.title,
    category: product.category,
    price: product.price,
    available: product.available,
    imageUrl: product.image,
    content: product.content,
    comments: product.comments.map((comment) =>
      mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
    ),
  };
};
