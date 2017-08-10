const fs = require('fs');
const databaseConnection = require('../database/db_connection.js');

const getPosts = (cb) => {
  databaseConnection.query('SELECT users.faccer, users.avatar, posts.post, posts.date FROM users INNER JOIN posts ON users.id = posts.user_id;', (err, res) => {
    if (err) {
      cb(err)
    } else {
      cb(null, res.rows);
    }
  });
};


const parseSQL = (data) => {
  let replacement = '<!-- display comments here -->\n<section class = "display-comments">\n';

  data.forEach((e) => {
    replacement += '<button> \n<span>\n<img src="';
    replacement += e.avatar;
    replacement += '" alt="User Avatar">\n<p>';
    replacement += e.faccer;
    replacement += '</p>\n<article>';
    replacement += e.post;
    replacement += '</article>\n<p>';
    replacement += e.date;
    replacement += '\n</p>\n</span>\n</button>\n';
  });

  replacement += '</section>';

  return replacement;
}

const replaceHTML = (replacement) => {
  fs.readFile(__dirname + "/../Public/index.html", 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }

    const result = data.replace(/<!-- display comments here -->/g, replacement);

    fs.writeFile(__dirname + "/../Public/index.html", result, 'utf8', (err) => {
      if (err) return console.log(err);
    });
  });
};

const replacement = () => {
  getPosts((error, result) => {
    if (error) return console.log(error);
    replaceHTML(parseSQL(result));
  });
};

replacement();
module.exports = { replacement };
