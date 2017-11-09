<template>
  <div class="page">
    <div class="hover" v-if="showModal">
      <div class="loading">

      </div>
    </div>
    <div class="picContain">
      <img src="http://n.sinaimg.cn/ah/865fe30d/20171109/HuoDongJieShao_01.jpg" alt="">
    </div>
    <div class="details">
      <p class="detailItem">
        <span class="yellow">参与数</span>
        <span>{{number}}</span>
      </p>
      <p class="detailItem">
        <span class="yellow">投票次数</span>
        <span>{{count}}</span>
      </p>
      <p class="detailItem">
        <span class="yellow noneBorder">访问量</span>
        <span class="noneBorder">{{view}}</span>
      </p>
    </div>
    <div class="searchWrap">
      <div class="search">
        <input type="text" name="key" placeholder="请输入关键词！" v-model="searchStr">
        <span @click="doSearch">搜索</span>
      </div>
    </div>
    <div class="listWrap">
        <ul class="user_list masonry">
          <li class="vote_cell_wrap masonry-brick" v-for="(val,index) in list">
            <div class="vote_cell">
              <div class="pics">
                <a :href="val.link"><img :src="val.photo"></a>
              </div>
              <div class="detail">
                {{val.name}}
              </div>
              <div class="nameWrap">
                <span class="name">{{val.title}}</span>
              </div>
              <div class="btn" @click="doVote(val)">
                投TA一票<span class="yellow">({{val.count}})</span>
              </div>
            </div>
          </li>
        </ul>
    </div>
    <div class="toPageWrap before">
      <div class="topage" v-if="type=='list'">
        <span class="preBtn" @click="toPrePage">上一页</span>
        跳转至
        <input type="text" v-model="page" readonly>
        页
        <span class="nextBtn" @click="toNextPage">下一页</span>
        
      </div>
      <div class="toMore" v-if="type=='sigle'" @click="moreBtn">
						更多选手>>
      </div>
    </div>
    <navs></navs>
  </div>
</template>

<script>
import navs from '@/components/nav';
export default {
  name: 'fp',
  components:{navs},
  data () {
    return {
      list: [],
      isLog:false,
      searchStr:'',
      page:1,
      type:'list',
      tmpPage:1,
      updateFlag:false,
      showModal:false,
      number:'',
      count:'',
      view:''
    }
  },
  created:function(){
    this.$http.jsonp('http://ahfensitong.com/tmp/sifating/api.php',{params:{action:'getPage',jsonp:1,classify:'qrj'}}).then(function(data){
      if (data.data.error==0){
        this.list=(data.data.data);
      }
    },function(){
      alert('获取数据出错！');
    });
    this.$http.jsonp('http://ahfensitong.com/tmp/sifating/api.php',{params:{action:'init',jsonp:1,classify:'qrj'}}).then(function(data){
      if (data.data.error==0){
        this.number=(data.data.data.number);
        this.count=(data.data.data.count);
        this.view=(data.data.data.view);
      }
    },function(){
      // alert('获取数据出错！');
      this.$emit('showtost','获取数据出错！');
    });
  },
  updated:function(){

    if (this.updateFlag&&!$grid){
      var $grid=$('.masonry').masonry({
              columnWidth: 2,
              itemSelector: '.masonry-brick'
          });

    }
    if (this.updateFlag){
      var length=this.list.length;
      var count=0;
      var that=this;
      if (!!!length){
        that.showModal=false;
        return ;
      }
      for (var i=0;i<length;i++){
        setTimeout((function(i){
          var img=new Image();
          img.src=that.list[i].photo;
          img.onload=function(){
            count++;
            if (count==length){
              $grid.masonry('reloadItems');
              $grid.masonry('layout');
              that.showModal=false;
            }
          }
        })(i))
      }
      this.updateFlag=false;
    }
  },
  methods:{
    doSearch:function(){
      var that=this;
      if (!!!this.searchStr){
        return;
      }
      this.$http.jsonp('http://ahfensitong.com/tmp/sifating/api.php',{params:{action:'search',jsonp:1,classify:'qrj',id:this.searchStr}}).then(function(data){
        if (data.data.error==0){
          this.list=data.data.data;
          that.type="sigle";
        }
        if (data.data.error==1){
          // alert(data.data.data);
          this.$emit('showtost',data.data.data)
        }
      })
    },
    doVote : function(val){
                                    
                    var that=this;
                  if (this.checkPermision()){

                  this.$http.jsonp('http://ahfensitong.com/tmp/sifating/api.php',{params:{action:'dovote',type:'qrj',uid:val.id,wx_uid:window.uid,jsonp:1}}).then(
                      function(data){
                        var res=data.data;
                        if (res.error==0){
                          // alert(res.msg);
                          this.$emit('showtost',res.msg)
                          val.count=val.count-0+1;
                          console.log(val);
                          return;
                        }
                        // alert(res.msg);
                        this.$emit('showtost',res.msg)
                      }
                    )

                  }

              },

    clear:function(){
      this.tmpPage=this.page;
      this.page='';
      console.log(this.tmpPage);
    },
    input:function(){
      if (!this.page||Number(this.page)==NaN){
        alert('请输入数字!');
        this.page=this.tmpPage;
        return;
      }
      this.getPage();
    },
    toPrePage:function(){
      this.page>1&&this.page--;
      this.getPage();
    },
    toNextPage:function(){
      this.tmpPage=this.page;
      this.page++;
      this.getPage();
    },
    getPage:function(){
      this.$http.jsonp('http://ahfensitong.com/tmp/sifating/api.php',{params:{action:'getPage',jsonp:1,classify:'qrj',page:this.page}}).then(function(data){
      if (data.data.error==0){
        if (data.data.data.length<=0){
          // alert();
          this.$emit('showtost','还没有这么多页哦~')
          this.page=this.tmpPage;
          this.showModal=false;
          return;
        }
        this.list=(data.data.data);

      }
      },function(){
        // alert('获取数据出错！');
        this.$emit('showtost','获取数据出错！')
      });
    },
    moreBtn:function(){
      this.page=1;
      this.getPage();
      this.type='list';
    },
    checkPermision:function(){
                // if (!(this.uid=window.uid)){
                //   // if (confirm('请先登录微博然后投票！')){
                //   //   location.href='https://m.weibo.cn/';
                //   // }
                //   this.$emit('showtost','请用微博客户端打开！');
                //   return false;
                // }
                return true;
            },

  },
  watch:{
    list:function(news,old){
      this.updateFlag=true;
      this.showModal=true;
    }
  },
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
  .search{
		    width: 6.01rem;
		    margin: 0 auto;
		    overflow: hidden;
		    margin-bottom: 0.38rem;
		    height: 0.6rem;
	}
	.search input{
		float:left;
		width: 4.77rem;
		height: 0.55rem;
		background: #fff;
		border: none;
		outline: none;
		border-radius: 5px;
		font-size: 0.2rem;
		text-indent: 1em;
	}
	.search span{
		float: right;
	    width: 1.11rem;
	    height: 0.49rem;
	    border-radius: 5px;
	    background: #f25e34;
	    text-align: center;
	    line-height: 0.49rem;
	    box-shadow: 0px 4px 5px #c4471e;
	    font-size: 0.2rem;
	    color: #fff;
	}
  .searchWrap{
    width:100%;
    background:#1b3ebc;
    height: 0.82rem;
  }
  .details{
    height: 1.14rem;
    width:100%;
    background:#1b3ebc;
    display:flex;
  }
  .detailItem{
    font-size: 0.24rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color:#fff;
  }
  .detailItem .yellow,.yellow{
    color:#ffed1f;
  }
  .detailItem span{
    border-right:2px solid #fff;
  }
  .detailItem .noneBorder{
    border-right:none;
  }
  .listWrap{
    width:100%;
    background:#1b3ebc;
  }
  .user_list{
		width: 6.21rem;
		margin:0 auto;
	}
	.vote_cell_wrap{
		padding:0 0.099rem; 
		margin-bottom: 0.1rem;
	}
	.vote_cell{
		width: 2.7rem;
		padding: 0.1rem;
		background: #fff;
	}
	.pics{
		width: 100%;
		height: auto;
		margin-bottom: 0.18rem;
	}
	.pics img{
		width: 100%;
		height: auto;
	}
	.detail{
	    width: 2.7rem;
	    overflow: hidden;
	    font-size: 0.2rem;
	    color: #1b3ebc;
      text-align: left;
	}
	.bianhao{
		float: left;
	}
	.count{
		float: right;
		color: 0.2rem;
		color:#ffe400;
	}
	.nameWrap{
		width: 100%;
		font-size: 0.2rem;
		color:#1b3ebc;
		margin-bottom: 0.16rem;
    text-align:left;
	}
	.btn{
		width: 100%;
		height: 0.47rem;
		color: #fff;
		font-size: 0.22rem;
		font-weight: bold;
		background: #ff7800;
		text-align: center;
		line-height: 0.47rem;
		border-radius: 5px ;
	}
	.topage{
		    font-size: 0.26rem;
		    text-align: center;
		    color: #fff;
		    font-weight: bold;
		    margin-top: 0.6rem;
	}
	.topage input{
        border: none;
	    width: 0.7rem;
	    text-align: center;
	    padding: 0.05rem;
	}
	.hover{
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,0.5);
		z-index: 999;
	}
	.loading{
		width: 0.5rem;
		height: 0.5rem;
		border: 3px solid #1b3ebc;
		border-radius: 100%;
		border-top: 3px solid transparent;
		position: absolute;
		top:50%;
		margin-top: -0.25rem;
		left: 50%;
		margin-left: -0.25rem;
		-webkit-animation:rotate .8s linear 0s infinite forwards; 
	}
	.toMore{
		    font-size: 0.3rem;
		    text-align: center;
		    margin-top: 0.5rem;
		    color: #ffea00;
	}
  .toPageWrap{
    width:100%;
    background:#1b3ebc;
    padding-bottom: 0.6rem;
  }
</style>
