var loginForm = document.getElementById('login');
var commentForm = document.getElementById('post-comment');
var usernameBox = document.getElementById('username');
var passwordBox = document.getElementById('password');
var commentBox = document.getElementById('comment');
var loginWarning = document.getElementById('loginWarning');
var commentWarning = document.getElementById('commentWarning');

function userCheck(entry, warningSite) {
  if (entry.value.length === 0) {
    entry.classList.add('js-warning');
    warningSite.classList.remove('invisible');
  } else {
    entry.classList.remove('js-warning');
    warningSite.classList.add('invisible');
  }
}

function postRequest(data, endpoint){
  //postAPI call - I copied this from MDB - it might not be what we usually do
  var xhr = new XMLHttpRequest();
  xhr.open("POST", endpoint, true);

  xhr.setRequestHeader("Content-type", "??????");

  xhr.onreadystatechange = function () {
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      //something
    }
  }

  xhr.send(data);
}

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  userCheck(usernameBox, loginWarning);
  userCheck(passwordBox, loginWarning);
  if(usernameBox.value.length >= 0 && passwordBox.value.length >= 0){
    //make a POST API call
    //we need to define the data we're passing into the request
    // postRequest(DEFINETHEDATA, '/login');
  }

});

commentForm.addEventListener('submit', function(e) {
  e.preventDefault();
  userCheck(commentBox, commentWarning);
  if(commentBox.value.length>=0){
    //make a POST API call
    //we need to define the data we're passing into the request
    // postRequest(DEFINETHEDATA, '/comment');
  }
});
