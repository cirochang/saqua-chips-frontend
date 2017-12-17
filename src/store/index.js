import Vue from 'vue'
import Vuex from 'vuex'
import {SAQUA_BACK} from '../gateways/saqua_back'

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const SET_CURRENT_USER = "SET_CURRENT_USER";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     isLoggedIn: !!localStorage.getItem("token"),
     currentUser: {}
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGOUT](state) {
      state.isLoggedIn = false;
    },
    [SET_CURRENT_USER](state, user) {
      state.currentUser = user;
    }
  },
  actions: {
    login({ commit }, data) {
      commit(LOGIN); // show spinner
      return new Promise( (resolve, reject) => {
        SAQUA_BACK.post('authenticate', data).then(response => {
          localStorage.setItem("token", response.data.token);
          SAQUA_BACK.defaults.headers = Object.assign({}, SAQUA_BACK.defaults.headers, {'x-access-token': response.data.token});
          commit(LOGIN_SUCCESS);
          resolve();
        })
        .catch(error => {
          reject(error);
        })
      });
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      SAQUA_BACK.defaults.headers = Object.assign({}, SAQUA_BACK.defaults.headers, {'x-access-token': null});
      commit(LOGOUT);
    },
    setCurrentUser({ commit }) {
      return new Promise( (resolve, reject) => {
        SAQUA_BACK.get('current_user').then(response => {
          commit(SET_CURRENT_USER, response.data);
          resolve();
        })
        .catch(error => {
          reject(error);
        })
      });
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn;
    },
    currentUser: state => {
      state.currentUser.hasAccess = (role) => {
        let roles = ['employee', 'manager', 'director', 'developer'];
        return roles.indexOf(state.currentUser.role) >= roles.indexOf(role);
      };
      return state.currentUser;
    }
  }
})
