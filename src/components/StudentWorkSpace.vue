<template>
<div>

  <el-table
    :data="respAllArticle"
    border
    style="width: 100%" height="900">

    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="项目序号:">
            <span>{{ props.row.cid }}</span>
          </el-form-item>
          <el-form-item label="项目名称:">
            <span>{{ props.row.c_title }}</span>
          </el-form-item>
          <el-form-item label="项目描述:">
            <span>{{ props.row.c_content }}</span>
          </el-form-item>
          <el-form-item label="更新时间:">
            <span>{{ props.row.c_update }}</span>
          </el-form-item>
          <el-form-item label="当前人数:">
            <span>{{ props.row.c_curr }}</span>
          </el-form-item>
          <el-form-item label="人数上限:">
            <span>{{ props.row.c_total }}</span>
          </el-form-item>
          <el-form-item label="">
            <el-button
              size="medium"
              type="primary"
              @click="selectTopic(props.row.cid)">选择此毕设
            </el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="ID"
      prop="cid"
      width="50">
    </el-table-column>
    <el-table-column
      label="项目名称"
      prop="c_title">
    </el-table-column>
    <el-table-column
      label="更新时间"
      prop="c_update"
      width="110">
    </el-table-column>
  </el-table>


  <cube-popup class="ErrInfo" type="my-popup" :mask="false" ref="errInfo">
    {{ errInfoTag }}
  </cube-popup>

</div>
</template>

<script>
export default {
  name: "StudentWorkSpace",
  data(){
    return{
      //返回的文章信息
      respArticleByID:[],
      respAllArticle:[],
      currSelect:[],
      sumArticle:"",
      errInfoTag:"",

    }
  },
  methods:{

    getAllArticle:function (){
      let url="apis/article"


      this.$axios.get(url)
        .then(response=> {
          console.log("getting article...")
          this.respAllArticle = response.data
          this.sumArticle=response.data.length
        })

    },

    showPopup(refId) {
      const component = this.$refs[refId]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 1000)
    },

    selectTopic:function (cid) {
      this.$axios({
        method:"post",
        url:"apis/student/addsubs",
        data:{
          cid:cid,
          sid:sessionStorage.getItem('user_id')
        },
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response=>{
        this.errInfoTag=response.data.datas
        if (response.data.statuss=='ok'){
          sessionStorage.setItem('s_select',cid)
        }
        this.showPopup('errInfo')
      })


    },

    getArticleByID:function (index){
      let url="apis/article/byid/"+this.respAllArticle[index].cid

      this.$axios.get(url)
        .then(response=> {
          console.log("getting article...")
          this.respArticleByID = response.data
        })

    },
  },
  mounted() {
    this.getAllArticle()
    this.screenHeight=document.documentElement.clientHeight
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
  font-size: 24px;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-left: 10%;
  margin-bottom: 0;
  width: 100%;
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
</style>
