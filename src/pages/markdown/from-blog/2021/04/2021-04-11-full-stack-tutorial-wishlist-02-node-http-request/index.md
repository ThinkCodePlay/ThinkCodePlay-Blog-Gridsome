---
title: "Full Stack Tutorial- Wishlist 02 - Node Http request"
date: "2021-04-11"
categories: 
  - "tutorial"
tags: 
  - "axois"
  - "express"
  - "javascript"
  - "node-js"
cover: "../../../../../../../static/from-blog/cover-images/18.png"
---

In this tutorial we will learn how to make a Node Http request from Node using Axios library. We will be fetching data from <https://www.cheapshark.com> and use their API to find the cheapest deal on a game.

## Server Setup

This tutorial is based on previous tutorial so if you missed it [you can quickly read it here](/posts/full-stack-tutorial-wishlist-app-pt-01-node-and-express/). If you know the basics of Node.js and Express then you can just follow along from here.

The current code for **app.js** is a basic server:

```javascript
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Server is up on port ' + port);
})
```

Next import the Axios library:

```bash
npm i axios
```

Axios is a promise based HTTP library that will do the heavy lifting of sending http requests. For more information [check out their documentation](https://www.npmjs.com/package/axios).

Next Install nodemon as a dev dependency:

```bash
npm i nodemon --save-dev
```

I have a tutorial about nodemon for more information about it, or [check out their site](https://nodemon.io/)

## Adding a new route and module

A good practice is to separate the logic of the code for each part of the code.

Lets start by adding a new Folder called _utils_ to the root of the project and add a file called **cheapshark.js**.

Insert the following code.

```javascript
const axios = require('axios').default;

const listOfGames = async (params) => {
    try {
        const response = await axios.get('https://www.cheapshark.com/api/1.0/games', { params })
        return response.data
    } catch (error) {
        return {error};
    }
}

module.exports = {
    listOfGames,
};
```

This code imports the axios module and exports a function called _listOfGames_.

_listOfGames_ is an async function meaning when we use the await operator in the code it will wait until that line of code finishes to execute and then returns to the run next line. The magic about async await is that it is an asynchronous function but we write our code as if it were synchronous.

The axios.get() function accepts two arguments. The first one is the URL to fetch the data from, the second is the query data. For example if params contains

```json
{
  title: 'batman'
}
```

Axios would send the request as _https://www.cheapshark.com/api/1.0/game?title=batman_.

Now that we have the code set up for fetching the data lets import it into our app.

Add new get route to our application In **app.js**:

```javascript
const { listOfGames } = require('./utils/cheapshark')

app.get('/games-list', async (req, res) =>  {
  const result = await listOfGames({title: req.query.title});
  
  if (result.error) {
    return res.status(400).send('Error getting information')
  }

  res.send(result)
})
```

As you can see we are passing to _listOfGames_ function an object with title which get its data from the query string passed into the app.

To test it out send a get function to http://localhost:300/games-list?title=death stranding

You will receive:

```json
[
    {
        "gameID": "207044",
        "steamAppID": "1190460",
        "cheapest": "35.95",
        "cheapestDealID": "5AqGhHNt9IIce68BP6m9U%2BxQCqYD%2B1IOeGV5z6lEc0g%3D",
        "external": "Death Stranding",
        "internalName": "DEATHSTRANDING",
        "thumb": "https://cdn.cloudflare.steamstatic.com/steam/apps/1190460/capsule_sm_120.jpg?t=1616683107"
    }
]
```

OK cool now we are getting the gameID of the game we chose we can now send that ID and see where is the best discount for that game.

Let's create a new route to get that id and find the all deals for it.

```javascript
const { listOfGames, dealForGame} = require('./utils/cheapshark')

app.get('/game-deal', async (req, res) =>  {
  const result = await dealForGame({id: req.query.id});

  if (result.error) {
    return res.status(400).send('Error getting information')
  }

  res.send(result)
})
```

Add a new function that takes the id and sends it to cheapshark API, and add it to the module.exports

```javascript
const dealForGame = async (params) => {
    try {
        const response = await axios.get('https://www.cheapshark.com/api/1.0/games', { params })
        return response.data.deals
    } catch (error) {
        return errorObj;
    }
}

module.exports = {
    listOfGames,
    dealForGame
};
```

Now if you send a get request to http://localhost:3000/game-deal?id=207044 we get a list of deals for that game

```json
[
    {
        "storeID": "23",
        "dealID": "5AqGhHNt9IIce68BP6m9U%2BxQCqYD%2B1IOeGV5z6lEc0g%3D",
        "price": "35.95",
        "retailPrice": "59.99",
        "savings": "40.073346"
    },
...
]
```

To get to the current deals page on the client side use the following URL format using the dealID you are looking for:

```javascript
https://www.cheapshark.com/redirect?dealID={id}
```

## Final code

Good job you now have a fully working express API that receives parameters from the query string, send that data to an external API and returns the data to client.

```javascript
const express = require('express')

const app = express()
const { listOfGames, dealForGame} = require('./utils/cheapshark')

const port = process.env.PORT || 3000

app.get('/games-list', async (req, res) =>  {
  const result = await listOfGames({title: req.query.title});
  
  if (result.error) {
    return res.status(400).send('Error getting information')
  }

  res.send(result)
})

app.get('/game-deal', async (req, res) =>  {
  const result = await dealForGame({id: req.query.id});

  if (result.error) {
    return res.status(400).send('Error getting information')
  }

  res.send(result)
})

app.listen(port, () => {
  console.log('Server is up on port ' + port);
})
```

```javascript
const axios = require('axios').default;

const listOfGames = async (params) => {
    try {
        const response = await axios.get('https://www.cheapshark.com/api/1.0/games', { params })
        return response.data
    } catch (error) {
        return {error};
    }
}

const dealForGame = async (params) => {
    try {
        const response = await axios.get('https://www.cheapshark.com/api/1.0/games', { params })
        return response.data.deals
    } catch (error) {
        return errorObj;
    }
}

module.exports = {
    listOfGames,
    dealForGame
};
```

## Summry

In this tutorial we learned hot to make an Http request from Node.js using Axios, how to set up routes and import and export Node.js modules.

Full source [can be found here](https://github.com/ThinkCodePlay/cheapsharkAPI/tree/master/zip/Wishlist%20App%20Part%2002).

Learned something new? Leave a comment bellow.
