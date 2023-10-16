const express = require("express");
const {
  getAllProducts,
  createProduct,
  upadateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productsController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
//creating routes
router.route("/products").get(getAllProducts);
router
  .route("/products/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/products/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), upadateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
  .get(getProductDetails);
module.exports = router;
