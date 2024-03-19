<template>
  <div id="chart">
    <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Sales Analysis by Day',
          align: 'left'
        },
        subtitle: {
          text: 'Total Sales',
          align: 'left'
        },
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          opposite: true
        },
        legend: {
          horizontalAlign: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
      }
    };
  },
  mounted() {
    // Simulate fetching sales data
    this.fetchSalesData();
  },
  methods: {
    fetchSalesData() {
      // Dummy sales data for testing
      const dummySalesData = {
        "2022-01-01": 11236,
        "2022-01-02": 3132,
        "2022-01-03": 1078,
        "2022-01-04": 4616,
        "2022-01-05": 15172,
        "2022-01-06": 9094,
        "2022-01-07": 9,
        "2022-01-08": 1145,
        "2022-01-09": 5465,
        "2022-01-10": 9094,
        "2022-01-11": 4566
      };

      const dummyFormattedDates = [
        "2022-01-01",
        "2022-01-02",
        "2022-01-03",
        "2022-01-04",
        "2022-01-05",
        "2022-01-06",
        "2022-01-07",
        "2022-01-08",
        "2022-01-09",
        "2022-01-10",
        "2022-01-11"
      ];

      // Set the series data and formatted dates
      this.series = [{
        name: 'Sales',
        data: dummyFormattedDates.map(date => dummySalesData[date])
      }];
      this.chartOptions.xaxis.categories = dummyFormattedDates;
    }
  }
};
</script>

<style scoped>
#chart {
  margin-top: 20px;
}
</style>
