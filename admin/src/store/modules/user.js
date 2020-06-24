const state = {
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  login({commit}, {that, model}) {
        return new Promise((resolve) => {
          that.$http.post('login', model).then(res => {
            setTimeout(() => {
              const {data, headers} = res;
              commit('SET_TOKEN', data.token);
              localStorage.setItem('token', data.token);
              commit('SET_USERNAME', headers.user);
              localStorage.setItem('username', headers.user);
              commit('SET_ROLES', [])
              resolve()
            }, 500);
          })
        })
    
  },
  getInfo({commit, state}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const roles = state.username === 'patientLink' ? ['admin'] : ['visitor'];
        commit('SET_ROLES', roles);
        resolve(roles)
      }, 500);
    })
  },
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', "");
      commit('SET_USERNAME', "");
      commit('SET_ROLES', []);
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}