import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
/* eslint-disable */
export default createStore({
  state: {
    user: null,
    token: null,
    isAuthenticated: false,
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    checkAuthentication({ commit }) {
      const token = localStorage.getItem("token");
      if (token) {
        commit("setAuthentication", true);
      } else {
        commit("setAuthentication", false);
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token'); 
      commit('setToken', null); 
      commit('setAuthentication', false); 
      commit('setUser', null); 
      location.reload();
    },
  },
  modules: {
  },
  plugins: [createPersistedState()],
})