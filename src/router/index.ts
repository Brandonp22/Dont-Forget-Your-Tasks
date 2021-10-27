import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Lists from '../views/Lists.vue'
import All from '../views/All.vue'
import Work from '../views/Work.vue'
import Music from '../views/Music.vue'
import Travel from '../views/Travel.vue'
import Study from '../views/Study.vue'
import Sport from '../views/Sport.vue'
import Shopping from '../views/Shopping.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'

import useFirebaseAuth from "../hooks/firebase-auth";
const state = useFirebaseAuth();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/Lists',
    name: 'Lists',
    component: Lists
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/All',
    name: 'All',
    component: All
  },
  {
    path: '/Work',
    name: 'Work',
    component: Work
  },
  {
    path: '/Music',
    name: 'Music',
    component: Music
  },
  {
    path: '/Travel',
    name: 'Travel',
    component: Travel
  },
  {
    path: '/Study',
    name: 'Study',
    component: Study
  },
  {
    path: '/Sport',
    name: 'Sport',
    component: Sport
  },
  {
    path: '/Shopping',
    name: 'Shopping',
    component: Shopping
  },
  //Login & Register
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log("user",state.user.value);
  if (state.user.value && (to.name === 'login')) {
    next({ name: "Lists", replace: true });
  } else if (!state.user.value && (to.name !== 'login')) {
    next({ name: "login", replace: true });
  } else {
    next();
  }
})

export default router
