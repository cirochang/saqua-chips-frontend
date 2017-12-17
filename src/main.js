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
import Login from './components/Login.vue'
import Home from './components/Home.vue'

import System from './components/System.vue'
import Sell from './components/system/content/Sell.vue'
import LastestDemands from './components/system/content/LastestDemands.vue'
import Products from './components/system/content/Products.vue'
import Users from './components/system/content/Users.vue'
import UsersCreate from './components/system/content/Users/Create.vue'

import store from './store'

Vue.use(VueRouter);


// Register routes
const routes = [
  { path: '/', component: Home,
    children: [
      {
        name: 'Default',
        path: '',
        component: Sell
      },
      {
        name: 'Sell',
        path: 'sell',
        component: Sell
      },
      {
        name: 'Lastest Demands',
        path: 'lastest_demands',
        component: LastestDemands
      },
      {
        name: 'Products',
        path: 'products',
        component: Products
      },
      {
        name: 'Users',
        path: 'users',
        component: Users,
      },
      {
        name: 'Users Create',
        path: 'users/create',
        component: UsersCreate,
      },
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
