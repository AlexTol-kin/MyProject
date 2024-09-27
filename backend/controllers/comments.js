const Comment = require("../models/Comment");
const Product = require("../models/Product");

// add

async function addComment(ProductId, comment) {
  const newComment = await Comment.create(comment);

  await Product.findByIdAndUpdate(ProductId, {
    $push: { comments: newComment },
  });

  await newComment.populate("author");

  return newComment;
}

// delete

async function deleteComment(ProductId, commentId) {
  await Comment.deleteOne({ _id: commentId });

  await Product.findByIdAndUpdate(ProductId, {
    $pull: { comments: commentId },
  });
}

module.exports = {
  addComment,
  deleteComment,
};
