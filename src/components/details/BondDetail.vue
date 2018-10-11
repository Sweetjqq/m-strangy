<template>
  <div class="Detail">
    <Header ref="header" :headerObj="headerObj" :Controlright="true" :rightText="text" :url="url"></Header>
    <div class="Issuer_Details">

      <!-- 最新指标 -->
      <div class='one_detail new'>
        <label class="title">最新指标</label>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">剩余年限</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{BondIndex.TTM}}</div>
          </van-col>
        </van-row>


        <van-row gutter="20">
          <van-col span="10">
            <div class="name">票面利率(当期)</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{BondIndex.Coupon}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">债项评级</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{BondIndex.Rating}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">评级变动</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{BondIndex.RatingChange}}</div>
          </van-col>
        </van-row>


        <van-row gutter="20">
          <van-col span="10">
            <div class="name">评级机构</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{BondIndex.RatingCompany}}</div>
          </van-col>
        </van-row>
      </div>

      <!-- 最新估值 -->
      <div class="one_detail gray">
        <label class="title">最新估值</label>
        <van-row gutter="2.5">
          <van-col span="6">
            <div>机构</div>
          </van-col>
          <van-col span="6">
            <div>日期</div>
          </van-col>
          <van-col span="6">
            <div>收益率</div>
          </van-col>
          <van-col span="6">
            <div>净价</div>
          </van-col>
        </van-row>
        <van-row gutter="2.5" style="margin-top: 1.25px">
          <van-col span="6">
            <div>{{Valuation.ValueMethod}}</div>
          </van-col>
          <van-col span="6">
            <div>{{Valuation.Date}}</div>
          </van-col>
          <van-col span="6">
            <div>{{Valuation.YTM}}</div>
          </van-col>
          <van-col span="6">
            <div>{{Valuation.ClearPrice}}</div>
          </van-col>
        </van-row>
      </div>

      <!-- 基本条款 -->
      <div class='one_detail new'>
        <label class="title">基本条款</label>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">起息日</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{BondBasic.CarryDate}}</div>
          </van-col>
        </van-row>


        <van-row gutter="20">
          <van-col span="10">
            <div class="name">到期日</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{BondBasic.EndDate}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">期限（年)</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{BondBasic.Duration}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">利息类型</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{BondBasic.InterestType}}</div>
          </van-col>
        </van-row>


        <van-row gutter="20">
          <van-col span="10">
            <div class="name">息票品种</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{BondBasic.CouponType}}</div>
          </van-col>
        </van-row>


        <van-row gutter="20">
          <van-col span="10">
            <div class="name">付息频率</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{BondBasic.InterestFrequency}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">利率说明</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{BondBasic.CouponTxt}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">含权条款</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{BondBasic.BondOption}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">下一行权日</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{BondBasic.OptionDate}}</div>
          </van-col>
        </van-row>
      </div>

      <!-- 未来现金流 -->
      <div class='one_detail new'>
        <label class="title">未来现金流</label>
        <div class="echart">
          <BarChart id="Profit" :options='ProfitData' class="echarts" ref="Profit" :money="money"></BarChart>
        </div>
      </div>
    </div>
    <Bottombar></Bottombar>
  </div>

</template>

<script>
  import {
    Row,
    Col,
    Dialog,
    Toast
  } from 'vant';
  import Bottombar from '../common/Bottombar.vue'
  import Header from '../common/Header.vue'
  import BarChart from '../EchartsConponents/BarChart.vue'
  import {
    getCookie,
    removeCookie,
    parseUrl
  } from '../../config/index'
  export default {
    components: {
      Bottombar,
      Header,
      BarChart
    },
    data() {
      return {
        text: "发行人详情",
        url: "",
        money: "元",
        headerObj: {
          name: ""
        },
        ProfitData: {
          xAxisdata: [],
          seriesdata: []
        }, //未来现金流
        BondIndex: {}, //最新指标
        Valuation: {}, //最新估值
        BondBasic: {}, //基本条款
      }
    },
    methods: {
      // 获取债券详情
      GetBondDetailData() {
        this.headerObj.name = parseUrl().shortName;
        Toast.loading({
          duration: '0',
          mask: true,
          message: '正在加载...'
        });
        axios({
          method: 'get',
          url: '/v1/StrategyApi/GetBondDetailData_CEndInf',
          headers: {
            'Authorization': "bearer " + getCookie("Token"),
          },
          params: {
            "AccountId": getCookie("AccountId"),
            "m_BondCode": parseUrl().bondCode,
            "m_FaceValue": '1',
            "m_BuildTime": parseUrl().m_BuildTime
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
          if (response.data.ResultCode == 200) {
            console.log(response.data, " 获取债券详情");
            this.BondIndex = response.data.ReturnParam.BondIndicator;
            this.Valuation = response.data.ReturnParam.BondValuation;
            this.BondBasic = response.data.ReturnParam.BondBasicTerm;
            let xAxisdata = [];
            let seriesdata = [];
            for (let CashData of response.data.ReturnParam.CashList) {
              xAxisdata.push(CashData.name);
              seriesdata.push(CashData.value);
            }
            this.ProfitData.xAxisdata = xAxisdata;
            this.ProfitData.seriesdata = seriesdata;
            setTimeout(()=>{
              this.$refs.Profit.createChart();
            },10)
          } else {
            Dialog.alert({
              message: response.data.ResultMessage
            }).then(() => {
              // on close
            });
          }
        })
      },

    },
    created() {
      this.GetBondDetailData();
    },
    mounted() {
      this.url = "/IssuerDetail?m_BuildTime=" +parseUrl().m_BuildTime +"&bondCode=" +parseUrl().bondCode +"&shortName=" +parseUrl().shortName+ "&period=" +parseUrl().period;
    },

  }

</script>
<style scoped>
  .echart {
    width: 100%;
    height: 5.093rem;
  }

  .Detail {
    background: #F8F8F8;
    padding-bottom: .8rem;
    box-sizing: border-box;
  }

  .one_detail {
    background: white;
    padding: .4rem .4rem .64rem;
    box-sizing: border-box;
    margin-bottom: .267rem;
    font-size: .373rem;
    color: #404F66;
  }

  .one_detail .title {
    color: #4A4A4A;
    display: block;
    text-align: center;
    line-height: .373rem;
    font-size: .373rem;
    margin-bottom: .32rem;
  }

  .one_detail .name {
    text-align: right;
    width: 100%;
  }

  .new .van-col {
    padding: .133rem .267rem;
    box-sizing: border-box;
    line-height: .48rem;
  }

  .gray .van-col div {
    width: 100%;
    height: .827rem;
    background: #F8F8F8;
    text-align: center;
    line-height: .827rem;
  }

</style>
