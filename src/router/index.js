import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login'
import Blank from '@/view/Blank'
import Home from '@/view/Home'
import login from '@/utilities/login'
Vue.use(Router)

const routers =  new Router({
  routes: [
    {
      path: '/login',
      alias: '/',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if(login.isLogined())
          next('/home');
        else
          next();
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/logout',
      name: 'logout',
      component: Blank,
      beforeEnter: (to, from, next) =>{
          if(!login.isLogined())
            next('/login');
          else
            next();
      }
    }
  ]
})

routers.beforeEach((to, from, next) => {
  if(to.matched.length == 0){
    next('/login');
  }
  else
    next();
})

export default routers;