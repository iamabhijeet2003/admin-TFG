<template>
    <div class="container">
        <h1 class="h1 text-center fw-bolder">Add New Product </h1>
        <div class="border border-2 border-info p-5 m-3">
            <AddProductForm></AddProductForm>
        </div>
        <div class="text-end me-5">
            <router-link to="products" class="btn btn-lg btn-success text-center">Go to products page</router-link>
        </div>
    </div>
</template>

<script>
import AddProductForm from '@/components/forms/AddProductForm.vue';
export default {
    components: {
        AddProductForm,
    },
}
</script>