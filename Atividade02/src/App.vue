<template>

  <h1>E-commerce</h1>

  <h2>Produtos</h2>

  <ProductCard
    v-for="product in products"
    :key="product.id"
    :product="product"
    @add-product="addToCart"
  />

  <hr>

  <h2>Carrinho</h2>

  <p>Total de itens: {{ totalItems }}</p>
  <p>Preço final: R$ {{ totalPrice }}</p>

  <ul>
    <li v-for="item in cartItems" :key="item.product.id">
      {{ item.product.name }} x {{ item.quantity }}
    </li>
  </ul>

</template>

<script lang="ts">
import { defineComponent } from "vue"
import ProductCard from "./Components/ProductCard.vue"
import { Product } from "./models/Product"
import { Category } from "./models/Category"
import { CartItem } from "./interfaces/CartItem"

export default defineComponent({

  components: {
    ProductCard
  },

  data() {

    const electronics: Category = {
      id: 1,
      title: "Eletrônicos"
    }

    return {

      products: [
        { id: 1, name: "Smartphone", price: 2000, category: electronics },
        { id: 2, name: "Notebook", price: 5000, category: electronics },
        { id: 3, name: "Tablet", price: 1500, category: electronics }
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

    }

  }

})
</script>