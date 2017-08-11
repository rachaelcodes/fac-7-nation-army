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

const {updateIndex} = require('./backendHtml.js')

const getHashFromDB = require('./password-query');


const SECRET = process.env.SECRET;
const notFoundPage = '<p style="font-size: 10vh; text-align: center;">404!</p>';



const handlePublic = (request, response) => {
  const fileName = request.url;
  const filePath = path.join(__dirname, '..', 'public', fileName);
  const extension = fileName.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    jpg: 'image/jpeg'
  };
  console.log("hit handlePublic for "+ fileName);
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

  const cookie = sign(userDetails, SECRET);
  response.writeHead(302, {
    'Location': '/',
    'Set-Cookie': `jwt=${cookie};HttpOnly`
  });

  response.end();
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
            response.writeHead(302, {
              'Location': '/'
            });
          response.end();
          }
          if (userDetails[0]){
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
          } else {
            response.writeHead(302, {
              'Location': '/'
            });
          response.end();
          }
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

const handleAuth = (request, cb) => {

    if (!request.headers.cookie) return cb  (true, false,{});

    const {
      jwt
    } = parse(request.headers.cookie);

    if (!jwt) return   cb  (true, false,{})
    return verify(jwt, SECRET, (err, jwt) => {
      if (err) {

        cb  (err, false,{})
      } else {
        cb (null, true, {
          faccer: jwt.faccer,
          avatar: jwt.avatar
        })
      }
    });
};
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

const handleHome = (request, response) => {
  handleAuth(request, (err,res,obj) => {
    if (err) {
      updateIndex(false, obj, (err,res) => {

        response.writeHead(200, 'Content-Type:text/html');
        response.end(res);
      })
    }
     else {
      updateIndex(true,obj, (err,res)=>{
        response.writeHead(200, 'Content-Type:text/html');
        response.end(res);
      })
    }
  });
}


module.exports = {
  handleHome,
  handlePublic,
  handleLogin,
  handleLogout,
  handleAuth,
  handleError,
  handlePost
};
