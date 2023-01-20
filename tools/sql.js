function buildUpdateSQL(data, id) {
  let sql = "UPDATE product SET ";
  let values = [];

  for (const key in data) {
    if (data[key]) {
      sql += key + " = ?, ";
      values.push(data[key]);
    }
  }

  sql = sql.slice(0, -2);
  sql += " WHERE id = ?";
  values.push(id);

  return { sql, values };
}

module.exports = { buildUpdateSQL };
