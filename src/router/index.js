import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Blank from '@/components/Blank'
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
          next('/logout');
        else
          next();
      }
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