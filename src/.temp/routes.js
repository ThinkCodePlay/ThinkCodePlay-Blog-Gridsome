const c1 = () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/yonatankr/projects/gridsome/thinkCodePlay/src/templates/Post.vue")
const c2 = () => import(/* webpackChunkName: "page--src--pages--about-vue" */ "/Users/yonatankr/projects/gridsome/thinkCodePlay/src/pages/About.vue")
const c3 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/yonatankr/projects/gridsome/thinkCodePlay/node_modules/gridsome/app/pages/404.vue")
const c4 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/yonatankr/projects/gridsome/thinkCodePlay/src/pages/Index.vue")

export default [
  {
    path: "/posts/:title/",
    component: c1
  },
  {
    path: "/about/",
    component: c2
  },
  {
    name: "404",
    path: "/404/",
    component: c3
  },
  {
    name: "home",
    path: "/",
    component: c4
  },
  {
    name: "*",
    path: "*",
    component: c3
  }
]
