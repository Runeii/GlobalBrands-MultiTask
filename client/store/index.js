import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  me: {},
  users: {},
  listings: [],
  job: {},
  statuses: {},
  months: []
}

const getters = {

}
const mutations = {
  me(context, payload){
    state.me = payload;
  },
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
  login(context, details){
    if(details.username != '' && details.password != '') {
      return Vue.axios.put('http://rest.globalbrands.co.uk/auth', details).then((response) => {
        console.log(response);
        context.commit('me', response.data);
      });
    } else {
      return false;
    }
  },
  users(context){
    if(Object.keys(state.users).length == 0) {
      return Vue.axios.get('http://rest.globalbrands.co.uk/users').then((response) => {
        context.commit('users', response.data);
      });
    } else {
      return true;
    }
  },
  listings(context, filter){
    return Vue.axios.get('http://rest.globalbrands.co.uk/jobs', {params: filter}).then((response) => {
      console.log(response);
      context.commit('listings', response.data);
    });
  },
  job(context, id){
    if(!(id in state.job)) {
      return Vue.axios.get('http://rest.globalbrands.co.uk/jobs/' + id).then((response) => {
        context.commit('job', {id: id, data: response.data});
      });
    } else {
      return state.job.id;
    }
  },
  statuses(context){
    if(Object.keys(state.statuses).length == 0) {
      return Vue.axios.get('http://rest.globalbrands.co.uk/statuses').then((response) => {
        context.commit('statuses', response.data);
      });
    } else {
      return true;
    }
  },

  //Save data
  savejob(context, job){
    return Vue.axios.put('http://rest.globalbrands.co.uk/jobs/' + job.id, job).then((response) => {
      context.commit('job', {id: response.data.id, data: response.data});
    });
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
