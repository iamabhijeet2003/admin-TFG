import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddProduct from '../components/AddProduct.vue'
import ProductView from '../views/ProductsView.vue'

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
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router