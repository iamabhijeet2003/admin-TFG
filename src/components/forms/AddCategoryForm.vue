<!-- src/components/forms/AddCategoryForm.vueAddCategoryForm.vue -->

<template>
  <div class="container">
    <h2>Add Category</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" class="form-control" id="name" v-model="formData.name">
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea class="form-control" id="description" v-model="formData.description"></textarea>
      </div>

      <!-- <div class="form-group">
        <label for="created_at">Created At</label>
        <input class="form-control" type="date" name="created_at" id="created_at">
      </div> -->
      <button type="submit" class="btn btn-primary">Submit</button>
      <div v-if="message" :class="messageClass">{{ message }}</div>

    </form>

  </div>
</template>

<script>
import axios from 'axios';
import { API_ROOT_URL } from '@/apiConfig';
export default {
  data() {
    return {
      formData: {
        name: '',
        description: ''
      },
      message: '', // Mensaje de éxito o error
      messageClass: '' // Clase de Bootstrap para el mensaje
    };
  },
  methods: {
    async submitForm() {
      // Emit an event to the parent component

      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_ROOT_URL}/categories`, {
          "@context": "/api/contexts/Category",
          "@type": "Category",
          "name": this.formData.name,
          "description": this.formData.description,
          //"created_at": this.formData.created_at,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/ld+json'
          }
        });
        console.log('Product added successfully:', response.data);
        // Establecer el mensaje de éxito
        this.message = 'Category agregado correctamente';
        this.messageClass = 'alert alert-success';

        // Limpiar el formulario después de agregar el producto
        this.formData = {};

        // Optionally, you can emit an event to notify parent components about the successful addition of the product
        this.$emit('categoryAdded', response.data);
      } catch (error) {
        this.message = 'Error al agregar la categoria';
        this.messageClass = 'alert alert-danger';
        console.error('Error adding category:', error);
      }
    },

  },
};
</script>

<style scoped>
/* You can add custom styles here if needed */
</style>