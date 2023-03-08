<template>
<!-- 侧边栏 -->
<el-container style="height:100%; border: 1px solid #eee">
  <el-aside :width="sideWidth + 'px'"  style="background-color: rgb(238, 241, 246)" height="100%" overflow="hidden">
          <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow" style="padding-bottom: 20px" />
  </el-aside>
  
  <!-- 容器 -->
  <el-container style="height: 100%;">
    <!-- 头部 -->
    <el-header style="background-color: #fff; font-size: 12px; ">
      <Header :collapseBtnClass="collapseBtnClass" @asideCollapse="collapse" :user="user"/>
    </el-header>

    <el-main height="100%">
    <!--表示当前页面的子路由会在 <router-view /> 里面展示-->
        <router-view />
    </el-main>
  </el-container>
</el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>

import Aside from "../components/Aside.vue";
import Header from "@/components/Header";

export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      const user1={
        nickname:"元小易"
        
      };
      return {
        tableData: Array(20).fill(item),
        collapseBtnClass: "el-icon-s-fold",
        isCollapse:false,
        sideWidth: 200,
        logoTextShow:true,
        user:user1
      }
      },
      components:{
        Aside,
        Header,
      },
   methods: {
    collapse() {  // 点击收缩按钮触发
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {  // 收缩
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      } else {   // 展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    }
  }
}

</script>
<!-- <script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue' -->

<style>
  .el—table th{
    background-color:blue !important;
  }
  .el-aside::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>