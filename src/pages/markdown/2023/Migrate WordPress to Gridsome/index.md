---
title: "How I Migrated My WordPress Website to Gridsome"
date: "2023-04-25"
categories:
  - "tutorial"
tags: 
  - "wordpress"
  - "gridsome"
cover: ""
---

# Migrating WordPress Site to Gridsome

For years, I have been using WordPress for hosting a small blog for documenting coding concepts and projects I made.
WordPress is one of the most popular Content Management Systems (CMS) on the internet, but for a small coding blog I didn't
need all the overhead of paying for hosting and domain. So I headed out looking for a Static Site Generator solution that 
is both lightweight and fast. In this blog post, I will guide you through the process of converting a WordPress site to Gridsome.

## Goals for migrating

WordPress is awesome in the way it makes life easier doing all the heavy lifting of setting up the database, building web pages, and querying for data.
I wanted to make a super-fast and lightweight website that all  Vue.js.

Here are the goals for this project:

* Using Vue.js for the frontend.
* Using no backend and database.
* Using MarkDown (.md) files for blog posts.
* The website should be lightning fast and easy to maintain.


## Why Migrate to Gridsome

[Gridsome](https://gridsome.org/) is a Vue.js framework for building fast and efficient static web applications. Gridsome leverages the power of static site generation, which means that the content of your website is pre-rendered as 
static HTML files during the build process. This approach offers several advantages, including faster loading times, 
improved SEO, and reduced server load.

It also data agnostic letting you bring data from many sources. It includes a huge ecosystem of plugins letting easily import
and use common tasks such as sitemap generator, SEO, Google Analytics, and data source import.

Since I wanted to use md files, gridsome has a [source-filesystem](https://gridsome.org/plugins/@gridsome/source-filesystem) plugin allowing me to use
md files as a data source that I can query and then display as a blog post page


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