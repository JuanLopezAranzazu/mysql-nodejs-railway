const express = require("express");
const router = express.Router();
// controllers
const {
  test,
  findAllProducts,
  findOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./../controllers/Product");
// middlewares
const validatorHandler = require("./../middlewares/Validator");
// schemas
const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
} = require("./../schemas/Product");

router.get("/test", test);
router.get("/", findAllProducts);
router.get(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  findOneProduct
);
router.post("/", validatorHandler(createProductSchema, "body"), createProduct);
router.put(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  updateProduct
);
router.delete(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  deleteProduct
);

module.exports = router;
