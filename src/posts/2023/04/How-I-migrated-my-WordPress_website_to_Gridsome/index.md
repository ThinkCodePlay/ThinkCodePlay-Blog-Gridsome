---
title: "How I Migrated My WordPress Website to Gridsome"
date: "2023-04-25"
categories:
  - "tutorial"
tags: 
  - "wordpress"
  - "gridsome"
cover: "../../../../../../../static/from-blog/cover-images/5.png"
---

WordPress is one of the most popular content management systems on the internet, but it can be a bit heavy on resources, and its loading time is often slow. Gridsome, on the other hand, is a modern static site generator that is both lightweight and fast. In this blog post, we will guide you through the process of converting a WordPress site to Gridsome.

Step 1: Export WordPress data

The first step is to export your WordPress data, including pages, posts, and comments. You can do this by logging in to your WordPress dashboard, clicking on Tools, and then selecting Export. Choose the content you want to export, and then click on the Download Export File button. This will create an XML file that contains all of your WordPress data.

Step 2: Install Gridsome

The next step is to install Gridsome. You can do this by following the installation instructions on the Gridsome website. Once you have installed Gridsome, you can create a new project using the following command:

```
gridsome create my-gridsome-site
```
Step 3: Install Gridsome WordPress Plugin

Gridsome has an official WordPress plugin that allows you to easily import your WordPress data. Install the plugin using the following command:

```
npm install gridsome-source-wordpress
```

Step 4: Configure Gridsome

After installing the WordPress plugin, you need to configure your Gridsome project. Open the gridsome.config.js file in your project directory and add the following code:

```
module.exports = {
  plugins: [
    {
      use: 'gridsome-source-wordpress',
      options: {
        baseUrl: 'https://your-wordpress-site.com',
        typeName: 'WordPress',
        perPage: 100,
        concurrent: 10,
      },
    },
  ],
}
```
Make sure to replace the baseUrl with the URL of your WordPress site. You can also adjust the perPage and concurrent options to match your needs.

Step 5: Build your site

After configuring Gridsome, you can start building your site. Run the following command to generate the static site:

```
gridsome build
```

This will create a dist directory containing your static site.

Step 6: Deploy your site

Finally, you need to deploy your site to a web server. There are many options for deploying a static site, including using services like Netlify or GitHub Pages. You can also deploy your site to a traditional web server by simply uploading the files in the dist directory to your server.

Conclusion

Converting a WordPress site to Gridsome is a relatively straightforward process. By following the steps outlined in this blog post, you can quickly and easily create a fast, lightweight, and modern static site using Gridsome. With the help of the official WordPress plugin, you can easily import your WordPress data and start building your new site in no time.

https://www.npmjs.com/package/wordpress-export-to-markdown