<template>
<div>
  <router-view></router-view>

  <div class="footer">
    <el-row :gutter="4" style="">
      <el-col :span="12">
        <router-link to="/workspace">
          <div class="grid-content ">
            <i class="el-icon-folder"/>

            工作台
          </div>
        </router-link>
      </el-col>
      <el-col :span="12">
        <router-link to="/me">
          <div class="grid-content ">
            <i class="el-icon-user"/>
            我的
          </div>
        </router-link>
      </el-col>
    </el-row>

  </div>

</div>
</template>

<script>
export default {
  name: "BottomMenu",

}
</script>

<style>



.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background: #e5e9f2;
  line-height: 50px;

}
.footer{
  position: fixed;
  bottom:0px;
  left:0px;
  width:100%;
  height: 50px;
}


</style>
