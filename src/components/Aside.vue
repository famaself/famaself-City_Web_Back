<template>
    <el-menu :default-openeds="['1', '3']" style="height:100%"
            background-color="rgb(48,65,86)"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse-transition="false" 
            :collapse="isCollapse"
            router

    >
    
    <div style="height: 60px;line-height: 60px; text-align:center; color:#fff">
    <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; margin-right: 5px"> 
    <b style="color: white" v-show=logoTextShow>元小易后台管理系统</b>
    </div>
      
    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <template slot="title">
        <span slot="title">主页</span>
      </template>
    </el-menu-item>
    <!-- 系统管理 -->
    <el-submenu index="2">
        <template slot="title"><i class="el-icon-user"></i>
         <span slot="title">系统管理</span>
        </template>
          <el-menu-item index="user">用户管理</el-menu-item>
           <el-menu-item index="home">首页</el-menu-item>
        <el-menu-item index="carousel">轮播图管理</el-menu-item>
          <el-menu-item index="news">新闻管理</el-menu-item>
      </el-submenu>
        <!-- <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu> -->

      
      <!-- <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-home"></i>
         <el-menu-item index="home">首页</el-menu-item>
        </template> -->
        <!-- <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu> -->
      <!-- </el-submenu> -->

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i> 
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  },
  data() {
    return {
      menus: localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")) : [],
      opens: localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")).map(v => v.id + '') : []
    }
  },
}
</script>

<style>
  .el-aside::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>
