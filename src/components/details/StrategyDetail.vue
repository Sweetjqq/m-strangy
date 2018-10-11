<template>
  <div class="Detail">
    <Header ref="header" :headerObj="headerObj"></Header>
    <div class="strangy_details">
      <!-- <div class="head">
        <label class="head_title">预计到期收益率</label>
        <label class="head_number">{{YTM}}</label>
        <label class="head_day">
          <span>投资期限</span>
          <span>{{days}}天</span>
        </label>
        <img src="../../../static/image/headbg.png">
      </div>
      <div class="van-hairline--bottom">
        <div class="labels">
          <div class="labels_msg">
            <span>{{StrategyMsg.Name}}</span>
            <label class="img_font" @click="showAll">
              <font>详情</font>
              <img :src="images.top" v-if="!showAlls">
              <img :src="images.bottom" v-else>
            </label>
          </div>
          <div style="margin-top: .133rem">
            <van-tag plain type="success" style="color:#7ED321 " v-if="StrategyLabel[0]">{{StrategyLabel[0]}}</van-tag>
            <van-tag plain type="primary" style="color: #1396FF; " v-if="StrategyLabel[1]">{{StrategyLabel[1]}}</van-tag>
            <van-tag plain type="danger" style="color: #FF9401; " v-if="StrategyLabel[2]">{{StrategyLabel[2]}}</van-tag>
          </div>
        </div>
        <div>
          <div class="msg van-hairline--top" v-if='showAlls' id="introduction">{{StrategyMsg.Description}}</div>
        </div>
      </div> -->
      <div class='one_detail' style="padding-top: .133rem;box-sizing: border-box;padding-bottom: 0" v-if='imageText!=null'>
        <label class="title" style="text-align: right;margin-right: .2rem">
          <img src="../../../static/image/yzamc.png" style="width:1.6rem" />
        </label>
        <span style="display: block;padding: .2rem .2rem 0;box-sizing: border-box;font-size: .4rem;font-weight: bold;">{{StrangyTitle}}</span>
        <!-- <Aplayer v-if='OneAudio!=null' id="aplayer" class="audio" ref="player" :music="picmusic"></Aplayer> -->
        <div class="ChartMsg" v-html="Html"></div>
      </div>
      <!-- 组合信息 -->
      <div class='one_detail' style="padding: .4rem .2rem;box-sizing: border-box">
        <label class="title" style="text-align: center">
          <span style="font-size: .4rem;color:#000000;font-weight: 550 ">{{strategyName}}</span>
        </label>
        <div class="combination">
          <van-row>
            <van-col span="8">
              <label class="number">{{indicator.benchMark}}</label>
              <label class="msg" @click="ControlPop(1)">
                <font>基准收益</font>
                <van-icon name="warn" />
              </label>
            </van-col>
            <van-col span="8">
              <label class="number">{{indicator.ytm}}</label>
              <label class="msg" @click="ControlPop(2)">
                <font>组合YTM</font>
                <van-icon name="warn" />
              </label>
            </van-col>
            <van-col span="8">
              <label class="number">{{indicator.coupon}}</label>
              <label class="msg" @click="ControlPop(3)">
                <font>票息</font>
                <van-icon name="warn" />
              </label>
            </van-col>
          </van-row>
          <van-row style="margin-top: .267rem">
            <van-col span="8">
              <label class="number">{{indicator.ttm}}</label>
              <label class="msg" @click="ControlPop(4)">
                <font>剩余期限</font>
                <van-icon name="warn" />
              </label>
            </van-col>
            <van-col span="8">
              <label class="number">{{indicator.duration}}</label>
              <label class="msg" @click="ControlPop(5)">
                <font>久期</font>
                <van-icon name="warn" />
              </label>
            </van-col>
            <van-col span="8">
              <label class="number">{{indicator.level}}</label>
              <label class="msg" @click="ControlPop(6)">
                <font>杠杆率</font>
                <van-icon name="warn" />
              </label>
            </van-col>
          </van-row>
        </div>
      </div>


      <!-- 风险提示 | 合规 -->
      <div class='one_detail' style="background-color: #FAFAFA;height:1rem;line-height: 1rem" @click="Compliance">
        <label class="title" style="margin-top:.2rem">
          <span style="float: left;color: #007AFF " @click="showMsg">风险提示 | 合规</span>
        </label>
      </div>

      <!-- 债券和发行人列表 -->
      <div class='one_detail' style="padding-top: 0">
        <div class="strangy_comtent">
          <div style="padding-top: 0rem;box-sizing: border-box;">
            <van-tabs type="card" class="reset">
              <van-tab title="债券">

                <div class="Bond" style="margin-top: .16rem">
                  <van-row gutter="5">
                    <!-- 超过9条 -->
                    <div v-if="BondArry.length>9" class="haveNine" style="padding: .067rem 0">
                      <van-col span="8" v-for="(bond,index) in HaveBond" :key="index">
                        <div class="only_bond" :class="{
                            no:bond.InterestEndDate==null||!bond.InterestEndDate,
                            small:Surplus(bond.InterestEndDate)<=0.5,
                            medial:Surplus(bond.InterestEndDate)<=1&&Surplus(bond.InterestEndDate)>0.5,
                            big:Surplus(bond.InterestEndDate)<=1.5&&Surplus(bond.InterestEndDate)>1,
                            large:Surplus(bond.InterestEndDate)>1.5
                          }">
                          <div class="haveBond">
                            <div v-if="bond.Code" @click="bondMsg(bond)">
                              <span class="name">{{bond.ShortName}}</span>
                              <span class="number">{{bond.ROR}}%</span>
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
                            no:!bond.InterestEndDate||bond.InterestEndDate==null,
                            small:Surplus(bond.InterestEndDate)<=0.5,
                            medial:Surplus(bond.InterestEndDate)<=1&&Surplus(bond.InterestEndDate)>0.5,
                            big:Surplus(bond.InterestEndDate)<=1.5&&Surplus(bond.InterestEndDate)>1,
                            large:Surplus(bond.InterestEndDate)>1.5
                          }">
                          <div v-if="bond.InterestEndDate" class="haveBond" @click="bondMsg(bond)">
                            <span class="name">{{bond.ShortName}}</span>
                            <span class="number">{{bond.ROR}}%</span>
                            <!-- <span class="time">{{changeTime(bond.InterestEndDate)}}</span> -->
                          </div>
                          <span class="noBond" v-else-if='BondArry.length<10'>暂无</span>
                        </div>
                      </van-col>
                    </div>
                  </van-row>
                </div>
                <div class="btn" v-if="BondArry.length>9">
                  <van-button type="default" @click="LookMore" v-if="moreState==0">点击查看更多</van-button>
                </div>
              </van-tab>
              <van-tab title="发行人">
                <div class="Bond" style="margin-top: .16rem">
                  <van-row gutter="5">
                    <!-- 超过9条 -->
                    <div v-if="BondArry.length>9" class="haveNine" style="padding: .067rem 0">
                      <van-col span="8" v-for="(bond,index) in HaveBond1" :key="index">
                        <div class="only_bond" :class="{
                        no:!bond.InterestEndDate||bond.InterestEndDate==null,
                        small:Surplus(bond.InterestEndDate)<=0.5,
                        medial:Surplus(bond.InterestEndDate)<=1&&Surplus(bond.InterestEndDate)>0.5,
                        big:Surplus(bond.InterestEndDate)<=1.5&&Surplus(bond.InterestEndDate)>1,
                        large:Surplus(bond.InterestEndDate)>1.5
                        }">
                          <div class="haveBond" @click="peopleMsg(bond)" v-if="bond.Code">
                            <span class="peopleName">{{bond.CompName}}</span>
                          </div>
                          <span class="noBond" v-else>暂无</span>
                        </div>
                      </van-col>
                    </div>
                    <!-- 不够9条 -->
                    <div v-if="BondArry.length<=9">
                      <van-col span="8" v-for="(bond,index) in NoneBond" :key="index">
                        <div class="only_bond" :class="{
                              no:!bond.InterestEndDate||bond.InterestEndDate==null,
                              small:Surplus(bond.InterestEndDate)<=0.5,
                              medial:Surplus(bond.InterestEndDate)<=1&&Surplus(bond.InterestEndDate)>0.5,
                              big:Surplus(bond.InterestEndDate)<=1.5&&Surplus(bond.InterestEndDate)>1,
                              large:Surplus(bond.InterestEndDate)>1.5
                            }">
                          <div v-if="bond.InterestEndDate" class="haveBond" @click="peopleMsg(bond)">
                            <span class="peopleName">{{bond.CompName}}</span>
                          </div>
                          <span class="noBond" v-else-if='BondArry.length<10'>暂无</span>
                        </div>
                      </van-col>
                    </div>


                  </van-row>
                </div>
                <div class="btn" v-if="BondArry.length>9">
                  <van-button type="default" @click="LookMore1" v-if="moreState1==0">点击查看更多</van-button>
                </div>
              </van-tab>
            </van-tabs>
          </div>
        </div>
      </div>

      <!-- 持仓分布 -->
      <div class='one_detail'>
        <label class="title">
          <span style="float: left">持仓分布</span>
        </label>
        <div class="echarts" style="margin-top: .667rem">
          <PieChart id="Position " :options='Position ' class="echart" ref="c2"></PieChart>
        </div>
        <div class="font-des" v-show="PositionStates">{{StrategyMsg.posDistributeDesp}}</div>
        <div class="btn_change_show" @click="PositionState">
          <div v-if="PositionStates">
            <img :src="images.bottom" />
            <span>收起</span>
          </div>
          <div v-else>
            <img :src="images.top" />
            <span>展开</span>
          </div>
        </div>
      </div>

      <!-- 现金流到期 -->
      <div class='one_detail'>
        <div>
          <label class="title" style="float: left">
            <span style="float: left">现金流</span>
          </label>
          <label class="title" style="float: right;margin-right: .32rem;margin-top: .12rem;">
            <span v-if="!checked">到期日</span>
            <span v-else>行权日</span>
          </label>
          <van-switch v-model="checked" :value="checked" size='.6rem' style="float: right;margin-right: .06rem" @change='Switch' />
        </div>
        <div class="echarts" style="margin-top: .667rem">
          <BarChart id="Cash " :options='Cash' class="echart" :money="money" ref="c3" :options1='AddCash'></BarChart>
        </div>
        <div class="font-des" v-show="CashStates">{{StrategyMsg.cashFlowDistributeDesp}}</div>
        <div class="btn_change_show" @click="CashState">
          <div v-if="CashStates">
            <img :src="images.bottom" />
            <span>收起</span>
          </div>
          <div v-else>
            <img :src="images.top" />
            <span>展开</span>
          </div>
        </div>

      </div>

      <div v-if="ChartStates">
        <!-- 到期时间 -->
        <div class='one_detail'>
          <div>
            <label class="title" style="float: left">
              <span style="float: left">到期时间</span>
            </label>
            <label class="title" style="float: right;margin-right: .32rem;margin-top: .12rem;">
              <span v-if="!checked1">到期日</span>
              <span v-else>行权日</span>
            </label>
            <van-switch v-model="checked1" :value="checked1" size='.6rem' style="float: right;margin-right: .06rem"
              @change='Switch1' />
          </div>
          <div class="echarts" style="margin-top: .667rem">
            <PieChart id="ExpireTime " :options='ExpireTime ' class="echart" ref="c4"></PieChart>
          </div>
          <div class="font-des" v-show="ExpireStates">{{StrategyMsg.dueTimeDesp}}</div>
          <div class="btn_change_show" @click="ExpireState">
            <div v-if="ExpireStates">
              <img :src="images.bottom" />
              <span>收起</span>
            </div>
            <div v-else>
              <img :src="images.top" />
              <span>展开</span>
            </div>
          </div>
        </div>

        <!-- 行业分布 -->
        <div class='one_detail'>
          <label class="title">
            <span style="float: left">行业分布</span>
          </label>
          <div class="echarts" style="margin-top: .667rem">
            <PieChart id="Industry " :options='Industry ' class="echart" ref="c1"></PieChart>
          </div>
          <div class="font-des" v-show="IndustryStates">{{StrategyMsg.industryDistributeDesp}}</div>
          <div class="btn_change_show" @click="IndustryState">
            <div v-if="IndustryStates">
              <img :src="images.bottom" />
              <span>收起</span>
            </div>
            <div v-else>
              <img :src="images.top" />
              <span>展开</span>
            </div>
          </div>
        </div>

        <!-- 主体评级 -->
        <div class='one_detail'>
          <label class="title">
            <span style="float: left">主体评级</span>
          </label>
          <div class="echarts" style="margin-top: .667rem">
            <PieChart id="Subject " :options='Subject' class="echart" ref="c5"></PieChart>
          </div>
          <div class="font-des" v-show="SubjectStates">{{StrategyMsg.debtRatDistributeDesp}}</div>
          <div class="btn_change_show" @click="SubjectState">
            <div v-if="SubjectStates">
              <img :src="images.bottom" />
              <span>收起</span>
            </div>
            <div v-else>
              <img :src="images.top" />
              <span>展开</span>
            </div>
          </div>
        </div>

        <!-- 债项评级 -->
        <div v-if="ChartStates">
          <div class='one_detail'>
            <label class="title">
              <span style="float: left">债项评级</span>
            </label>
            <div class="echarts" style="margin-top: .667rem">
              <PieChart id="Debt " :options='Debt' class="echart" ref="c6"></PieChart>
            </div>
            <div class="font-des" v-show="DebtStates">{{StrategyMsg.debtRatDistributeDesp}}</div>
            <div class="btn_change_show" @click="DebtState">
              <div v-if="DebtStates">
                <img :src="images.bottom" />
                <span>收起</span>
              </div>
              <div v-else>
                <img :src="images.top" />
                <span>展开</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="MoreChart">
        <div class="btn_change_show" @click="ChartState">
          <div v-if="ChartStates">
            <span>收起</span>
            <img :src="images.morebottom" />
          </div>
          <div v-else>
            <span>展开更多</span>
            <img :src="images.moretop" />
          </div>
        </div>
      </div>

    </div>
    <Bottombar></Bottombar>

  </div>

</template>

<script>
  import {
    Tag,
    Icon,
    Dialog,
    Popup,
    Toast,
    Switch
  } from 'vant';
  import Aplayer from 'vue-aplayer';
  import Bottombar from '../common/Bottombar.vue'
  import Header from '../common/Header.vue'
  import BarChart from '../EchartsConponents/BarChart.vue'
  import LineChart from '../EchartsConponents/LineChart.vue'
  import PieChart from '../EchartsConponents/PieChart.vue'
  import Vue from 'vue'
  import {
    getCookie,
    removeCookie,
    setCookie,
    format,
    parseUrl,
  } from '../../config/index'
  export default {
    components: {
      Bottombar,
      Header,
      BarChart,
      PieChart,
      LineChart,
      Aplayer
    },
    data() {
      return {
        OneAudio: "",
        // Benchmark: false,
        StrangyTitle: "",
        strategyName: "",
        picmusic: {
          url: 'default.mp3',
          pic: "../../../static/image/audiobg.png",
          lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
        },
        Html: '',
        checked: false,
        checked1: false,
        days: "",
        money: "",

        PositionStates: false,
        CashStates: false,
        ExpireStates: false,
        IndustryStates: false,
        SubjectStates: false,
        DebtStates: false,
        ChartStates: false,

        showAlls: false,
        show: false,
        StrategyMsg: {},
        StrategyLabel: [],
        max: "",
        YTM: "",
        // 收益率
        Rate: {
          xAxisdata: [],
          seriesdata: [{
              // areaStyle: {
              //   color: {
              //     type: 'linear',
              //     x: 0,
              //     y: 0,
              //     x2: 0,
              //     y2: 1,
              //     colorStops: [{
              //       offset: 0,
              //       color: '#88bbec' // 0% 处的颜色
              //     }, {
              //       offset: 1,
              //       color: '#ffffff' // 100% 处的颜色
              //     }],
              //     globalCoord: false // 缺省为 false
              //   }
              // },
              symbolSize: 0,
              smooth: true,
              name: '组合',
              type: 'line',
              color: ['#7FADF8 '],
              data: [],
              type: 'line'
            },
            {
              // areaStyle: {
              //   color: {
              //     type: 'linear',
              //     x: 0,
              //     y: 0,
              //     x2: 0,
              //     y2: 1,
              //     colorStops: [{
              //       offset: 0,
              //       color: '#e98081' // 0% 处的颜色
              //     }, {
              //       offset: 1,
              //       color: '#ffffff' // 100% 处的颜色
              //     }],
              //     globalCoord: false // 缺省为 false
              //   }
              // },
              symbolSize: 0,
              smooth: true,
              name: '基准',
              type: 'line',
              color: ['#FF5F67'],
              data: [],
              type: 'line'
            }
          ]
        },
        // 持仓分布
        Position: {
          legenddata: [],
          seriesdata: []
        },
        // 行业分布
        Industry: {
          legenddata: [],
          seriesdata: []
        },
        // 主体评级
        Subject: {
          legenddata: [],
          seriesdata: []
        },
        Debt: {
          legenddata: [],
          seriesdata: []
        },
        // 到期时间
        ExpireTime: {
          legenddata: [],
          seriesdata: []
        },
        // 到期时间(到期)
        ExpireTime1: {
          legenddata: [],
          seriesdata: []
        },
        // 到期时间(行权)
        ExpireTime2: {
          legenddata: [],
          seriesdata: []
        },
        // 现金流
        Cash: {
          xAxisdata: [],
          seriesdata: []
        },
        Cash1: {
          xAxisdata: [],
          seriesdata: []
        },
        Cash2: {
          xAxisdata: [],
          seriesdata: []
        },
        // 累计现金流
        AddCash: {
          xAxisdata: [],
          seriesdata: []
        },
        AddCash1: {
          xAxisdata: [],
          seriesdata: []
        },
        AddCash2: {
          xAxisdata: [],
          seriesdata: []
        },
        headerObj: {
          name: '策略详情'
        },
        images: {
          top: "../../../static/image/top.png",
          bottom: "../../../static/image/bottom.png",
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
        indicator: {},
        imageText: {}
      }
    },
    methods: {
      ChartState() {
        this.ChartStates = !this.ChartStates;
        if (this.ChartStates) {
          setTimeout(() => {
            this.$refs.c6.createChart();
            this.$refs.c5.createChart();
            this.$refs.c4.createChart();
            this.$refs.c1.createChart();
          }, 10)
        }
      },
      ExpireState() {
        this.ExpireStates = !this.ExpireStates;
      },
      IndustryState() {
        this.IndustryStates = !this.IndustryStates;
      },
      SubjectState() {
        this.SubjectStates = !this.SubjectStates;
      },
      DebtState() {
        this.DebtStates = !this.DebtStates;
      },
      showMsg() {
        this.$router.push("/detailmsg");
      },
      // 控制弹出层显示
      ControlPop(number) {
        let message;
        if (number == 1) {
          message = this.indicator.benchMarkName + ',更新日期' + this.indicator.benchMarkDate;
        } else if (number == 2) {
          message = "使用债券YTM指标,如果是含权债使用行权收益率，以面值为权重计算的到期收益率";
        } else if (number == 3) {
          message = "使用债券票息指标，以面值为权重，计算的票息";
        } else if (number == 4) {
          message = "当策略含有含权债，则显示成a+b形式，a表示行权日对应的剩余期限，b表示到期日对应的剩余期限；当策略不含有含权债时，只显示b";
        } else if (number == 5) {
          message = "使用债券久期指标，基于中证估值数据，以面值为权重，计算的策略久期";
        } else if (number == 6) {
          message = "杠杆率等于债券总市值/投资金额";
        }
        Dialog.alert({
          message: message,
          closeOnClickOverlay: true
        }).then(() => {
          // on close
        });
      },
      Switch() {
        console.log(this.checked, 'dsfsdfsd');
        if (this.checked) {
          this.Cash = this.Cash1;
          this.AddCash = this.AddCash2;
          setTimeout(() => {
            this.$refs.c3.createChart();
          }, 10)
        } else {
          this.Cash = this.Cash2;
          this.AddCash = this.AddCash1
          setTimeout(() => {
            this.$refs.c3.createChart();
          }, 10)
        }
      },
      Switch1() {
        console.log(this.checked1, 'dsfsdfsd');
        if (!this.checked1) {
          this.ExpireTime = this.ExpireTime1;
          setTimeout(() => {
            this.$refs.c4.createChart();
          }, 10)
        } else {
          this.ExpireTime = this.ExpireTime2;
          setTimeout(() => {
            this.$refs.c4.createChart();
          }, 10)
        }
      },
      LookMore() {
        if (this.moreState == 0) {
          let NewArray = [];
          this.BondArry.forEach((value, index) => {

            if (value.Code) {
              NewArray.push(value);
            }
          });


          this.HaveBond = NewArray;
          console.log(this.HaveBond, " this.HaveBond");
          let len = 3 - (this.HaveBond.length) % 3;
          if (len > 0 && len < 3) {
            for (let i = 0; i < len; i++) {
              this.HaveBond.push({
                "ShortName": "",
                "ROR": "",
                "InterestEndDate": ""
              });
            }
          }
          this.moreState = 1;
          this.LookMore1();
        }


      },
      changeTime(value) {
        if (value.indexOf(" ") != -1) {
          return value.split(" ")[0];
        } else {
          return value;
        }
      },
      LookMore1() {
        if (this.moreState1 == 0) {
          let NewArray = [];
          this.BondArry.forEach((value, index) => {
            if (value.Code) {
              NewArray.push(value);
            }
          });
          this.HaveBond1 = NewArray;
          console.log(this.HaveBond1, " this.HaveBond1");
          let len = 3 - (this.HaveBond1.length) % 3;
          if (len > 0 && len < 3) {
            for (let i = 0; i < len; i++) {
              this.HaveBond1.push({
                "ShortName": "",
                "ROR": "",
                "InterestEndDate": ""
              });
            }
          }
          this.moreState1 = 1;
          this.LookMore();
        }
      },
      // 策略详情所有的数据（聚合接口）
      getTacticsDetail() {
        Toast.loading({
          duration: '0',
          mask: true,
          message: '正在加载...'
        });
        axios({
          method: 'get',
          url: '/v1/tacticsC/getTacticsDetail',
          headers: {
            'Authorization': "bearer " + getCookie("Token"),
          },
          params: {
            "id": parseUrl().StrategyId,
          },
        }).then(response => {
          Toast.clear();
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
            let data = response.data.data
            console.log(data, "策略详情所有的数据（聚合接口）");
            if (data.tacticsData.strategyDescription) {
              this.StrategyMsg = data.tacticsData.strategyDescription;
            }
            if (data.tacticsData.indicator) {
              this.indicator = data.tacticsData.indicator;
            }
            this.period = this.indicator.creationTime;
            // 策略名称
            this.strategyName = this.indicator.strategyName;
            setCookie('strategyName', this.strategyName)
            this.imageText = data.imageText;
            if (data.imageText != null) {
              this.Html = this.imageText.content;
              // 策略图文的标题
              this.StrangyTitle = this.imageText.title;
              // 图文处理
              setTimeout(() => {
                // 音频处理
                let OneAudio = document.querySelector(".ChartMsg audio");
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

            // 债券和发行人的数据处理
            this.BondArry = data.strategyBondList;
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


            // 图表的数据处理
            let ChartData = response.data.data.tacticsData;
            // 现金流数据
            let CashData = ChartData.cashFlowData[0].pieDataItems;
            this.money = ChartData.cashFlowData[0].unit;
            console.log(this.money, "this.money");
            let Cashkeys = [];
            let Cashvalues = [];
            for (let cash of CashData) {
              if (cash.name) {
                Cashkeys.push(cash.name);
              }
              Cashvalues.push(cash.value);
            }
            this.Cash.xAxisdata = Cashkeys;
            this.Cash.seriesdata = Cashvalues;
            this.Cash2 = this.Cash;


            // 行权现金流
            let CashData1 = ChartData.cashFlowData[2].pieDataItems;
            let Cashkeys1 = [];
            let Cashvalues1 = [];
            for (let cash of CashData1) {
              if (cash.name) {
                Cashkeys1.push(cash.name);
              }
              Cashvalues1.push(cash.value);
            }
            this.Cash1.xAxisdata = Cashkeys1;
            this.Cash1.seriesdata = Cashvalues1;

            // 累计现金流(到期)
            let AddCashData = ChartData.cashFlowData[1].pieDataItems;
            let AddCashkeys1 = [];
            let AddCashvalues1 = [];
            for (let cash of AddCashData) {
              if (cash.name) {
                AddCashkeys1.push(cash.name);
              }
              AddCashvalues1.push(cash.value);
            }

            this.AddCash1.xAxisdata = AddCashkeys1;
            this.AddCash1.seriesdata = AddCashvalues1;
            // 累计现金流(行权)
            let AddCashData1 = ChartData.cashFlowData[3].pieDataItems;
            let AddCashkeys2 = [];
            let AddCashvalues2 = [];
            for (let cash of AddCashData1) {
              if (cash.name) {
                AddCashkeys2.push(cash.name);
              }
              AddCashvalues2.push(cash.value);
            }

            this.AddCash2.xAxisdata = AddCashkeys2;
            this.AddCash2.seriesdata = AddCashvalues2;
            // 默认到期
            this.AddCash = this.AddCash1

            // 持仓分布
            let PositionData = ChartData.posData;
            for (let position of PositionData) {
              position.name = position.name.split(" ")[0];
              position.value = (position.value * 100).toFixed(2);
            }
            this.Position.seriesdata = PositionData;


            // 到期时间{到期日}
            let ExpireTimeData1 = ChartData.bondDueDateResult.ttmList;
            for (let position of ExpireTimeData1) {
              position.name = position.name.split(" ")[0];
              position.value = (position.value * 100).toFixed(2);
            }
            this.ExpireTime1.seriesdata = ExpireTimeData1;
            this.ExpireTime = this.ExpireTime1;
            // 到期时间{行权日}
            let ExpireTimeData2 = ChartData.bondDueDateResult.ttM_ExerciseList;
            for (let position of ExpireTimeData2) {
              position.name = position.name.split(" ")[0];
              position.value = (position.value * 100).toFixed(2);
            }
            this.ExpireTime2.seriesdata = ExpireTimeData2;

            // 行业分布Industry
            let IndustryData = ChartData.bondIndustry;
            for (let position of IndustryData) {
              position.name = position.name.split(" ")[0];
              position.value = (position.value * 100).toFixed(2);
            }
            this.Industry.seriesdata = IndustryData;


            // 主体评级
            let SubjectData = ChartData.bondRatingResult.bondIssurRatingList;
            for (let position of SubjectData) {
              position.name = position.name.split(" ")[0];
              position.value = (position.value * 100).toFixed(2);
            }
            this.Subject.seriesdata = SubjectData;

            // 债项评级
            let DebtData = ChartData.bondRatingResult.bondDebatRatingList;
            for (let position of DebtData) {
              position.name = position.name.split(" ")[0];
              position.value = (position.value * 100).toFixed(2);
            }
            this.Debt.seriesdata = DebtData;

            if (this.$refs.c2 && this.$refs.c3) {
              setTimeout(() => {
                this.$refs.c2.createChart();
                this.$refs.c3.createChart();
              }, 10)
            }

          } else {
            Dialog.alert({
              message: response.data.msg,
            });
          }
        })
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
      },
      bondMsg(value) {
        console.log(value, "value");
        this.$router.push("/BondDetail?m_BuildTime=" + value.BuildTime + "&bondCode=" + value.Code + "&shortName=" +
          value.ShortName + "&period=" + this.period);
      },
      peopleMsg(value) {
        console.log(value, "value");
        this.$router.push("/IssuerDetail?m_BuildTime=" + value.BuildTime + "&bondCode=" + value.Code + "&shortName=" +
          value.ShortName + "&period=" + this.period);
      },
      DialogRisk() {
        Dialog.alert({
          message: '此收益率预测是在假定债券当前到期收益率且再投资的收益率等于当前到期收益率的情况下得到的，不构成策略未来业绩表现的保证，策略有风险，投资需谨慎',
          closeOnClickOverlay: true
        }).then(() => {
          // on close
        });
      },
      // 剩余时间
      Surplus(value) {
        let days = (Date.parse(value) - Date.parse(format())) / (24 * 3600 * 1000 * 365);
        return days;
      },
      Compliance() {
        // this.show = true;
      }
    },
    created: function () {

    },
    mounted: function () {
      this.getTacticsDetail();
    }
  }

</script>
<style>
  .one_detail .inactive {
    display: none;
  }

  .one_detail .aplayer-author {
    display: none;
  }

  .one_detail .aplayer-title {
    display: none;
  }

  .one_detail .aplayer-music {
    display: none;
  }

  .one_detail .aplayer-info {
    padding-top: 25px !important;
  }

  .strangy_comtent .van-tabs--card .van-tabs__wrap {
    background: white;
  }

  .van-tabs__wrap {
    height: 1.307rem !important;
    background: #FAFAFA;
    padding: .293rem 0;
    box-sizing: border-box;
  }

  .van-tabs__content {
    padding-top: .293rem;
  }

  .Detail .van-modal {
    z-index: 99999999 !important;
  }

  .van-dialog__confirm,
  .van-dialog__confirm:active {
    color: #007AFF;
  }

  .van-dialog {
    width: 6.56rem;
    /* height: 4.24rem; */
    border-radius: .147rem;
    z-index: 999999999 !important;
    font-size: 0.34rem;
    color: #2c3e50;
    line-height: 0.58rem !important;
  }

  .activetick {
    padding: .133rem .267rem;
    box-sizing: border-box;
    width: 85%;
    height: 93%;
    overflow-y: scroll;
    border-radius: .147rem;
    font-size: .34rem;
    z-index: 999999999 !important;
  }

  .reset .van-tabs__nav--card .van-tab {
    border-right: none;
  }

  .reset .van-tabs__nav--card .van-tab {
    color: #4A90E2;
  }

  .reset .van-tabs__nav--card {
    width: 3.467rem;
    height: .693rem;
    margin: 0 auto;
  }

  .reset .van-tabs__nav--card .van-tab.van-tab--active {
    background: #4A90E2;
    color: white;
  }

  .reset .van-tabs__nav--card {
    border: 1px solid #4A90E2;
  }

</style>
<style scoped>
  .btn_change_show {
    text-align: center;
    margin: .16rem .4rem;
  }

  .btn_change_show img {
    width: .373rem;
  }

  .btn_change_show span {
    font-size: .32rem;
    color: #8E8E93;
  }

  .font-des {
    padding: .32rem .427rem;
    box-sizing: border-box;
    font-size: .34rem;
    color: #666666;
  }

  #Smallintroduction,
  #introduction {
    padding: .2rem .427rem;
    box-sizing: border-box;
    font-size: .34rem;
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
    height: .64rem;
    border-radius: .467rem;
    line-height: .64rem;
  }

  .btn {
    text-align: center;
  }

  .strangy_comtent {
    background: white;
  }

  .Detail {
    background: #F8F8F8;
    padding-bottom: .8rem;
    box-sizing: border-box;
  }

  .strangy_details .head {
    height: 6.533rem;
    background-color: #4A90E2;
  }

  .strangy_details .head img {
    height: 2.533rem;
  }

  .head_title {
    display: inline-block;
    text-align: center;
    width: 100%;
    height: .6rem;
    font-size: .373rem;
    color: #aecbf5;
    margin: .75rem 0 .09rem 0;
  }

  .head_number {
    display: inline-block;
    text-align: center;
    width: 100%;
    height: 1.013rem;
    font-size: .96rem;
    color: #FFFFFF;
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
    font-size: .373rem;
  }

  .head_day span:nth-child(2) {
    color: white;
    font-size: .48rem;
  }

  .labels {
    width: 100%;
    height: 2rem;
    padding: .267rem .267rem .533rem .267rem;
    box-sizing: border-box;
    background-color: #FFFFFF
  }

  .labels_msg span {
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #000000;
    font-size: .48rem;
    font-weight: bold;
    float: left;
  }

  .labels_msg font {
    font-size: .32rem;
    color: #366EAF;
    font-weight: bold;
  }

  .labels_msg img {
    display: inline-block;
    width: .373rem;
  }

  .img_font {
    display: inline-block;
    margin-left: .267rem;
    padding: .133rem .267rem;
    box-sizing: border-box;
  }

  .Bond .van-col .only_bond {
    width: 100%;
    height: 2.213rem;
    border-radius: .033rem;
  }

  .Bond .van-col .only_bond .noBond {
    display: block;
    color: #9CB1C9;
    text-align: center;
    line-height: 2.213rem;
    font-size: .373rem;
    font-weight: bold;

  }

  .Bond .van-col .only_bond .haveBond {
    width: 100%;
    height: 100%;
    padding: .14rem .133rem;
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
    font-size: .34rem;
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
    font-size: .32rem;
    line-height: .533rem;
    font-weight: bold;
    height: 1.1rem;
  }

  .Bond .van-col .only_bond .haveBond .number {
    display: block;
    width: 100%;
    text-align: center;
    font-size: .533rem;
    line-height: .853rem;
    font-weight: bold;
    color: #F23E4C;
  }

  .Bond .van-col .only_bond .haveBond .time {
    display: block;
    width: 100%;
    text-align: right;
    font-size: .32rem;
    color: #404F66;
    line-height: .533rem;
  }

  .Bond .van-col div:nth-child(3n+1) {
    margin-top: 5px;
    box-sizing: border-box;
  }

  .Bond {
    padding: .293rem;
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
    padding: .267rem 0 .373rem;
    box-sizing: border-box;
    margin-bottom: .267rem;
    background: white;
  }

  .one_detail .title {
    color: #4A4A4A;
    display: block;
    text-align: left;
    line-height: .373rem;
    font-size: .373rem;
    margin-bottom: .32rem;
    margin-left: .293rem;
  }

  .combination .van-col {
    text-align: center;
  }

  .combination .van-col .number {
    font-size: .453rem;
    color: #000000;
    display: block;
    line-height: .8rem;
  }

  .combination .van-col .msg {
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
    font-size: .373rem;
    color: #8E8E93;
  }

  .combination .van-col .msg .van-icon {
    color: #D8D8D8;
    font-size: .4rem;
    margin-left: .133rem;
  }

  .ChartMsg {
    width: 100%;
    padding: 0.2rem;
    box-sizing: border-box;
  }

  .MoreChart {
    height: 1.333rem;
    line-height: .9rem;
    background-color: #FAFAFA;
  }

  .MoreChart span {
    font-size: .32rem;
    color: #60739C;
  }

</style>
