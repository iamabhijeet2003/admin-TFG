<template>
    <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add new product
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add new Product</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <AddProductForm></AddProductForm>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary mt-2 me-3" data-bs-dismiss="modal">Close</button>
                
            </div>
            </div>
        </div>
        </div>
</template>

<script>
import AddProductForm from '@/components/forms/AddProductForm.vue';
export default{
    components:{
        AddProductForm,
    },
}
</script>