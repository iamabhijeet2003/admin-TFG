<!-- AddCategoryForm.vue -->

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
        <div class="form-group">
            <label for="created_at">Created At</label>
            <input class="form-control" type="date" name="created_at" id="created_at">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          description: ''
        }
      };
    },
    methods: {
      submitForm() {
        // Emit an event to the parent component
        this.$emit('submit', this.formData);
        // Reset form data
        this.formData = { name: '', description: '' };
      }
    }
  };
  </script>
  
  <style scoped>
  /* You can add custom styles here if needed */
  </style>
  