module.exports = function (comment) {
  return {
    content: comment.content,
    author: comment.author.login,
    rating: comment.rating,
    id: comment._id,
    publishedAt: comment.createdAt,
  };
};
