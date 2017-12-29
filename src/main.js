// Global Variables
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import Vue from 'vue'
import VueRouter from 'vue-router'
import VBClass from 'vue-body-class'
import jquery from 'jquery'
import bootstrap from 'bootstrap'
import adminlte from 'admin-lte'
import Notifications from 'vue-notification'

import App from './App.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'

import System from './components/System.vue'
import Sell from './components/system/content/Sell.vue'
import SellSelectProduct from './components/system/content/Sell/selectProduct.vue'
import LastestDemands from './components/system/content/LastestDemands.vue'
import Users from './components/system/content/Users.vue'
import UsersCreate from './components/system/content/Users/Create.vue'
import UsersEdit from './components/system/content/Users/Edit.vue'
import GroupProducts from './components/system/content/GroupProducts.vue'
import GroupProductsCreate from './components/system/content/GroupProducts/Create.vue'
import GroupProductsEdit from './components/system/content/GroupProducts/Edit.vue'
import Products from './components/system/content/Products.vue'
import ProductsCreate from './components/system/content/Products/Create.vue'
import ProductsEdit from './components/system/content/Products/Edit.vue'

import store from './store'

Vue.use(Notifications);
Vue.use(VueRouter);

// Register routes
const routes = [
  { path: '/',
    component: Home,
    name: 'Home',
    children: [
      {
        name: 'Caixa',
        path: 'sell',
        component: Sell
      },
      {
        name: 'Caixa Seleção de Produto',
        path: 'sell/group_product/:groupProductId',
        component: SellSelectProduct
      },
      {
        name: 'Últimas Demandas',
        path: 'lastest_demands',
        component: LastestDemands
      },
      // USERS
      {
        name: 'Usuários',
        path: 'users',
        component: Users,
      },
      {
        name: 'Criar Novo Usuário',
        path: 'users/create',
        component: UsersCreate,
      },
      {
        name: 'Editar Usuário',
        path: 'users/edit/:userId',
        component: UsersEdit,
      },
      // GROUP PRODUCTS
      {
        name: 'Grupo de Produtos',
        path: 'group_products',
        component: GroupProducts,
      },
      {
        name: 'Criar Novo Grupo de Produtos',
        path: 'group_products/create',
        component: GroupProductsCreate,
      },
      {
        name: 'Editar Grupo de Produtos',
        path: 'group_products/edit/:groupProductId',
        component: GroupProductsEdit,
      },
      // PRODUCTS
      {
        name: 'Produtos',
        path: 'products',
        component: Products
      },
      {
        name: 'Criar Novo Produto',
        path: 'products/create',
        component: ProductsCreate,
      },
      {
        name: 'Editar Produto',
        path: 'products/edit/:productId',
        component: ProductsEdit,
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
