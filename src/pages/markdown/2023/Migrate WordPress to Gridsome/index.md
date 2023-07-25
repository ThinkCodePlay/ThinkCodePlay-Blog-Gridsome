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
* Frontend only. No backend and no database.
* Using MarkDown (.md) files to write blog posts super fast.
* The website should must be lightning fast and easy to maintain.


## Why Migrate to Gridsome

[Gridsome](https://gridsome.org/) is a Vue.js framework for building fast and efficient static web applications. Gridsome leverages the power of static site generation, which means that the content of your website is pre-rendered as 
static HTML files during the build process. This approach offers several advantages, including faster loading times, 
improved SEO, and reduced server load.

It also database agnostic letting you bring data from many sources. It includes a huge ecosystem of plugins letting easily import
and use common tasks such as sitemap generator, SEO, Google Analytics, and data source import.

Since I wanted to use MarkDown files, gridsome has a [source-filesystem](https://gridsome.org/plugins/@gridsome/source-filesystem) plugin, allowing me to use
md files as a data source that I can then query and display as blog posts.

## How to Migrate from WordPress to Gridsome

### Fetching Content From WordPress

First step before switching over to Gridsome is to make sure we take all the data from our WordPress site.
In your WordPress dashboard go to the `Tools -> Export` section. Select `All Content` export option and press `Download Export File`.
This will download an XML file containing all data of the site.

Now that we have our WordPress export file we need to create MarkDown posts out of the data.

Thankfully I found a great tool for this called [wordpress-export-to-markdown](https://www.npmjs.com/package/wordpress-export-to-markdown).

This NPM is super simple, in your command line, using npm run:

```bash
npx wordpress-export-to-markdown
```

The wizard will ask you where the file is, and how you want the content to be structured. Once running the script you will
have all you content including metadata and images in MarkDown file format.

### Install Gridsome

Now that we have all our files we will install Gridsome and put our post files in there. First we will install the Gridsome cli:

```bash
npm install --global @gridsome/cli
```

Once Gridsome cli is installed create a new project:

```bash
gridsome create <your-app-name>
```

Test everything is working with:

```bash
gridsome develop
```

### Install Gridsome  Plugin

To be able to use Markdown files as a data source we need to install the @gridsome/source-filesystem.

To install run:

```bash
npm install @gridsome/source-filesystem
```

Next we need to configure the plugin in the gridsome.config file add the following snippet

```js
module.exports = {
  siteName: 'ThinkCodePlay',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/pages/markdown/**/*.md',
        typeName: 'Post',
        resolveAbsolutePaths: true,
      }
    }
  ],
  templates: {
    Post: '/posts/:title',
  }
}
```

### Adding Markdown Files to Gridsome

### Querying For Blog Posts

### Optional - Adding Code Blocks in post

If you have code snippets in your Markdown files, you can add a plugin to display syntax highlighing using @gridsome/remark-prismjs plugin.

To install run:

```bash
npm install @gridsome/remark-prismjs
```

Then adjust the gridsome.config file:

```js
module.exports = {
  siteName: 'ThinkCodePlay',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/pages/markdown/**/*.md',
        typeName: 'Post',
        resolveAbsolutePaths: true,
        remark: {
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    }
  ],
  templates: {
    Post: '/posts/:title',
  }
}
```


## Conclusion

Converting a WordPress site to Gridsome is a relatively straightforward process. By following the steps outlined in this blog post, you can quickly and easily create a fast, lightweight, and modern static site using Gridsome. With the help of the official WordPress plugin, you can easily import your WordPress data and start building your new site in no time.