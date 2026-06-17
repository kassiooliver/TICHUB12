<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">E-commerce</h1>
    <h2 class="text-2xl font-semibold mb-4">Produtos</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in shop.state.products"
        :key="product.id"
        :product="product"
        @add-product="addProduct"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useRouter } from "vue-router"
import ProductCard from "../Components/ProductCard.vue"
import { useShop } from "../composables/useShop"
import { Product } from "../models/Product"

type ApiError = Error & {
  status?: number
}

export default defineComponent({
  components: { ProductCard },
  setup() {
    const shop = useShop()
    const router = useRouter()

    async function addProduct(product: Product) {
      try {
        await shop.addToCart(product)
      } catch (error) {
        if ((error as ApiError).status === 401) {
          router.push({ name: "login", query: { redirect: "/" } })
          return
        }

        console.error(error)
      }
    }

    return { shop, addProduct }
  },
  mounted() {
    this.shop.loadProducts()
  }
})
</script>
