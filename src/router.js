const http = require('http');
const handlers = require('./handlers');
const fileList = ['/index.html', '/index.js', '/style.css', '/favicon.ico'];

const router = (request,response)=>{
  if (request.url === '/') {
    handlers.handleHome(request,response);
  }
  else if (fileList.includes(request.url)){
    handlers.handlePublic(request,response)
  }
}

module.exports = router;
