<template>
  <Card class="shadow-lg rounded-2xl overflow-hidden">

    <!-- IMAGEM -->
    <template #header>
      <img
        :src="product.image"
        alt="Produto"
        class="w-full h-40 object-cover hover:scale-105 transition duration-300"
      />
    </template>

    <!-- TÍTULO -->
    <template #title>
      {{ product.name }}
    </template>

    <!-- CONTEÚDO -->
    <template #content>
      <p class="text-gray-500 mb-2">
        Categoria: {{ product.category.title }}
      </p>

      <p class="text-xl font-bold text-green-600">
        R$ {{ product.price }}
      </p>
    </template>

    <!-- BOTÃO -->
    <template #footer>
      <Button
        label="Adicionar"
        icon="pi pi-shopping-cart"
        class="w-full"
        @click="$emit('add-product', product)"
      />
    </template>

  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Product } from "../models/Product"

import Card from "primevue/card"
import Button from "primevue/button"

export default defineComponent({
  name: "ProductCard",

  components: {
    Card,
    Button
  },

  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  }
})
</script>