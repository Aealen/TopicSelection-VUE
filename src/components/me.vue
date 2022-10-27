<template>
  <div class="me">
    <div class="InfoZone">

        <span v-if="user_role==0" class="NameLabel">
          <i class="el-icon-user IconLabel"/>{{respData.s_name}}
      </span>
        <span v-if="user_role==1" class="NameLabel">
          <i class="el-icon-user IconLabel"/>{{respData.t_name}}
      </span>
    </div>

    <div class="InfoZone">
      <span v-if="user_role==0" class="NameLabel">
            <i class="el-icon-help IconLabel"/>{{respData.s_gender}}
        </span>
      <span v-if="user_role==1" class="NameLabel">
            <i class="el-icon-help IconLabel"/>{{respData.t_gender}}
        </span>
    </div>
    <el-divider></el-divider>
    <div class="InfoZone">
      <span v-if="user_role==0" class="NameLabel">
            <i class="el-icon-office-building IconLabel"/>{{respData.s_college}}
        </span>
      <span v-if="user_role==1" class="NameLabel">
            <i class="el-icon-office-building IconLabel"/>{{respData.t_college}}
        </span>
    </div>
    <div class="InfoZone">
      <span v-if="user_role==0" class="NameLabel">
            <i class="el-icon-suitcase IconLabel"/>{{respData.s_major}}
        </span>
      <span v-if="user_role==0" class="NameLabel">
            {{respData.s_class}}班
        </span>


      <span v-if="user_role==1" class="NameLabel">
            <i class="el-icon-suitcase IconLabel"/>{{respData.t_capacity}}
        </span>
    </div>
    <el-divider></el-divider>
    <div class="InfoZone">

      <span v-if="user_role==0" class="SelectionInfo">
        <span >
          <span style="font-size: 24px;line-height: 45px">你已选择的毕业设计:</span> <br>
          <span  style="font-size: 20px;" v-if="stu_selected!=''">{{respArticle.c_title}}</span><span v-else>还未选择!!</span>
        </span><br>

        <span style="font-size: 24px;line-height: 45px" v-if="stu_selected!=''">描述:</span><br>

        <span v-if="stu_selected!=''">{{respArticle.c_content}}</span>
      </span>

    </div>
    <BottomMenu/>

  </div>
</template>
<script>
export default {
  name:'me',
  data(){
      return {
        user_role:"",
        user_account:"",
        stu_selected:"",

        //存储返回的用户信息
        respData:[],
        //存储返回的文章信息
        respArticle:[],



      }
  },
  methods:{
    getArticle:function (){
      let url="apis/article/byid/"+sessionStorage.getItem("s_select")

      this.$axios.get(url)
      .then(response=> {
        console.log("getting article...")
        this.respArticle = response.data
      })

    },
    getAccount:function () {
      if (this.user_role==0){
        let url="apis/student/byaccount/"+this.user_account
        this.$axios
          .get(url)
          .then(response=> {
            this.respData = response.data
            this.stu_selected=response.data.s_select
          })
      }else if (this.user_role==1){
        let url="apis/teacher/byaccount/"+this.user_account
        this.$axios
          .get(url)
          .then(response=> {
            this.respData = response.data
          })
      }

    },


  },

  mounted() {
    this.user_role=sessionStorage.getItem("user_role")
    this.user_account=sessionStorage.getItem("user_account")
    //获取用户信息
    this.getAccount()
    this.getArticle()

  }


}
</script>
<style scoped>
.InfoZone{

  margin-left: 10%;
  width: 80%;
  text-align: left;
  margin-top: 20px;


}
.IconLabel{
  margin-right: 5%;
  text-align: left;
  float: left;
}
.NameLabel{
  font-size: 25px;
}

.SelectionInfo{

}


</style>
