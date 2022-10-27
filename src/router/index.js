import Vue from 'vue'
import Router from 'vue-router'


import HelloWorld from '@/components/HelloWorld'
import BottomMenu from "../components/BottomMenu";
import Login from "../components/Login";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BottomMenu',
      component: BottomMenu,
      children:[
        {path:'/me',component:()=>import('../components/me')},
        {path:'/workspace',component:()=>import('../components/workspace')},

      ]
    },
    {
      path:'/login',
      component:Login
    }
  ]
})
