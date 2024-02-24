<template>
    <div>
      <h1 class="h1 text-center">Add new category</h1>
      <AddCategoryForm/>
    </div>
  </template>
  
  <script>
  import AddCategoryForm from './forms/AddCategoryForm.vue';
  
  export default {
    components: {
      AddCategoryForm
    },
   
  };
  </script>
  
  <style scoped>
  /* You can add custom styles here if needed */
  </style>
  