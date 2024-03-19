<template>
  <div class="text-center">
    <apexcharts width="550" type="bar" :options="chartOptions" :series="series"></apexcharts>
    <h4 class="h4 text-center">Categorias de productos con mas ventas</h4>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'VueChart',
  components: {
    apexcharts: VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: 'South',
          data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
          })
        },
        {
          name: 'North',
          data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 20
          })
        },
        {
          name: 'Central',
          data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 15
          })
        }
      ],
      chartOptions: {
        chart: {
          type: 'area',
          height: 350,
          stacked: true,
          events: {
            selection: function (chart, e) {
              console.log(new Date(e.xaxis.min))
            }
          },
        },
        colors: ['#008FFB', '#00E396', '#CED4DC'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.6,
            opacityTo: 0.8,
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        },
        xaxis: {
          type: 'datetime'
        },
      },
    }
  },
  methods: {
    generateDayWiseTimeSeries(baseval, count, yrange) {
      let i = 0;
      const series = [];
      while (i < count) {
        const x = baseval;
        const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push([x, y]);
        baseval += 86400000;
        i++;
      }
      return series;
    },
  },
}
</script>

<style scoped>
button {
  background: #26E6A4;
  border: 0;
  font-size: 16px;
  color: '#fff';
  padding: 10px;
  margin-left: 28px;
}
</style>
