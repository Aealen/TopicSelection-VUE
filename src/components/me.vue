<template>
  <div class="me">
    ITSME
    {{user_role}}

    <router-view></router-view>
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
        user_name:""
      }
  },
  methods:{

  },
  mounted() {
    this.user_role=sessionStorage.getItem("user_role")
    this.user_name=sessionStorage.getItem("user_name")
    this.user_account=sessionStorage.getItem("user_account")
  }


}
</script>
<style scoped>



</style>
