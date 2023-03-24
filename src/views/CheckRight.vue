<template>
   <div>
       <div style="margin: 10px 0">
    <table class="feishu-table">
    <thead>
      <tr id = "title">
        <th>日期</th>
        <th>图片URL</th>
        <th>新闻URL</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="item.date">
        <td :style="{ backgroundColor: index % 2 === 0 ? '#f6f6f6' : '#fff' }">{{ item.date }}</td>
            <td :style="{ backgroundColor: index % 2 === 0 ? '#fff' : '#f6f6f6' }">{{ item.imgurl }}</td>
            <td :style="{ backgroundColor: index % 2 === 0 ? '#f6f6f6' : '#fff' }">{{ item.texturl }}</td>
        <td>
          <el-button  class = "container" type="danger" icon="el-icon-delete" @click="remove(index)">删除</el-button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<el-pagination
  background
  layout="prev, pager, next"
  :total="items.length"
  :current-page.sync="currentPage"
  @current-change="handleCurrentChange">
</el-pagination>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    created: function () {

        axios.get('http://114.132.75.216:9999/news/get_banner_list')
        .then(response => {

          // 处理响应数据
            for(var i = 0; i < response.data.data.length; i++){
              if(response["data"][i] !== ""){
                var now = new Date(response.data.data[i].time)
                const year = now.getFullYear()
                const month = now.getMonth() + 1
                const date = now.getDate()
                const hour = now.getHours()
                const minute = now.getMinutes()
                const second = now.getSeconds()
                const formattedDate = `${year}/${month}/${date} ${hour}:${minute}:${second}`
                this.items[i].date = formattedDate;
                this.items[i].imgurl = response.data.data[i].image;
                this.items[i].texturl = response.data.data[i].url;
                this.items[i].bid = response.data.data[i].bid;
              }
            }
        })
        .catch(error => {
          alert(error);
        })
    },
    data() {
      return {
        form: {
          name: '',
          age: ''
        },
        currentPage: 1,
        pageSize: 10,
        items: new Array(100).fill({date:'',imgurl:'',texturl:"",bid:""}),
        token : sessionStorage.getItem("token"),
      }
    },
    methods: {
    handleCurrentChange(val) {
    this.currentPage = val;
    },
    resetimg() {
        this.imgurl = "";
      },
      resettext() {
        this.texturl = "";
      },
      addimg(){
        if(this.items[4].date !== ""){
          this.imgurl = "";
          alert("轮播图已满");
          return;
        }
        this.image = "";
        var img = new Image();
        img.src = this.imgurl;
        img.onerror = () => {
        alert("该图片不存在");
      };
        img.onload =() =>{
          this.image = this.imgurl;
          const now = new Date()
          const year = now.getFullYear()
          const month = now.getMonth() + 1
          const date = now.getDate()
          const hour = now.getHours()
          const minute = now.getMinutes()
          const second = now.getSeconds()
          const formattedDate = `${year}/${month}/${date} ${hour}:${minute}:${second}`
          for(var i = 0;i < 5;i++){
            if(this.items[i].imgurl === ""){
              this.items[i].date = formattedDate;
              this.items[i].imgurl = this.imgurl;
              this.show = true;
              return;
            }
          }
        }
      },
      addtext(){
        var url = this.imgurl;
        this.imgurl = "";
        this.image = "";
        var self = this;
        for(var i = 0;i < 5;i++){
            if(this.items[i].texturl === ""){
              this.items[i].texturl = this.texturl;
              var data = {
                "image":url,
                "url":this.texturl
              }
              axios.post('http://114.132.75.216:9999/news/add_banner', data, {
              headers: {
                token: this.token
              }
            }).then(response => {
        })
        .catch(error => {
          alert(error);
          self.remove(i);
        })
        break;
      }
    }
      this.show = false;
      this.texturl = "";   
  },
      remove(index){
        let url = 'http://114.132.75.216:9999/news/delete_banner?bid='+this.items[index].bid.toString();
        axios.get(url, {
              headers: {
                token: this.token
              }
            }).then(response => {

        })
        .catch(error => {
          alert(error);
          return;
        })
        this.items.splice(index,1);
        this.items.push({
          date:'',
          imgurl:'',
          texturl:''
        });
      }
},
    computed: {
    currentItems() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = start + this.pageSize;
      return this.items.slice(start, end);
    }
  }
}
</script>

<style scoped>

.feishu-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 20px;
    line-height: 3;
  }
  #title th{
    font-size: 20px;
    text-align: center;
    background: linear-gradient(135deg, rgba(178, 69, 146, 0.4) 0%, rgba(241, 95, 121, 0.2) 50%, rgba(250, 205, 75, 0.8) 100%);
  }
  .feishu-table th,
  .feishu-table td {
    padding: 12px 16px;
    text-align: left;
    vertical-align: middle;
    border-bottom: 1px solid #e0e0e0;
  }
  .feishu-table th {
    background-color: #f7f7f7;
    font-weight: bold;
  }
  .feishu-table tbody tr:hover {
    background-color: #fafafa;
  }
  .feishu-table .container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .feishu-table .el-button {
    padding: 6px 12px;
  }
  .feishu-table .el-button:hover {
    background-color: #f56c6c;
    color: #fff;
  }
  .feishu-table .el-button:active {
    background-color: #f78989;
    color: #fff;
  }


</style>
