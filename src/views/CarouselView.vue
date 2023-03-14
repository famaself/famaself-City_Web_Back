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
      <tr v-for="(item, index) in items" :key="item.date">
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
    </div>
  </template>

  
  <script>

  import axios from 'axios'
  export default {
    data() {
      return {
        imgurl : '',
        texturl:'',
        image : '',
        items: [
        {date:'',imgurl:'',texturl:""},
        {date:'',imgurl:'',texturl:""},
        {date:'',imgurl:'',texturl:""},
        {date:'',imgurl:'',texturl:""},
        {date:'',imgurl:'',texturl:""}
      ],
        show : false
    }
},  
    created: function () {
    // 在这里执行所需的函数
        axios.get('http://114.132.75.216:9999/news/get_banner_list')
        .then(response => {
          console.log(response.data.data)
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
              }
            }
        })
        .catch(error => {
          alert(error);
        })
    },
    methods:{
      //重置
     //重置
     resetimg() {
        this.imgurl = "";
      },
      resettext() {
        this.texturl = "";
      },
      addimg(){
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
              this.imgurl = "";
              return;
            }
          }
        }
      },
      addtext(){
        this.image = "";
        for(var i = 0;i < 5;i++){
            if(this.items[i].texturl === ""){
              this.items[i].texturl = this.texturl;
              this.show = false;
              this.texturl = "";
              return; 
            }
      }
    },
      remove(index){
        console.log("开始删除了");
        this.items.splice(index,1);
        this.items.push({
          date:'',
          imgurl:'',
          texturl:''
        });
      }
}
  }
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

  img {
    display: block;
    margin: 0 auto;
    padding: 20px;
    max-width: 100%;
    width: 800px;
    height: 600px;
    height: auto;
}

  </style>
