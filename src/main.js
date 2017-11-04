// Environment configuration
if (process.env.NODE_ENV === 'production') {
    window.endpoint = 'http://localhost:3000';
} else {
    window.endpoint = 'http://localhost:3000';
}

// Global Variables
window.moment = require('moment');
window.axios = require('axios');
window.jQuery = require('jquery');
window.admin_lte = require('admin-lte');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import Vue from 'vue'
import VueRouter from 'vue-router'
import VBClass from 'vue-body-class'
import jquery from 'jquery'
import bootstrap from 'bootstrap'

import App from './components/App.vue'
import Product from './components/Product.vue'
import Order from './components/Order.vue'
import Complete from './components/Complete.vue'
import Login from './components/Login.vue'

import System from './components/System.vue'
import Sell from './components/system/content/Sell.vue'
import Products from './components/system/content/Products.vue'


Vue.use(VueRouter);


// Register routes
const routes = [
  { name: 'home', path: '/', meta: { bodyClass: 'login-page' }, component: Login },
  { name: 'system', path: '/system/', meta: { bodyClass: 'hold-transition skin-yellow sidebar-mini' },
    component: System,
    children: [
      {
        path: '',
        component: Sell
      },
       {
         path: 'sell',
         component: Sell
       },
       {
         // UserPosts will be rendered inside User's <router-view>
         // when /user/:id/posts is matched
         path: 'products',
         component: Products
       }
     ]
  },
  { name: 'order', path: '/order', component: Order },
  { name: 'order-complete', path: '/order-complete/:id', component: Complete },
  { name: 'login', path: '/login', meta: { bodyClass: 'login-page' }, component: Login}
];

const router = new VueRouter({
  routes
});

Vue.use(VBClass, router);


// Instantiate application to the DOM
new Vue({
    router,
    el: '#app',
    data(){
        return {
            order_details: {}
        }
    },
    render: h => h(App)
});
