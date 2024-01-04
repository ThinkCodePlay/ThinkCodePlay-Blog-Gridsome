---
title: "Full Stack tutorial- Wishlist App pt.01 - Node and Express"
date: "2021-04-06"
categories: 
  - "tutorial"
tags: 
  - "express"
  - "node-js"
  - "web-api"
cover: "/static/from-blog/cover-images/19.png"
---

In this full stack tutorial series we will learn how to build a full stack app using Node.js, Express and MongoDB as the backend. In this part we will build a Node.js Express app, connect to an API using routes, and receive query strings from the client.

## Node app setup

This tutorial is based on a previous post where I showed how to build an express server. [You can read it if you want a full detailed tutorial.](/posts/how-to-build-a-node-js-express-tutorial/)

Lets start up a new node project. Create a folder to build the new app and type in the terminal:

```bash
npm init -y
```

This will setup a blank new app. In the folder create a file **app.js**.

Now install Express framework from npm.

```bash
npm i express
```

And copy this boilerplate code:

```javascript
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
```

To run the code we need to set the **package.json** file. Change the script to:

```json
"start": "node app.js"
```

The final result should look something like this:

```json
{
  "name": "node-express-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

Test the code out by running in the terminal _npm start_ and open the browser at http://localhost:3000/

## Web API Routes

An API route is an address on the server that has a certain action (also known as verb) associated with it (such as GET, POST, UPDATE, DELETE etc.) that performs some tasks. To get to it you need to use an HTTP request from the client side with the proper URL and action.

We already have such a GET route which is in the root of the app.

```javascript
app.get('/', function (req, res) {
  res.send('Hello World')
})
```

Add another one to the code with the following to make a new GET api at http://localhost:3000/get-test

```javascript
app.get('/get-test', function (req, res) {
  res.send('get-test works!')
})
```

To see any changes we make in the code you need to restart the terminal by hitting ctrl+c and typing npm start. (I will make a separate tutorial on how to see changes in the code without manually restarting every time.). Change the URL to _http://localhost:3000/get-test_ (If you try to go to the root address now you would get and error since we removed that api).

We can do the same for other http actions:

```javascript
app.post('/post-test', function (req, res) {
  res.send('post-test works!')
})
app.update('/update-test', function (req, res) {
  res.send('update-test works!')
})
app.delete('/delete-test', function (req, res) {
  res.send('delete-test works!')
})
```

For more on routing [check the express documentation on routing](https://expressjs.com/en/guide/routing.html).

## Receiving parameter

In the API we get 2 parameters- req, and res (the name doesn't matter its only a convention). req is used for getting data about the http request and res is used to send back data to the client.

In a get function we get parameters from the query string.

To view it in the browser enter the get address [using the query sting format](https://en.wikipedia.org/wiki/Query_string). After the URL address insert _?key=value_.

For example

```bash
http://localhost:3000/get-test?param1=500&param2=600
```

To view the result, in _/get-test_ route log out

```javascript
console.log(req.query);
```

As you can see in the terminal the api recived 2 parameters:

```json
{ myparam: '500' }
{ param1: '500', param2: '600' }
```

In a POST request the data is sent via the body, therefore the data would be present at _req.body_

## Conclusion

In this tutorial we learned how to setup an Express web api using Node.js and the Express framework. We also learned how to create new routes, and learned to receive data from the the HTTP request.

Source code can be found at: [https://github.com/ThinkCodePlay/cheapsharkAPI](https://github.com/ThinkCodePlay/cheapsharkAPI)

Did this guide help you? please comment below.
