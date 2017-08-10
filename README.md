# README
![Travis button](https://travis-ci.org/rachaelcodes/week7-ARMY.svg?branch=master) [![codecov](https://codecov.io/gh/rachaelcodes/fac-7-nation-army/branch/master/graph/badge.svg)](https://codecov.io/gh/rachaelcodes/fac-7-nation-army)

## What :grey_question: 
All the silly times we FAC UP

## User Stories :snowman: 
As a FAC'd Upper I can...
- [ ] log into the website
- [ ] add my own confession
- [ ] view others confessions

## Requirements :heavy_exclamation_mark: 
+ [ ] Login form with 2 fields - username and password
+ [ ] Client-side _and_ server-side validation on login form, including error handling that provides feedback to users
+ [ ] Users only have to log in once (i.e. implement a cookie-based session on login)
+ [ ] Username is visible on each page of the site after logging in
+ [ ] Any user-submitted content should be labelled with the authors username
+ [ ] There should be protected routes and unprotected routes that depend on the user having a cookie or not (or what level of access they have).
+ [ ] Website content should be stored in a database

## Planning: Architecture & Flow :wavy_dash: 

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

## Test usernames for website
FAC Week 7 user login project
Test username and passwords:
Username: Aisha   Password: password
Username Yahia    Password: test1

## Cool Learnings :cool: 
* [Guide to editing html from the back end](https://stackoverflow.com/questions/14177087/replace-a-string-in-a-file-with-nodejs)
* [Our experiments in writing an html generation function](https://repl.it/KEfM/5)
