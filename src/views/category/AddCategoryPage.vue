<template>
    <div>
        <h1 class="h1 text-center" style="margin-left: 250px;">Add a new category</h1>
        <div class="row">
            <div class="col">
                <AddCategoryForm></AddCategoryForm>
            </div>
            <div class="text-end me-5">
                <router-link to="/categories" class="btn btn-lg btn-success me-5">Go back to category</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import AddCategoryForm from '@/components/forms/AddCategoryForm.vue';
export default {
    components: {
        AddCategoryForm,
    },
}
</script>