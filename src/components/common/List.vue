




<template>
  <div class="list" id="List">
  <!-- v-if='listData.length%2 ==0' -->
    <van-row class="lists" v-if='listData.length%2 ==0'>
      <van-col class="listitem" span="12" v-for="(item,i) in listData" :key="i">
        <div class="van-hairline--surround" style="margin-right:.07rem;margin-left:.07rem;margin-top:0.2rem;" @click="reviewStrategy(item)">
          <!-- <div>
            </div> -->
          <div class="listContent">
            <van-tag style="position: absolute;top: 6px;left: 6px;    z-index: 999;" v-if="item.StrategyLabel.split(';')[0]">
              {{item.StrategyLabel.split(';')[0]}} </van-tag>
            <div style=" width: 100%;height:77px;position: absolute;
      top: 50%;
      left: 50%; transform: translate(-50%, -50%);"> <img style="
      height: 77px;    position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
     " :src="picIp+item.SmallIcon" /></div>
            <div class="van-ellipsis" style="color:#15467F;    font-weight: 600;  font-size:14px;    font-family: PingFangSC-Medium;
      text-align:  center;
      position:  absolute;
      bottom: 10px;
      width: 100%;
  ">{{item.StrategyName}}</div>
          </div>
        </div>
      </van-col>
    </van-row>
    <van-row class="lists" v-else>
      <van-col class="listitem" span="12" v-for="(item,i) in listData" :key="i">
        <div class="van-hairline--surround" style="margin-right:.07rem;margin-left:.07rem;margin-top:0.2rem;" @click="reviewStrategy(item)">
          <!-- <div class="listHeader van-hairline--bottom van-ellipsis">
              {{item.StrategyName}}
            </div> -->
          <div class="listContent">
            <van-tag style="position: absolute;top: 6px;left: 6px;    z-index: 999;" v-if="item.StrategyLabel.split(';')[0]">
              {{item.StrategyLabel.split(';')[0]}} </van-tag>
            <div style=" width: 100%;height:77px;   position: absolute;
      top: 50%;
      left: 50%;  transform: translate(-50%, -50%);">
              <img style="
      height: 77px;    position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    " :src="picIp+item.SmallIcon" /></div>
            <div class="van-ellipsis" style=" color:#15467F;    font-weight: 600;   font-size:14px;  font-family: PingFangSC-Medium;
      text-align:  center;
      position:  absolute;
      bottom: 10px;
      width: 100%;
  ">{{item.StrategyName}}</div>
          </div>
        </div>
      </van-col>
      <van-col class="listitem" span="12">
        <div class="van-hairline--surround" style="margin-right:.07rem;margin-left:.07rem;margin-top:0.2rem;">
          <!-- <div class="listHeader van-hairline--bottom van-ellipsis">
              敬请期待
            </div> -->
          <div class="listContent">
             <div style=" width: 100%;height:77px;   position: absolute;
      top: 50%;
      left: 50%;  transform: translate(-50%, -50%);">
              <img style="
      height: 77px;    position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    " src="../../assets/zhanwei.png" /></div>
            <div style="
    color:#15467F;    font-weight: 600;     font-family: PingFangSC-Medium;
      text-align:  center;
      position:  absolute;
      bottom: 10px;
      width: 100%;
  ">敬请期待</div>
          </div>
        </div>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import {pic } from '../../config/shareConfig.js'
import { Tag, Dialog } from "vant";
import { NavBar } from "vant";
import { setStore } from "../../config";

export default {
  props: ["listData"],

  data() {
    return {
      islabel: true,

      value: "",

      areaList: {},

      searchResult: [],

      isshow: Boolean,

      picIp: ""
    };
  },

  created() {
    let regUrl;
    this.picIp = pic(this.picIp)
    console.log(this.picIp, "picIp");
  },

  computed: {
    isodd() {
      const a = this.listData;

      if (a.length % 2 == 0) {
        return true;
      } else {
        return false;
      }
    },

    label(arr) {}
  },

  methods: {
    reviewStrategy(value) {
      if (value.StrategyId !== "undefined") {
        console.log(value.StrategyId, "111");

        setTimeout(() => {
          this.$router.push(
            "/StrategyDetail?StrategyId=" +
              value.StrategyId +
              "&UpdateTime=" +
              value.UpdateTime
          );
        }, 0);
      } else {
        Dialog.alert({
          message:
            '<span style="text-align: center;display:block">请稍后重试</span>'
        }).then(() => {
          // on close
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.listHeader {
  height: 0.69rem;

  line-height: 0.69rem;

  background: #4a90e2;

  color: #fff;

  text-align: center;
}

.listContent {
  height: 3.41rem;
}

.lists {
  padding-top: 0.19rem;

  padding-left: 0.27rem;

  padding-right: 0.27rem;
}

#List .van-tag {
  color: #15467f !important;

  background: #fff !important;
}
</style>
