<template>
  <div>
    <el-table
      :data="respAllArticle"
      border
      style="width: 100%" height="700">

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
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="delArticle(scope.row.cid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: "ArticleListForTeacher",
  data(){
    return{
      //返回的文章信息
      respArticleByID:[],
      respAllArticle:[],
      currSelect:[],
      sumArticle:"",


    }
  },

  methods:{

    delArticle(cid) {
      console.log(cid)

      console.log(sessionStorage.getItem('tid'))

      this.$axios({
        method:'delete',
        url:"apis/article/del",
        data:{
          t_id:sessionStorage.getItem('tid'),
          c_id:cid
        },
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response=>{
        this.openAlert()
      })


    },
    openAlert() {
      this.$alert('删除成功!!!', '系统提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
          this.$router.go(0)
        }
      });
    },

    getArticleByTID:function (tid) {
      let url="apis/article/bytid/"+tid

      this.$axios.get(url)
        .then(response=> {
          console.log("getting article By TID...")
          this.respAllArticle = response.data
          // console.log(url)
          this.sumArticle=response.data.length
        })

    },

    getTeacherID:function () {
      let url="apis/teacher/byaccount/"+sessionStorage.getItem('user_account')

      this.$axios.get(url)
      .then(response=>{
        this.tid=response.data.tid
        sessionStorage.setItem('tid',response.data.tid)
        // console.log(this.tid)
      })

    },

  },

  mounted() {
    this.getTeacherID()
    this.getArticleByTID( sessionStorage.getItem('tid'))



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
</style>
