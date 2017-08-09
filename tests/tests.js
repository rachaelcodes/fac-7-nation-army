const tape = require('tape');

tape('Tape Test', (t) => {
  t.equal(1+1, 2, 'Tape is working');
  t.end() ;
})
