import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  users: {},
  listings: [],
  job: {},
  statuses: {},
  months: []
}

const getters = {

}
const mutations = {
  users(context, payload){
    payload.forEach(function(user){
      Vue.set(state.users, user.id, user);
    });
  },
  listings(context, payload){
    state.listings = payload;
  },
  job(context, payload){
    Vue.set(state.job, payload.id, payload.data[0]);
  },
  statuses(context, payload){
    payload.forEach(function(status){
      Vue.set(state.statuses, status.id, status);
    });
  }
}

const actions = {
  users(context){
    if(Object.keys(state.users).length == 0) {
      return Vue.axios.get('http://localhost:8000/users').then((response) => {
        context.commit('users', response.data);
      });
    } else {
      return true;
    }
  },
  listings(context, filter){
    return Vue.axios.get('http://localhost:8000/jobs', {params: filter}).then((response) => {
      context.commit('listings', response.data);
    });
  },
  job(context, id){
    if(!(id in state.job)) {
      return Vue.axios.get('http://localhost:8000/jobs/' + id).then((response) => {
        context.commit('job', {id: id, data: response.data});
      });
    } else {
      return state.job.id;
    }
  },
  statuses(context){
    if(Object.keys(state.statuses).length == 0) {
      return Vue.axios.get('http://localhost:8000/statuses').then((response) => {
        context.commit('statuses', response.data);
      });
    } else {
      return true;
    }
  },

  //Save data
  savejob(context, job){
    return Vue.axios.put('http://localhost:8000/jobs/' + job.id, job).then((response) => {
      console.log(response);
    });
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
