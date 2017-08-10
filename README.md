# README
![Travis button](https://travis-ci.org/rachaelcodes/week7-ARMY.svg?branch=master) [![codecov](https://codecov.io/gh/rachaelcodes/fac-7-nation-army/branch/master/graph/badge.svg)](https://codecov.io/gh/rachaelcodes/fac-7-nation-army)

## What :grey_question: 
Ever feel like you're terrible at coding? Or that rookie mistake you just made makes you shrivel with shame? Well misery loves company. ON FAC'd Up we can share our hilarious moments of cringe worthy coding blunders and realise we are not alone!

## User Stories :snowman: 
As a FAC'd Upper I can...
- [x] log into the website (test logins Username: Aisha   Password: password/ Username Yahia    Password: test1)
- [ ] add my own confession
- [x] view others confessions

## Requirements :heavy_exclamation_mark: 
+ [x] Login form with 2 fields - username and password
+ [ ] Client-side _and_ server-side validation on login form, including error handling that provides feedback to users
+ [x] Users only have to log in once (i.e. implement a cookie-based session on login)
+ [ ] Username is visible on each page of the site after logging in
+ [ ] Any user-submitted content should be labelled with the authors username
+ [ ] There should be protected routes and unprotected routes that depend on the user having a cookie or not (or what level of access they have).
+ [x] Website content should be stored in a database

## Schema :1234: 

### users


| Column | Type | Modifiers | 
| -------- | -------- | -------- |
| id    | Serial     | Primary Key    | 
| faccer     | VARCHAR(30) | not null    |
| password     | Text     | not null   | 
| avatar     | VARCHAR(10)     | not null    | 

### posts


| Column | Type | Modifiers | 
| -------- | -------- |-------- | 
| id    | Serial     | Primary Key     | 
| user_id     | Serial    | Foreign Key    | 
| post    | VARCHAR(200)     | not null    | 
| date     | DATE    | not null   | 

## Cool Learnings :cool: 
* [Guide to editing html from the back end](https://stackoverflow.com/questions/14177087/replace-a-string-in-a-file-with-nodejs)
* [Our experiments in writing an html generation function](https://repl.it/KEfM/5)
