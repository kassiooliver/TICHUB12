import { createRouter, createWebHistory } from "vue-router"
import { Role } from "../enums/Role"
import { useAuthStore } from "../stores/auth"

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
      path: "/login",
      name: "login",
      component: () => import("../views/auth/AuthView.vue"),
      meta: { guestOnly: true }
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
  const auth = useAuthStore()

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: "home" }
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return {
      name: "login",
      query: { redirect: to.fullPath }
    }
  }

  if (to.meta.requiresRole && auth.user?.role !== to.meta.requiresRole) {
    return { name: "home" }
  }
})

export default router
