<!--src/views/EditProductPage.vue-->
<template>
    <div class="container" style="margin-left: 250px;">
      <div class="row">
        <div class="col">
          <h1 class="h1 text-center mt-5">Edit Product</h1>
          <form @submit.prevent="redirectToEdit" class="form border border-2 border-success">
            <div class="form-group col-3 m-4">
              <label for="productId" class="fw-bolder fs-3">Product ID:</label>
              <input type="number" class="form-control" id="productId" v-model="productId">
            </div>
            <button type="submit" class="btn btn-primary m-4">Edit Product</button>
          </form>
          <small class="small "> Si no sabes el ID del producto, tambien puedes editar el producto en la Pagina de Productos</small>
          <router-link to="/products" class="btn btn-success btn-md col-12">Ir a la pagina de productos <i class="fa fa-arrow-right"></i> </router-link>
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
  