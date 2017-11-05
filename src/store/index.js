import Vue from 'vue'
import Vuex from 'vuex'

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
      return new Promise(resolve => {
        window.HTTP.post('authenticate', data)
        .then(response => {
          console.log(response)
          //this.posts = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
        localStorage.setItem("token", "JWT");
        commit(LOGIN_SUCCESS);
        resolve();
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
