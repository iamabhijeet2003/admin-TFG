import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddProduct from '../components/AddProduct.vue'
import ProductView from '../views/ProductsView.vue'
import SingleProductView from '../views/SingleProductView.vue'
import CategoriesView from '../views/category/CategoriesView.vue';
import SingleCategoryView from '../views/category/SingleCategoryView.vue'; 
import AddProductPage from '../views/AddProductPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path : '/addproduct',
    name : "addproduct",
    component: AddProduct

  },
  {
    path : '/products',
    name : "products",
    component: ProductView

  },
  {
    path: '/product/:id',
    name: 'SingleProductView',
    component: SingleProductView
  },
  {
    path: '/categories',
    name: 'Categories',
    component: CategoriesView,
  },
  {
    path: '/categories/:id', // Define a route parameter ':id' to capture the category ID
    name: 'SingleCategoryView', // Specify the route name
    component: SingleCategoryView, // Associate the route with the SingleCategoryView component
    props: true, // Pass route parameters as props to the component
  },
  {
    path: "/addproduct",
    name:"addproduct",
    component: AddProductPage
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router