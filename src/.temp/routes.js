const c1 = () => import(/* webpackChunkName: "page--src-templates-post-vue" */ "D:\\Documents\\Web-Dev\\Gridsome\\app\\src\\templates\\Post.vue")
const c2 = () => import(/* webpackChunkName: "page--src-pages-blog-vue" */ "D:\\Documents\\Web-Dev\\Gridsome\\app\\src\\pages\\Blog.vue")
const c3 = () => import(/* webpackChunkName: "page--src-pages-about-vue" */ "D:\\Documents\\Web-Dev\\Gridsome\\app\\src\\pages\\About.vue")
const c4 = () => import(/* webpackChunkName: "page--node-modules-gridsome-app-pages-404-vue" */ "D:\\Documents\\Web-Dev\\Gridsome\\app\\node_modules\\gridsome\\app\\pages\\404.vue")
const c5 = () => import(/* webpackChunkName: "page--src-pages-index-vue" */ "D:\\Documents\\Web-Dev\\Gridsome\\app\\src\\pages\\Index.vue")

export default [
  {
    path: "/src/pages/markdown/from-blog/2021/04/2021-04-06-full-stack-tutorial-wishlist-part-1-node-and-express/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2021/04/2021-04-18-how-to-use-mongodb-and-mongoose-in-node-js/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2021/06/2021-06-24-how-to-make-a-telegram-bot-in-node-js/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2022/02/2022-02-10-scratch-tutorial-for-complete-beginners-pt-05-user-input/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2021/04/2021-04-01-how-to-build-a-node-js-express-tutorial/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2021/04/2021-04-11-full-stack-tutorial-wishlist-02-node-http-request/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2021/04/2021-04-25-full-stack-tutorial-wishlist-04-node-js-tests/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2021/06/2021-06-03-full-stack-tutorial-wishlist-05-user-authentication/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2022/01/2022-01-23-scratch-tutorial-for-complete-beginners-part2/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2022/01/2022-01-26-scratch-tutorial-for-complete-beginners-part3/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2022/01/2022-01-26-scratch-tutorial-for-complete-beginners-part4/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2021/06/2021-06-13-react-to-do-list-app/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2021/07/2021-07-07-node-js-telegram-bot-heroku/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2021/12/2021-12-05-css-foundation-the-box-model/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2022/01/2022-01-22-scratch-tutorial-for-complete-beginners/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2021/05/2021-05-13-interface-in-c-sharp/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2021/09/2021-09-02-node-js-image-slideshow/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2021/10/2021-10-03-node-js-image-generator/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2021/07/2021-07-27-angular-cheat-sheet/",
    component: c1
  },
  {
    path: "/src/pages/markdown/from-blog/2021/10/2021-10-17-css-specificity/",
    component: c1
  },
  {
    path: "/blog/:page(\\d+)?/",
    component: c2
  },
  {
    path: "/post1/",
    component: c1
  },
  {
    path: "/post2/",
    component: c1
  },
  {
    path: "/gridsome-markdown-blog/",
    component: c1
  },
  {
    path: "/about/",
    component: c3
  },
  {
    name: "404",
    path: "/404/",
    component: c4
  },
  {
    name: "home",
    path: "/",
    component: c5
  },
  {
    name: "*",
    path: "*",
    component: c4
  }
]
