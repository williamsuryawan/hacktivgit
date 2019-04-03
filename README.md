# hacktivgit by William Suryawan

#General
#### client site: http://localhost:8080/
#### server site: http://localhost:3000/

### Installation and Getting Started (execute this function to run this app in your terminal)
```sh
$ npm init -y (inside root server folder)
$ nodemon app.js (on terminal inside root server folder)
$ live-server --host=localhost (on terminal inside root client folder)
``` 

Routing | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/repositories/starred|GET| Github API Token:**Required**||Error:<br>Internal server error<br>Success:<br>show the starred repo |view all starred repo
/repositories|POST|Github API Token:**Required**| name:String(**Required**) |Error:<br>Internal server error <br>Success:<br>success create new public repo (not private repo) | add new public repo 
/repositories|GET|Github API Token:**Required** <br> Query Input: <br> username:String(**Required**) ||Error:<br>Internal server error<br>Success:<br>show repo based on username|show repo based on username
/repositories/unstar|DELETE|Github API Token:**Required** <br> Query Input: <br> username:String(**Required**) repo:String(**Required**)||Error:<br>Internal server error <br>Success:<br>unstar repo success| unstar the starred repo