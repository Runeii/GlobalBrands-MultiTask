import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Job from '../views/Job'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/job/:jobId',
      component: Job
    }
  ]
})
