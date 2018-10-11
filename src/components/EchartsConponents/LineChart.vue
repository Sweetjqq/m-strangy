<template>
  <div :id="id" :class="className">

  </div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    props: ['options', 'id', 'className', 'max', 'YTMAllData', "min"],
    data() {
      return {

      };
    },
    computed: {
      MaxToFl: function(){
        if(this.max){
          return this.max.toFixed(2);
        }
      },
    },
    methods: {
      createChart() {
        console.log(this.min, "$$$$$$min$$$$$$$$");
        console.log(this.max, "$$$$$$max$$$$$$$$");
        if (this.options.xAxisdata && this.options.seriesdata) {
          document.getElementById(this.id).style.width = '100%';
          document.getElementById(this.id).style.height = '100%';
          var myChart = echarts.init(document.getElementById(this.id));
          myChart.setOption({
            title: {
              text: ''
            },
            tooltip: {
              trigger: 'axis',
            },
            legend: {
              data: []
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              axisLine: {
                lineStyle: {
                  color: "#B1B1B1"
                }
              },
              // axisLabel:{
              //   rotate:90
              // },
              boundaryGap: false,
              type: 'category',
              data: this.options.xAxisdata
            },
            yAxis: {
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              },
              axisLine: {
                lineStyle: {
                  color: "#B1B1B1",
                }
              },
              type: 'value',
              // 设置Y周间距
              min: this.min,
              max: this.MaxToFl,//最大值保留两位小数(进一法之后的数据)
              // interval: this.min ? parseFloat(((this.max - this.min + 0.2) / 4).toFixed(2)) : parseFloat(((this.max -1) / 4).toFixed(2))
            },
            series: this.options.seriesdata
          });
        }
      }
    },
    mounted() {
      this.createChart();
    }
  };

</script>
<style scoped>


</style>
