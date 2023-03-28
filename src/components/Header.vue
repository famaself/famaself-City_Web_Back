<template>
     <div style="line-height: 60px; display: flex">
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
        <div style="flex: 1;font-size: 18px;">
            <span :class="collapseBtnClass" style="cursor: pointer; font-size: 18px" @click="collapse"></span>
            
    <!-- 路由显示 -->
            <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
                <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
            </el-breadcrumb>
         </div>
    <el-dropdown style="width: 150px; cursor: pointer; text-align: right">
      <div style="display: inline-block">
      <span>{{ user.nickname }}</span>
        <i class="el-icon-setting" 
        style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px"></i>
        
      </div>
        <!-- 右侧个人信息应用 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/login" style="text-decoration:none"></router-link>
          </el-dropdown-item>
        </el-dropdown-menu>

     </el-dropdown>
    </div>

</template>

<script>
export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
    user: Object
  },
  computed: {
    currentPathName () {
      return this.$store.state.currentPathName;　　//需要监听的数据
    }
  },
  data() {
    return {
      // user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  methods: {
    collapse() {
      // this.$parent.$parent.$parent.$parent.collapse()  // 通过4个 $parent 找到父组件，从而调用其折叠方法
      this.$emit("asideCollapse")
    },
    logout() {
      this.$store.commit("logout")
      this.$message.success("退出成功")
    }
  }
}
</script>

<style scoped>
</style>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
</style>