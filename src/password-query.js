const bcrypt = require('bcrypt');
const dbConnection = require('../database/db_connection');
const env = require('env2')('.env');

const getHash = (username, cb) => {
  const sqlQuery = `SELECT * FROM users WHERE faccer = ${username};`;
  dbConnection.query(sqlQuery, (err, res) => {
    if (err) return cb(err);
    else {
    cb(null,res.rows)
    }
  })
}

getHash("\'Aisha\'",(err,res)=>{
  // console.log(err);
  console.log(res)
})

module.exports = getHash;
