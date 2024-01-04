---
title: "How to build a Node JS Express Tutorial"
date: "2021-04-01"
categories: 
  - "tutorial"
tags: 
  - "express"
  - "javascript"
  - "node-js"
cover: "/static/from-blog/cover-images/20.png"
---

In this tutorial we will learn how to build a Node js Express tutorial

## Contents

- Prerequisites
- Server setup
- Express setup

## Prerequisites

Lets start by installing the environments first.

### IDE

The first place to begin is by setting up the coding environment. An **IDE** (integrated development environment) is needed for this. I will be using VScode (Visual Studio Code). To download it go to their site: [https://code.visualstudio.com/download](https://code.visualstudio.com/download) and download the correct program according to your operating system.

### Node.js

Next install Node.js. To get Node head over to: [https://nodejs.org/en/download](https://nodejs.org/en/download/) and download the LTS version. Make sure to install correctly it before continuing to the next step. To see if Node was installed correctly open up a command prompt by opening the windows key (on windows) and type: "cmd" and open the command prompt and type:

```powershell
node --version
```

If you get a Node version back then Node has been installed correctly.

NPM (node package manager) is a library used by Node to manage and install packages and will be used extensively in this Node and Angular project. Make sure NPM was installed properly by typing in the command prompt:

```powershell
npm -v
```

If a version was displayed then its time to setup the Node and Express project.

## Server Setup

Create a folder for the server. In my case -

```powershell
C:\Documents\hello world app\server
```

Open this folder in VScode and open terminal hitting Ctrl+Shift+\` or by using the top menu terminal->new terminal.

To initiate a new Node.js app. type in the terminal:

```powershell
npm init -y
```

This command will create a package.json file.

Create a folder "src" and in it file called app.js

The file structure should look like this:

![](https://static.wixstatic.com/media/0b4617_70a171ba45b3416fa744b1e4f31177cf~mv2.png/v1/fill/w_546,h_227,al_c,lg_1,q_90/0b4617_70a171ba45b3416fa744b1e4f31177cf~mv2.webp)

Paste in the next code in the app.js file:

```javascript
//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

This is Vanilla JavaScript Node.js code for running a server.

To run this in the **package.json** file copy the next command and insert it to the file as showed in the picture below.

```json
"start": "node src/app.js",
```

![](https://static.wixstatic.com/media/0b4617_3882364e499547cfa7dc9a150b83f79f~mv2.png/v1/fill/w_668,h_391,al_c,lg_1,q_90/0b4617_3882364e499547cfa7dc9a150b83f79f~mv2.webp)

To run the app type in the terminal:

```powershell
npm run start
```

this will start up the server to receive GET requests. Test this out by opening your browser and going to [http://localhost:3000/](http://localhost:3000/) to see a hello world message.

## Express Setup

The code above ran a server using the core modules of Node. This is fine for some projects but to make use of Nodes full potential it is best to use modules created specifically for a certain task. This is where Express.js comes in. Express is a web framework and is considered the standard for creating web apps in Node.

Stop the current run of node in the terminal by hitting Ctrl+C in the terminal and install Express by running in the terminal:

```powershell
npm i express
```

This will install Express in the dependencies list in **package.json**.

Now that express is installed replace the entire code in **app.js** with the following:

```javascript
const express = require('express')
const app = express()
const port = 3000
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
```

Run the npm run start command again this time the codeis running with Express.

## Conclusion

In this tutorial we learned how to build a Node.js and Express app covered the following topics:

- Installed the development environment needed to write the programs (VScode, Node.js, Express).
- Created the folder structure for the server including a pakcage.json file the runs the app, and an app.js file that spins up a server with Express to receive a GET request from the browser.

In the next post I will show hot to use routes in Express.

Has this post helped you? leave a comment below
