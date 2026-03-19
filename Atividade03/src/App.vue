<template>
  <div class="p-6">

    <!-- DIALOGO DE CONFIRMACAO -->
    <ConfirmDialog />

    <!-- TÍTULO -->
    <h1 class="text-3xl font-bold mb-6">
      E-commerce
    </h1>

    <!-- PRODUTOS -->
    <h2 class="text-2xl font-semibold mb-4">
      Produtos
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-product="addToCart"
      />

    </div>

    <!-- CARRINHO -->
    <div class="mt-10">

      <h2 class="text-2xl font-semibold mb-4">
        Carrinho
      </h2>

      <!-- CARRINHO VAZIO -->
      <Card v-if="cartItems.length === 0" class="mt-4 text-center p-6">

        <template #title>
          🛒 Carrinho vazio
        </template>

        <template #content>
          <p class="text-gray-500">
            Adicione produtos para começar sua compra.
          </p>
        </template>

      </Card>

      <!-- CARRINHO COM ITENS -->
      <div v-else>

        <p>Total de itens: {{ totalItems }}</p>

        <p class="font-bold text-lg mt-2">
          Total: R$ {{ totalPrice }}
        </p>

        <!-- BOTÃO LIMPAR -->
        <Button
          label="Limpar Carrinho"
          icon="pi pi-trash"
          severity="danger"
          class="mt-4"
          @click="confirmClear"
        />

        <!-- LISTA -->
        <ul class="mt-4 space-y-2">

          <li
            v-for="item in cartItems"
            :key="item.product.id"
            class="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
          >

            <!-- Nome -->
            <span class="w-1/3">
              {{ item.product.name }}
            </span>

            <!-- QUANTIDADE DE ITENS -->
            <InputNumber
              v-model="item.quantity"
              showButtons
              buttonLayout="horizontal"
              :min="1"
              class="w-32"
            />

            <!-- Subtotal -->
            <span class="w-1/3 text-right font-bold">
              R$ {{ item.product.price * item.quantity }}
            </span>

            <!-- Remover item -->
            <Button
              icon="pi pi-trash"
              severity="danger"
              @click="removeItem(item.product.id)"
            />

          </li>

        </ul>

      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import ProductCard from "./Components/ProductCard.vue"

import InputNumber from "primevue/inputnumber"
import Button from "primevue/button"
import Card from "primevue/card"
import ConfirmDialog from "primevue/confirmdialog"

import { Product } from "./models/Product"
import { Category } from "./models/Category"
import { CartItem } from "./interfaces/CartItem"

export default defineComponent({

  components: {
    ProductCard,
    InputNumber,
    Button,
    Card,
    ConfirmDialog
  },

  data() {

    const electronics: Category = {
      id: 1,
      title: "Eletrônicos"
    }

    return {

      products: [
        { id: 1, name: "Smartphone", price: 2000, category: electronics,  image: "/src/assets/smartphone.jpg" },
        { id: 2, name: "Notebook", price: 5000, category: electronics, image: "/src/assets/notebook.jpg"  },
        { id: 3, name: "Tablet", price: 1500, category: electronics, image: "/src/assets/tablet.jpg"  }
      ] as Product[],

      cartItems: [] as CartItem[]

    }
  },

  computed: {

    totalItems(): number {
      return this.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      )
    },

    totalPrice(): number {
      return this.cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      )
    }

  },

  methods: {

    addToCart(product: Product) {

      const item = this.cartItems.find(
        i => i.product.id === product.id
      )

      if (item) {
        item.quantity++
      } else {
        this.cartItems.push({
          product,
          quantity: 1
        })
      }

    },

    removeItem(productId: number) {
      this.cartItems = this.cartItems.filter(
        item => item.product.id !== productId
      )
    },

  confirmClear() {
  (this as any).$confirm.require({
    message: 'Deseja remover todos os itens do carrinho?',
    header: 'Confirmação',
    icon: 'pi pi-exclamation-triangle',

    acceptLabel: 'Sim',
    rejectLabel: 'Não',

    acceptClass: 'p-button-danger',
    rejectClass: 'p-button-secondary',

    accept: () => {
      this.cartItems = []
    }
  })
}

  }

})
</script>