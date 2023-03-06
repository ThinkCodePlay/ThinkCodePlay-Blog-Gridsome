---
title: "Full Stack Tutorial– Wishlist 04 – Node.js Tests"
date: "2021-04-25"
categories: 
  - "tutorial"
tags: 
  - "jest"
  - "node-js"
  - "testing"
cover: "../../../../../../../static/from-blog/cover-images/16.png"
---

This is part 04 in our MEAN [full stack tutorial](https://thinkcodeplay.com/full-stack-tutorial-wishlist-part-1-node-and-express/). To continue you can [download the zip here.](https://github.com/ThinkCodePlay/cheapsharkAPI/tree/master/zip/Wishlist%20App%20Part%2003)

In this tutorial we will add tests to our backend using Jest framework in Node.js.

## Install Jest

First let's install Jest as a dev dependency-

```powershell
npm i jest --save-dev
```

Next we will add a script to use for our tests and use a new **.env** file for testing:

```json
"scripts": {
  "start": "node app.js",
  "dev": "env-cmd -f ./config/.env nodemon app.js",
  "test": "env-cmd -f ./config/test.env jest",
  "mongo": "D:/Documents/mongodb/bin/mongod.exe --dbpath=D:/Documents/mongodb-data"
},
```

Add a new test.env in the config folder-

```apacheconf
MONGODB_URL=mongodb://127.0.0.1:27017/cheapshark-test
CLIENT_ORIGIN: 'http://localhost:4200'
```

This will point MONGODB\_URL to a test database and will not effect our main development database.

## Cleaning up our code

Before we continue we need to clean up some of our code in order to be able to use the server and database in our test files.

We will create a new entry point to the app called **index.js** in the root of the project and import **app.js** with all the settings we set up for it.

```javascript
const app = require('./app')

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
```

In the root of the project we will add a folder called routers, add a **gameRoute.js** file. We are now going to take all the routes from the **app.js** file, move them to **gameRoute.js** and export it so that it can be used in **app.js**.

```javascript
const express = require("express");

const router = new express.Router();

const {
  listOfGames,
  dealsForGame,
  wishlist,
  getWishlist,
} = require("../utils/cheapshark");

router.get("/games-list", async (req, res) => {
  const result = await listOfGames({ title: req.query.title });

  if (result.error) {
    return res.status(400).send("Error getting information");
  }

  res.send(result);
});

router.get("/game-deals", async (req, res) => {
  const result = await dealsForGame({ id: req.query.id });

  if (result.error) {
    return res.status(400).send("Error getting information");
  }

  res.send(result);
});

router.post("/wishlist", async (req, res) => {
  const result = await wishlist({
    title: req.body.title,
    gameID: req.body.gameID,
  });

  if (result.error) {
    return res.status(400).send("Error storing game");
  }

  res.send(result);
});

router.get("/get-wishlist", async (req, res) => {
  const result = await getWishlist();

  if (result.error) {
    return res.status(400).send("Error getting information");
  }

  res.send(result);
});

module.exports = router;
```

Notice how we switched from using the variable **app** to **router**

We will now import the gameRoute into **app.js** and export the entire app with all its configurations:

```javascript
const express = require("express");
const app = express();
require("./db/mongoose");
const gameRouter = require('./routes/gameRoute')

app.use(express.json());
app.use(gameRouter)

module.exports = app
```

So basically we now have **index.js** getting the app from **app.js** and **app.js** is using **gameRoute.js** for its routs. This makes it possible for us to take **app.js** out to be used for our tests without spinning up a server.

We now need to update **package.json** to run the **index.js** file we added.

```json
"scripts": {
  "start": "node index.js",
  "dev": "env-cmd -f ./config/.env nodemon index.js",
  "test": "env-cmd -f ./config/test.env jest --watch --runInBand",
  "mongo": "D:/Documents/mongodb/bin/mongod.exe --dbpath=D:/Documents/mongodb-data"
},
```

Now run the dev script it and make sure everything is still working correctly.

## Database Setup

One more thing before beginning to write test we need to set up our database to run. In the root folder create a tests folder, and in that add a folder called fixtures. In it import **app.js** and our Game model.

```javascript
const app = require('../../app')
const Game = require("../../models/game");
```

We will now create 3 Game objects and a setup function to clean the database before starting our tests:

```javascript
const game01 = {
  title: "into the breach",
  gameID: 172155,
};

const game02 = {
  title: "FTL: Faster Than Light",
  gameID: 89174,
};

const game03 = {
  title: "Death Stranding",
  gameID: 207044,
};

const setupDatabase = async () => {
  await Game.deleteMany()
};
```

And finaly we export all the objects and functions

```javascript
module.exports = {
  game01,
  game02,
  game03,
  setupDatabase,
};
```

## Adding Tests

Time to add some tests! In the tests folder add a file **cheapshark.test.js**.

We'll start by importing all the files we need:

```javascript
const { game01, game02, game03, setupDatabase } = require("./fixtures/db");
const {
  listOfGames,
  dealsForGame,
  wishlist,
  getWishlist,
} = require("../utils/cheapshark");
const Game = require("../models/game");
```

First we imported the **db.js** file to use, then the functions we want to test, and finally the Game model we created in with mongoose.

In order to clean the database before starting the tests Jest has a function beforeAll that runs before any other test is run.

```javascript
beforeAll(setupDatabase);
```

## Testing examples

For our first test we will check if we get back a game we looked for

```javascript
test("Should get games list by title", async () => {
  const title = game03.title;
  const result = await listOfGames({ title });
  expect(result[0].gameID).toEqual(game03.gameID.toString());
});
```

The async function runs the function listOfGames with the title of the Game object we created and I **"Expect"** it to return with an array where the first object should match the gameID that I saved in the Game Object.

To start running the tests run in the command line

```powershell
npm run test
```

Jest will now listen to changes in the code and will run again when it detects the code has been modified. (we set this up in **package.json** with the --watch argument)

The next tests should be pretty straight forward. We simply run a test on all our functions, and look for a value we expect will come back every time

```javascript
test("Should fail when sending no arguments to listOfGames", async () => {
  const result = await listOfGames();
  expect(result.error.response.status).toEqual(400);
});

test("Should look for deals for game", async () => {
  const result = await dealsForGame({ id: game03.gameID });
  expect(result.length).toBeGreaterThanOrEqual(0);
});

test("Should fail when sending no arguments to dealsForGame", async () => {
  const result = await dealsForGame();
  expect(result.response.status).toEqual(400);
});

test("Should add game to wishlist", async () => {
  await wishlist(game01);
  await wishlist(game02);
  await wishlist(game03);
  const games = await Game.find();
  expect(games.length).toEqual(3);
});
```

The final test we will add depends on the former ones to run beforehand.

In order to make sure the test are sequential and not run in parallel we added the --ranInBand argument to the test script in **package.json**

```javascript
test("Should get all wishlist items added", async () => {
  const result = await getWishlist();
  expect(result.length).toEqual(3);
});
```

If everything was done correctly you should now have 6 passing tests.

## Complete test code

Here is what our code **cheapshark.test.js** looks like with all the files we added and edited:

```javascript
const { game01, game02, game03, setupDatabase } = require("./fixtures/db");
const {
  listOfGames,
  dealsForGame,
  wishlist,
  getWishlist,
} = require("../utils/cheapshark");
const Game = require("../models/game");


beforeAll(setupDatabase);

test("Should get games list by title", async () => {
  const title = game03.title;
  const result = await listOfGames({ title });
  expect(result[0].gameID).toEqual(game03.gameID.toString());
});

test("Should fail when sending no arguments to listOfGames", async () => {
  const result = await listOfGames();
  expect(result.error.response.status).toEqual(400);
});

test("Should look for deals for game", async () => {
  const result = await dealsForGame({ id: game03.gameID });
  expect(result.length).toBeGreaterThanOrEqual(0);
});

test("Should fail when sending no arguments to dealsForGame", async () => {
  const result = await dealsForGame();
  expect(result.response.status).toEqual(400);
});

test("Should add game to wishlist", async () => {
  await wishlist(game01);
  await wishlist(game02);
  await wishlist(game03);
  const games = await Game.find();
  expect(games.length).toEqual(3);
});

test("Should get all wishlist items added", async () => {
  const result = await getWishlist();
  expect(result.length).toEqual(3);
});
```

```javascript
const app = require('../../app')
const Game = require("../../models/game");

const game01 = {
  title: "into the breach",
  gameID: 172155,
};

const game02 = {
  title: "FTL: Faster Than Light",
  gameID: 89174,
};

const game03 = {
  title: "Death Stranding",
  gameID: 207044,
};

const setupDatabase = async () => {
  await Game.deleteMany()
};

module.exports = {
  game01,
  game02,
  game03,
  setupDatabase,
};
```

## Conclusion

In this tutorial we cleaned up some of our code and made it more reusable. We added a route file for everything concerning saving and loading game deals, and made app.js reusable for both tests and production.

We added a tests to our projects using Jest and made scripts with configurations to run our tests. We imported a test.env file to test on a dummy database that gets setup before our tests run.

We added some tests to run on our functions and see the results we expect.

Full source code [can be found here.](https://github.com/ThinkCodePlay/cheapsharkAPI/tree/master/zip/Wishlist%20App%20Part%2003)

Hope you enjoyed this tutorial. If you found this helpful please leave a comment.
