---
title: "Make your first Telegram Bot in Node JS"
date: "2021-06-24"
categories: 
  - "tutorial"
tags: 
  - "bot"
  - "node-js"
cover: "/static/from-blog/cover-images/12.png"  
---

In this tutorial I will show you how to build a Telegram Bot in Node JS

This bot will get a game title and return the best deal it found on [cheapshark.com](https://www.cheapshark.com/).

Topics:

- Creating a Telegram bot user
- Running Telegram bot on Node.js
- Sending request to cheapshark api using axios
- Enviroment variables

## Create Telegram Bot user

In order to begin we first need to create a new bot in Telegram. To do this search BotFather in telegrams search panel and start a chat with him.

![](/static/from-blog/2021/06/2021-06-24-how-to-make-a-telegram-bot-in-node-js/images/image.png)

To create a new bot send "/newbot". Next enter a username. Finally you will receive an access token. (Keep this secret)

![](/static/from-blog/2021/06/2021-06-24-how-to-make-a-telegram-bot-in-node-js/images/image-1.png)

## Node.js telegram server

Time to run the server so we have someone to talk to.

We will be using a module node-telegram-bot-api to do all the heavy lifting for us. See [full documentation here](https://github.com/yagop/node-telegram-bot-api).

To hide environmental variables we will use dotenv.

I will also install nodemon to make development faster.

Create a new Node app and install:

```powershell
npm init -y
npm i node-telegram-bot-api
npm i dotenv --save-dev
npm i axios
npm i nodemon --save-dev
```

In out package.json file we will create a script for development and for production

```json
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
```

Create a .env file in the root and drop the telegram access token there:

```powershell
TELEGRAM_BOT_TOKEN=supersecretaccestoken
```

Dont forget to add this file to .gitignore.

And we will create out app.js file in the root folder:

```javascript
require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Received your message');
});
```

Run the server with:

```powershell
npm run dev
```

Test the app by searching the app username and starting a chat with it.

![](/static/from-blog/2021/06/2021-06-24-how-to-make-a-telegram-bot-in-node-js/images/image-3.png)

## Fetching deals for games

Now that we have a bot running lets send a request to search for a game deal.

I have previously created tutorial about [how to fetch game deals from cheapshark](https://thinkcodeplay.com/full-stack-guide-wishlist-02-http-request-from-node/) so I can reuse the same code. For more details check out the tutorial I made.

We will create a utils folder and in it create our api call:

```javascript
const axios = require("axios").default;

const gameDeal = async (gameName) => {
  try {
    const response = await axios.get(
      `https://www.cheapshark.com/api/1.0/games?title=${gameName}`
    );

    if (response.data.length > 0) {
      console.log(response.data[0]);
      const gameData = `Game name: ${response.data[0].external}. \nCheapest price found: ${response.data[0].cheapest}. \nDeal Link: https://www.cheapshark.com/redirect?dealID=${response.data[0].cheapestDealID}`;
      return gameData;
    } else {
      return "no deals found";
    }
  } catch (error) {
    return "Sorry, got an error";
  }
};

module.exports = {
  gameDeal,
};
```

Now lets receive a game when the user types "/game":

```javascript
const { gameDeal } = require("./utils/cheapshark");

require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/game (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  bot.sendMessage(chatId, resp);
});
```

Test out the app and you get:

![](/static/from-blog/2021/06/2021-06-24-how-to-make-a-telegram-bot-in-node-js/images/image-4.png)

all we have to do now is use the cheapshark function from the bot to recieve our data:

```javascript
bot.onText(/\/game (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const gameName = match[1];

  const deal = await gameDeal(gameName);
  bot.sendMessage(chatId, deal);
});
```

And that's it! We get the first deal under the name sent by the user with name price and link to deal.

![](/static/from-blog/2021/06/2021-06-24-how-to-make-a-telegram-bot-in-node-js/images/image-5.png)

## Conclusion

In this tutorial we learned how to create a new telegram bot, create the server in Node.js, use environmental variables, retrieved data with axois from cheapshark.com and serve the app to Heroku.

In the next tutorial I will show how to deploy this server on Heroku using express and webhooks.

You can talk to my bot on telegram @thinkcodeplay\_gamedeal\_bot.

Full [source code can be found here.](https://github.com/ThinkCodePlay/telegram-bot-gamedeal-node.js)

Hope you enjoyed this tutorial!

Cheers
