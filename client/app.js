import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './components/App'
import router from './router'
import store from './store'

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App,
  mounted(){
    this.$store.dispatch('users');
    this.$store.dispatch('statuses');
  }
})

Vue.use(VueAxios, axios)
Vue.use(require('vue-moment'));

Vue.filter('idToName', function(id) {
  let user = store.state.users[id];
  return user.firstname + ' ' + user.lastname;
});


export { app, router, store }
