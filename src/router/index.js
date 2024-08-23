import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  // 後台
  {
    path: "/login",
    component: () => import("@/views/backend/Login.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("@/views/backend/Dashboard.vue"),
    children: [
      {
        path: "products",
        component: () => import("@/views/backend/Products.vue"),
      },
      {
        path: "orders",
        component: () => import("@/views/backend/Orders.vue"),
      },
      {
        path: "coupons",
        component: () => import("@/views/backend/Coupons.vue"),
      },
    ],
  },
  // 前台
  {
    path: "/Userboard",
    name: "userboard",
    component: () => import("@/views/Userboard.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/frontend/Home.vue"),
      },
      {
        path: "/userlogin",
        name: "userlogin",
        component: () => import("@/views/frontend/UserLogin.vue"),
      },
      {
        path: "/products",
        name: "products",
        component: () => import("@/views/frontend/Products.vue"),
      },
      {
        path: "/product/:productId",
        component: () => import("@/views/frontend/Product.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/views/frontend/About.vue"),
      },
      {
        path: "/favorite",
        name: "favorite",
        component: () => import("@/views/frontend/Favorite.vue"),
      },
      {
        path: "/cart",
        name: "cart",
        component: () => import("@/views/frontend/Cart.vue"),
      },
      {
        path: "/order",
        name: "order",
        component: () => import("@/views/frontend/Order.vue"),
      },
      {
        path: "/checkout/:orderId",
        name: "checkout",
        component: () => import("@/views/frontend/Checkout.vue"),
      },
    ],
  },
  // 404頁面
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;
