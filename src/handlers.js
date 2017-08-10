const {
  readFile
} = require('fs');
const {
  parse
} = require('cookie');
const {
  sign,
  verify
} = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const env = require('env2')('.env');
const path = require('path');
const getHashFromDB = require('./password-query');

const SECRET = process.env.SECRET;
const notFoundPage = '<p style="font-size: 10vh; text-align: center;">404!</p>';

const handleHome = (request, response) => {
  readFile(__dirname + "/../Public/index.html", function(error, file) {
    if (error) {
      response.writeHead(500, 'Content-Type:text/html');
      return response.end('<h1>Sorry, our homepage is sleeping</h1>');

    } else {
      console.log('hone');
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
      return response.end(file);
    }
  });

}

const handlePublic = (request, response) => {

const fileName = request.url ;
  const filePath = path.join(__dirname, '..', 'public', fileName);
  const extension = fileName.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    jpg: 'image/jpeg',
  };
  readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, {
        'Content-Type': 'text/html'
      });
      return response.end('Sorry, we\'ve had a problem');
    } else {
      response.writeHead(200, {
        'Content-Type': extensionType[extension]
      });
      return response.end(file);
    }
  });
}

const handleLogin = (request, response) => {
  let body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      // console.log(body);
      let username = body.split('username=')[1].split('&')[0];
      const password = body.split('password=')[1].split('&')[0];
      username = "\'" + username + "\'";
      bcrypt.hash(password, 10, (err, hashedPw) =>{
        if (err){
          console.log('bcrypt.hash err is '+err);
        }
        getHashFromDB(username, (err,userDetails)=>{
          if (err){
            console.log('getHashFromDB err is '+err);
          }
          const dbHash = userDetails[0].password;
          bcrypt.compare(password,dbHash,(err,pwCheck)=>{
            if (err){
              console.log('bcrypt.compare err is '+err);
            }
              if (pwCheck) {
                const cookiePayload = {};
                cookiePayload.id = userDetails[0].id;
                cookiePayload.faccer = userDetails[0].faccer;
                cookiePayload.avatar = userDetails[0].avatar;
                console.log(userDetails);
                const cookie = sign(cookiePayload, SECRET);
                response.writeHead(302, {
                  'Location': '/',
                  'Set-Cookie': `jwt=${cookie};HttpOnly`
                });
              response.end();
            } else {
              response.writeHead(302, {
                'Location': '/'
              });
            response.end();
            }
          })
        })
      })
    });
}

const handleLogout = (request, response) => {
  response.writeHead(302, {
    'Location': '/',
    'Set-Cookie': `jwt=0;Max-Age=0`
  });
  return response.end()
}

const handleAuth = (request, response) => {
  const sendError = () => {
    const message = 'Authenication failed!';
    response.writeHead(401, {
      'Content-Type': 'text/plain',
      'Content-Length': message.length
    });
    return response.end(message);
  }
  if (!request.headers.cookie) return sendError();

console.log(parse(request.headers.cookie));
  const { jwt } = parse(request.headers.cookie);

  if (!jwt) return sendError();

  return verify(jwt, SECRET, (err, jwt) => {
    if (err) {
      return sendError();
    } else {
      console.log('jwt is', jwt);
      const message = `Welcome! Your user ID is: ${jwt.userId}!`
      response.writeHead(
        200, {
          'Content-Type': 'text/plain',
          'Content-Length': message.length
        }
      );
      return response.end(message)
    }
  })
}

const handleError = (request, response) => {
  response.writeHead(
    404, {
      'Content-Type': 'text/html',
      // What does this do?
      'Content-Length': notFoundPage.length
    }
  );
  return response.end(notFoundPage)
}
const handlePost = (request, response) => {

}

// bcrypt.hash('test1',10,(err,res)=>{
//   console.log('hash is-'+res);
// })

module.exports = {
  handleHome,
  handlePublic,
  handleLogin,
  handleLogout,
  handleAuth,
  handleError,
  handlePost
}
