<template>
  <Card class="shadow-lg rounded-2xl overflow-hidden">

    <template #header>
      <router-link :to="`/produto/${product.id}`">
        <img
          :src="product.image"
          alt="Produto"
          class="w-full h-40 object-cover hover:scale-105 transition duration-300"
        />
      </router-link>
    </template>

    <template #title>
      <router-link :to="`/produto/${product.id}`" class="no-underline">
        {{ product.name }}
      </router-link>
    </template>

    <template #content>
      <p class="text-gray-500 mb-2">
        Categoria: {{ product.category.title }}
      </p>

      <p class="text-xl font-bold text-green-600">
        R$ {{ product.price }}
      </p>
    </template>

    <template #footer>
      <div class="flex flex-col gap-2">
        <router-link :to="`/produto/${product.id}`">
          <Button
            label="Ver detalhes"
            icon="pi pi-eye"
            class="w-full p-button-outlined"
          />
        </router-link>

        <Button
          label="Adicionar"
          icon="pi pi-shopping-cart"
          class="w-full"
          @click="$emit('add-product', product)"
        />
      </div>
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
