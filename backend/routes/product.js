const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  filterProducts
} = require("../controller/product");

const router = express.Router();

router.post("/product", createProduct);
router.get("/product", getAllProducts);
router.get("/product/:id", getProductById);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);
router.get("/filter-product", filterProducts);

module.exports = router;
