import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/discover/clusters',
    name: 'Clusters',
    component: () => import(/* webpackChunkName: "about" */ '../views/Clusters.vue')
  },
  {
    path: '/discover/meshes',
    name: 'Meshes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Meshes.vue')
  },
  {
    path: '/applications',
    name: 'Applications',
    component: () => import(/* webpackChunkName: "about" */ '../views/Applications.vue')
  },
  {
    path: '/integrations',
    name: 'Integrations',
    component: () => import(/* webpackChunkName: "about" */ '../views/Integrations.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
