<template>
  <div class="Detail">
    <Header ref="header" :headerObj="headerObj"></Header>
    <div class="strangy_details">
      <div class="head">
        <van-row>
          <van-col span="12">
            <label class="head_number">{{fundNavRate.netValue}}</label>
            <label class="head_title">最新净值</label>
          </van-col>
          <van-col span="12">
            <label class="head_number">
              <span v-if="datachange(fundNavRate.netValueReturn)>0" style="color: #D0021B">
                {{fundNavRate.netValueReturn}}
              </span>
              <span v-else-if="datachange(fundNavRate.netValueReturn)==0" style="color: #666666">
                {{fundNavRate.netValueReturn}}
              </span>
              <span v-else style="color: green">
                {{fundNavRate.netValueReturn}}
              </span>
            </label>
            <label class="head_title">日涨跌幅</label>
          </van-col>
        </van-row>
      </div>
      <div class="Product_state">
        <van-tabs>
          <van-tab title="净值走势图">
            <van-row style="padding: .2rem 0;box-sizing: border-box">
              <van-col span="12">
                <label class="head_title" style="color: #9B9B9B;font-size: .347rem">累计收益率：
                  <span v-if="datachange(accNetValueChartData.accNetRatio)>0" style="color: #D0021B">
                    {{accNetValueChartData.accNetRatio}}
                  </span>
                  <span v-else-if="datachange(accNetValueChartData.accNetRatio)==0" style="color: #666666">
                    {{accNetValueChartData.accNetRatio}}
                  </span>
                  <span v-else style="color: green">
                    {{accNetValueChartData.accNetRatio}}
                  </span>

                </label>
              </van-col>
              <van-col span="12">
                <label class="head_title" style="color: #9B9B9B;font-size: .347rem">累计年化收益率：
                  <span v-if="datachange(accNetValueChartData.yieldAccNetRatio)>0" style="color: #D0021B">
                    {{accNetValueChartData.yieldAccNetRatio}}
                  </span>
                  <span v-else-if="datachange(accNetValueChartData.yieldAccNetRatio)==0" style="color: #666666">
                    {{accNetValueChartData.yieldAccNetRatio}}
                  </span>
                  <span v-else style="color: green">
                    {{accNetValueChartData.yieldAccNetRatio}}
                  </span>

                </label>
              </van-col>
            </van-row>
            <van-tabs type="card">
              <van-tab title="单位净值">
                <div style="height:5.333rem ;">
                  <LineChart id="NetWorth" :options='NetWorth' class="echart" ref="c1" :max='max' :min='min'></LineChart>
                </div>
              </van-tab>
              <van-tab title="累计净值">
                <div style="height:5.333rem ;">
                  <LineChart id="NetWorth1" :options='NetWorth1' class="echart" ref="c2" :max='max1' :min='min1'></LineChart>
                </div>
              </van-tab>
            </van-tabs>
          </van-tab>
          <van-tab title="历史数据表" class="history">
            <div>
              <div class="list">
                <van-row>
                  <van-col span="6">日期</van-col>
                  <van-col span="6">单位净值</van-col>
                  <van-col span="6">累计净值</van-col>
                  <van-col span="6">日涨跌幅</van-col>
                </van-row>
              </div>
              <div class="list_data">
                <div class="van-hairline--top one_data" v-for="item in historyData">
                  <van-row>
                    <van-col span="6">{{item.date}}</van-col>
                    <van-col span="6">{{item.netValue}}</van-col>
                    <van-col span="6">{{item.accNetValue}}</van-col>
                    <van-col span="6">
                      <span v-if="datachange(item.netValueReturn)>0" style="color: #D0021B">
                        {{item.netValueReturn}}
                      </span>
                      <span v-else-if="datachange(item.netValueReturn)==0" style="color: #666666">
                        {{item.netValueReturn}}
                      </span>
                      <span v-else style="color: green">
                        {{item.netValueReturn}}
                      </span>
                    </van-col>
                  </van-row>

                </div>

              </div>
              <div class=" moreAdvance" @click='moreAdvance'>
                <img :src="images.moreadvance">
                <span>查看完整数据表</span>
              </div>
            </div>
          </van-tab>
          <van-tab title="组合YTM" v-if='heldToMaturity==1'>
            <div style="height:5.333rem;">
              <LineChart1 id="YTMList" :YTMAllData='YTMAllData' :options='YTMList' class="echart" ref="c3" :max='YTMMAX'></LineChart1>
            </div>

          </van-tab>
        </van-tabs>
      </div>



      <div class='one_detail' style="padding-top: .333rem;margin-top: .3rem;">
        <label class="title">
          <span style="float: left">债券持仓</span>
          <font v-if='bondPosRate==undefined' style="float: left;font-size: .32rem;color: #9B9B9B;">{{"（债券建仓比例:&nbsp;&nbsp;&nbsp;0%）"}}</font>
          <font v-else style="float: left;font-size: .32rem;color: #9B9B9B;">{{"（债券建仓比例:&nbsp;&nbsp;&nbsp;"+bondPosRate+"）"}}</font>
        </label>
        <div style="clear: both; color: #9B9B9B;font-size: .32rem;padding-top: .293rem">
          <div class="van-hairline--top" style="padding: .293rem;box-sizing: border-box;">
            本持仓为模拟组合，仅供内部参与使用，禁止任何人员以任何形式宣传
          </div>
        </div>
        <div class="strangy_comtent">
          <div style="padding-top: 0rem;box-sizing: border-box;">
            <van-tabs type="card" class="reset">
              <van-tab title="持仓详情">

                <div class="Bond" style="margin-top: .16rem">
                  <van-row gutter="5">
                    <!-- 超过9条 -->
                    <div v-if="BondArry.length>9" class="haveNine" style="padding: .067rem 0">
                      <van-col span="8" v-for="(bond,index) in HaveBond" :key="index">
                        <div class="only_bond" :class="{
                          no:!datachange(bond.bondRate)||datachange(bond.bondRate)==null,
                          small:datachange(bond.bondRate)<=5,
                          medial:datachange(bond.bondRate)<=10&&datachange(bond.bondRate)>5,
                          big:datachange(bond.bondRate)<=20&&datachange(bond.bondRate)>10,
                          large:datachange(bond.bondRate)>20
                          }">
                          <div class="haveBond">
                            <div v-if="bond.bondCode" @click="bondMsg(bond)">
                              <span class="name">{{bond.shortName}}</span>
                              <span class="number">{{bond.bondRate}}</span>
                              <!-- <span class="time">{{changeTime(bond.InterestEndDate)}}</span> -->
                            </div>
                            <span class="noBond" v-else>暂无</span>
                          </div>
                        </div>
                      </van-col>
                    </div>

                    <!-- 不够9条 -->
                    <div v-if="BondArry.length<=9">
                      <van-col span="8" v-for="(bond,index) in NoneBond" :key="index">
                        <div class="only_bond" :class="{
                          no:!datachange(bond.bondRate)||datachange(bond.bondRate)==null,
                          small:datachange(bond.bondRate)<=5,
                          medial:datachange(bond.bondRate)<=10&&datachange(bond.bondRate)>5,
                          big:datachange(bond.bondRate)<=20&&datachange(bond.bondRate)>10,
                          large:datachange(bond.bondRate)>20
                          }">
                          <div v-if="bond.bondRate" class="haveBond" @click="bondMsg(bond)">
                            <span class="name">{{bond.shortName}}</span>
                            <span class="number">{{bond.bondRate}}</span>
                          </div>
                          <span class="noBond" v-else-if='BondArry.length<10'>暂无</span>
                        </div>
                      </van-col>
                    </div>
                  </van-row>
                </div>
                <div style="text-align: center" v-if="BondArry.length>9">
                  <van-button type="default" @click="LookMore" v-if="moreState==0">点击查看更多</van-button>
                </div>
                <div class="btn" style="text-align: right;padding-right: .293rem;color: #15467F;font-size: .347rem"
                  v-if='bondPosRate!=undefined'>
                  <span @click="MoreHold">更多持仓分析</span>
                </div>
              </van-tab>
              <van-tab title="行业分布">
                <div class="echarts" style="margin-top: .667rem">
                  <PieChart id="Industry " :options='Industry ' class="echart" ref="c4"></PieChart>
                </div>
              </van-tab>
            </van-tabs>
          </div>
        </div>
      </div>
    </div>
    <Bottombar></Bottombar>
    <div class="van-hairline--bottom" style="margin-bottom: .6rem;">
      <div class="labels">
        <div class="van-hairline--bottom" style="height: .933rem;line-height: .933rem;color: #4A4A4A;font-size: .373rem;margin-bottom: .293rem">投顾观点</div>
        <div class="labels_msg" v-if='Object.keys(imageText).length>0'>
          <div class="van-hairline--bottom" style="padding-bottom: .293rem;min-height: 1.333rem">
            <img style="display: block;width: 100%;height: 5.36rem;" :src="pic()+imageText.coverImg" />
          </div>
          <span>{{imageText.title}}</span>
          <label class="img_font">
            <label style="margin-right: .4rem;" @click="share">
              <img :src="images.share" style="float: left;margin-right: .067rem">
              <font>分享</font>
            </label>
            <label @click="showAll">
              <label v-if="!showAlls">
                <img :src="images.bottom">
                <font>展开</font>
              </label>
              <label v-else>
                <img :src="images.top">
                <font>收起</font>
              </label>
            </label>
          </label>
        </div>
        <div style="margin-top: .133rem">
          <span style="font-size: .32rem;color: #9B9B9B;">发布时间：{{imageText.releaseTime}}</span>
        </div>
        <div style="margin-top: .133rem" v-show='Object.keys(imageText).length<=0'>
          <span style="font-size: .32rem;color: #9B9B9B;display: block;padding:0 0 .5rem .1rem;box-sizing: border-box">该产品暂无投顾观点</span>
        </div>
      </div>
      <div v-if='showAlls'>
        <div class="msg van-hairline--top ChartMsg" id="introduction" v-html="Html">
        </div>

        <div class="history">
          <div class="van-hairline--top" style="padding: .293rem;box-sizing: border-box;background: white;color:#999;font-size: .32rem ">
            <span>本持仓为模拟组合，仅供内部参与使用，禁止任何人员以任何形式宣传</span>
            <div style="color: #333;line-height: .4rem;margin-top: .1rem">持仓情况（日期:&nbsp;&nbsp;<span>{{deadline}}</span>）&nbsp;&nbsp;债券建仓比例:&nbsp;&nbsp;
              <span v-if='bondPosRateText!=undefined'>{{bondPosRateText+''}}</span>
              <span v-else>0%</span>
            </div>
          </div>
          <div class="list" style="background: white;color: #B8B8B8;" v-if='ImgagePosData.length>0'>
            <van-row>
              <van-col span="6">标的</van-col>
              <van-col span="6">权重</van-col>
              <van-col span="6">行业</van-col>
              <van-col span="6">评级</van-col>
            </van-row>
          </div>
          <div class="list_data">
            <div class="van-hairline--top one_data" v-for="(item,index) in ImgagePosData">
              <van-row>
                <van-col span="6">
                  <span style="display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #000">{{item.bondName}}</span>
                </van-col>
                <van-col span="6">{{item.bondRatio}}</van-col>
                <van-col span="6">
                  <span style="display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #000">{{item.industry}}</span>
                </van-col>
                <van-col span="6">{{item.rating}}</van-col>
              </van-row>
            </div>

          </div>
          <div></div>
          <div class=" moreAdvance" style="text-align: center" @click='LookMorePos' v-if='!AllPosState'>
            <span>查看更多</span>
            <img :src="images.morebottom" />
          </div>
        </div>
      </div>
      <div class=" moreAdvance" style="text-align: center" @click="showAll" v-if='showAlls'>
        <span>收起</span>
        <img :src="images.moretop" />
      </div>
      <div class=" moreAdvance" @click='moreAdvance1' v-show='Object.keys(imageText).length>0'>
        <img :src="images.moreadvance">
        <span>更多观点</span>
      </div>
    </div>

    <ShareDialog :ShareDialogObj="ShareDialogObj"></ShareDialog>
  </div>

</template>

<script>
  import {
    Tag,
    Icon,
    Dialog,
    Popup,
    Toast,
    Switch,
    Tab,
    Tabs,
    List,
  } from "vant";
  import Bottombar from "../common/Bottombar.vue";
  import Header from "../common/Header.vue";
  import BarChart from "../EchartsConponents/BarChart.vue";
  import LineChart from "../EchartsConponents/LineChart.vue";
  import LineChart1 from "../EchartsConponents/LineChartForMatter.vue";
  import PieChart from "../EchartsConponents/PieChart.vue";
  import ShareDialog from "../sharepage/shareDialog";
  import Vue from 'vue';
  import Aplayer from 'vue-aplayer';
  import {
    getShareUrlConfig,
    pic
  } from "../../config/shareConfig";
  import fetch from "../../config/fetch";
  import {
    getCookie,
    removeCookie,
    setCookie,
    format,
    parseUrl
  } from "../../config/index";
  export default {
    components: {
      Bottombar,
      Header,
      BarChart,
      PieChart,
      LineChart,
      LineChart1,
      ShareDialog
    },
    data() {
      return {
        bondPosRate: "",
        Html: "",
        productCode: "",
        productTitle: "",
        YTMAllData: [],
        ImgagePosData: [],
        AllImgagePosData: [],
        AllPosState: false, //true代表图文持仓数据全部展开
        ShareDialogObj: {
          expiryDate: "",
          show: false,
          shareId: ""
        },
        imageText: {},
        historyData: [], // 历史数据表
        imageText: {}, // 投顾观点
        fundNavRate: {}, //涨跌幅基础信息
        accNetValueChartData: {}, //净值走势图数据
        checked: false,
        days: "",
        money: "",
        RateStates: false,
        PositionStates: false,
        CashStates: false,
        showAlls: false,
        show: false,
        StrategyMsg: {},
        StrategyLabel: [],
        max: "",
        max1: "",
        min: "",
        min1: "",
        YTMMAX: "",
        YTM: "",
        // 净值数据(单位)
        NetWorth: {
          xAxisdata: [],
          seriesdata: [{
            symbolSize: 0,
            smooth: true,
            name: "单位净值",
            type: "line",
            color: ["#7FADF8 "],
            data: [],
            type: "line"
          }]
        },
        // 净值数据(累计)
        NetWorth1: {
          xAxisdata: [],
          seriesdata: [{
            symbolSize: 0,
            smooth: true,
            name: "累计净值",
            type: "line",
            color: ["#7FADF8 "],
            data: [],
            type: "line"
          }]
        },
        YTMList: {
          xAxisdata: [],
          seriesdata: [{
              symbolSize: 0,
              smooth: true,
              name: '模拟到期(%)',
              type: "line",
              color: ["#7FADF8"],
              data: [],
              type: "line"
            },
            {
              name: '建仓比例(%)',
              color: 'rgba(0,0,0,0)',
              type: 'line',
              stack: '总量',
              data: []
            }
          ]
        },
        headerObj: {
          name: ""
        },
        images: {
          top: "../../../static/image/top.png",
          bottom: "../../../static/image/bottom.png",
          share: "../../../static/image/share.png",
          moreadvance: "../../../static/image/moreadvance.png",
          moretop: "../../../static/image/moretop.png",
          morebottom: "../../../static/image/morebottom.png",
        },
        BondList: [],
        BondArry: [],
        NoneBond: [],
        HaveBond: [],
        HaveBond1: [],
        period: "",
        moreState: "0",
        moreState1: "0",
        OneAudio: '',
        heldToMaturity: '',
        // 行业分布
        Industry: {
          legenddata: [],
          seriesdata: []
        },
        bondPosRateText: '',
        deadline: ''
      };
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
      pic() {
        return pic();
      },
      // 查看所有持仓数据
      LookMorePos() {
        this.ImgagePosData = this.AllImgagePosData;
        this.AllPosState = true;
      },
      // 数据处理
      datachange(value) {
        if (value) {
          return value.split("%")[0];
        }
      },
      moreAdvance() {
        this.$router.push("/HistoryValue?productCode=" + this.productCode);
      },
      moreAdvance1() {
        this.$router.push("/shareview?productCode=" + this.productCode + '&productTitle=' + this.productTitle +
          '&afterServiceId=' + parseUrl().id);
      },
      share() {
        this.queryCode();
        $("#ctrlC").text("复制链接");
      },
      //获取分享id
      async queryCode() {
        let queryData = await fetch.post("/v1/tacticsC/shareImageText", {
          "id": this.imageText.id,
          "afterServiceId": parseUrl().id,
          "productCode": this.productCode
        });
        if (queryData.data.status == 200) {
          this.ShareDialogObj.show = true;
          this.ShareDialogObj = {
            expiryDate: queryData.data.data.expiryDate,
            show: true,
            text: getShareUrlConfig() + queryData.data.data.shareId,
            shareId: queryData.data.data.shareId
          }
        } else {
          Dialog.alert({
            message: "分享失败"
          });
        }
      },

      Switch() {
        console.log(this.checked, "dsfsdfsd");
        if (this.checked) {
          this.Cash = this.Cash1;
          setTimeout(() => {
            this.$refs.c3.createChart();
          }, 10);
        } else {
          this.Cash = this.Cash2;
          setTimeout(() => {
            this.$refs.c3.createChart();
          }, 10);
        }
      },
      LookMore() {
        if (this.moreState == 0) {
          let NewArray = [];
          this.BondArry.forEach((value, index) => {
            if (value.bondCode) {
              NewArray.push(value);
            }
          });

          this.HaveBond = NewArray;
          console.log(this.HaveBond, " this.HaveBond");
          let len = 3 - this.HaveBond.length % 3;
          if (len > 0 && len < 3) {
            for (let i = 0; i < len; i++) {
              this.HaveBond.push({
                "bondCode": "",
                "bondRate": "",
                "shortName": "",
                "date": ""
              });
            }
          }
          this.moreState = 1;
        }
      },
      changeTime(value) {
        if (value.indexOf(" ") != -1) {
          return value.split(" ")[0];
        } else {
          return value;
        }
      },

      MoreHold() {
        this.$router.push(
          "/HoldingAnalysis?id=" + parseUrl().id,
        );
      },

      // 获取持仓情况
      GetImagePos(id) {
        axios({
          method: 'get',
          url: '/v1/tacticsC/imageTextPositions',
          headers: {
            'Authorization': "bearer " + getCookie("Token"),
          },
          params: {
            "id": id,
            "productCode": this.productCode,
          },
        }).then(response => {
          if (response.data.status == 401) {
            Dialog.alert({
              message: "Token已经过期"
            }).then(() => {
              // on close
            });
            if (getCookie('Token')) {
              removeCookie('Token');
            }
            setTimeout(() => {
              this.$router.push("/");
            }, 2000);
          }
          if (response.data.status == 200) {
            console.log(response.data.data, " 获取持仓情况");
            let data = response.data.data;
            this.deadline = data.deadline;
            this.bondPosRateText = data.bondPosRate;
            if (data.list) {
              this.AllPosState = data.list.length > 6 ? false : true;
              let ImgagePosData = data.list;
              let BeforeData = [];
              if (ImgagePosData.length > 6) {
                this.AllImgagePosData = ImgagePosData;
                ImgagePosData.forEach((item, index) => {
                  if (index < 6) {
                    BeforeData.push(item);
                  }
                })
                this.ImgagePosData = BeforeData;
              } else {
                this.ImgagePosData = ImgagePosData;
              }



            }
          } else {
            Dialog.alert({
              message: response.data.msg
            }).then(() => {
              // on close
            });
          }
        })
      },


      // 获取产品详情的聚合接口
      GetProductDetail() {
        Toast.loading({
          duration: '0',
          mask: true,
          message: '正在加载...'
        });
        axios({
          method: "get",
          url: "/v1/tacticsC/productDetail",
          headers: {
            Authorization: "bearer " + getCookie("Token")
          },
          params: {
            "id": parseUrl().id,
          }
        }).then(response => {
          if (response.data.status == 401) {
            Dialog.alert({
              message: "Token已经过期"
            }).then(() => {
              // on close
            });
            if (getCookie("Token")) {
              removeCookie("Token");
            }
            setTimeout(() => {
              this.$router.push("/");
            }, 2000);
          }
          if (response.data.status == 200) {
            this.GetStrategyBondList();
            console.log(response.data.data, " 获取产品详情");
            let data = response.data.data;
            this.productCode = data.productCode;
            this.productTitle = data.productTitle;
            this.headerObj.name = this.productName(this.productTitle);
            this.Html = data.imageText.content;
            this.imageText = data.imageText;
            this.heldToMaturity = data.heldToMaturity;
            if (data.imageText.id && data.imageText.id != 'null') {
              this.GetImagePos(data.imageText.id);
            }
            // 历史数据表
            this.historyData = data.historyNetValueList;
            // 投顾观点
            this.imageText = data.imageText;
            // 最新净值和日涨跌幅
            this.fundNavRate = data.fundNavRate
            // 净值走势图
            this.accNetValueChartData = data.accNetValueChartData;
            // 单位净值图表数据
            this.NetWorth.xAxisdata = data.netValueChartData.lineChartData.x_Title;
            this.NetWorth.seriesdata[0].data = data.netValueChartData.lineChartData.oneLineData;
            let maxA = Math.max.apply(null, this.NetWorth.seriesdata[0].data);
            let minA = Math.min.apply(null, this.NetWorth.seriesdata[0].data);
            this.min = Math.ceil(minA / 0.02) * 0.02;
            this.max = Math.ceil(maxA / 0.02) * 0.02;

            console.log(this.NetWorth, "单位净值");
            if (this.$refs.c1) {
              setTimeout(() => {
                this.$refs.c1.createChart();
              }, 10);
            }
            // 累计净值图表数据
            this.NetWorth1.xAxisdata = data.accNetValueChartData.lineChartData.x_Title;
            this.NetWorth1.seriesdata[0].data = data.accNetValueChartData.lineChartData.oneLineData;
            let maxAA = Math.max.apply(null, this.NetWorth1.seriesdata[0].data);
            let minAA = Math.min.apply(null, this.NetWorth1.seriesdata[0].data);
            this.max1 = Math.ceil(maxAA / 0.02) * 0.02;
            this.min1 = Math.ceil(minAA / 0.02) * 0.02;
            if (this.$refs.c2) {
              setTimeout(() => {
                this.$refs.c2.createChart();
              }, 10);
            }

            // 组合YTM数据
            if (this.heldToMaturity == 1) {
              let YTMList = data.fundYTMList;
              this.YTMAllData = data.fundYTMList;
              let x_Title = [];
              let MyData = [];
              let MyData1 = [];
              data.fundYTMList.forEach((value, index) => {
                x_Title.push(value.date);
                let fundYTM = (value.fundYTM * 100).toFixed(2);
                let bondRate = (value.bondRate * 100).toFixed(2);
                MyData.push(fundYTM);
                MyData1.push(bondRate);
              })
              this.YTMList.xAxisdata = x_Title;
              this.YTMList.seriesdata[0].data = MyData;
              this.YTMList.seriesdata[1].data = MyData1;

              // let YTMMAXArray = MyData.sort((a, b) => {
              //   return a - b;
              // });
              this.YTMMAX = Math.max.apply(null, MyData);
              console.log( this.YTMMAX," this.YTMMAX");
              if (this.$refs.c3) {
                setTimeout(() => {
                  this.$refs.c3.createChart();
                }, 10);
              }
            }

          } else {
            Dialog.alert({
              message: response.data.msg
            });
          }
        });
      },

      // 获取持仓详情和行业分布列表
      GetStrategyBondList() {
        axios({
          method: "get",
          url: "/v1/tacticsC/getProductDetailPositions",
          headers: {
            Authorization: "bearer " + getCookie("Token")
          },
          params: {
            "id": parseUrl().id,
          }
        }).then(response => {
          Toast.clear();
          if (response.data.status == 401) {
            Dialog.alert({
              message: "Token已经过期"
            }).then(() => {
              // on close
            });
            if (getCookie("Token")) {
              removeCookie("Token");
            }
            setTimeout(() => {
              this.$router.push("/");
            }, 2000);
          }
          if (response.data.status == 200) {
            console.log(response.data.data, " 获取持仓详情和行业分布列表");
            let data = response.data.data;
            this.bondPosRate = data.bondPosRate;
            console.log(this.bondPosRate, "%%%%%%%%%%%%%%%%");

            // 持仓详情
            if (data.poslist) {
              this.BondArry = data.poslist;
              let NoneBond = [];
              let HaveBond = [];
              let HaveBond1 = [];
              if (this.BondArry.length <= 9) {
                NoneBond = this.BondArry;
                let length = 9 - NoneBond.length;
                for (let i = 0; i < length; i++) {
                  NoneBond.push({});
                }
                this.NoneBond = NoneBond;
                console.log(NoneBond, "NoneBond");
              } else {
                for (let i = 0; i < 9; i++) {
                  HaveBond.push(this.BondArry[i]);
                  HaveBond1.push(this.BondArry[i]);
                }
                this.HaveBond = HaveBond;
                this.HaveBond1 = HaveBond1;
              }
            }
            // 行业分布Industry
            if (data.bondIndustry) {
              let IndustryData = data.bondIndustry;
              for (let position of IndustryData) {
                position.name = position.name.split(" ")[0];
                position.value = (position.value * 100).toFixed(2);
              }
              this.Industry.seriesdata = IndustryData;
              if (this.$refs.c4) {
                setTimeout(() => {
                  this.$refs.c4.createChart();
                }, 10);
              }
            }
          } else {
            Dialog.alert({
              message: response.data.msg
            });
          }
        });
      },
      changeTab(event) {
        let ev = event.currentTarget;
        console.log(ev, "%%%%%%%%%%");
      },
      RateState() {
        this.RateStates = !this.RateStates;
      },
      PositionState() {
        this.PositionStates = !this.PositionStates;
      },
      CashState() {
        this.CashStates = !this.CashStates;
      },
      showAll() {
        this.showAlls = !this.showAlls;
        if (this.showAlls) {
          // 图文处理
          setTimeout(() => {
            // 音频处理
            let OneAudio = document.querySelector(".ChartMsg  audio");
            this.OneAudio = OneAudio;
            // console.log(this.OneAudio, "***********this.OneAudio**********");
            // console.log(OneAudio.parentNode, "***********OneAudio.parentNode**********");
            if (OneAudio) {
              let src = OneAudio.getAttribute("src");
              let message = {
                src: src,
                pic: "../../../static/image/audiobg.png",
              };
              message = JSON.stringify(message);
              let link = '<Aplayer :music=' + "'" + message + "'" + '> </Aplayer>';

              var Profile = Vue.extend({
                components: {
                  Aplayer
                },
                template: link
              })
              // 创建一个 Profile 实例
              var profile = new Profile({
                data: {}
              })
              // 挂载到元素上
              profile.$mount(OneAudio.parentNode)
            }
            // 图片处理
            let DefaultImage = document.querySelector("#DefaultAudio");
            if (DefaultImage) {
              DefaultImage.style.display = 'none';
            }
            let ImgArr = document.querySelectorAll(".ChartMsg  img");
            for (let i = 0; i < ImgArr.length; i++) {
              ImgArr[i].style.width = "100%";
            }
            // 文字处理
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

            if (this.imageText.layout == 1) {
              let PArr = document.querySelectorAll(".ChartMsg");
              for (let i = 0; i < PArr.length; i++) {
                PArr[i].style.marginBottom = "0";
                PArr[i].style.marginTop = "0";
                PArr[i].style.fontSize = ".373rem";
                PArr[i].style.lineHeight = ".58rem";
                PArr[i].style.color = "#000";
                PArr[i].style.fontFamily = "PingFangSC-Regular";
              }
            }
          }, 10)
        }
      },
      bondMsg(value) {
        console.log(value, "value");
        this.$router.push("/BondDetail?m_BuildTime=" + value.date + "&bondCode=" + value.bondCode + "&shortName=" +
          value.shortName + "&period=" + value.date);
      },
      DialogRisk() {
        Dialog.alert({
          message: "此收益率预测是在假定债券当前到期收益率且再投资的收益率等于当前到期收益率的情况下得到的，不构成策略未来业绩表现的保证，策略有风险，投资需谨慎",
          closeOnClickOverlay: true
        }).then(() => {
          // on close
        });
      },
      // 剩余时间
      Surplus(value) {
        let days =
          (Date.parse(value) - Date.parse(format())) / (24 * 3600 * 1000 * 365);
        return days;
      },
      Compliance() {
        // this.show = true;
      }
    },
    created: function () {},
    mounted: function () {
      setCookie('productName', parseUrl().name)
      this.GetProductDetail();
    }
  };

</script>
<style>
  .van-tabs__line {
    bottom: 4px;
    background-color: #2f78ed;
  }

  .van-tab--active {
    color: #2f78ed;
  }

  .van-tabs__wrap {
    height: 1.307rem !important;
    background: #fafafa;
    padding: 0.293rem 0;
    box-sizing: border-box;
  }

  .van-tabs__content {
    padding-top: 0.293rem;
  }

  .Detail .van-modal {
    z-index: 99999999 !important;
  }

  .van-dialog__confirm,
  .van-dialog__confirm:active {
    color: #007aff;
  }

  .van-dialog {
    width: 6.56rem;
    /* height: 4.24rem; */
    border-radius: 0.147rem;
    z-index: 999999999 !important;
    font-size: 0.34rem;
    color: #2c3e50;
    line-height: 0.54rem !important;
  }

  .activetick {
    padding: 0.133rem 0.267rem;
    box-sizing: border-box;
    width: 85%;
    height: 93%;
    overflow-y: scroll;
    border-radius: 0.147rem;
    font-size: 0.34rem;
    z-index: 999999999 !important;
  }

  .reset .van-tabs__nav--card .van-tab {
    border-right: none;
  }

  .Product_state .van-tabs__nav--card .van-tab {
    border-right: none;
  }

  .reset .van-tabs__nav--card .van-tab {
    color: #4a90e2;
  }

  .Product_state .van-tabs__nav--card .van-tab {
    color: #9b9b9b;
  }

  .reset .van-tabs__nav--card {
    width: 4.2rem;
    height: 0.693rem;
    margin: 0 auto;
  }

  .reset .van-tabs__nav--card .van-tab.van-tab--active {
    background: #4a90e2;
    color: white;
  }

  .Product_state .van-tabs__nav--card .van-tab.van-tab--active {
    background: #f2f2f2;
    color: #4a4a4a;
  }

  .reset .van-tabs__nav--card {
    border: 1px solid #4a90e2;
  }

  .Product_state .van-tabs__nav--card {
    border: 1px solid #eaeaea;
  }

</style>
<style scoped>
  .btn_change_show {
    text-align: center;
    margin: 0.16rem 0.4rem;
  }

  .btn_change_show img {
    width: 0.373rem;
  }

  .btn_change_show span {
    font-size: 0.32rem;
    color: #8e8e93;
  }

  .font-des {
    padding: 0.32rem 0.427rem;
    box-sizing: border-box;
    font-size: 0.34rem;
    color: #666666;
  }

  #Smallintroduction,
  #introduction {
    padding: 0.2rem 0.427rem;
    box-sizing: border-box;
    font-size: 0.34rem;
    color: #666666;
    background: white;
  }

  #Smallintroduction {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .echarts {
    width: 100%;
    height: 5.333rem;
  }

  .van-button {
    width: 3.4rem;
    height: 0.64rem;
    border-radius: 0.467rem;
    line-height: 0.64rem;
  }

  .btn {
    text-align: center;
  }

  .strangy_comtent {
    background: white;
  }

  .Detail {
    background: #f8f8f8;
    padding-bottom: 0.8rem;
    box-sizing: border-box;
  }

  .strangy_details .head {
    background-color: #4a90e2;
    padding: 0.653rem;
    box-sizing: border-box;
  }

  .strangy_details .head img {
    height: 2.533rem;
  }

  .head_title {
    display: inline-block;
    text-align: center;
    width: 100%;
    height: 0.693rem;
    font-size: 0.373rem;
    line-height: 0.693rem;
    color: #aecbf5;
  }

  .head_number {
    display: inline-block;
    text-align: center;
    width: 100%;
    height: 0.933rem;
    line-height: 0.933rem;
    font-size: 0.64rem;
    color: #ffffff;
  }

  .head_day {
    /* float: left;
    width: 50%;
    text-align: center; */
    display: inline-block;
    width: 100%;
    text-align: right;
    padding-right: 1.067rem;
    box-sizing: border-box;
  }

  .head_day span {
    display: block;
  }

  .head_day span:nth-child(1) {
    color: #aecbf5;
    font-size: 0.373rem;
  }

  .head_day span:nth-child(2) {
    color: white;
    font-size: 0.48rem;
  }

  .labels {
    width: 100%;
    padding: 0.267rem 0.267rem 0rem 0.267rem;
    box-sizing: border-box;
    background-color: #ffffff;
  }

  .labels_msg span {
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #000000;
    font-size: 0.48rem;
    font-weight: bold;
    float: left;
  }

  .labels_msg font {
    font-size: 0.32rem;
    color: #366eaf;
    font-weight: bold;
  }

  .labels_msg img {
    display: inline-block;
    width: 0.373rem;
  }

  .img_font {
    display: inline-block;
    margin-left: 0.267rem;
    padding: 0.133rem 0.267rem;
    box-sizing: border-box;
  }

  .Bond .van-col .only_bond {
    width: 100%;
    height: 2.213rem;
    border-radius: 0.033rem;
  }

  .Bond .van-col .only_bond .noBond {
    display: block;
    color: #9cb1c9;
    text-align: center;
    line-height: 2.213rem;
    font-size: 0.373rem;
    font-weight: bold;
  }

  .Bond .van-col .only_bond .haveBond {
    width: 100%;
    height: 100%;
    padding: 0.14rem 0.133rem;
    box-sizing: border-box;
  }

  .Bond .van-col .only_bond .haveBond .peopleName {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-justify-content: center;
    justify-content: center;
    -moz-box-pack: center;
    box-pack: center;

    align-items: center;
    -webkit-align-items: center;
    box-align: center;
    -moz-box-align: center;
    -webkit-box-align: center;
    /* display: block; */
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 0.34rem;
    /* padding: .4rem 0; */
    box-sizing: border-box;
    font-weight: bold;
  }

  .Bond .van-col .only_bond .haveBond .name {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    -webkit-justify-content: center;
    justify-content: center;
    -moz-box-pack: center;
    box-pack: center;

    align-items: center;
    -webkit-align-items: center;
    box-align: center;
    -moz-box-align: center;
    -webkit-box-align: center;

    width: 100%;
    text-align: center;
    font-size: 0.32rem;
    line-height: 0.533rem;
    font-weight: bold;
    height: 1.1rem;
  }

  .Bond .van-col .only_bond .haveBond .number {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 0.533rem;
    line-height: 0.853rem;
    font-weight: bold;
    color: #f23e4c;
  }

  .Bond .van-col .only_bond .haveBond .time {
    display: block;
    width: 100%;
    text-align: right;
    font-size: 0.32rem;
    color: #404f66;
    line-height: 0.533rem;
  }

  .Bond .van-col div:nth-child(3n + 1) {
    margin-top: 5px;
    box-sizing: border-box;
  }

  .Bond {
    padding: 0.293rem;
    box-sizing: border-box;
  }

  .no {
    background: #e4eefb;
  }

  .small {
    background: #ecf3fc;
  }

  .medial {
    background: #dbe9f9;
  }

  .big {
    background: #c8ddf6;
  }

  .large {
    background: #b6d3f3;
  }

  .one_detail {
    padding: 0.267rem 0 0.373rem;
    box-sizing: border-box;
    margin-bottom: 0.267rem;
    background: white;
  }

  .one_detail .title {
    color: #4a4a4a;
    display: block;
    text-align: left;
    line-height: 0.373rem;
    font-size: 0.373rem;
    margin-bottom: 0.32rem;
    margin-left: 0.293rem;
  }

  .history .list {
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    color: #666666;
    font-size: 0.32rem;
  }

  .list_data {
    background: white;
  }

  .list_data .one_data {
    height: 1.067rem;
    line-height: 1.067rem;
    text-align: center;
    font-size: 0.32rem;
    color: #666666;
  }

  .moreAdvance {
    line-height: 0.8rem;
    text-align: right;
    height: 0.8rem;
    font-size: 0.373rem;
    color: #60739c;
    background: white;
    padding-right: 0.293rem;
    box-sizing: border-box;
  }

  .moreAdvance img {
    width: 0.373rem;
  }

</style>
