// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import '~/assets/styles.css'

import 'prismjs/themes/prism-tomorrow.css';

import DefaultLayout from '~/layouts/Default.vue'


export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.use(BootstrapVue);
  Vue.component('Layout', DefaultLayout);

    // Add Vercel Analytics script to head
    head.script.push({
      src: '/_vercel/insights/script.js',
      async: true,
      defer: true,
      'data-strategy': 'lazyOnload'
    });
}
