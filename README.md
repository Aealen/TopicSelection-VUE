# Topic_Selection 后端VUE部分

> TopicSelection - VUE



# **主要组件**

- vue-axios
- vue-router
- vue-session
- cube-ui  滴滴的移动端开发框架
- element-ui 



# 问题汇总:

## vue-axios跨域问题解决:

在config\index.js中的proxyTable中添加...

```js
 proxyTable: {
      '/apis': {
        target: 'http://localhost:8080/',  //要解决跨域的接口的域名
        secure:false,           //如果是https接口，需要配置这个参数
        changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/apis': '/'  // 路径重写
        }
      },
    },
```





# Logs:

- 2022/10/27
  - 使用VUE进行基础页面开发
  - 解决Axios跨域问题  
  - 登陆页面及功能完成
  - 注册页面及功能完成
  - 个人信息页面及功能完成
  - 学生选毕设界面及功能完成
  - 后端SpringBoot增加接口(详情出门左转到Springboot项目)
- 2022/10/28
  - 完善学生工作区
  - 完成教师工作区
  - 项目主体功能完成...至于美化...(画个大饼)
