---
title: "Full Stack Tutorial– Wishlist App Pt.03 – MongoDB"
date: "2021-04-18"
categories: 
  - "tutorial"
tags: 
  - "express"
  - "javascript"
  - "node-js"
cover: "/static/from-blog/cover-images/17.png"
---

In this full stack tutorial we will learn how to use MongoDB and Mongoose in our Node.js app.

This is a continuation of the previous post so if you can [read what you missed in this post](/posts/full-stack-tutorial-wishlist-02-node-http-request/), or [download the zip](https://github.com/ThinkCodePlay/cheapsharkAPI/tree/master/zip/Wishlist%20App%20Part%2002) and continue from here.

## Download MongoDB server

To start we need a server to host our MongoDB database. Download the community edition from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) and install or zip the content to a folder "MongodDB" you will use for the database. Create another folder called "MongoDB-data". This is where the data will persist after launching the server.

To run the server you need to run the command in a terminal (In my case the folders are stored in C:/Documents)

```bash
C:/Documents/mongodb/bin/mongod.exe --dbpath=C:/Documents/mongodb-data"
```

To help with running this next time I will create a script in our **package.json** file to run the server:

```json
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "mongo": "C:/Documents/mongodb/bin/mongod.exe --dbpath=C:/Documents/mongodb-data"
  }
```

Next time you want to run the server you can run:

```bash
npm run mongo
```

To view the data using a GUI I use MongoDB Compass which can be found at [https://www.mongodb.com/try/download/compass.](https://www.mongodb.com/try/download/compass.)

## Adding Mongoose

Mongoose is a JavaScript library that will help us greatly when interacting with the database. In short Mongoose is a library that lets us use models when sending and receiving data from the database. For more information check out [https://mongoosejs.com](https://mongoosejs.com).

To add the library enter:

```bash
npm i mongoose
```

Now that Mongoose is in our projects it's time to connect to the database.

## Connect MongoDB from Node.js

First we will add a folder that will contain the connection to the database.

In the root directory add a folder named: "**db**" and in it add a file **mongoose.js.**

In **mongoose.js** add the following code:

```javascript
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
```

And now we import it to **app.js** file (under the express require)

```javascript
require('./db/mongoose')
```

As you can see **mongoose.js** is using an environment variable. This is used so that we can hide secret keys from being displayed publicly.

To set this up create a new folder in the root directory called: "**config**" and in it create a file called: "**.env**"

This is where we store environment variable and in it insert:

```apacheconf
MONGODB_URL=mongodb://127.0.0.1:27017/cheapshark
```

Last thing to add is a package that will use our env file.

Run in the terminal:

```bash
npm i env-cmd --save-dev 
```

Now add the **.env** file to to script. This is what the script file looks like now:

```json
  "scripts": {
    "start": "node app.js",
    "dev": "env-cmd -f ./config/.env nodemon app.js",
    "mongo": "D:/Documents/mongodb/bin/mongod.exe --dbpath=D:/Documents/mongodb-data"
  }
```

## Modeling the data

That's it for the setup. Now We're ready to create a model of our data. Create a folder "**Models**" in the root directory and name it **game.js**.

This will hold how the data is used in the database:

```javascript
const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    gameID: {
        type: Number,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game
```

gameSchema describes what the data is and its requirements for being valid. We also enforce to have only one instance of gameID in the database.

We then create a model called Game with the schema of gameSchema and export it.

## Store data

To store the data we will use a new POST route in the **app.js** file. In order to get values from a POST call we need to add a middleware to intercept the raw body and parse it.

Under the app call in **app.js** add:

```javascript
const app = express();
app.use(express.json())
```

Now create a new post call in **app.js** file:

```javascript
const {
  listOfGames,
  dealsForGame,
  wishlist,
} = require("./utils/cheapshark");

...

app.post("/wishlist", async (req, res) => {

  const result = await wishlist({ title: req.body.title, gameID: req.body.gameID });

  if (result.error) {
    return res.status(400).send("Error storing game");
  }

  res.send(result);
});
```

In **cheapshark.js** we will store the data in the database:

```javascript
const Game = require("../models/game");

...

const wishlist = async (params) => {
  const game = new Game({ ...params  });

  try {
    const state = await game.save();
    console.log(state, 'state');
    return game;
  } catch (error) {
      console.log(error);
    return {error};
  }
  
};

module.exports = {
  listOfGames,
  dealsForGame,
  wishlist,
};
```

If everything went correctly when sending a POST with a title and gameID your request will now receive the data back:

```json
{
    "_id": "607c0cb0daaf0113c8e6b845",
    "title": "Death Stranding",
    "gameID": 207044,
    "createdAt": "2021-04-18T10:40:48.332Z",
    "updatedAt": "2021-04-18T10:40:48.332Z",
    "__v": 0
}
```

## Get data

We saved the game to the wishlist now we need to get everything we stored their. To get the data we will create a GET route and add a new function to **cheapshark.js**

```javascript
const {
  listOfGames,
  dealsForGame,
  wishlist,
  getWishlist
} = require("./utils/cheapshark");

...

app.get("/get-wishlist", async (req, res) => {
  const result = await getWishlist();

  if (result.error) {
    return res.status(500).send("Error getting wishlist");
  }

  res.send(result);
});
```

```javascript
const getWishlist = async (req, res) => {
    try {
        const wishlistGames = Game.find();
        return wishlistGames;
    } catch (error) {
        {error}
    }
}

module.exports = {
  listOfGames,
  dealsForGame,
  wishlist,
  getWishlist
};
```

Now when you send a GET request to _http://localhost:3000/get-wishlist_ you will receive all games stored in the database.

## Complete code

the complete code should look like this:

```javascript
const express = require("express");
require("./db/mongoose");

const app = express();
app.use(express.json())

const {
  listOfGames,
  dealsForGame,
  wishlist,
  getWishlist
} = require("./utils/cheapshark");

const port = process.env.PORT || 3000;

app.get("/games-list", async (req, res) => {
  const result = await listOfGames({ title: req.query.title });

  if (result.error) {
    return res.status(400).send("Error getting information");
  }

  res.send(result);
});

app.get("/game-deals", async (req, res) => {
  const result = await dealsForGame({ id: req.query.id });

  if (result.error) {
    return res.status(400).send("Error getting information");
  }

  res.send(result);
});

app.post("/wishlist", async (req, res) => {

  const result = await wishlist({ title: req.body.title, gameID: req.body.gameID });

  if (result.error) {
    return res.status(400).send("Error storing game");
  }

  res.send(result);
});

app.get("/get-wishlist", async (req, res) => {
  const result = await getWishlist();

  if (result.error) {
    return res.status(400).send("Error getting information");
  }

  res.send(result);
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
```

```javascript
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
```

```javascript
const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    gameID: {
      type: Number,
      required: true,
      unique: true
    },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
```

```javascript
const axios = require("axios").default;
const Game = require("../models/game");

const listOfGames = async (params) => {
  try {
    const response = await axios.get(
      "https://www.cheapshark.com/api/1.0/games",
      { params }
    );
    return response.data;
  } catch (error) {
    return { error };
  }
};

const dealsForGame = async (params) => {
  try {
    const response = await axios.get(
      "https://www.cheapshark.com/api/1.0/games",
      { params }
    );
    return response.data.deals;
  } catch (error) {
    return error;
  }
};

const wishlist = async (params) => {
  const game = new Game({ ...params  });

  try {
    const state = await game.save();
    return game;
  } catch (error) {
    return {error};
  }

};

const getWishlist = async (req, res) => {
    try {
        const wishlistGames = Game.find();
        return wishlistGames;
    } catch (error) {
        {error}
    }
}

module.exports = {
  listOfGames,
  dealsForGame,
  wishlist,
  getWishlist
};
```

## Conclusion

In this totorial we learned how to use MongoDB and Mongoose in Node.js. We created environment variable to store sensitive data about using .env, and stored and retrieved data from the database using GET and POST requests.

Did you find this usefull. Add a comment below.

The complete [source code can be found here](https://github.com/ThinkCodePlay/cheapsharkAPI/tree/master/zip/Wishlist%20App%20Part%2003).
