<template>
  <div class="page">
    <div class="picContain">
      <img src="http://n.sinaimg.cn/ah/865fe30d/20171109/HuoDongJieShao_01.jpg" alt="">
    </div>
    <div class="record">
        <div class="Header">
            <span style="width:15%;">排名</span>
            <span style="width:70%;">姓名</span>
            <span style="width:15%;">票数</span>
        </div>
        <ul class="list">
            <li class="listItem" v-for="(val,index) in list">
                <span class="prize">{{index+1}}</span>
                <span class="prizeName">{{val.title}}</span>
                <span class="prizeCount">{{val.count}}</span>
            </li>
        </ul>
    </div>
    <navs></navs>
  </div>
</template>

<script>
import navs from '@/components/nav';
export default {
  name: 'tp',
  components:{navs},
  created:function(){
      this.$http.jsonp('http://ahfensitong.com/tmp/sifating/api.php',{params:{action:'paihang',jsonp:1}}).then(function(data){
         if (data.data.error==0){
             this.list=data.data.data;
         }
      })
  },
  data () {
    return {
      list:[
          {name:'张三',count:6000},
          {name:'张三',count:6000},
          {name:'张三',count:6000},
          {name:'张三',count:6000},
          {name:'张三',count:6000},
      ]
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .picContain{
    width:100%;
  }
  .picContain img{
    width:100%;
    display:block;
  }
 .record{
     padding:0.52rem 0 0.45rem 0;
     background:#1b3ebc;
 }
 .Header{
     display: flex;
     text-align: center;
     margin-bottom:0.18rem;
 }
 .Header span{
     flex-grow: 1;
     font-size:0.34rem;
     color:#fced45;
     font-weight:500;
     
 }
 .listItem{
      display: flex;
     text-align: center;
     margin-bottom:0.16rem;
 }
 .listItem span{
     /* flex-grow: 1; */
     font-size:0.2rem;
     color:#fff;
 }
 .prize,.prizeCount{
     width:15%;
 }
 .prizeName{
     width:70%;
 }
</style>
