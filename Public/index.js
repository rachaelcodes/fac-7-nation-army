/* eslint-disable */

var loginForm = document.getElementById('login');
var commentForm = document.getElementById('post-comment');
var usernameBox = document.getElementById('username');
var passwordBox = document.getElementById('password');
var commentBox = document.getElementById('comment');
var loginWarning = document.getElementById('loginWarning');
var commentWarning = document.getElementById('commentWarning');

function userCheckLength(entry, warningSign) {
  if (entry.value.length === 0) {
    entry.classList.add('js-warning');
    warningSign.classList.remove('invisible');
  } else {
    entry.classList.remove('js-warning');
    warningSign.classList.add('invisible');
  }
}

function userCheckSpace(entry) {
  if (entry.value.indexOf(' ') === -1) {
    entry.classList.add('js-warning');
    passwordBox.classList.remove('invisible');
  } else {
    entry.classList.remove('js-warning');
    passwordBox.classList.add('invisible');
  }
}

function postRequest(data, endpoint) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = xhr.responseText;
    }
  }
  xhr.open("POST", endpoint, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
}

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if (usernameBox.value.length > 0 && passwordBox.value.length > 0 || usernameBox.value.indexOf(' ') !== -1 || passwordBox.value.indexOf(' ')) {
    var data = {
      username: usernameBox.value,
      password: passwordBox.value
    };
    console.log(data);
    postRequest(JSON.stringify(data), '/login');
  } else {
    userCheck(usernameBox, loginWarning);
    userCheck(passwordBox, loginWarning);
  }

});

commentForm.addEventListener('submit', function(e) {
  e.preventDefault();

  if (commentBox.value.length > 0) {
    var data = {
      comment: commentBox.value
    };
    console.log(data);
    postRequest(JSON.stringify(data), '/comment');
  } else {
    userCheck(commentBox, commentWarning);
  }
});
