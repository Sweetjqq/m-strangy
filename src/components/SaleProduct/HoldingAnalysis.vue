<template>
  <div class="Detail">
    <Header ref="header" :headerObj="headerObj"></Header>
    <div class="strangy_details">
      <div class='one_detail'>
        <label class="title" @click="DialogRisk">
          <span style="float: left">债券持仓</span>
          <font style="float: left;font-size: .32rem;color: #9B9B9B;">{{"(债券建仓比例:&nbsp;&nbsp;&nbsp;"+bondPosRate+")"}}</font>
        </label>
        <div style="clear: both;height: 1.013rem; color: #9B9B9B;font-size: .32rem;padding-top: .293rem">
          <div class="van-hairline--top" style="padding: .293rem;box-sizing: border-box;">
            本持仓为模拟组合，仅供内部参与使用，禁止任何人员以任何形式宣传
          </div>
        </div>

        <div class="strangy_comtent">
          <div style="padding-top: 0rem;box-sizing: border-box;">
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
            <div class="btn" v-if="BondArry.length>9" style="text-align: right;padding-right: .293rem;color: #15467F;font-size: .347rem">
              <span v-if="moreState==0" @click="LookMore">查看更多</span>
            </div>
          </div>
        </div>
      </div>


      <!-- 控制显示隐藏 -->
      <div class="changeShow">
        <!-- 行业分布 -->
        <div class='one_detail'>
          <label class="title">
            <span style="float: left">行业分布</span>
          </label>
          <div class="echarts" style="margin-top: .667rem">
            <PieChart id="Industry " :options='Industry ' class="echart" ref="c1"></PieChart>
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
            <van-switch v-model="checked" :value="checked" size='.6rem' style="float: right;margin-right: .06rem"
              @change='Switch' />
          </div>
          <div class="echarts" style="margin-top: .667rem">
            <BarChart id="Cash " :options='Cash' class="echart" :money="money" ref="c3" :options1='AddCash'></BarChart>
          </div>
        </div>

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
        </div>
        <!-- 主体评级 -->
        <div class='one_detail'>
          <label class="title">
            <span style="float: left">主体评级</span>
          </label>
          <div class="echarts" style="margin-top: .667rem">
            <PieChart id="Subject " :options='Subject' class="echart" ref="c5"></PieChart>
          </div>
        </div>

        <!-- 债项评级 -->
        <div class='one_detail' style="margin-bottom: .62rem">
          <label class="title">
            <span style="float: left">债项评级</span>
          </label>
          <div class="echarts" style="margin-top: .667rem">
            <PieChart id="Debt " :options='Debt' class="echart" ref="c6"></PieChart>
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
  import Bottombar from '../common/Bottombar.vue'
  import Header from '../common/Header.vue'
  import BarChart from '../EchartsConponents/BarChart.vue'
  import LineChart from '../EchartsConponents/LineChart.vue'
  import PieChart from '../EchartsConponents/PieChart.vue'
  import {
    getCookie,
    removeCookie,
    format,
    parseUrl,
  } from '../../config/index'
  export default {
    components: {
      Bottombar,
      Header,
      BarChart,
      PieChart,
      LineChart
    },
    data() {
      return {
        checked: false,
        checked1: false,
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
        YTM: "",
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
          name: ""
        },
        images: {
          top: "../../../static/image/top.png",
          bottom: "../../../static/image/bottom.png"
        },
        BondList: [],
        BondArry: [],
        NoneBond: [],
        HaveBond: [],
        HaveBond1: [],
        period: "",
        moreState: "0",
        moreState1: "0",
        bondPosRate: "",
      }
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
      // 数据处理
      datachange(value) {
        if (value) {
          return value.split("%")[0];
        }
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
          // 到期
          this.ExpireTime = this.ExpireTime1;
          setTimeout(() => {
            this.$refs.c4.createChart();
          }, 10)
        } else {
          // 行权
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

            if (value.bondCode) {
              NewArray.push(value);
            }
          });


          this.HaveBond = NewArray;
          console.log(this.HaveBond, " this.HaveBond");
          let len = 3 - (this.HaveBond.length) % 3;
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
      // 更多持仓分析的详细数据
      GetStrategyBondList() {
        Toast.loading({
          duration: '0',
          mask: true,
          message: '正在加载...'
        });
        axios({
          method: 'get',
          url: '/v1/tacticsC/getProductDetailMorePositions',
          headers: {
            'Authorization': "bearer " + getCookie("Token"),
          },
          params: {
            "id": parseUrl().id,
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
            console.log(response.data.data, " 更多持仓分析的详细数据");
            let data = response.data.data;
            this.headerObj.name = this.productName(data.productTitle);
            // 债券持仓数据
            this.bondPosRate = data.fundPosDataAndIndustry.bondPosRate;
            this.BondArry = data.fundPosDataAndIndustry.poslist;
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

            let ChartData = response.data.data.fundChartData;
            console.log(ChartData, "************ChartData**************");
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
            let IndustryData = response.data.data.fundPosDataAndIndustry.bondIndustry;
            console.log(IndustryData, "***************IndustryData*****")
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
            setTimeout(() => {
              this.$refs.c1.createChart();
              this.$refs.c3.createChart();
              this.$refs.c4.createChart();
              this.$refs.c5.createChart();
              this.$refs.c6.createChart();
            }, 10)
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
        this.$router.push("/BondDetail?m_BuildTime=" + value.date + "&bondCode=" + value.bondCode + "&shortName=" +
          value.shortName + "&period=" + value.date);
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
      this.GetStrategyBondList();
      // this.GetStrategyChart();
      // this.GetStrategyById();
    }
  }

</script>
<style>
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
    width: 4.2rem !important;
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

</style>
