<template>
<div>
  <student-work-space v-if="user_role==0"/>
  <teacher-work-space style="margin-right: 10px" v-if="user_role==1"/>
  <BottomMenu/>
</div>
</template>

<script>
import StudentWorkSpace from "./StudentWorkSpace";
import TeacherWorkSpace from "./TeacherWorkSpace";
export default {
  name: "workspace",
  components: {TeacherWorkSpace, StudentWorkSpace},
  data(){
    return{
      user_role:sessionStorage.getItem('user_role')

    }
  },
  methods:{

  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
