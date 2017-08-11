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
  ('Aisha','$2a$10$Gt0s4Qg4my9o3edo/60w6OimPO/Sam.lhv/TMPaBgSaD7VVFBgoVC' , 'avatar1.jpg' ) ,
  ('Yahia', '$2a$10$4pIKv6v7WHwvgCJuSMR7p.AmibYT.jjcZvsZF9bjVMwXmdZZXVWRG', 'avatar2.jpg' ) ;


INSERT INTO posts (user_id,post,date) VALUES
  ('1', 'pushed to master .... GUILTY' , '2017-06-27'  ) ,
  ('2', 'missed a capital S and broke a XHR request for 3 hours',  '2017-06-01');



COMMIT;
