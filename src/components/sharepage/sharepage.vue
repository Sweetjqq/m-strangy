<template>
<div id="sharepage">
    <Header ref="header" :headerObj="headerObj"></Header>
    <div class=" sharepage ">
      <div  id="sharepageimgBox">
        <img  :src="picIp + pic.url" id="sharepageimg" /> 
      </div>
      <div class="titleName ">
        <div class="van-hairline--top titleNameLabel  van-ellipsis">{{content.title}}</div>
        <div class="release"> 
          <div id="releaseName">发布时间：{{content.releaseTime}}</div> 
          <button id="shareBtn" :disabled="shareDisabled"> 
            <div  @click="shareLink()"><img id="shareImg" src="../../../static/image/shareBtn.png" alt="">分享</div> 
         </button>
          </div>
        
      </div>
      <div id="vedio" v-if="isHasVedio">
         <aplayer  id="aplayer" class="audio"  ref="player" :music="picmusic">
          </aplayer>
         </div>
         <div id="textAircle">
         </div>
    </div>
      <div id="bondtable" >
        <div id="msgWarn" >模拟组合，仅供内部参考使用，禁止任何人员以任何形式宣传或传播</div>
        <div id="holdings" >持仓情况&nbsp;(日期：{{currentimageTextPositions.deadline}}) &nbsp; &nbsp; &nbsp;债券建仓比例：{{bondPosRate}}</div>
         <div id="bondtableBox" >
          <van-row class="tableStyle">
            <van-col span="8">  <span>标的</span></van-col>
            <van-col span="4">  <span>权重</span></van-col>
            <van-col span="8">  <span>行业</span></van-col>
            <van-col span="4">  <span>评级</span></van-col>
          </van-row>
        </div>
    <div class="van-hairline--bottom tablesItem" v-if="isNoPoistion" v-for="(item,i) in handleimageTextPositionsList" :key="i"   style="">
      <van-row style="text-align:center">
            <van-col span="8" class="itemTime van-ellipsis" style="">
              <span v-if="item.bondName">{{item.bondName}}</span>
              <span v-else>未知</span>
            </van-col>
            <van-col span="4" class="fonthistory van-ellipsis">
              <span v-if="item.bondRatio">{{item.bondRatio}}</span>
              <span v-else>未知</span>
            </van-col>
            <van-col span="8" class="fonthistory van-ellipsis">
              <span v-if="item.industry">{{item.industry}}</span>
              <span v-else>未知</span>
            </van-col>
            <van-col span="4" class="fonthistory van-ellipsis">
              <span v-if="item.rating">{{item.rating}}</span>
              <span v-else>未知</span>
            </van-col>
          </van-row>
      </div>
      <div class="van-hairline--bottom tablesItem" v-else-if="!isNoPoistion">暂无更多数据</div>
     <div id="reviewMore" @click="reviewMoreHandle()">查看更多<van-icon id="arrow" name="arrow" /></div>
      </div>
  <ShareDialog :ShareDialogObj="ShareDialogObj"></ShareDialog>
</div>
</template>

<script>
import { List, Toast, Icon } from "vant";
import Header from "../common/Header.vue";
import Bottombar from "../common/Bottombar.vue";
import ShareDialog from "./shareDialog";
import Aplayer from "vue-aplayer";
import fetch from "../../config/fetch";
import { getShareUrlConfig ,pic} from "../../config/shareConfig";
import {
  setCookie,
  getCookie,
  removeCookie,
  showMsg,
  parseUrl
} from "../../config";
import Lizi from "./lizi.vue";

export default {
  components: {
    Bottombar,
    Header,
    Aplayer,
    ShareDialog,
    Lizi
  },
  data() {
    return {
      picIp:'',
      bondPosRate:'',
      isHasVedio:false,
      shareDisabled: false,
      textAircle: "",
      picmusic: {
        title: "",
        author: "",
        url: "1.mp3",
        pic: "../../../static/image/audiobg.png",
        lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
      },
      isSetting: true,
      headerObj: "",
      ShareDialogObj: {
        expiryDate: "",
        show: false,
        text: ""
      },
      pic: {
        url: ""
      },
      ShareUrlConfig: getShareUrlConfig(),
      shareId: "",
      content: {},
      text: "text22",
      list: [],
      show: false,
      finished: false,
      loading: false,
      parseUrl: {},
      textImageContent: {},
      handleimageTextPositionsList:Array,
      currentimageTextPositionsList:[],
      isNoPoistion:true,
      currentimageTextPositions:{}
    };
  },
  created() {
    this.picIp = pic(this.picIp)
    console.log(parseUrl());
    this.parseUrl = parseUrl();
    this.headerObj = {
      name: this.productName(this.parseUrl.name)
    };
  },
  async mounted() {
    //是否选用默认设置
    Toast.loading({
      duration: "0",
      mask: true,
      message: "正在加载..."
    });
    await this.query();
    await this.queryPositions();
  },
  methods: {
      productName(itemName) {
      if (itemName.length <= 4) {
        var second = itemName.substr(0, 1);
        var lastsecond = itemName.substr(itemName.length - 1, itemName.length);
        console.log(second, lastsecond);
      } else {
        var second = itemName.substr(0, 2);
        var lastsecond = itemName.substr(itemName.length - 2, itemName.length);
        console.log(second, lastsecond);
      }
      return second + "****" + lastsecond;
    },
    ifsettingHandle(flag) {
      let DefaultImage = document.querySelector("#DefaultAudio");
      if (DefaultImage) {
        DefaultImage.style.display = 'none';
      }
      let ImgArr = document.querySelectorAll("#textAircle  img");
      for (let i = 0; i < ImgArr.length; i++) {
        ImgArr[i].style.width = "100%";
      }
      // 文字处理
      if(flag){
            let H1 = document.querySelectorAll("h1");
            let H2 = document.querySelectorAll("h2");
            let H3 = document.querySelectorAll("h3");
            let H4 = document.querySelectorAll("h4");
            let H5 = document.querySelectorAll("h5");
            if (H1) {
              for (let i = 0; i < H1.length; i++) {
                H1[i].style.lineHeight = '1.2rem';
              }
            }
            if (H2) {
              for (let i = 0; i < H2.length; i++) {
                H2[i].style.lineHeight = '1.00rem';
              }
            }
            if (H3) {
              for (let i = 0; i < H3.length; i++) {
                H3[i].style.lineHeight = '.9rem';
              }
            }
            if (H4) {
              for (let i = 0; i < H4.length; i++) {
                H4[i].style.lineHeight = '.9rem';
              }
            }
            if (H5) {
              for (let i = 0; i < H5.length; i++) {
                H5[i].style.lineHeight = '.9rem';
              }
            }
      }
      // 文字处理
      if(document.querySelectorAll("#textAircle  audio").length >0){
        this.isHasVedio = true;
        let url =document.querySelectorAll("#textAircle  audio")[0].src;
        console.log(url);
        console.log(  $("#aplayer audio"),' $("#aplayer audio")')
        setTimeout(()=>{
          $("#aplayer audio").attr("src", url);
        },0)
        $("#textAircle audio").remove();
      }
    },
    //获取基础数据
    async query() {
      let queryData = await fetch.get("/v1/tacticsC/imageTextDetail", {
        id: this.parseUrl.textid
      });
      console.log(queryData);
      if (queryData.data.status == 200) {
        this.content = queryData.data.data;
        this.pic.url = queryData.data.data.coverImg;
        $("#textAircle").append(this.content.content);
        console.log(this.content.layout,'this.contentthis.content')
        if(this.content.layout == 1){
          this.ifsettingHandle(true);
        }else if(this.content.layout == 0){
          this.ifsettingHandle(false);
        }
      } else {
        showMsg("请求图文数据失败");
      }
    },
    //获取持仓数据
    async queryPositions() {
      let queryData = await fetch.get("/v1/tacticsC/imageTextPositions", {
        id: this.parseUrl.textid,
        productCode: this.parseUrl.productCode
      });
      console.log(queryData);
      if (queryData.data.status == 200) {
        console.log(queryData.data.data.list,'queryData.data.data.list')
        if (queryData.data.data.list && queryData.data.data.list.length>0) {
          if( queryData.data.data.list.length < 6){
           this.currentimageTextPositions = queryData.data.data;
            this.loading = true;
            this.handleimageTextPositionsList = queryData.data.data.list;
            console.log(  queryData.data.data.bondPosRate)
            this.bondPosRate = queryData.data.data.bondPosRate
            setTimeout(()=>{
              $('#reviewMore').remove();
            })
            Toast.clear();
          }
           else {
           this.currentimageTextPositions = queryData.data.data;
           this.bondPosRate = queryData.data.data.bondPosRate
           this.currentimageTextPositionsList = queryData.data.data.list
           this.handleimageTextPositionsList = this.imageTextPositionsHandle(queryData.data.data.list);
            Toast.clear();
          }
        } 
        else {
          this.currentimageTextPositions = queryData.data.data;
          console.log('1');
          this.isNoPoistion = false;
          this.bondPosRate  = '0%';
          setTimeout(()=>{
            $('#reviewMore').remove();
          })
          Toast.clear();
        }
      } else {
        $('#reviewMore').remove();
        showMsg("请求持仓数据失败");
      }
    },
    //获取分享id
    async queryCode() {
      let queryData = await fetch.post("/v1/tacticsC/shareImageText", {
        id: this.parseUrl.textid,
        productCode:this.parseUrl.productCode,
        afterServiceId :this.parseUrl.afterServiceId
      });
      if (queryData.data.status == 200) {
        this.shareId = queryData.data.data.shareId;
        this.ShareDialogObj.expiryDate = queryData.data.data.expiryDate;
        this.ShareDialogObj.text =
        this.ShareUrlConfig + queryData.data.data.shareId;
        setTimeout(()=>{
          this.ShareDialogObj.show = true;
        },0)
      } else {
        showMsg("分享失败");
      }
    },
    //处理数据
    imageTextPositionsHandle(data) {
      let arr = [];
      data.map((item, i) => {
        if(i < 6){
          arr.push(item)
        }
      });
      console.log(arr,'arr')
      return arr
    },
    //点击分享
    shareLink() {
      this.queryCode();
      $("#ctrlC").text("复制链接");
    },
    //查看更多
    reviewMoreHandle() {
       this.handleimageTextPositionsList =  this.currentimageTextPositionsList;
       $('#reviewMore').remove()
    }
    // getday(date) {
    //   var y = date.getFullYear();
    //   var m = date.getMonth() + 1;
    //   m = m < 10 ? "0" + m : m;
    //   var d = date.getDate();
    //   d = d < 10 ? "0" + d : d;
    //   return y + "-" + m + "-" + d;
    // }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#textAircle img {
  width: 100%;
}
#sharepageto {
  background: #fff;
}
#ctrlC {
  margin-top: 1.493333rem;
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #6f6f6f;
  letter-spacing: 0;
  text-align: center;
}
#shareImgS {
  width: 1.013333rem;
  height: 1.013333rem;
  margin-top: 0.48rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
#shareDeadline {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0;
  text-align: center;
  line-height: 0.48rem;
}
.dialogText {
  padding: 0.533333rem 0.533333rem 0px;
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #7d7d7d;
  letter-spacing: 0;
}
#cha {
  width: 0.266667rem;
  height: 0.266667rem;
  margin-top: 0.48rem;
  position: absolute;
  right: 0.133333rem;
  top: -0.48rem;
  transform: translate(-50%);
}
.dialogStyle {
  width: 6.613333rem;
  height: 6.613333rem;
  background: #ffffff;
  border-radius: 0.293333rem;
}
.itemTime {
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #666666;
  letter-spacing: 0;
  line-height: 1.093333rem;
}
.tablesItem {
  background: #fff;
  line-height: 1.12rem;
}
.tableStyle {
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #b8b8b8;
  letter-spacing: 0;
  text-align: center;
}
#bondtableBox {
  height: 0.8rem;
  line-height: 0.8rem;
  margin-top: 0.426667rem;
}
#arrow {
  padding-left: 0.106667rem;
  transform: rotate(90deg);
}
#vedio {
  width: 9.146667rem;
  margin: 0 auto;
  height: 1.68rem;
  margin-top: 0.613333rem;
}
#textAircle {
  padding: 10px 0.533333rem 0.533333rem;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0;
  text-align: justify;
  line-height: 0.64rem;
}
#aplayer {
}
#reviewMore {
  margin-top: 0.6rem;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #60739c;
  letter-spacing: 0;
  text-align: center;
  height: 1.2rem;
}
#sharepageimgBox {
   margin-left: 0.533333rem ;
  margin-right: 0.533333rem; 
  padding-top: 0.373333rem;
  position: relative;
  height: 5.9rem;
}
#sharepageimg {
  width: 100%;
  height: 5.36rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.titleName {
  font-size: 18px;
  font-family: HelveticaNeue;
  color: #000000;
  font-weight: 500;
  padding-left: 0.533333rem;
  padding-right: 0.533333rem;
}
.titleNameLabel {
  font-family: "Microsoft YaHei";
  padding-top: 0.373333rem;
}
.release {
  margin-top: 0.16rem;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #9b9b9b;
  letter-spacing: 0;
}
#releaseName {

  display: inline;
}
#shareBtn {
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  outline: none;
  display: inline;
  background: #fff;
  float: right;
}

#shareImg {
  margin-bottom: 0.053333rem;
  padding-right: 0.106667rem;
  vertical-align: middle;
  width: 0.32rem;
  height: 0.373333rem;
}

#msgWarn {
  padding-left: 0.5rem;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 0.373333rem;
  margin-top: 1rem;
}

#holdings {
  padding-left: 0.5rem;
  margin-top: 0.16rem;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #4a4a4a;
  letter-spacing: 0;
}

#bondtable {
  padding-left: 0.233333rem;
  padding-right: 0.533333rem;
  margin-top: 0.426667rem;
  margin-bottom :.666667rem
}

#sharepage {
  background: #fff;
}
</style>

