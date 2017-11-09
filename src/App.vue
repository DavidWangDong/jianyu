<template>
  <div id="app">
    <router-view  @showtost="showTost" />
    <tost-view v-for="(val,index) in messageList" :message="val" :key="index"></tost-view>
  </div>
</template>

<script>
import tostView from '@/components/tostView'
export default {
  name: 'app',
  components:{tostView},
  data (){
    return {
      messageList:[]
    }
  },
  methods:{
    showTost (message) {
        this.messageList.push(message);
        setTimeout(()=>{
          let del_index=this.messageList.indexOf(message);
          this.messageList.splice(del_index,1);
        },800)
    }
  }
}
</script>

<style>
body{
    background:#1b3ebc;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
  padding-bottom: 1.05rem;
}
*{
  padding:0px;
  margin:0px;
}

ul,li {
  list-style-type: none;
  padding: 0;
}
img{
  vertical-align: middle;
}
.pos_abs{
  position: absolute;
  z-index: 1;
}
.pos_rel{
  position: relative;
}
.dis_flex{
  display: flex;
}
.page{
  width:6.4rem;
  margin:0 auto;
}
.before:before{
  content:'';
  display: table;
}
</style>
