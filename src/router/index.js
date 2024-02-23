import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddProduct from '../components/AddProduct.vue'
import ProductView from '../views/ProductsView.vue'
import SingleProductView from '../views/SingleProductView.vue'

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
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router