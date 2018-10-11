 <template>
 <div style="background:#fff;">
  <Header ref="header" :headerObj="headerObj"></Header>
    <div style="padding-left:15px;padding-right:15px; padding-bottom:50px;">
        <p style="line-height: .58rem">本策略中的观点与陈述仅反映耀之或耀之研究人员在撰写及发表本材料期间的分析判断，不构成对客户资产本金损益或收益回报的任何直接或间接的保证、承诺、明示或暗示。本策略中提及的一切资产、价格、策略、市场事件等，以及投资带来的收入可能均会波动，过去的表现亦不能作为日后表现的预示和担保。在任何时期，耀之及耀之研究人员均可能会发出与本策略所载观点、意见、评估及预测不一致的其他材料。</p>
        <p style="line-height: .58rem">本策略所载的信息、意见、推测或观点，仅供客户参考之用，不作为任何的投资建议或判断。本策略不能作为亦不能被视为出售或购买证券或其它投资标的的邀请。在任何情况下，本策略中的信息或所表述的意见、观点均不构成对任何机构及个人的投资建议，也不与任何客户特定的投资委托、财务状况等一切因素具有任何关联性。市场有风险，投资需谨慎。客户必须审慎考虑本策略中的任何信息、意见、观点和推测，并根据其自身的特定状况进行相应参考，若有必要应寻求有资质、持牌并被监管认可的机构或个人的专业意见。</p>
        <p style="line-height: .58rem">耀之的销售人员以及其他耀之专业人士可能会依据不同假设和标准，采用不同的分析方法以口头或书面形式发表与本策略不一致的市场评论或观点；耀之的销售人员或其他耀之专业人士所发表的市场评论与观点，仅供客户参考之用，不作为任何投资建议或判断；且耀之没有对耀之的销售人员或其他耀之专业人士所发表的评论或观点向本策略接受者进行更新的义务。</p>
        <p style="line-height: .58rem">本策略版权归“上海耀之资产管理中心(有限合伙)”所有，未经本公司书面授权，任何机构或个人不得援引、复制或传播本策略。援引本策略内容，请联系（电子邮箱地址service@yzamc.com）索取授权。如征得本公司同意进行引用、刊发的，需在允许的范围内使用，并注明出处为“上海耀之资产管理中心（有限合伙）研究”，且不得对本策略进行任何有悖原意的引用、删节和修改。</p>
    </div>
      <div id="reviewArgee" @click="goback()" style="
    position:  fixed;
    bottom:  0px;
    width: 100%;
       
"><van-button  size="large" style=" color: #007AFF;">确认</van-button></div>
    </div>
 </template>
 

<script>
import Header from "../common/header.vue";
export default {
  components: {
    Header
  },
  data() {
    return {
      headerObj: ""
    };
  },
  created() {
    this.headerObj = {
      name: "眼火策略-重要声明"
    };
  },
  methods: {
    goback() {
      history.go(-1);
    }
  }
};
</script>