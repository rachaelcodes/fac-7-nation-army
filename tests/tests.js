const tape = require('tape');
const shot = require('shot');

const router = require('../src/router')

tape('Tape Test', (t) => {
  t.equal(1+1, 2, 'Tape is working');
  t.end() ;
});

tape('Public Route Test', (t) => {
  shot.inject(router, {method: 'get', url: '/index.js'}, (res) =>{
    t.equal(res.statusCode, 200, 'should respond with status code of 200 for index.js');
  });
  shot.inject(router, {method: 'get', url: '/index.html'}, (res) =>{
    t.equal(res.statusCode, 200, 'should respond with status code of 200 for index.html');
  });
  shot.inject(router, {method: 'get', url: '/style.css'}, (res) =>{
    t.equal(res.statusCode, 200, 'should respond with status code of 200 for style.css');
    t.end();
  });
})
