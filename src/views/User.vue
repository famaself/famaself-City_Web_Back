<template>
    <div>
        <!-- 搜索框 -->
        <div style="margin: 10px 0">
          <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="username"></el-input>
          <el-input style="width: 200px" placeholder="请输入邮箱" suffix-icon="el-icon-message" class="ml-5" v-model="email"></el-input>
          <el-input style="width: 200px" placeholder="请输入电话" suffix-icon="el-icon-position" class="ml-5" v-model="address"></el-input>
          <el-button class="ml-5" type="primary" style="margin-left:15px">搜索</el-button>
          <el-button type="warning" @click="reset">重置</el-button>
        </div>
        <!-- 功能键 -->
            <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
            <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定批量删除这些数据吗？"
              @confirm="delBatch"
            >
        <el-button type="danger" slot="reference" style="margin:0 10px;">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
      <el-button type="primary" class="ml-5">导入 <i class="el-icon-bottom"></i></el-button>
      <el-button type="primary">导出 <i class="el-icon-top"></i></el-button>
    </div>

        <!-- 表格 -->
    <el-table 
      :data="tableData"
      border
      stripe
      height="70%"
      >
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column label="操作"  width="300" align="center">
          <!-- <template slot-scope="scope"> -->
            <template >
              <el-button type="success">编辑 <i class="el-icon-edit"></i></el-button>
              <el-button type="danger">删除 <i class="el-icon-remove-outline"></i></el-button>
          </template>
        </el-table-column>
            </el-table>
<!-- 下部导航栏 -->
      <div style="padding: 10px 0">
          <el-pagination

              :page-sizes="[5, 10, 15, 20]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
          </el-pagination>
        </div>
        <!-- 对话框 -->
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%" >
      <el-form label-width="80px" size="small">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<style>
.headerBg {
  background: #eee!important;
}
</style>
<script>
export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(10).fill(item),
        total: 0,
        pageNum: 1,
        pageSize: 2,
        username: "",
        email: "",
        address: "",
        form: {},
        dialogFormVisible: false,
        multipleSelection: []
      }
    },
    methods:{
      handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
      },
      //重置
      reset() {
        this.username = ""
        this.email = ""
        this.address = ""
        // this.load()
      },
      save(){
        this.dialogFormVisible = false
      }
    }
}
</script>
