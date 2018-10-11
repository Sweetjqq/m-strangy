<template>
  <div id="shareItem" >
    <div class="shareItem van-hairline--surround"  v-for="(item,i) in this.ShareItemObj" :key="i">
    <div class="shareImgBox " @click="enterShare(item)">
      <img class="shareImg" :src="picIp+item.imageText.coverImg"  alt="">
    </div>
     <div class="inline van-hairline--bottom">
        
      </div>
      <div class="shareLabel">
        <div v-if="item.readstatus" class="read readLabel" >{{item.imageText.title}}</div>
        <div v-else class="noread" >{{item.imageText.title}}</div>

      </div>
      <div >
         <div class="dib" id="isreleaseTime">发布时间： {{releaseHandle(item.imageText.releaseTime)}}</div>
         <div id="shareBtn" class="dib" @click="shareLink(item.imageText.id)"><img id="shareImg" src="../../../static/image/shareBtn.png" alt="">分享</div> 
      </div>
    </div>
  <ShareDialog :ShareDialogObj="ShareDialogObj"></ShareDialog>
  </div>
</template>

<script>
import { getShareUrlConfig ,pic}from '../../config/shareConfig'
import fetch from "../../config/fetch";
import ShareDialog from "../sharepage/shareDialog";
import Clipboard from "clipboard";
import Vue from "vue";
import { Lazyload } from "vant";
import { setCookie, getCookie, removeCookie,showMsg ,parseUrl} from "../../config";
export default {
  components: {
    ShareDialog
  },
  props: ["ShareItemObj"],
  data() {
    return {
      readly: true,
      picIp:'',
      ShareDialogObj: {
        show: false,
        text: ''
      },
      ShareUrlConfig:getShareUrlConfig(),
      imageList: [
        "http://img4.imgtn.bdimg.com/it/u=934100130,318125656&fm=27&gp=0.jpg"
      ],
      parseUrl:{}
    };
  },
  created() {
    this.picIp = pic(this.picIp)
    console.log(this.picIp, "picIp");
    console.log(parseUrl());
    this.parseUrl = parseUrl()
  },
  methods: {
    releaseHandle(time) {
      if (time) {
        return time.substr(0, 10);
      } else {
        return "未知时间";
      }
    },
    async enterShare(item) {
      console.log(item);
      let queryData = await fetch.post("/v1/tacticsC/readImageTextJM", {
        imageTextId :item.imageText.id,
        cname :getCookie('AccountId'),
        readStatus :item.readstatus
      });
      if(queryData.data.status == 200){
        this.$router.push("/sharepage?textid="+item.imageText.id+"&name="+this.parseUrl.productTitle+'&productCode='+this.parseUrl.productCode+'&afterServiceId='+this.parseUrl.afterServiceId);
      }
    },
    closeddialog() {
      this.ShareDialogObj.show = false;
    },
    async queryCode(id) {
      let queryData = await fetch.post("/v1/tacticsC/shareImageText", {
          id: id,
          productCode:this.parseUrl.productCode,
          afterServiceId :this.parseUrl.afterServiceId
        })
      if (queryData.data.status == 200) {
        console.log(queryData);
        this.ShareDialogObj.expiryDate = queryData.data.data.expiryDate;
        this.ShareDialogObj.text = this.ShareUrlConfig + queryData.data.data.shareId;
      }else{
        showMsg('请求数据失败')
      }
    },
    shareLink(id) {
      this.ShareDialogObj.show = true;
      this.queryCode(id);
      $("#ctrlC").text("复制链接");
    },
    ctrlFinish() {
         
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.readLabel{
  word-break: break-all;
    text-overflow: ellipsis;
    height: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.read {
  color: #9b9b9b;
}
.noread {
  color: #000000;
}
.shareItem {
  width: 9.493333rem;
  margin: 0 auto;
  margin-top: 0.266667rem;
}

.shareImgBox {
  margin-left: 0.32rem;
  margin-right: 0.32rem;
  height: 5.8rem;
  position: relative;
}

.shareImg {
  position: absolute;
  height: 5.36rem;
  width: 100%;
  padding-top: 0.213333rem;
  left: 50%;
  transform: translateX(-50%);
}

.inline {
  margin-left: 0.32rem;
  margin-right: 0.32rem;
}

.shareLabel {
  margin-top: 0.206667rem;
  padding-bottom: .08rem;
  margin-left: 0.32rem;
  margin-right: 0.32rem;
  font-size: 0.48rem;
  font-family: HelveticaNeue;
  color: #000000;
  font-weight: 500;
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

#shareBtn {
  display: inline;
  float: right;
  padding-top: .04rem;
  font-size: 14px;
  padding-right: 0.32rem;
}

#shareImg {
  margin-bottom: 0.063333rem;
  padding-right: 0.106667rem;
  vertical-align: middle;
  width: 0.32rem;
  height: 0.373333rem;
}

#isreleaseTime {
  font-size: 12px;
  margin-top: 0.106667rem;
  margin-left: 0.36rem;
  color: #9b9b9b;
  height: 0.373333rem;
  line-height: 0.693333rem;
}

.dib {
  display: inline;
}
</style>
