import { createRouter, createWebHistory } from "vue-router"
import { useShop } from "../composables/useShop"
import { Role } from "../enums/Role"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../layouts/ConsumerLayout.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/HomeView.vue")
        },
        {
          path: "produto/:id",
          name: "product-details",
          component: () => import("../views/ProductDetailsView.vue"),
          props: true
        },
        {
          path: "checkout",
          name: "checkout",
          component: () => import("../views/CheckoutView.vue"),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: "/admin",
      component: () => import("../layouts/AdminLayout.vue"),
      meta: { requiresAuth: true, requiresRole: Role.ADMIN },
      children: [
        {
          path: "",
          name: "admin-dashboard",
          component: () => import("../views/admin/AdminDashboardView.vue")
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const shop = useShop()

  if (to.meta.requiresAuth && !shop.isAuthenticated.value) {
    return { name: "home" }
  }

  if (to.meta.requiresRole && shop.state.currentUser?.role !== to.meta.requiresRole) {
    return { name: "home" }
  }
})

export default router
