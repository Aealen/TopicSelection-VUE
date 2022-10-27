<template>
  <div>
    <span class="loginpanel">注册</span>
    <cube-checker class="roleSelect"
                  v-model="role"
                  type="radio"
                  :options="radioOptions"
    />

    <cube-input
      :placeholder=placeholderAccount
      v-model="account"
      class="inputCss"
    ></cube-input>
    <cube-input
      :placeholder=placeholderUsername
      v-model="username"
      class="inputCss"
    ></cube-input>
    <cube-input
      :placeholder=placeholderPassword
      v-model="password1"
      class="inputCss"
    ></cube-input>
    <cube-input
      :placeholder=placeholderPasswordaga
      v-model="password2"
      class="inputCss"
    ></cube-input>

    <cube-select
      class="inputCss"
      v-model="gender"
      :options="genderSelection"
      :placeholder="placeholderGender"
    ></cube-select>

    <cube-select
      class="inputCss"
      v-model="college"
      :options="collegeSelection"
      :placeholder="placeholderCollege"
    ></cube-select>

    <cube-input
      v-if="role==0"
      :placeholder=placeholderMajor
      v-model="major"
      class="inputCss"
    ></cube-input>

    <cube-input
      v-if="role==0"
      :placeholder=placeholderClass
      v-model="classroom"
      class="inputCss"
    ></cube-input>

    <cube-input
      v-if="role==1"
      :placeholder=placeholderCapacity
      v-model="capacity"
      class="inputCss"
    ></cube-input>

    <cube-button
      class="registBtn"
      @click="regist()"
    >注册</cube-button>


    <router-link class="loginTag" to="./login">返回登陆</router-link>

    <cube-popup class="ErrInfo" type="my-popup" :mask="false" ref="errInfo">
      {{ errInfoTag }}
    </cube-popup>
  </div>
</template>

<script>
export default {
  name: "Regist",

  data(){
    return {


      account:"",
      username:"",
      password1:"",
      password2:"",

      gender:"",
      genderSelection:['男','女'],
      college:"",
      collegeSelection:['人工智能与大数据学院','人文学院','电气工程与智能制造学院','经济管理学院','艺术设计学院','土木工程学院','建筑管理学院','教务处'],

      major:"",
      classroom:"",
      capacity:"",
      errInfoTag:"",

      //placeholders
      placeholderAccount:"请输入学号/工号...",
      placeholderUsername:"请输入姓名...",
      placeholderPassword:"请输入密码...",
      placeholderPasswordaga:"请再次输入密码...",
      placeholderGender:"请选择性别...",
      placeholderCollege:"请选择学院...",
      placeholderMajor:"请输入专业...",
      placeholderClass:"请输入班级...",
      placeholderCapacity:"请输入职位...",

      //response data
      respData:[],


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
    regist:function (){


      if (this.role==0){
        //学生注册

        if (this.validateInput()){
          let url="apis/student/add"
          //axios
          this.$axios({
            method:'post',
            url:url,
            data:{
              s_account:this.account,
              s_password:this.password2,
              s_name:this.username,
              s_gender:this.gender,
              s_major:this.major,
              s_college:this.college,
              s_class:this.classroom,
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(response=> {
            this.respData = response.data
            this.errInfoTag=response.data.datas
          })
          // if (this.respData.statuss=="err"){
          //   this.showPopup('errInfo')
          //   console.log("err")
          // }else if (this.respData.statuss=="ok"){
          //   this.showPopup('errInfo')
          // }
          this.showPopup('errInfo')
        }else {
          this.errInfoTag="请检查输入!!"
          this.showPopup('errInfo')
        }

      }else if (this.role==1){
        //教师注册

        if (this.validateInput()){
          let url="apis/teacher/add"
          //axios
          this.$axios({
            method:'post',
            url:url,
            data:{
              t_account:this.account,
              t_password:this.password2,
              t_name:this.username,
              t_gender:this.gender,
              t_capacity:this.capacity,
              t_college:this.college,
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(response=> {
            this.respData = response.data
            this.errInfoTag=response.data.datas
          })
          // if (this.respData.statuss=="err"){
          //   this.showPopup('errInfo')
          //   console.log("err")
          // }else if (this.respData.statuss=="ok"){
          //   this.showPopup('errInfo')
          // }
          this.showPopup('errInfo')

        }else {
          this.errInfoTag="请检查输入!!"
          this.showPopup('errInfo')
        }

      }
    },
    validateInput:function (){
      if (this.username=="")
        return false
      if (this.account=="")
        return false
      if (this.password1=="")
        return false
      if (this.password2=="")
        return false
      if (this.gender=="")
        return false
      if (this.college=="")
        return false
      if (this.password1!=this.password2)
        return false;

      if (this.role==0){
        //检查学生输入
        if (this.major=="")
          return false
        if (this.classroom=="")
          return false
      }else if (this.role==1){
        //检教师输入
        if (this.capacity=="")
          return false
      }
      return true;
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
  margin-top: 10px;
  width: 80%;
  margin-left: 10%;
}
.roleSelect{
  margin-top: 30px;

}
.registBtn{
  margin-top: 30px;
  width: 80%;
  margin-left: 10%;
  background-color: #E6A23C;
  font-size: 20px;
}
.ErrInfo{
  color: #ffffff;
  background-color: rgba(44, 62, 80, 0.27);
  font-size: 30px;
  width: 60%;
  margin-left: 20%;
  height: 10%;
  margin-top: 45%;
  border-radius: 12px;
}
.loginTag{
  position: fixed;
  bottom:5px;
  left: 5px;
}

</style>
