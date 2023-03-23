<template>
 <div>
 <div>
    <el-row :gutter="20">
      <el-col :span="6"><i class="el-icon-user" ></i>
        <div>
          <el-statistic group-separator="," :value="heads[0].value" :title="heads[0].title"></el-statistic>
        </div></el-col>
      <el-col :span="6"><i class="el-icon-chat-dot-square"></i>
        <div>
          <el-statistic group-separator="," :value="heads[1].value" :title="heads[1].title"></el-statistic>
        </div></el-col>
      <el-col :span="6"><i class="el-icon-coin"></i>
        <div>
          <el-statistic group-separator="," :value="heads[2].value" :title="heads[2].title"></el-statistic>
        </div></el-col>
      <el-col :span="6"><i class="el-icon-shopping-cart-full"></i>
        <div>
          <el-statistic group-separator="," :value="heads[3].value" :title="heads[3].title"></el-statistic>
        </div></el-col>
    </el-row>
  </div>
  <div style="margin-top:40px">
  <el-carousel :interval="4000" type="card" height="150px">
    <el-carousel-item v-for="item in images" :key="item">
      <img :src="item" style="width:100%;height:100%;">
    </el-carousel-item>
  </el-carousel>
</div>
  <div style="margin-top:20px" class="echart" id="mychart" :style="myChartStyle"></div>
</div>
</template>
<script>
import * as echarts from "echarts";
export default{
  data(){
    return{
      heads:[
        {title:"用户",value:12352},
        {title:"消息",value:123201},
        {title:"交易额",value:35103},
        {title:"购物量",value:1235}
       ],
      myChart: {},
      myChartStyle: { float: "left", width: "100%", height: "350px" } ,
      images:[
        "https://images.ctfassets.net/sdlntm3tthp6/5jrz6AtbAubfk4FP6hhKLC/2987914bad0f52ac6a4e9ccc5100b321/Copy_of_Copy_of_BNC_Website_Banner__5_.jpg",
        "https://th.bing.com/th/id/R.aa7c663a9086f73affeecdce15813652?rik=zmTmJsyFXDMK4w&pid=ImgRaw&r=0",
        "https://nft-digital-art.com/wp-content/uploads/2021/04/nft-digital-art.com-what-is-nft-gaming-scaled-e1618107217411.jpeg",
        "https://tokens1000x.com/wp-content/uploads/2021/08/cryptopunks-nft-collection-joins-axie-infinity-and-opensea-by-hitting-1-billion-in-sales-696x392.jpg"
      ]
  }
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      let seriesData = [];
      for(let i = 0; i < 24;i++){
        seriesData[i] = Math.random() * 1000 + 500;
      }
      const optionFree = {
        backgroundColor: "rgba(253, 230, 224,0.4)",
        color: ['#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',],
        title: {
        text: '浏览人数',
        left: 'center',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bolder',
          color: '#87cefa'                        
     },
},      
        xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: seriesData,
            type: "line",
            smooth: true
          }
        ]
      };
      this.myChart = echarts.init(document.getElementById("mychart"));
      this.myChart.setOption(optionFree);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    }
  }
}
</script>
<style>
.el-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height:80px;
}

.el-col {
  background-color: rgba(204, 232, 207, 0.678);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 2px solid #336840;
  padding-top: 10px;
  width: calc(25% - 30px);
  height: 100px;
}

.el-col:first-child {
  padding-left: 0;
}

.el-col:last-child {
  padding-right: 0;
}

.el-icon-user {
  font-size: 70px;
  color: #409EFF;
}

.el-icon-chat-dot-square {
  font-size: 70px;
  color: #67C23A;
}

.el-icon-coin {
  font-size: 70px;
  color: #E6A23C;
}

.el-icon-shopping-cart-full {
  font-size: 70px;
  color: #F56C6C;
}

.title {
  font-size: 25px;
  font-weight: bold;
  color: rgba(48, 29, 48, 0.808);
}
.head{
  display: flex;
  justify-content: space-between;
  padding-left: 2rem;
}
.con{
  text-align: right;
  display: flex;
  justify-content: space-between;
  padding-left: 1.5rem;
}
.number {
  font-size: 20px;
  color: rgb(0, 0, 0);
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
