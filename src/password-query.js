const bcrypt = require('bcrypt');
const dbConnection = require('../database/db_connection');
const env = require('env2')('.env');

const getHash = (username, cb) => {
  const sqlQuery = `SELECT * FROM users WHERE faccer = ${username};`;
  dbConnection.query(sqlQuery, (err, res) => {
    console.log(err);
    console.log(res.rows);
    if (err) return cb(err);

    cb(null, res.rows);
  });
};


module.exports = getHash;
