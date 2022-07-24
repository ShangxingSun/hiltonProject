# hiltonProject
## A website project using Angular for Front-end and Node.js for Backend
---
### to launch front-end:
#### Angular has aleady provided a test host, if you wish to launch it using angular:
1. install angular with npm install -g @angular/cli
2. cd ./hilton-project
3. cd ./src/app/
4. ng serve --port 4200 --open 
#### if prefer to launch it with other host, like nginx, you can
1. copy all files under ./hilton-project/dist
2. put them into host serve dictonary

---
### to launch back-end
1. cd ./hilton-server
2. npm install

the following are dependant plugins:
express
mongodb
cors
body-parser

3. node hiltonServer.js

---

### for backend unit test
1. cd ./hilton-server/test
2. npm install
3. mocha unitTest.js
