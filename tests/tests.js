const tape = require('tape');
const router = require('../src/router.js');

tape('Tape Test', (t) => {
  t.equal(1+1, 2, 'Tape is working');
  t.end();
})
