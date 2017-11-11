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

import App from './App.vue'
import Product from './components/Product.vue'
import Order from './components/Order.vue'
import Complete from './components/Complete.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'

import System from './components/System.vue'
import Sell from './components/system/content/Sell.vue'
import Products from './components/system/content/Products.vue'

import store from './store'

Vue.use(VueRouter);


// Register routes
const routes = [
  { path: '/', component: Home,
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
        path: 'products',
        component: Products
      }
   ]
  }
];

const router = new VueRouter({
  routes
});

Vue.use(VBClass, router);

// Instantiate application to the DOM
new Vue({
    router,
    el: '#app',
    store,
    data(){
        return {
            order_details: {}
        }
    },
    render: h => h(App)
});
