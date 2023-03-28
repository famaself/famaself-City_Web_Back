Skip to content
Search or jump to…
Pull requests
Issues
Codespaces
Marketplace
Explore
 
@TOP-ambitous 
famaself
/
famaself-City_Web_Back
Public
Fork your own copy of famaself/famaself-City_Web_Back
Code
Issues
Pull requests
Actions
Projects
Security
Insights
famaself-City_Web_Back/src/views/NewsView.vue
@TOP-ambitous
TOP-ambitous Update NewsView.vue
Latest commit b989b21 yesterday
 History
 1 contributor
325 lines (310 sloc)  8.38 KB

<template>
  <div>
    <div  v-if="!show" style="margin: 20px 0">
          <el-input style="width: 400px" placeholder="请输入图片url" suffix-icon="el-icon-search" v-model="imgurl"></el-input> 
          <el-button class="ml-5" type="primary" style="margin-left:15px" @click="addimg" >添加</el-button>
          <el-button type="warning" @click="resetimg">重置</el-button>
        </div>

          <div v-if="show" style="margin: 20px 0">
            <el-input style="width: 400px" placeholder="请输入文章url" suffix-icon="el-icon-search" v-model="texturl"></el-input> 
            <el-button class="ml-5" type="primary" style="margin-left:15px" @click="addtext" >添加</el-button>
            <el-button type="warning" @click="resettext">重置</el-button>
          </div>
          <el-select  v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
          <img  style="margin: 20px 0" v-if="image" :src="image"  alt="图片error" />
       <div style="margin: 10px 0">
   <table>
   <thead>
     <tr>
       <th>日期</th>
       <th>图片URL</th>
       <th>新闻URL</th>
       <th>操作</th>
     </tr>
   </thead>
   <tbody>
     <tr v-for="(item, index) in currentItems" >
      <td>{{ item.date }}</td>
       <td>{{ item.imgurl }}</td>
       <td>{{ item.texturl }}</td>
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
    this.getAll(3);
   },
   data() {
    var items = new Array(30);
    for (let i = 0; i < items.length; i++) {
      items[i] = {date:'',imgurl:'',texturl:"",nid:""};
    }
     return {
      show : false,
      imgurl : '',
        texturl:'',
        image : '',
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzIiwiZXhwIjoxNjgwMDc4ODA2fQ.nZz0l0HucJ52N8jTcCGGJPkN2zJ5pS_SebkOy2bMYQY",
       form: {
         name: '',
         age: ''
       },
       currentPage: 1,
       pageSize: 10,
       items,
       options: [{
          value: 3,
          label: '元宇宙'
        }, {
          value: 4,
          label: 'nft'
        }, {
          value: 1,
          label: '版权保护'
        }, {
          value: 5,
          label: '版权交易'
        }, {
          value: 8,
          label: '区块链'
        }, {value: 2,
            label: '数字作评'
        }, {
          value: 6,
          label: '人物研读'
        }, {
          value: 7,
          label: '政策概览'
        }],
        value: 3
     }
   },
   methods: {
    resetimg() {
        console.log(this.token);
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
              this.request.post('http://114.132.75.216:9999/news/add_banner', data, {

            }).then(response => {
              console.log(response.data);
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
        console.log(url);
        axios.get(url, {
              headers: {
                token: this.token
              }
            }).then(response => {
              console.log(response.data);
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
      },
    refreshData() {
      this.$nextTick(() => {
        this.$set(this, 'key', Math.random());
      });
    },
   handleCurrentChange(val) {
   this.currentPage = val;
   },
   getAll(page){
    var num = 0;
   // 在这里执行所需的函数
      for(var i = 1; i < 3; i++){
        axios.get('http://114.132.75.216:9999/news/get_news_list?type='+page.toString()+"&pageNum="+i.toString()+"&pageSize=10")
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
               this.items[num].date = formattedDate;
               this.items[num].imgurl = response.data.data[i].image;
               this.items[num].texturl = response.data.data[i].url;
               this.items[num++].bid = response.data.data[i].nid;
             }
           }
       })
       .catch(error => {
         alert(error);
       })
      }
   }
   },
   computed: {
   currentItems() {
     this.value;
     let start = (this.currentPage - 1) * this.pageSize;
     let end = start + this.pageSize;
     return this.items.slice(start, end);
   },
 },
    watch: {
        value(newValue, oldValue) {
          for (let i = 0; i < this.items.length; i++) {
          this.items[i] = {date:'',imgurl:'',texturl:"",nid:""};
    }
          this.getAll(newValue);
          this.handleCurrentChange(1);
        }
      }
};
</script>

<style scoped>
table{
  width :100%;
  border-collapse : collapse;
}
table, th, td {
 border: 3px solid rgb(21, 160, 165);
}
th{
text-align:left;
background: linear-gradient(to right, #ff7e5f, #feb47b);
color:white;
}
td{
padding :5px
}
tr:nth-child(even){
 padding :5px;
background-color:#f2f2f2;
}
td .container {
 display: block;
 margin: 0 auto;
 padding: 10px 20px;
 border-radius: 5px;
 box-shadow: 0 2px 4px rgba(0,0,0,.2);
 transition: all .3s;
 height: 15vh;
 width: 25vh;
}
td .container:hover {
 box-shadow: 0 4px 8px rgba(69, 146, 82, 0.2);
}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
.el-select {
  width: 200px;
  font-family: 'Open Sans', sans-serif;
}
.el-select .el-input__inner {
  border-radius: 20px;
  border: 2px solid #42b983;
  transition: all 0.3s ease-in-out;
  padding-left: 35px;
}
.el-select .el-input__inner:hover {
  box-shadow: 0px 0px 5px #42b983;
}
.el-select .el-input__inner:before {
  content: '🔍';
  position: absolute;
  left: 10px;
  top: calc(50% - 9px);
}
.el-select-dropdown__item.selected:not(.is-disabled) {
  background-color: #42b983;
}
.el-select-dropdown__item:hover:not(.selected):not(.is-disabled) {
  background-color: #e6f1ea;
}
</style>
Footer
© 2023 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
famaself-City_Web_Back/NewsView.vue at main · famaself/famaself-City_Web_Back
