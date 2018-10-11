<template>
  <div class="Detail">
    <Header ref="header" :headerObj="headerObj" :Controlright="true" :rightText="text" :url="url"></Header>
    <div class="Issuer_Details">

      <!-- 公司资料 -->
      <div class='one_detail'>
        <label class="title">公司资料</label>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">公司全称</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{mobileReportData.compOverview.issuerName}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">企业性质</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{mobileReportData.compOverview.agencyGuarantornature}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">主体评级</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{mobileReportData.compOverview.rating}}</div>
          </van-col>
        </van-row>


        <van-row gutter="20">
          <van-col span="10">
            <div class="name">评级机构</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{mobileReportData.compOverview.issuerRatingAgency}}</div>
          </van-col>
        </van-row>


        <van-row gutter="20">
          <van-col span="10">
            <div class="name">
              评级变动</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{mobileReportData.compOverview.creditratingChange}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">
              证监会行业(大类)</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{mobileReportData.compOverview.industry}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">
              证监会行业(明细)</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{mobileReportData.compOverview.industryDetail}}</div>
          </van-col>
        </van-row>



        <van-row gutter="20">
          <van-col span="10">
            <div class="name">
              实际控制人</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{mobileReportData.compOverview.holdername}}</div>
          </van-col>
        </van-row>


        <van-row gutter="20">
          <van-col span="10">
            <div class="name">
              成立日期</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{mobileReportData.compOverview.founddate}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">
              注册资本(万元)</div>
          </van-col>
          <van-col span="14">
            <div class="msg">{{mobileReportData.compOverview.regcapital}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="name">
              公司简介</div>
          </van-col>
          <van-col span="14">
            <div class="msg" v-if='MsgShow'>{{mobileReportData.compOverview.chineseintroduction}}</div>
            <div class="msg" v-else id="introduction">{{mobileReportData.compOverview.chineseintroduction}}</div>
          </van-col>
        </van-row>
        <div class="btn">
          <div class="btn_change_show" @click="MsgShow=!MsgShow">
            <div v-if="MsgShow">
              <img :src="images.bottom" />
              <span>收起</span>
            </div>
            <div v-else>
              <img :src="images.top" />
              <span>展开</span>
            </div>
          </div>
          <!-- <van-button type="default" @click="MsgShow=!MsgShow">点击查看更多</van-button> -->
        </div>

      </div>
      <!-- 财务概览 -->
      <div class='one_detail'>
        <label class="title">财务概览</label>
        <div class="van-hairline--bottom">
          <van-row gutter="20">
            <van-col span="10">
              <div class="money_name">
                人民币亿</div>
            </van-col>
            <van-col span="7">
              <div class="money_msg">{{BondOvervies.Array[1]}}</div>
            </van-col>
            <van-col span="7">
              <div class="money_msg">{{BondOvervies.Array[0]}}</div>
            </van-col>
          </van-row>
        </div>

        <van-row gutter="20">
          <van-col span="10">
            <div class="money_name">
              营业收入</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.operRev1}}</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.operRev}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="money_name">
              EBITDA</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.ebitda1}}</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.ebitda}}</div>
          </van-col>
        </van-row>


        <van-row gutter="20">
          <van-col span="10">
            <div class="money_name">
              EBITDA%</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.ebitdaRate1}}</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.ebitdaRate}}</div>
          </van-col>
        </van-row>


        <van-row gutter="20">
          <van-col span="10">
            <div class="money_name">
              CFO</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.cfo1}}</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.cfo}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="money_name">
              FFO</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.ffo1}}</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.ffo}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="money_name">
              资产负债率（%）</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.assetLiabilityRatio1}}</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.assetLiabilityRatio}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="money_name">
              总债务/EBITDA</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.grossDebt_Ebitda1}}</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.grossDebt_Ebitda}}</div>
          </van-col>
        </van-row>


        <van-row gutter="20">
          <van-col span="10">
            <div class="money_name">
              流动比率（X）</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.currentRatio1}}</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.currentRatio}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="money_name">
              速动比率（%）</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.quickRatio1}}</div>
          </van-col>
          <van-col span="7">
            <div class="money_msg">{{BondOvervies.quickRatio}}</div>
          </van-col>
        </van-row>
      </div>

      <!-- 存续债务 -->
      <div class='one_detail'>
        <label class="title">存续债务（截至
          <span class="time">{{mobileReportData.reportOverview.existenceDebt.date}}</span>）</label>
        <div class="van-hairline--bottom">

          </van-row>
          <van-row gutter="20">
            <van-col span="10">
              <div class="money_name">
                借款（亿元）</div>
            </van-col>
            <van-col span="14">
              <div class="money_msg">余额</div>
            </van-col>
          </van-row>
        </div>

        <van-row gutter="20">
          <van-col span="10">
            <div class="money_name">
              短期</div>
          </van-col>
          <van-col span="14">
            <div class="money_msg">{{mobileReportData.reportOverview.existenceDebt.stBorrow}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="money_name">
              一年内到期</div>
          </van-col>
          <van-col span="14">
            <div class="money_msg">{{mobileReportData.reportOverview.existenceDebt.nonCurLiabDueWithin1y}}</div>
          </van-col>
        </van-row>

        <van-row gutter="20">
          <van-col span="10">
            <div class="money_name">
              长期</div>
          </van-col>
          <van-col span="14">
            <div class="money_msg">{{mobileReportData.reportOverview.existenceDebt.ltBorrow}}</div>
          </van-col>
        </van-row>



        <div class="van-hairline--bottom" style="margin-top: .4rem">
          <van-row gutter="20">
            <van-col span="10">
              <div class="money_name">
                债务（亿元）</div>
            </van-col>
            <van-col span="14">
              <div class="money_msg">余额</div>
            </van-col>
          </van-row>
        </div>

        <van-row gutter="20">
          <van-col span="10">
            <div class="money_name">
              1年以内</div>
          </van-col>
          <van-col span="14">
            <div class="money_msg">{{mobileReportData.reportOverview.existenceDebt.stBondsPayable}}</div>
          </van-col>
        </van-row>
        <van-row gutter="20">
          <van-col span="10">
            <div class="money_name">
              1年以上</div>
          </van-col>
          <van-col span="14">
            <div class="money_msg">{{mobileReportData.reportOverview.existenceDebt.bondsPayable}}</div>
          </van-col>
        </van-row>
      </div>

      <!-- 描述信息 -->
      <div class='one_detail'>
        <div class="one_msg">
          <label class="title">利润利息</label>
          <div class="font_msg">
            {{mobileReportData.reportResult.incomeInfo}}
          </div>
        </div>
        <div class="one_msg">
          <label class="title">现金流情况</label>
          <div class="font_msg">
            {{mobileReportData.reportResult.cashFlowInfo}}
          </div>
        </div>
        <div class="one_msg">
          <label class="title">资产负债情况</label>
          <div class="font_msg">
            {{mobileReportData.reportResult.balanceSheetInfo}}
          </div>
        </div>
        <div class="one_msg">
          <label class="title">总结</label>
          <div class="font_msg">
            {{mobileReportData.reportResult.riskInfo}}
          </div>
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
  import {
    getCookie,
    parseUrl,
    removeCookie
  } from '../../config/index'
  import req from '../../config/getData'
  export default {
    components: {
      Bottombar,
      Header
    },
    data() {
      return {
        text: "债券详情",
        url: "",
        MsgShow: false,
        headerObj: {
          name: "发行人信息"
        },
        images: {
          top: "../../../static/image/top.png",
          bottom: "../../../static/image/bottom.png"
        },
        mobileReportData: {
          compOverview: {},
          reportOverview: {
            existenceDebt: {},
            overvies: {},
          },
          reportResult: {},
        },
        BondOvervies: {
          "Array": [],
          "operRev": "", //营业收入
          "ebitda": "", //EBITDA
          "ebitdaRate": "", //EBITDA%
          "cfo": "", //CFO
          "ffo": "", //FFO
          "assetLiabilityRatio": "", //资产负债率(%)
          "grossDebt_Ebitda": "", //总债务/EBITDA
          "currentRatio": "", //流动比率(x)
          "quickRatio": "", //速动比率(x)
          "grossProfitRate": "", //毛利率

          "operRev1": "", //营业收入
          "ebitda1": "", //EBITDA
          "ebitdaRate1": "", //EBITDA%
          "cfo1": "", //CFO
          "ffo1": "", //FFO
          "assetLiabilityRatio1": "", //资产负债率(%)
          "grossDebt_Ebitda1": "", //总债务/EBITDA
          "currentRatio1": "", //流动比率(x)
          "quickRatio1": "", //速动比率(x)
          "grossProfitRate1": "", //毛利率
        },
      }
    },
    methods: {
      hello() {
        const param = {
          "bondCode": parseUrl().bondCode,
          "period": parseUrl().period.replace(/-/g, "")
        }
        req.get('/v1/mobileReports', param, getCookie("Token")).then(response => {
          if (response) {
            console.log(response.data, 'response.data')
          }
        })
      },
      // 获取C端报表
      mobileReport() {
        console.log(parseUrl().bondCode, "bondCode");

        Toast.loading({
          duration: '0',
          mask: true,
          message: '正在加载...'
        });
        axios({
          method: 'get',
          url: '/v1/mobileReport',
          headers: {
            'Authorization': "bearer " + getCookie("Token"),
          },
          params: {
            "bondCode": parseUrl().bondCode,
            "period": parseUrl().period.replace(/-/g, "")
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
            console.log(response.data, " 获取C端报表");
            this.mobileReportData = response.data.data;
            this.BondOvervies = response.data.data.reportOverview.overvies;
            console.log(this.BondOvervies, "财务预览");
            let Array = [];
            for (let key in this.BondOvervies) {
              Array.push(key);
            }
            this.BondOvervies.Array = Array;
            console.log(this.BondOvervies.Array, "this.BondOvervies.Array");


            this.BondOvervies.operRev = this.BondOvervies[Array[0]].operRev;
            this.BondOvervies.quickRatio = this.BondOvervies[Array[0]].quickRatio;
            this.BondOvervies.assetLiabilityRatio = this.BondOvervies[Array[0]].assetLiabilityRatio;
            this.BondOvervies.ebitdaRate = this.BondOvervies[Array[0]].ebitdaRate;
            this.BondOvervies.ebitda = this.BondOvervies[Array[0]].ebitda;
            this.BondOvervies.currentRatio = this.BondOvervies[Array[0]].currentRatio;
            this.BondOvervies.cfo = this.BondOvervies[Array[0]].cfo;
            this.BondOvervies.ffo = this.BondOvervies[Array[0]].ffo;
            this.BondOvervies.grossProfitRate = this.BondOvervies[Array[0]].grossProfitRate;
            this.BondOvervies.grossDebt_Ebitda = this.BondOvervies[Array[0]].grossDebt_Ebitda;

            this.BondOvervies.operRev1 = this.BondOvervies[Array[1]].operRev;
            this.BondOvervies.quickRatio1 = this.BondOvervies[Array[1]].quickRatio;
            this.BondOvervies.assetLiabilityRatio1 = this.BondOvervies[Array[1]].assetLiabilityRatio;
            this.BondOvervies.ebitdaRate1 = this.BondOvervies[Array[1]].ebitdaRate;
            this.BondOvervies.ebitda1 = this.BondOvervies[Array[1]].ebitda;
            this.BondOvervies.currentRatio1 = this.BondOvervies[Array[1]].currentRatio;
            this.BondOvervies.cfo1 = this.BondOvervies[Array[1]].cfo;
            this.BondOvervies.ffo1 = this.BondOvervies[Array[1]].ffo;
            this.BondOvervies.grossProfitRate1 = this.BondOvervies[Array[1]].grossProfitRate;
            this.BondOvervies.grossDebt_Ebitda1 = this.BondOvervies[Array[1]].grossDebt_Ebitda;


          } else {
            Dialog.alert({
              message: response.data.msg
            }).then(() => {
              // on close
            });
          }
        })
      }
    },
    created() {
      this.mobileReport();
      // this.hello();
    },
    mounted() {
      this.url = "/BondDetail?m_BuildTime=" +parseUrl().m_BuildTime +"&bondCode=" +parseUrl().bondCode +"&shortName=" +parseUrl().shortName+ "&period=" +parseUrl().period;
    },
  }

</script>
<style scoped>
  .btn_change_show {
    text-align: center;
    margin: .16rem .4rem;
  }

  .btn_change_show img {
    width: .373rem;
  }

  #introduction {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .one_msg {
    margin-bottom: .4rem;
  }

  .one_msg .font_msg {
    font-size: .373rem;
    color: #4A4A4A;
    line-height: .56rem;
  }

  .Detail {
    background: #F8F8F8;
    padding-bottom: .8rem;
    box-sizing: border-box;
  }

  .Issuer_Details {
    margin-bottom: .667rem;
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

  .one_detail .money_name {
    text-align: left;
    width: 100%;
  }

  .one_detail .money_msg {
    text-align: right;
    width: 100%;
  }

  .van-col {
    padding: .133rem .267rem;
    box-sizing: border-box;
  }

  .van-button {
    width: 3.4rem;
    height: .64rem;
    border-radius: .467rem;
    line-height: .64rem;
  }

  .btn {
    text-align: center;
    margin-top: .56rem;
  }

  .van-hairline--bottom {
    color: #366EAF;
  }

</style>
