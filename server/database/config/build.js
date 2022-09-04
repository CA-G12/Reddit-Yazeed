const { join } = require('path');
const fs = require('fs');
const connection = require('./connection');

const build = () => {
  const sql = fs.readFileSync(join(__dirname, 'schema.sql')).toString();
  return connection.query(sql);
};

module.exports = build;
