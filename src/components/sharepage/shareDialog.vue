
<template>
<div>
    <van-dialog class="dialogStyle" style=""
    v-model="ShareDialogObj.show"
    :showConfirmButton="false"
    :close-on-click-overlay="true"
    > 
        <div style="position: relative;"><img @click="closeddialog()" id="cha" style="" src="../../../static/cha.png" alt=""></div>
        <p class="dialogText">本文观点反应研究人员在撰写及发表本材料期间的分析判断，不构成对客户资产本金损益或收益回报的任何直接或间接的保证、承诺、明示暗示。不映射真实发售产品</p>
        <div style="">
          <div  id="shareDeadline">分享链接已生成，链接有限期至：</div> 
          <div id="shareDeadTime">{{ShareDialogObj.expiryDate}}</div>
        </div>
        <div style="position: relative;"><img id="shareImgS" @click="ctrlFinish()" :data-clipboard-text="this.ShareDialogObj.text" src="../../../static/shareClick (1).png" alt=""></div>
        <div id="ctrlC">复制链接</div>
    </van-dialog>
</div>
</template>

<script>
import Clipboard from "clipboard";
import { Dialog } from "vant";
export default {
  props: ["ShareDialogObj"],
  data() {
    return {
      show: false,
      text: "",
      iscopy:false
    };
  },
  methods: {
    closeddialog() {
      this.ShareDialogObj.show = false;
      this.iscopy = false; 
    },
    ctrlFinish() {

      let clipboard = new Clipboard("#shareImgS");
      clipboard.on("success", e => {
        console.log("复制成功");
          this.text = this.text + this.ShareDialogObj.shareId;
          this.iscopy = true
        // 释放内存
        clipboard.destroy();
        $("#ctrlC").text("复制链接成功");
      });
       clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
    }
  }
};
</script>

<style scoped>
.shareItem {
  width: 9.493333rem;
  height: 6.706667rem;
  margin: 0 auto;
  margin-top: 0.266667rem;
}

.shareImgBox {
  height: 5rem;
  position: relative;
}

.shareImg {
  position: absolute;
  height: 4.48rem;
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
  text-align: center !important;
  line-height: 0.48rem;
}

#shareDeadTime {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0;
  text-align: center !important;
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
  height: 7.213333rem;
  background: #ffffff;
  border-radius: 0.293333rem;
}
</style>

