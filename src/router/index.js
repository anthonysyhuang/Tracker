import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login'
import Blank from '@/view/Blank'
import Home from '@/view/Home'
import login from '@/utilities/login'
import List from '@/view/List'
import Profile from '@/view/Profile'
import Item from '@/view/Item'
Vue.use(Router)

function routeGenerator(path, name, component, beforeEnter = null, alias = ''){
  return {
    path: path,
    name: name,
    component: component,
    beforeEnter: beforeEnter,
    alias: alias
  }
}
/********************Before Enter******************************/
const loginBeforeEnter = function(to, from, next){
  if(login.isLogined())
    next(homeRoute);
  else
    next();
}
const itemBeforeEnter = function(to, from, next){
  if(!to.params.id){
    return next(from);
  }

  return next(next);
}

/******************** Route ******************************/
const loginRoute = routeGenerator('/login', 'login', Login, loginBeforeEnter, '/');
const homeRoute = routeGenerator('/home', 'home', Home);
const listRoute = routeGenerator('/list', 'list', List);
const profileRoute = routeGenerator('/profile', 'profile', Profile);
const itemRoute = routeGenerator('/item/:id', 'item', Item, itemBeforeEnter);

const routers =  new Router({
  routes: [
    loginRoute,
    homeRoute,
    listRoute,
    profileRoute,
    itemRoute
  ]
})

routers.beforeEach((to, from, next) => {
  if(to.matched.length == 0){
    next(loginRoute);
  }

  if(to.name != loginRoute.name && !login.isLogined()){
    console.log("not login");
    next(loginRoute);    
  }
  else
    next();
})

export default routers;