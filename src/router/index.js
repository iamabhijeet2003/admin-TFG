import { createRouter, createWebHistory } from 'vue-router'
import * as components from './imports';
import { authMiddleware } from '@/middleware/auth';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: components.HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/addproduct',
    name: "addproduct",
    component: components.AddProduct,
    meta: { requiresAuth: true }
  },
  {
    path: '/products',
    name: "products",
    component: components.ProductView,
    meta: { requiresAuth: true }
  },
  {
    path: '/product/:id',
    name: 'SingleProductView',
    component: components.SingleProductView,
    meta: { requiresAuth: true }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: components.CategoriesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/categories/:id',
    name: 'SingleCategoryView',
    component: components.SingleCategoryView,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/addproduct",
    name: "addproduct",
    component: components.AddProductPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/addcategory",
    name: "addcategory",
    component: components.AddCategoryPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/:id/edit',
    name: 'EditProduct',
    component: components.EditProduct,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-product',
    name: 'EditProductPage',
    component: components.EditProductPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/inventory',
    name: 'InventoryShow',
    component: components.InventoryShow,
    meta: { requiresAuth: true }
  },
  {
    path: "/orders",
    name: "Orders",
    component: components.OrderView,
    meta: { requiresAuth: true }
  },
  {
    path: "/users",
    name: "users",
    component: components.UserView,
    meta: { requiresAuth: true }
  },
  {
    path: "/editcategory",
    name: "editcategory",
    component: components.EditCategory,
    meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
      // Apply authMiddleware to protected routes
      authMiddleware(to, from, next);
  } else {
      // For non-protected routes, proceed to the next route
      next();
  }
});

export default router