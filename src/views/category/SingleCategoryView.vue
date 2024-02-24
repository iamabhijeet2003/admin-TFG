<template>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="text-center h1 mt-3">Category Details</h1>
        </div>
        <div class="col-12">
          <div v-if="loading" class="text-center h1"><span class="loader"></span></div>
          <div v-if="!loading && category">
            <p><strong>Name:</strong> {{ category.name }}</p>
            <p><strong>Description:</strong> {{ category.description }}</p>
            <p><strong>Created At:</strong> {{ category.created_at }}</p>
            <!-- You can add more details here if needed -->
          </div>
          <div v-if="!loading && !category">Category not found</div>
        </div>
        <div class="text-center mt-3">
        <router-link class="btn btn-lg btn-success" to="/categories">Go back</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        loading: true,
        category: null,
      };
    },
    mounted() {
      this.fetchCategory();
    },
    methods: {
      async fetchCategory() {
        try {
          const categoryId = this.$route.params.id;
          const response = await axios.get(`http://127.0.0.1:8001/api/categories/${categoryId}`);
          this.category = response.data;
        } catch (error) {
          console.error('Error fetching category:', error);
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: #FF3D00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
  
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  