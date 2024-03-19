<template>
  <div class="text-center">
    <apexcharts width="550" type="bar" :options="chartOptions" :series="series"></apexcharts>
    <h4 class="h4 text-center">Categorias de productos con mas ventas</h4>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import axios from 'axios';
export default {
  name: 'VueChart',
  components: {
    apexcharts: VueApexCharts,
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [],
        },
      },
      series: [{
        name: 'ventas',
        data: [30, 40, 45, 50, 49, 60, 70, 81]
      }]
    }
  },
  methods: {
    async updateChart() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/categories', {
          headers: {
            'Authorization': `Bearer ${token}`, 
          }
        });
        const categories = response.data; 

        
        this.chartOptions = {
          ...this.chartOptions, 
          xaxis: {
            categories: categories, 
          }
        };

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  }
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