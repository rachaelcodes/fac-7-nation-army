const path = require('path');
const fs = require('fs');

const handleHome = (request,response) =>{
  fs.readFile(__dirname + "/../Public/index.html", function(error, file) {
    if (error) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, our homepage is sleeping</h1>');

    }else {
      response.writeHead(200, {"Content-Type":"text/html"});
      response.end(file);
    }
  });

}

const handlePublic = (request,response) =>{
  const fileName = request.url
  const filePath = path.join(__dirname, '..', 'public', fileName);
  const extension = fileName.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    jpg: 'image/jpeg',
  };
  fs.readFile(filePath, (error, file) => {
    console.log(filePath);
    if (error) {
      console.log(error);
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('Sorry, we\'ve had a problem');
    } else {
      response.writeHead(200, { 'Content-Type': extensionType[extension] });
      response.end(file);
    }
  });
}
const handleLogin = (request,response) =>{

}

const handlePost = (request,response) =>{

}


module.exports = {handleHome, handlePublic, handleLogin, handlePost}
