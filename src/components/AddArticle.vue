<template>
  <div style="padding-top: 70px">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="发起日期" required>
        <el-col :span="14">
          <el-form-item prop="date">
            <el-date-picker
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date"
              style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="项目人数" required>
        <el-col :span="14">
          <el-form-item prop="max_num">
            <el-input type="number" v-model="ruleForm.max_num"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>




      <el-form-item label="项目内容" prop="desc" size="100">
        <el-input :rows="6"   maxlength="150"   show-word-limit
                  type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "AddArticle",
  data() {
    return {
      ruleForm: {
        name: '',
        date: '',
        desc: '',
        max_num:''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        ],
        date: [
          { /*type: 'date',*/required: true, message: '请选择日期', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        max_num: [
          { required: true, message: '请输入项目人数', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('创建成功!!');

          let url="apis/article/add"

          this.$axios({
            url:url,
            method:"post",
            data:{
              tid:sessionStorage.getItem('tid'),
              c_title:this.ruleForm.name,
              c_content:this.ruleForm.desc,
              c_update:this.ruleForm.date,
              c_curr:0,
              c_total:this.ruleForm.max_num
            },
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(response=>{

          })


        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.header{
  height: 50px;
  background-color: #42b983;
  width: 100%;
}

</style>
