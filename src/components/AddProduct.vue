<template>
    <div style="margin-left: 250px;">
      <h1 class="h1 text-center">Add New Product</h1>
      <AddProductForm />
    </div>
  </template>
  
  <script>
  import AddProductForm from './forms/AddProductForm.vue';
  
  export default {
    components: {
      AddProductForm
    }
  };
  </script>
  
  <style scoped>
  /* You can add custom styles here if needed */
  </style>
  