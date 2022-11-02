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

  <cube-button
    class="loginBtn"
    @click="login()"
  >登陆</cube-button>

  <router-link class="registTag" to="./regist">前往注册</router-link>


  <cube-popup class="noSuchUser" type="my-popup" :mask="false" ref="noSuchUser">
    查无此人!!
  </cube-popup>
  <cube-popup class="noSuchUser" type="my-popup" :mask="false" ref="pwdErr">
    密码错误!!
  </cube-popup>
</div>
</template>

<script>
export default {
  name: "Login",

  data(){
    return {
      account:"",
      password:"",

      respData:[],
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
  },
  methods:{
    login:function (){
      if (this.role==0){
        //学生登陆
        let url="apis/student/byaccount/"+this.account
        //axios
        this.$axios
          .get(url)
          .then(response=> {
            this.respData = response.data
          })
        if (this.respData===null){
          this.showPopup('noSuchUser');
        }else {
          if (this.respData.s_password===this.password){
            sessionStorage.setItem('user_account',this.respData.s_account)
            sessionStorage.setItem('user_id',this.respData.sid)
            sessionStorage.setItem('user_name',this.respData.s_name)
            sessionStorage.setItem('user_role','0')
            sessionStorage.setItem('s_select',this.respData.s_select)
            this.$router.push("/me")
          }else {
            this.showPopup('pwdErr');
          }
        }
      }else if (this.role==1){
        //教师登陆

        let url="apis/teacher/byaccount/"+this.account
        //axios
        this.$axios
          .get(url)
          .then(response=> {
            this.respData = response.data
          })
        if (this.respData===null){
          this.showPopup('noSuchUser');
        }else {
          if (this.respData.t_password===this.password){
            sessionStorage.setItem('user_account',this.respData.t_account)
            sessionStorage.setItem('user_name',this.respData.t_name)
            sessionStorage.setItem('user_role','1')
            this.$router.push("/me")
          }
        }
      }
    },
    showPopup(refId) {
      const component = this.$refs[refId]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 1000)
    }
  },
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
.loginBtn{
  margin-top: 30px;
  width: 80%;
  margin-left: 10%;
  background-color: #E6A23C;
  font-size: 20px;
}
.noSuchUser{
  color: #ffffff;
  background-color: rgba(44, 62, 80, 0.27);
  font-size: 30px;
  width: 60%;
  margin-left: 20%;
  height: 10%;
  margin-top: 45%;
  border-radius: 12px;
}
.registTag{
  position: fixed;
  bottom:5px;
  right: 5px;
}

</style>
