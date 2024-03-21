<template>
  
  <div class="container">
    <h2>Edit Category</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="category">Select Category:</label>
        <select class="form-control" id="category" v-model="selectedCategoryId">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" class="form-control" id="name" v-model="formData.name">
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea class="form-control" id="description" v-model="formData.description"></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
      <div v-if="message" :class="messageClass">{{ message }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    categoryId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      formData: {
        name: '',
        description: ''
      },
      message: '', // Success or error message
      messageClass: '', // Bootstrap class for the message
      selectedCategoryId: null,
      categories: [] // Array to store fetched categories
    };
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token');
      // Fetch categories to populate the dropdown
      const response = await axios.get(`http://127.0.0.1:8000/api/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/ld+json'
        }
      });
      this.categories = response.data['hydra:member'];

      // Fetch category data of the selected category
      await this.fetchCategoryData();
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },
  watch: {
    /* eslint-disable no-unused-vars */
    selectedCategoryId(newValue) {
      // Fetch category data whenever the selected category changes
      this.fetchCategoryData();
    }
  },
  methods: {
    async fetchCategoryData() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/categories/${this.selectedCategoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/ld+json'
          }
        });
        const categoryData = response.data;
        this.formData.name = categoryData.name;
        this.formData.description = categoryData.description;
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    },
    async submitForm() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`http://127.0.0.1:8000/api/categories/${this.selectedCategoryId}`, {
          name: this.formData.name,
          description: this.formData.description,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/ld+json'
          }
        });
        console.log('Category updated successfully:', response.data);
        this.message = 'Category updated successfully';
        this.messageClass = 'alert alert-success';
      } catch (error) {
        this.message = 'Error updating category';
        this.messageClass = 'alert alert-danger';
        console.error('Error updating category:', error);
      }
    },
  },
};
</script>

<style scoped>
/* You can add custom styles here if needed */
</style>
