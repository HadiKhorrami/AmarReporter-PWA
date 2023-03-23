import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '../views/Profile.vue'
import Reports from '../views/Reports.vue'
import Favorite from '../views/Favorite.vue'
import App from '../App.vue'



Vue.use(VueRouter);

export const Routes = [
    {
    path: '/Profile',
    name: 'Profile',
    component: Profile
  },
  {
      path: '/Reports',
      name: 'Reports',
    component: Reports
  },
    {
      path: '/Favorite',
      name: 'Favorite',
    component: Favorite
  },
     {
    path: '/App',
    name: 'App',
    component: {
        template: '<router-view/>',
    },
  },
    {
        path: '/',
        name: 'Reports',
        component: Reports
    }
]

 const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  Routes
})

