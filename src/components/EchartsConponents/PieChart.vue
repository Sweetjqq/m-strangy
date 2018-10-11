<template>
  <div :id="id" :class="className">

  </div>

</template>

<script>
  import * as echarts from 'echarts';
  export default {
    props: ['options', 'id', 'className'],
    data() {
      return {

      };
    },
    methods: {
      createChart() {
        if (this.options.legenddata && this.options.seriesdata) {
          document.getElementById(this.id).style.width = '100%';
          document.getElementById(this.id).style.minHeight = '100%';
          var myChart = echarts.init(document.getElementById(this.id));
          myChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: "{b}:<br/> {c}%"
            },
            color: ['#8087e6 ', '#ef5e81', '#ffd16d', '#b2d4f3', 
              "#8e8e91", "#bff3b5 ", "#f9c8a0","#b3b8f0",
              "#f69fb3", "#eee4a0", "#d9e8f9",
              "#c6c6c7", "#dff9da", "#fce2cf", 
              "#d9daf8", "#f9cfd9", "#f6f1cf",
               "#7eb6ea", "#434348", "#93eb82",
              "#f5a262"
            ],
            legend: {
              padding: [5, 10],
              show: false,
              orient: 'vertical',
              x: 'left',
              // orient: 'horizontal',
              // bottom: "0",
              // left: 'center',
              data: this.options.legenddata,
            },
            series: [{
              name: '',
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['50%', '60%'],
              labelLine: {
                length: 3,
                smooth: true
              },

              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '12',
                  fontWeight: 'bold'
                }
              },

              data: this.options.seriesdata
            }]
          });
        }
      }
    },
    created() {

    },
    mounted() {
      this.createChart();
    }
  };

</script>
<style scoped>


</style>
