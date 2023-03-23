<template>
   <div>
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
  
  export default {
    created: function () {
      /*let user = JSON.parse(localStorage.getItem("user"));
      this.token = user.token;*/
    // 在这里执行所需的函数
        axios.get('http://114.132.75.216:9999/news/get_banner_list')
        .then(response => {
          console.log(response.data.data);
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
        items: new Array(100).fill({date:'',imgurl:'',texturl:"",bid:""})
      }
    },
    methods: {
    handleCurrentChange(val) {
    this.currentPage = val;
    },
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
              axios.post('http://114.132.75.216:9999/news/add_banner', data, {
              headers: {
                token: this.token
              }
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


</style>
