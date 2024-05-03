import { createRouter, createWebHistory } from 'vue-router'
import * as components from './imports';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: components.HomeView
  },
  {
    path: '/addproduct',
    name: "addproduct",
    component: components.AddProduct
  },
  {
    path: '/products',
    name: "products",
    component: components.ProductView
  },
  {
    path: '/product/:id',
    name: 'SingleProductView',
    component: components.SingleProductView
  },
  {
    path: '/categories',
    name: 'Categories',
    component: components.CategoriesView,
  },
  {
    path: '/categories/:id',
    name: 'SingleCategoryView',
    component: components.SingleCategoryView,
    props: true,
  },
  {
    path: "/addproduct",
    name: "addproduct",
    component: components.AddProductPage
  },
  {
    path: "/addcategory",
    name: "addcategory",
    component: components.AddCategoryPage
  },
  {
    path: '/products/:id/edit',
    name: 'EditProduct',
    component: components.EditProduct,
    props: true,
  },
  {
    path: '/edit-product',
    name: 'EditProductPage',
    component: components.EditProductPage
  },
  {
    path: '/inventory',
    name: 'InventoryShow',
    component: components.InventoryShow,
  },
  {
    path: "/orders",
    name: "Orders",
    component: components.OrderView,
  },
  {
    path: "/users",
    name: "users",
    component: components.UserView,
  },
  {
    path: "/editcategory",
    name: "editcategory",
    component: components.EditCategory,
  },
  {
    path: "/login",
    name: "Login",
    component: components.Login,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router