const http = require('http');
const handlers = require('./handlers');
const fileList = ['index.html','index.js', 'style.css','favicon.ico' ]

const router = (request,response)=>{

  if (request.url && request.method ) {
    switch (`${request.method} ${request.url}`){
      case: 'GET /':
        handlers.handleHome(request,response);
      case: 'POST /login':
        handlers.handleLogin(request, response);
      case: 'POST /logout':
        handlers.handleLogout(request, response);
      // case: 'GET /auth_check':
      //   handlers.hanndleAuth(request,response);
    }
  }
  else if (fileList.includes(request.url)){
    handlers.handlePublic(request,response);
  }
  else{
    handlers.handleError(request,response);
  }

}

module.exports = router;
