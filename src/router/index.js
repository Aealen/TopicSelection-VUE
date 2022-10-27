import Vue from 'vue'
import Router from 'vue-router'


import HelloWorld from '@/components/HelloWorld'
import BottomMenu from "../components/BottomMenu";
import Login from "../components/Login";
import Regist from "../components/Regist";
import Workspace from "../components/workspace";
import Me from "../components/me"
import AddArticle from "../components/AddArticle";

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: BottomMenu,
      children:[
        {path:'/me',component:Me},
        {
          path:'/workspace',
          component:Workspace,

        },

      ]
    }, {
      path:'/login',
      component:Login
    },{
      path:'/regist',
      component:Regist
    },{
    path:'addarticle',
    component:AddArticle
    }

  ]
})
