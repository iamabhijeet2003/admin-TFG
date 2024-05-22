<template>
  <div id="chart">
    <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
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
          width: 380,
          type: 'pie',
        },
        labels: ['Prepared', 'Not Prepared'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    };
  },
  mounted() {
    // Fetch and process the orders data from the API
    this.fetchOrdersData();
  },
  methods: {
    async fetchOrdersData() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        // Process the API response to extract the prepared status
        const orders = data['hydra:member'];
        const preparedCount = orders.filter(order => order.prepared).length;
        const notPreparedCount = orders.length - preparedCount;

        // Set the series data for the chart
        this.series = [preparedCount, notPreparedCount];
      } catch (error) {
        console.error('Error fetching orders data:', error);
      }
    }
  }
};
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