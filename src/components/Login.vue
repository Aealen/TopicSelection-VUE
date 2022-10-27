<template>
<div>
    <span class="loginpanel">登陆</span>
    <cube-input
      :placeholder=placeholderAccount
      v-model="account"
      class="inputCss"
    ></cube-input>
    <cube-input
      :placeholder="placeholderPassword"
      v-model="password"
      class="inputCss"
      :eye="eye"
      :type="pwdtype"
    ></cube-input>

  <cube-checker class="roleSelect"
    v-model="role"
    type="radio"
    :options="radioOptions"
  />
</div>
</template>

<script>
export default {
  name: "Login",
  methods:{
    login:function (){
      if (this.role==0){
        //学生登陆

      }else if (this.role==1){
        //教师登陆

      }
    }
  },
  data(){
    return {
      account:"",
      password:"",


      placeholderAccount:"请输入账号...",
      placeholderPassword:"请输入密码...",
      eye:{
        open:false,
        reverse:false
      },
      pwdtype:"password",

      role:0,//0 student 1 teacher
      radioOptions:[{
          value:0,
          text:'我是学生'
        }, {
          value:1,
          text:'我是教师'
        }
      ]

    }
  }
}
</script>

<style scoped>

.loginpanel{
  font-size: 50px;
}
.inputCss{
  margin-top: 30px;
  width: 80%;
  margin-left: 10%;
}
.roleSelect{
  margin-top: 30px;

}

</style>
