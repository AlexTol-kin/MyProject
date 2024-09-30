const Product = require("../models/Product");

// add
async function addProduct(product) {
  const newProduct = await Product.create(product);

  await newProduct.populate({
    path: "comments",
    populate: "author",
  });

  return newProduct;
}

// edit
async function editProduct(id, product) {
  const newProduct = await Product.findByIdAndUpdate(id, product, {
    returnDocument: "after",
  });

  await newProduct.populate({
    path: "comments",
    populate: "author",
  });

  return newProduct;
}

// delete

function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

// get list with search and pagination

async function getProducts(search = "", limit = 10, page = 1, sorts = 1) {
  const [products, count] = await Promise.all([
    Product.find({ title: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ price: +sorts }),
    Product.countDocuments({ title: { $regex: search, $options: "i" } }),
  ]);

  return {
    products,
    lastPage: Math.ceil(count / limit),
  };
}

function getAllProducts() {
  return Product.find();
}

// get item

function getProduct(id) {
  return Product.findById(id).populate({
    path: "comments",
    populate: "author",
  });
}

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
  getProduct,
  getAllProducts,
};
