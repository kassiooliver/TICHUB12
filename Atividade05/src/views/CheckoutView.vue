<template>
  <div>

    <h2 class="text-2xl font-semibold mb-4">
      Checkout
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

      <p>Total de itens: {{ shop.totalItems }}</p>

      <p class="font-bold text-lg mt-2">
        Total: R$ {{ shop.totalPrice }}
      </p>

      <Button
        label="Limpar Carrinho"
        icon="pi pi-trash"
        severity="danger"
        class="mt-4"
        @click="confirmClear"
      />

      <ul class="mt-4 space-y-2">

        <li
          v-for="item in shop.state.cartItems"
          :key="item.product.id"
          class="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
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

    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import InputNumber from "primevue/inputnumber"
import Button from "primevue/button"
import Card from "primevue/card"
import { useConfirm } from "primevue/useconfirm"
import { useShop } from "../composables/useShop"

export default defineComponent({
  name: "CheckoutView",

  components: {
    InputNumber,
    Button,
    Card
  },

  setup() {
    const shop = useShop()
    const confirm = useConfirm()

    function confirmClear() {
      confirm.require({
        message: "Deseja remover todos os itens do carrinho?",
        header: "Confirmação",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        acceptClass: "p-button-danger",
        rejectClass: "p-button-secondary",
        accept: () => {
          shop.clearCart()
        }
      })
    }

    return {
      shop,
      confirmClear
    }
  }
})
</script>
