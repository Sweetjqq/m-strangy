<template>
<div id="sharepageto">
    <Header ref="header" :headerObj="headerObj"></Header>
    <div class=" sharepage " id="sharepagetoBox">
      <!-- <div  id="sharepageimgBox">
        <img :src="picIp + pic.url" id="sharepageimg" /> 
      </div> -->
      <div class="titleName ">
        <div class="van-hairline--top titleNameLabel">{{content.title}}</div>
        <div class="release"> 
          <div v-if="ifreleaseName" id="releaseName">发布时间:&nbsp;&nbsp;{{content.release_time}}</div> 
        </div>
      </div>
     <div id="vedio" v-if="isHasVedio">
         <aplayer id="aplayer" class="audio"  ref="player" :music="picmusic">
          </aplayer>
         </div>
         <div id="textAircle">
        
         </div>
    </div>
    <img src="../../../static/fenxiang.jpg"  style="
    width: 100%;
" alt="">
</div>
</template>

<script>
import { getShareUrlConfig ,pic} from "../../config/shareConfig";
import fetch from "../../config/fetch";
import Lizi from "./lizi.vue";
import ShareDialog from "./shareDialog";
import { Icon } from "vant";
import Aplayer from "vue-aplayer";
import { List } from "vant";
import Bottombar from "../common/Bottombar.vue";
import Header from "../common/Header.vue";
import { watermark } from "./water.js";
import { parseUrl ,showMsg} from "../../config";
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
      isHasVedio:false,
      textAircle: "",
      ifreleaseName:true,
      picmusic: {
        title: "",
        author: "",
        url: "1.mp3",
        pic: "../../../static/image/audiobg.png"
      },
      isSetting: false,
      headerObj: "",
      ShareUrlConfig: getShareUrlConfig(),
      ShareDialogObj: {
        show: false,
        shareId: ""
      },
      pic: {
        url: ""
      },
      content: {},
      text: "text22",
      list: [],
      show: false,
      finished: false,
      loading: false,
      title:''
    };
  },
  async created() {
    this.picIp = pic(this.picIp)
    console.log(this.picIp)
    // var userName = $('#sharepage').val();
    let queryObj = {};
    parseUrl(queryObj);
    console.log(queryObj);
    this.ShareDialogObj.shareId = queryObj.shareId;
    await this.query();

  },
  mounted() {
      // this.OneAudio = OneAudio;
      //           console.log(this.OneAudio, "***********this.OneAudio**********");
      //           console.log(OneAudio.parentNode, "***********OneAudio.parentNode**********");
      //           if (OneAudio) {
      //             let src = OneAudio.getAttribute("src");
      //             let message = {
      //               src: src,
      //               pic: "../../../static/image/audiobg.png",
      //             };
      //             message = JSON.stringify(message);
      //             let link = '<Aplayer :music=' + "'" + message + "'" + '> </Aplayer>';

      //             var Profile = Vue.extend({
      //               components: {
      //                 Aplayer
      //               },
      //               template: link
      //             })
      //             // 创建一个 Profile 实例
      //             var profile = new Profile({
      //               data: {
      //               }
      //             })
      //             // 挂载到元素上
      //             profile.$mount(OneAudio.parentNode)
    //是否选用默认设置
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
    async query() {
      let queryData = await fetch.get("/v1/tacticsC/shareImageTextDetail", {
          shareId: this.ShareDialogObj.shareId
        })
      if (queryData.data.status == 200) {
        console.log(queryData.data.data.productTitle,'queryDataqueryData')
        let name = this.productName(queryData.data.data.productTitle);
        console.log(name)
        this.headerObj = {
          name: name
        };
        this.content = queryData.data.data;
        this.pic.url = queryData.data.data.cover_img;
        $("#textAircle").append(this.content.content);
        console.log(this.content,'this.contentthis.content')
        if(this.content.layout == 1){
          this.ifsettingHandle(true);
        }else if(this.content.layout == 0){
          this.ifsettingHandle(false);
        }
      
      } else {
        this.ifreleaseName = false
        showMsg("图文链接已过期，请关注微信公众号，获得最新投资资讯");
      }
    },
    shareLink() {
      this.ShareDialogObj.show = true;
      $("#ctrlC").text("复制链接");
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
      if(document.querySelectorAll("#textAircle  audio").length >0){
        this.isHasVedio = true;
        let url =document.querySelectorAll("#textAircle  audio")[0].src;
        console.log(url);
        console.log(  $("#aplayer audio"),' $("#aplayer audio")')
        setTimeout(()=>{
          $("#aplayer audio").attr("src", url);
          watermark({ content: document.getElementById("sharepagetoBox") });
        },0)
        $("#textAircle audio").remove();
      }else{
        this.isHasVedio = false;
         watermark({ content: document.getElementById("textAircle") });
      }
    },

  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sharepagetoBox {
}
#sharepageto {
  height: 100%;
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
  padding: 0 0.533333rem 0.533333rem;
  margin-top: 0.533333rem;
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
  display: inline;
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
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 0.373333rem;
  margin-top: 1rem;
}

#holdings {
  margin-top: 0.16rem;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #4a4a4a;
  letter-spacing: 0;
}

#bondtable {
  padding: 0 0.533333rem;
  margin-top: 0.426667rem;
}

#sharepage {
  background: #fff;
}
</style>

