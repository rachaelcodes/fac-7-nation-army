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

const addLoginBox = () => {
  let replacement = '<!-- log in header -->\n';
    replacement +=' <header class="header">\n';
    replacement +='   <form id ="login" method="POST" action="/login">\n';
    replacement +='     <label for="username">Username:</label>\n';
    replacement +='     <input id="username" name="username" type="text">\n';
    replacement +='     <label for="password">Password:</label>\n';
    replacement +='     <input id="password" name="password" type="password">\n';
    replacement +='     <p class="invisible" id="loginWarning">Don\'t forget to write your login information!</p>\n';
    replacement +='     <button type="submit" name="submit-login" value="Log In">\n';
    replacement +='   </form>\n';
    replacement +=' </header>\n';
    replacement +='<!-- end of log in header -->';

return replacement;
}


const addUserInfo = (data) => {
  let replacement = '<!-- log in header -->\n<header class="header">\n<img src="';
  replacement += data.avatar;
  replacement += '" alt="Avatar"><p>Welcome ';
  replacement += data.faccer;
  replacement += '</p>\n</header>\n<!-- end of log in header -->';

  return replacement;
};

const replaceHTML = (replacementLogin, replacementComments) => {
  fs.readFile(__dirname + "/../Public/index.html", 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }

    let result = data.replace(/<!-- log in header -->(\n|.)*<!-- end of log in header -->/g, replacementLogin);
    result = result.replace(/<!-- display comments here -->(\n|.)*<!-- end of comments -->/g, replacementComments);
    console.log(result);
    return result;
  });
};


const updateIndex = (verify, userInfo) => {
  getPosts((error, result) => {
    if (error) return console.log(error);
    if (verify === false) {
      // return replaceHTML(addLoginBox(), parseCommentSQL(result));
    (replaceHTML(addLoginBox(), parseCommentSQL(result)));
    } else {
      return replaceHTML(addUserInfo(userInfo), parseCommentSQL(result));
    }
  });
};



module.exports = {updateIndex, getPosts, replaceHTML, parseCommentSQL, addUserInfo, addLoginBox};
