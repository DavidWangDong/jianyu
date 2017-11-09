<template>
  <div class="page">
    <div class="picContain">
      <img src="http://n.sinaimg.cn/ah/865fe30d/20171109/HuoDongJieShao_01.jpg" alt="">
    </div>
    <div class="picContain">
      <img src="http://n.sinaimg.cn/ah/865fe30d/20171109/HuoDongJieShao_02.jpg" alt="">
    </div>
    
    <navs></navs>
  </div>
</template>

<script>
import navs from '@/components/nav';
export default {
  name: 'sp',
  components:{navs},
  data () {
    return {
      
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

</style>
