const Product = require("../models/productModel");

const ErrorHandler = require("../utils/errorhandler");

const ApiFeatures = require("../utils/apiFeatures");
//create product --Only admin
exports.createProduct = async (req, res, next) => {
  req.body.user = req.user.id;
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message || "product not created", 500));
  }
};

//get all products
exports.getAllProducts = async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  try {
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const product = await apiFeatures.query;
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler("Products not found", 500));
  }
};
//get product details

exports.getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(500).json({
      success: true,
      product,
      productCount,
    });
  } catch (error) {
    return next(new ErrorHandler("Product not found", 500));
  }
};

//upadate product --admin only

exports.upadateProduct = async (req, res, next) => {
  try {
    let product = Product.findById(req.params.id);
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
      useFindModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message || "Product not found", 500));
  }
};

//Delete Product

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successsefully",
    });
  } catch (error) {
    return next(new ErrorHandler("Product not found", 500));
  }
};
