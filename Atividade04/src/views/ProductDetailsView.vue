<template>
  <Card v-if="product">
    <template #title>{{ product.name }}</template>
    <template #content>
      <img :src="product.image" class="w-full max-w-md mb-4 rounded-lg" />
      <p>Categoria: {{ product.category.title }}</p>
      <p class="text-xl font-bold text-green-600">R$ {{ product.price }}</p>
    </template>
    <template #footer>
      <Button label="Adicionar" icon="pi pi-shopping-cart" @click="shop.addToCart(product)" />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Card from "primevue/card"
import Button from "primevue/button"
import { useShop } from "../composables/useShop"

export default defineComponent({
  components: { Card, Button },
  props: {
    id: { type: String, required: true }
  },
  data() {
    const shop = useShop()
    return {
      shop,
      product: shop.getProductById(Number(this.id))
    }
  }
})
</script>
