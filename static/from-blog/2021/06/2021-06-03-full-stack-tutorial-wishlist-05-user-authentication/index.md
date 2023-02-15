---
title: "Full Stack tutorial– Wishlist app pt.05 – User Authentication"
date: "2021-06-03"
categories: 
  - "tutorial"
tags: 
  - "jwt"
  - "node-js"
---

In this full stack tutorial we are going add users to our app and make connections between the games and the user that created them. This is and ongoing [series of tutorials](https://thinkcodeplay.com/full-stack-tutorial-wishlist-part-1-node-and-express/), to follow along you can download the [current state of the code here](https://github.com/ThinkCodePlay/cheapsharkAPI/tree/master/zip/Wishlist%20App%20Part%2004).

## Users Model

Lets start by installing all the dependancys we will be using for authenticaion.

we will be using [Validator.js](https://www.npmjs.com/package/validator) for validating user input, [bcrypt.js](https://www.npmjs.com/package/bcryptjs) for encrypting user passwords and [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for creating JWT to authenticate users.

```powershell
npm i jsonwebtoken
npm i bcryptjs
npm i validator
```

Next create the model our users. In the models folder create a file **user.js**. and type in the following code:

```javascript

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Game = require('./game')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
    },
    token: 
        type: String
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
```

As you can see our User model model creates accepts a name, email, password, and tokens properties. Tokens is used for authenticating a connected user which we will discuss below. We used Mongooses built in validate function to implement our validation for the input. In the validate function we used validate.js to check if the email entered is a correct email format. If it fails mongoose will throw an error saying the user scheme is invalid. We also added built in mongoose functions such as required and minlength validation, trim to remove unused spaces after the input, and tolower case on the email to make all characters entered in email address to lower case.

Lets also add to the game model an Id for the owner that created the game:

```javascript
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
```

## Encrypting passwords

In order to store the users passwords we must encrypt them first. We will use mongooses pre function that will run before saving a new user in the db

```javascript
// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});
```

## Logging in with email and password

We will add a static function to the model in order to find the user in the db by email and password using the bcrypt module to compare the hashed password with the one stored in the db:

```javascript
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};
```

## Generating JWTs.

In order to authenticate a user we will create a JSON Web Token or JWT. JWTs are credentials, which can grant access to resources. JWTs have a a structure where the first part represents the Header, middle that represents the payload, and ending that represents the verify signature. For more on this check out [jwt.io](https://jwt.io/).

Now we will create a function in the User model that will generate a JWT for it.

```javascript
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  user.token = token;
  await user.save();

  return token;
};
```

We used the sign function to create the token, the first parameter is the payload in this case the user unique id. The second parameter is the secret to encrypt the JWT with. This must stay hidden and stored in .env file. We will add the private key to the .env file

```bash
MONGODB_URL=mongodb://127.0.0.1:27017/cheapshark
 CLIENT_ORIGIN: 'http://localhost:4200'
 JWT_SECRET=thisismysecret
```

## Connecting User to games

Now that we set up our users lets make the connection between a users and the games he added to his Wishlist. Add the following to the model:

```javascript
userSchema.virtual("games", {
  ref: "Game",
  localField: "_id",
  foreignField: "owner",
});
```

Here we create a virtual for the model. A virtual in mongoose is a property that is computed but is not used in the db. So if we use the games propertie of the model (which we did not store in the models property) we will get back the object we created (ref, localField, and foreignField).

## Create a User route

Like the games routes, we will create a User route to handle all the request for users. In the routes folder create a file **userRoute.js** and write:

```javascript
const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/user', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.cookie("TOKEN", token)
        res.status(201).send()
    } catch (e) {
        res.status(400).send(e)
   }

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie("TOKEN", token)
        res.send()
    } catch (e) {
        res.status(400).send()
    }
})
})

module.exports = router
```

This will create a user and add it to the db. Then it will send back a cookie to the client with the JWT.

Test it out adding and logging in using Postman by sending a post request to http://localhost:3000/users with JSON raw data

```json
{
    "name": "John",
    "email": "John@thinkcodeplay.com",
    "password": "123456"
}
```

You should now see the users was saved in the db

```json
{
     "_id": {
         "$oid": "60b8ab0f682ca031e469172c"
     },
     "name": "John",
     "email": "john@thinkcodeplay.com",
     "password": "$2a$08$2xrIupAcHdgIBKAOtC/aEusiPhK4ijTWpj42OythC6.zZKejGguTq",
     "createdAt": {
         "$date": "2021-06-03T10:12:31.305Z"
     },
     "updatedAt": {
         "$date": "2021-06-03T10:12:31.305Z"
     },
     "__v": 0
 }
```

To connect to a saved user send only the email and password.

## Authentication with JWT

We now can use the JWT we got to login to the db. We will use middleware to catch the JWT sent and find the user before entering the routes function:

Create a middleware folder and a file called **auth.js**:

```javascript
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        console.log(req.headers.cookie);
        const token = req.headers.cookie.replace('TOKEN=', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth
```

This will take the string sent in the cookie and extract only the JWT. it will the decode the JWT using the secret private key and then search for the users in the db and store the token and user onto the request so that it can be accessed in the routes function.

We can now use this middleware on all our routes. Lets create a new game in the Wishlist for the user. We will tweak our Wishlist route to store the user Id:

```javascript
router.post("/wishlist", auth, async (req, res) => {
  const result = await wishlist({
    title: req.body.title,
    gameID: req.body.gameID,
    owner: req.user._id
  });

  if (result.error) {
    return res.status(400).send("Error storing game");
  }

  res.send(result);
});
```

This will take to user id that was in the JWT and sent by the cookie and store it in the game model db.

To retrieve the games for that user we will add the auth.js middleware:

```javascript
router.get("/get-wishlist", auth ,async (req, res) => {

  const result = await getWishlist(req.user);

  if (result.error) {
    return res.status(400).send("Error getting information");
  }

  res.send(result);
});
```

And lastly we will change the function getWishlist to retrieve the games according to the user that created them

```javascript
const getWishlist = async (user) => {
  try {
    await user
      .populate({
        path: "games",
      })
      .execPopulate();
    return user.games;
  } 
  catch (error) {
    {
      error;
    }
  }
};
```

## Conclusion

In this tutorial we learned how to connects users to games using virtual, we used middleware to retrieve a user, we used bcrypt to encrypt and compare passwords, and we user JWT to send an auth token to the user.

We have now completed the server side of the Wishlist app.

In the next tutorial we will build the client side and connect to the server to complete out our full stack app.

[Complete source code can be found here.](https://github.com/ThinkCodePlay/cheapsharkAPI/tree/master/zip/Wishlist%20App%20Part%2005)

Enjoyed this tutorial? Leave a comment below
