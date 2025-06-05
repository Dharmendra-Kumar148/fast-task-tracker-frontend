import { createStore } from "vuex";

export interface State {
  token: string;
  username: string;
}

const state: State = {
  token: localStorage.getItem('token') || '',
  username: localStorage.getItem('username') || '',
};

export default createStore({
  state,
  mutations: {
    setAuth(state: State, payload: { token: string; username: string }) {
      state.token = payload.token
      state.username = payload.username
      localStorage.setItem('token', payload.token)
      localStorage.setItem('username', payload.username)
    },
    logout(state: State) {
      state.token = ''
      state.username = ''
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    }
  },
  actions: {},
  getters: {
    isAuthenticated: (state: State) => !!state.token,
    username: (state: State) => state.username,
    token: (state: State) => state.token,
  }
})