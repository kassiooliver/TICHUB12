<template>
  <div class="product-card">
    <h3>{{ product.name }}</h3>
    <p>Categoria: {{ product.category.title }}</p>
    <p>Preço: R$ {{ product.price }}</p>

    <button @click="$emit('add-product', product)">
      Adicionar
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Product } from "../models/Product"

export default defineComponent({
  name: "ProductCard",

  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  }
})
</script>