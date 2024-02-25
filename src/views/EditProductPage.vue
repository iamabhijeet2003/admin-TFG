<!--src/views/EditProductPage.vue-->
<template>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Edit Product</h1>
          <form @submit.prevent="redirectToEdit">
            <div class="form-group">
              <label for="productId">Product ID:</label>
              <input type="number" class="form-control" id="productId" v-model="productId">
            </div>
            <button type="submit" class="btn btn-primary">Edit Product</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        productId: null
      };
    },
    methods: {
      redirectToEdit() {
        if (this.productId) {
          this.$router.push({ name: 'EditProduct', params: { id: this.productId } });
        } else {
          alert('Please enter a product ID');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  