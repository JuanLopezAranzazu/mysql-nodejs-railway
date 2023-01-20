const boom = require("@hapi/boom");
// db
const pool = require("./../database");
// tools
const { buildUpdateSQL } = require("./../tools/sql");

const test = async (req, res, next) => {
  try {
    const [result] = await pool.query("SELECT 1 + 1 AS result");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const findAllProducts = async (req, res, next) => {
  try {
    const [products] = await pool.query("SELECT * FROM product WHERE true");
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const findOneProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [productFound] = await pool.query(
      "SELECT * FROM product WHERE id = ?",
      [id]
    );
    if (productFound.length <= 0) {
      throw boom.notFound("Product not found");
    }
    res.json(productFound[0]);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, quantity } = req.body;
    const [productSaved] = await pool.query(
      "INSERT INTO product (name, description, price, quantity) VALUES (?, ?, ?, ?)",
      [name, description, price, quantity]
    );
    res
      .status(201)
      .json({ id: productSaved.insertId, name, description, price, quantity });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    const sql = buildUpdateSQL({ name, description, price, quantity }, id);
    const [productUpdate] = await pool.query(sql);
    if (productUpdate.affectedRows <= 0) {
      throw boom.notFound("Product not found");
    }
    const [productFound] = await pool.query(
      "SELECT * FROM product WHERE id = ?",
      [id]
    );
    res.json(productFound[0]);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [productDeleted] = await pool.query(
      "DELETE FROM product WHERE id = ?",
      [id]
    );
    if (productDeleted.affectedRows <= 0) {
      throw boom.notFound("Product not found");
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  test,
  findAllProducts,
  findOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
