<template>
  <div :id="id" :class="className">

  </div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    props: ['options', 'id', 'className', 'money', 'options1'],
    data() {
      return {

      };
    },
    methods: {

      createChart() {
        if (this.options1 != undefined) {
          if (this.options.xAxisdata && this.options.seriesdata) {
            document.getElementById(this.id).style.width = '100%';
            document.getElementById(this.id).style.height = '100%';
            var myChart = echarts.init(document.getElementById(this.id));
            myChart.setOption({
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                x: 50,
                y: 30,
                x2:50,
                y2:30
              },
              xAxis: {
                axisLine: {
                  lineStyle: {
                    color: "#B1B1B1"
                  }
                },
                type: 'category',
                data: this.options.xAxisdata,
              },
              yAxis: [{
                splitLine: {
                  lineStyle: {
                    type: 'dashed'
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: "#B1B1B1"
                  }
                },
                type: 'value',
                name: '单位:(' + this.money + ')',
              }, {
                splitLine: {
                  lineStyle: {
                    type: 'dashed'
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: "#B1B1B1"
                  }
                },
                type: 'value',
                name: '单位:(' + this.money + ')',
              }],
              series: [{
                barWidth: 8, //柱图宽度
                data: this.options.seriesdata,
                name: '未来现金流',
                type: 'bar',
                label: {
                  normal: {
                    show: false,
                    position: 'top',
                    textStyle: {
                      color: '#B1B1B1'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: function (value) {
                      if (value.data < 0) {
                        return "#bd3736"
                      } else {
                        return "#7FADF8"
                      }
                    }
                  }
                },
              }, {
                type: 'line',
                name: '累计现金流',
                yAxisIndex: 1,
                data: this.options1.seriesdata,
              }]
            });
          }

        } else {
          if (this.options.xAxisdata && this.options.seriesdata) {
            document.getElementById(this.id).style.width = '100%';
            document.getElementById(this.id).style.height = '100%';
            var myChart = echarts.init(document.getElementById(this.id));
            myChart.setOption({
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                x: 70,
                y: 30
              },
              xAxis: {
                axisLine: {
                  lineStyle: {
                    color: "#B1B1B1"
                  }
                },
                type: 'category',
                data: this.options.xAxisdata,
              },
              yAxis: [{
                splitLine: {
                  lineStyle: {
                    type: 'dashed'
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: "#B1B1B1"
                  }
                },
                type: 'value',
                name: '单位:(' + this.money + ')',
              }],
              series: [{
                barWidth: 8, //柱图宽度
                data: this.options.seriesdata,
                name: '未来现金流',
                type: 'bar',
                label: {
                  normal: {
                    show: false,
                    position: 'top',
                    textStyle: {
                      color: '#B1B1B1'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: function (value) {
                      if (value.data < 0) {
                        return "#bd3736"
                      } else {
                        return "#7FADF8"
                      }
                    }
                  }
                },
              }]
            });
          }
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
