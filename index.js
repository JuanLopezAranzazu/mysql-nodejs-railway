const express = require("express");
const app = express();
// middlewares
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require("./middlewares/Error");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// initial setup db
/*
const pool = require("./database");

const createProducts = async (entryProducts) => {
  try {
    const [count] = await pool.query(
      "SELECT COUNT(*) AS count FROM product WHERE true"
    );
    console.log(count);

    if (count[0].count > 0) return;

    const [result] = await pool.query(
      "INSERT INTO product (name, description, price, quantity) VALUES ?",
      [entryProducts]
    );
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
createProducts([["test", "test", 25026, 4]]);
*/

// routes
const productRouter = require("./routes/Product");
app.use("/products", productRouter);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(3001, () => {
  console.log("SERVER RUNNING IN PORT", 3001);
});
