<template>
  <div class="nav">
    <router-link v-for="(val,index) in menuList" :to="{path:pathList[index]}" class="navItem">
        
            <span :class="['icon',{'icon1':index==0},{'icon2':index==1},{'icon3':index==2}]"><img :src="iconList[index]" alt=""></span>
            <span class="menuName">{{val}}</span>
       
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
        pathList:['/','/sp','/tp'],
        menuList:['活动首页','活动规则','查看排名'],
        iconList:['http://n.sinaimg.cn/ah/865fe30d/20171108/Shape-1.png','http://n.sinaimg.cn/ah/865fe30d/20171108/Shape-2.png','http://n.sinaimg.cn/ah/865fe30d/20171108/Shape-3.png'],
        widthList:['0.2rem','0.26rem','0.15rem'],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav{
      position: fixed;
      bottom:0;
      left: 0;
      z-index:999;
      width:6.4rem;
      height: 1.05rem;
      display: flex;
      justify-content: center;
      background:#ff7800;
  }
 .navItem{
     flex-grow: 1;
     text-decoration: none;
     justify-content: center;
     display: flex;
 }
  .menuName{
      font-size:0.24rem;
      color:#fff;
  }
  .icon{
     align-self:center;
     margin-right: 0.06rem;
  }
  .menuName{
     align-content: center;
     line-height: 1.05rem;
  }
  .icon img{
          width: 100%;
    height: auto;
    display: block;
  }
  .icon1{
      width:0.2rem;
  }
  .icon2{
      width:0.26rem;
  }
  .icon3{
      width:0.15rem;
  }
</style>
