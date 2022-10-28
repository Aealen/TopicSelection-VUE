<template>
<div>

  <cube-tab-bar
    v-model="selectedLabel"
    showslider>
    <cube-tab  v-for="(item, index) in tabs" :icon="item.icon" :label="item.label" :key="item.label"></cube-tab>
  </cube-tab-bar>

  <cube-tab-panels v-model="selectedLabel">
    <AddArticle style="width: 100%" v-if="selectedLabel=='新建项目'"/>
    <ArticleListForTeacher style="width: 100%" v-if="selectedLabel=='项目列表'"/>
  </cube-tab-panels>


</div>
</template>

<script>
import ArticleListForTeacher from "./ArticleListForTeacher";
import AddArticle from "./AddArticle";
export default {
  name: "TeacherWorkSpace",
  components: {AddArticle, ArticleListForTeacher},

  data(){
    return {
      selectedLabel:"项目列表",
      tabs: [{
        label: '项目列表',
        icon: 'cubeic-star',
      }, {
        label: '新建项目',
        icon: 'cubeic-star',
      }],



    }

  }


}
</script>

<style scoped>

</style>
