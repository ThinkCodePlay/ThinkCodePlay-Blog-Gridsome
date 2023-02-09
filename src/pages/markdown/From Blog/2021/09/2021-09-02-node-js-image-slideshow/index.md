---
title: "How To Make a Node JS image Slideshow"
date: "2021-09-02"
categories: 
  - "node-js"
  - "tutorial"
tags: 
  - "ffmpeg"
  - "node-js"
---

In this tutorial, we will build a Node JS image slideshow app that takes a folder with images and creates a video slideshow from them.

## Setup

For this app, we will need a few NPM packages installed.

First, create a new node app:

```
npm init -y
```

Now install the packages we will need:

```
npm i videoshow
npm i @ffmpeg-installer/ffmpeg
npm i @ffprobe-installer/ffprobe
npm i chalk
```

The first package is a library that uses FFmpeg and abstracts all the complex code for us. Since it uses FFmpeg we need to make sure FFmpeg is installed on the machine. You could theoretically download it from their site [https://www.ffmpeg.org](https://www.ffmpeg.org/) and make sure your system registers its paths, but I wanted an option that is independent of the system it's running on. For that, we have the following 2 packages @ffmpeg-installer/FFmpeg and @ffprobe-installer/ffprobe . These packages install the latest distro and make it part of the node\_modules of the app.

The last package chalk is purely cosmetic for making the terminal output look colorful.

## The Code

### Getting the images

Now that we have everything set up it's time to create an **app.js** file.

I will break the code down and then show the entire code at the end.

First, we want to start with reading all files in the directory we specify:

```javascript
const fs = require("fs");
const path = require("path");

const folderPath = "D:\\Documents\\slide-maker\\media";
const images = fs
  .readdirSync(folderPath)
  .map((fileName) => {
    return path.join(folderPath, fileName);
  })
  .filter((file) => {
    return path.extname(file) === ".jpg" || ".png" || ".bmp";
  });
```

We use readdirSync which is a node.js built-in function to read all files, we loop through them to get their full path, and then we filter out only the files with an extension of .jpg, .png, or .bmp which are supported by videoshow.

So we have our files stored in an array, now we can use them in videoshow.

### Creating the slideshow

```javascript
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
```

Here we are importing the packages and we're letting node know what the path of ffmpeg we are using. First line we are importing the fluent-ffmpeg (that comes in the @ffmpeg-installer/ffmpeg package). Then we set up that path for ffmpeg and ffprobe.

Now we will initialize the settings for the videos to be created:

```javascript
const videoOptions = {
  fps: 25,
  loop: 5, // seconds
  transition: true,
  transitionDuration: 0.2, // seconds
  videoBitrate: 1024,
  videoCodec: "libx264",
  size: "640x?",
  audioBitrate: "128k",
  audioChannels: 2,
  format: "mp4",
  pixelFormat: "yuv420p",
};
```

Here we set up the key values pairs for videoshow options. We have definitions such as how many fps we want the output to be, how many seconds for each image will be displayed, if we want transitions then how long each transition will be etc. We can define any option that is define in [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#creating-an-ffmpeg-command). (Note: this is optional. If not used a default option will be used).

Now for the final part we run the function to generate our video:

```javascript
const chalk = require("chalk");
const errorColor = chalk.red.inverse;
const successColor = chalk.green.inverse;
const startingColor = chalk.yellow.inverse

videoshow(images, videoOptions)
  .audio("D:\\Documents\\slide-maker\\media\\bensound-ukulele.mp3") // credit for song from https://www.bensound.com
  .save("video.mp4")
  .on("start", function (command) {
    console.log(startingColor("ffmpeg process started:", command));
  })
  .on("error", function (err, stdout, stderr) {
    console.log(errorColor("Error:", err));
    console.log(errorColor("ffmpeg stderr:", stderr));
  })
  .on("end", function (output) {
    console.log(successColor("Video created in:", output));
  });
```

Videoshow constructer takes in the images array and the options we defined and creates an instance of it. It then takes in an audio file if we want to, an output file .save() to tell videoshow where to put the final video and 3 event emitters. And event for starting the process of creating the image, an error event if something goes wrong and an end event when the process is done.

Run your script with node app.js and we're all done.

### Final Code

Here's what the final code looks like:

```javascript
const fs = require("fs");
const path = require("path");
var videoshow = require("videoshow");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
const chalk = require("chalk");
const errorColor = chalk.red.inverse;
const successColor = chalk.green.inverse;
const startingColor = chalk.yellow.inverse

const folderPath = "D:\\Documents\\slide-maker\\media";
const images = fs
  .readdirSync(folderPath)
  .map((fileName) => {
    return path.join(folderPath, fileName);
  })
  .filter((file) => {
    return path.extname(file) === ".jpg" || ".png" || ".bmp";
  });

const videoOptions = {
  fps: 25,
  loop: 5, // seconds
  transition: true,
  transitionDuration: 0.2, // seconds
  videoBitrate: 1024,
  videoCodec: "libx264",
  size: "640x?",
  audioBitrate: "128k",
  audioChannels: 2,
  format: "mp4",
  pixelFormat: "yuv420p",
};

videoshow(images, videoOptions)
  .audio("song.mp3")
  .save("video.mp4")
  .on("start", function (command) {
    console.log(startingColor("ffmpeg process started:", command));
  })
  .on("error", function (err, stdout, stderr) {
    console.log(errorColor("Error:", err));
    console.log(errorColor("ffmpeg stderr:", stderr));
  })
  .on("end", function (output) {
    console.log(successColor("Video created in:", output));
  });
```

## Conclusion

In this tutorial, we learned how to create a slideshow video using FFmpeg that is independent of the system it's running on.

You can find download this from my GitHub Repo at: [https://github.com/ThinkCodePlay/Node.js-slideshow-maker](https://github.com/ThinkCodePlay/Node.js-slideshow-maker)

Hope you enjoyed this tutorial.

If you liked it please consider sharing.

See you in the next post.
