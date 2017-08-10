const fs = require('fs');
const databaseConnection = require('../database/db_connection.js');

const getLoginInfo = (user, cb) => {
  databaseConnection.query(`SELECT avatar, faccer FROM users WHERE id = ${user};`, (err, res) => {
    if (err) {
      cb(err)
    } else {
      cb(null, res.rows);
    }
  });
};

const getPosts = (cb) => {
  databaseConnection.query('SELECT users.faccer, users.avatar, posts.post, posts.date FROM users INNER JOIN posts ON users.id = posts.user_id;', (err, res) => {
    if (err) {
      cb(err)
    } else {
      cb(null, res.rows);
    }
  });
};


const parseCommentSQL = (data) => {
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

  replacement += '</section>\n<!-- end of comments -->';

  return replacement;
};

const parseLoginSQL = (data) => {
  let replacement = '<!-- logged in header -->\n<header class="header">\n<img src="';
  replacement += data[0].avatar;
  replacement += '" alt="Avatar"><p>Welcome ';
  replacement += data[0].faccer;
  replacement += '</p>\n</header>\n<!-- end of logged in header -->';

  return replacement;
};

const replaceHTML = (replacement, regex) => {
  fs.readFile(__dirname + "/../Public/index.html", 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }

    const result = data.replace(regex, replacement);

    fs.writeFile(__dirname + "/../Public/index.html", result, 'utf8', (err) => {
      if (err) return console.log(err);
    });
  });
};

const replaceComments = () => {
  getPosts((error, result) => {
    if (error) return console.log(error);
    replaceHTML(parseCommentSQL(result), /<!-- display comments here -->(\n|.)*<!-- end of comments -->/g);
  });
};

const replaceLogin = (user) => {
  getLoginInfo(user, (error, result) => {
    if (error) return console.log(error);
    replaceHTML(parseLoginSQL(result), /<!-- logged in header -->(\n|.)*<!-- end of logged in header -->/g);
  });
};


replaceLogin(1);
replaceComments();
module.exports = { replaceComments, replaceLogin };
