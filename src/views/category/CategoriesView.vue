<template>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="text-center h1 mt-3">Categories Page</h1>
          <AddCategory></AddCategory>
        </div>
        <div class="col-12">
          <div v-if="loading" class="text-center h1"><span class="loader"></span></div>
          <table v-if="!loading && categories.length" class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Created At</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in categories" :key="category['@id']">
                <td class="fw-bolder">{{ category.id }}</td>
                <td class="fw-bolder">{{ category.name }}</td>
                <td class="text-info">{{ category.description }}</td>
                <td>{{ category.created_at }}</td>
                <td>
                    <router-link :to="{ name: 'SingleCategoryView', params: { id: category.id } }" class="btn btn-md btn-primary mx-2">View Category</router-link>
                    <button class="btn btn-md btn-warning mx-2">Edit</button>
                    <button @click="confirmDelete(category.id)" class="btn btn-md btn-danger mx-2">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="!loading && !categories.length">No categories available</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AddCategory from './ModalAddCategory.vue';
  import { API_ROOT_URL } from '@/apiConfig';
  export default {
    data() {
      return {
        loading: true,
        categories: [],
      };
    },
    components:{
    AddCategory,
},
    mounted() {
      this.fetchCategories();
     
    },
    methods: {
      async fetchCategories() {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.get(`${API_ROOT_URL}/categories`,{
            headers:{
              Authorization: `Bearer ${token}`,
            }
          });
          this.categories = response.data['hydra:member'];
        } catch (error) {
          console.error('Error fetching categories:', error);
        } finally {
          this.loading = false;
        }
      },
      async confirmDelete(categoryId) {
      const confirmDelete = confirm('Are you sure you want to delete this category?');
      if (confirmDelete) {
        try {
          const token = localStorage.getItem('token')
          await axios.delete(`${API_ROOT_URL}/categories/${categoryId}`,{
            headers:{
              Authorization: `Bearer ${token}`,
            }
          });
          alert('Category deleted successfully');
          // Refresh the category list after deletion
          this.fetchCategories();
        } catch (error) {
          console.error('Error deleting category:', error);
          alert('Failed to delete category');
        }
      }
    },
    },
  };
  </script>
  
  <style scoped>
  /* You can add custom styles here if needed */
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
  