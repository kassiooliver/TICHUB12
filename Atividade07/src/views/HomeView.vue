<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">E-commerce</h1>
    <h2 class="text-2xl font-semibold mb-4">Produtos</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in shop.state.products"
        :key="product.id"
        :product="product"
        @add-product="shop.addToCart"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import ProductCard from "../Components/ProductCard.vue"
import { useShop } from "../composables/useShop"

export default defineComponent({
  components: { ProductCard },
  data() {
    return { shop: useShop() }
  }
})
</script>
