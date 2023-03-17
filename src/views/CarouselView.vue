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
      //暂时先用固定的，之后能用登录所给的
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzIiwiZXhwIjoxNjc5NDc2NTc0fQ._IMH2lgve7xgBJ8PbZllSIwzgLbgU8szjEKIjKYeSy4",
      items: [
      {date:'',imgurl:'',texturl:"",bid:""},
      {date:'',imgurl:'',texturl:"",bid:""},
      {date:'',imgurl:'',texturl:"",bid:""},
      {date:'',imgurl:'',texturl:"",bid:""},
      {date:'',imgurl:'',texturl:"",bid:""}
    ],
      show : false
  }
},  
  created: function () {
    /*let user = JSON.parse(localStorage.getItem("user"));
    this.token = user.token;*/
  // 在这里执行所需的函数
      axios.get('http://114.132.75.216:9999/news/get_banner_list')
      .then(response => {
        console.log(response.data)
        // 处理响应数据
          for(var i = 0; i < 5; i++){
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
  methods:{
    //重置
   //重置
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
      var num;
      for(var i = 0;i < 5;i++){
          if(this.items[i].texturl === ""){
            num = i;
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
        self.remove(num);
      })
    }
  }
            this.show = false;
            this.texturl = "";   
},
    remove(index){
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
