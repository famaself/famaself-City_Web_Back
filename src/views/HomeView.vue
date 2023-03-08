<template>

<h1>这是主页</h1>
</template>



<script>

import Aside from "../components/Aside.vue";
import Header from "@/components/Header";

export default {
    data() {
      // const item = {
      //   date: '2016-05-02',
      //   name: '元小易',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // };
      const user1={
        nickname:"元小易"
        
      };
      return {
        // tableData: Array(20).fill(item),
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