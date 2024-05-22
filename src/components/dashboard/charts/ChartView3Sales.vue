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
          text: 'Sales Analysis',
          align: 'left'
        },
        subtitle: {
          text: 'Total Sales',
          align: 'left'
        },
        xaxis: {
          categories: [],
          title: {
            text: 'Order'
          }
        },
        yaxis: {
          title: {
            text: 'Amount'
          }
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
    // Fetch and process the sales data from the API
    this.fetchSalesData();
  },
  methods: {
    async fetchSalesData() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        // Process the API response to extract the sales data
        const salesData = data['hydra:member'].map(order => order.total);

        // Set the series data for the chart
        this.series = [{
          name: 'Sales',
          data: salesData
        }];
        this.chartOptions.xaxis.categories = salesData.map((_, index) => index + 1);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    }
  }
};
</script>


<style scoped>
#chart {
  margin-top: 20px;
}
</style>
