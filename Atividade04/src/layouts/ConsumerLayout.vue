<template>
  <div class="p-6">
    <ConfirmDialog />

    <Menubar :model="items">
      <template #end>
        <div class="flex gap-2">
          <Button
            label="Cliente"
            size="small"
            :severity="isCustomer ? undefined : 'secondary'"
            @click="loginAsCustomer"
          />

          <Button
            label="Admin"
            size="small"
            :severity="isAdmin ? 'contrast' : 'secondary'"
            @click="loginAsAdmin"
          />

          <Button
            label="Sair"
            size="small"
            severity="secondary"
            @click="logout"
          />
        </div>
      </template>
    </Menubar>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <div class="lg:col-span-2">
        <router-view />
      </div>

      <div>
        <h2 class="text-2xl font-semibold mb-4">
          Carrinho
        </h2>

        <Card v-if="shop.state.cartItems.length === 0" class="mt-4 text-center p-6">
          <template #title>
            🛒 Carrinho vazio
          </template>

          <template #content>
            <p class="text-gray-500">
              Adicione produtos para começar sua compra.
            </p>
          </template>
        </Card>

        <div v-else>
          <p>Total de itens: {{ totalItems }}</p>

          <p class="font-bold text-lg mt-2">
            Total: R$ {{ totalPrice }}
          </p>

          <ul class="mt-4 space-y-2">
            <li
              v-for="item in shop.state.cartItems"
              :key="item.product.id"
              class="flex justify-between items-center bg-gray-100 p-3 rounded-lg gap-3"
            >
              <span class="w-1/3">
                {{ item.product.name }}
              </span>

              <InputNumber
                v-model="item.quantity"
                showButtons
                buttonLayout="horizontal"
                :min="1"
                class="w-32"
              />

              <span class="w-1/3 text-right font-bold">
                R$ {{ item.product.price * item.quantity }}
              </span>

              <Button
                icon="pi pi-trash"
                severity="danger"
                @click="shop.removeItem(item.product.id)"
              />
            </li>
          </ul>

          <router-link to="/checkout" class="block mt-4">
            <Button
              label="Ir para Checkout"
              icon="pi pi-shopping-cart"
              class="w-full"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useRouter } from "vue-router"
import Menubar from "primevue/menubar"
import Button from "primevue/button"
import Card from "primevue/card"
import InputNumber from "primevue/inputnumber"
import ConfirmDialog from "primevue/confirmdialog"
import { useShop } from "../composables/useShop"
import { Role } from "../enums/Role"

export default defineComponent({
  components: {
    Menubar,
    Button,
    Card,
    InputNumber,
    ConfirmDialog
  },

  setup() {
    const shop = useShop()
    const router = useRouter()

    function loginAsCustomer() {
      shop.loginAsCustomer()
      router.push("/")
    }

    function loginAsAdmin() {
      shop.loginAsAdmin()
      router.push("/admin")
    }

    function logout() {
      shop.logout()
      router.push("/")
    }

    return {
      shop,
      router,
      loginAsCustomer,
      loginAsAdmin,
      logout
    }
  },

  data() {
    return {
      items: [
        { label: "Home", icon: "pi pi-home", to: "/" },
        { label: "Checkout", icon: "pi pi-shopping-cart", to: "/checkout" },
        { label: "Admin", icon: "pi pi-cog", to: "/admin" }
      ]
    }
  },

  computed: {
    totalItems() {
      return this.shop.totalItems
    },
    totalPrice() {
      return this.shop.totalPrice
    },
    isAdmin() {
      return this.shop.state.currentUser?.role === Role.ADMIN
    },
    isCustomer() {
      return this.shop.state.currentUser?.role === Role.CUSTOMER
    }
  }
})
</script>
