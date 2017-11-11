import Vue from 'vue'
import Vuex from 'vuex'
import {SAQUA_BACK} from '../gateways/saqua_back'

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     isLoggedIn: !!localStorage.getItem("token")
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
    }
  },
  actions: {
    login({ commit }, data) {
      commit(LOGIN); // show spinner
      return new Promise( (resolve, reject) => {
        SAQUA_BACK.post('authenticate', data).then(response => {
          localStorage.setItem("token", response.data.token);
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
      commit(LOGOUT);
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    }
  }
})
