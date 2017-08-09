BEGIN;

DROP TABLE IF EXISTS users,posts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  faccer VARCHAR(30) NOT NULL,
  password TEXT NOT NULL,
  avatar VARCHAR(20)
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  post VARCHAR(200) NOT NULL,
  date DATE NOT NULL
);

INSERT INTO users (faccer,password,avatar) VALUES
  ('Aisha','test' , 'avatar1.jpg' ) ,
  ('Yahia', 'test1', 'avatar2.jpg' ) ;


INSERT INTO posts (user_id,post,date) VALUES
  ('1', 'pushed to master .... GUILTY' , '2017-06-27'  ) ,
  ('2', 'missed a capital S and broke a XHR request for 3 hours',  '2017-06-01');



COMMIT;
