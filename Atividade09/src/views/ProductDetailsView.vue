<template>
  <Card v-if="product">
    <template #title>{{ product.name }}</template>
    <template #content>
      <img :src="product.image" class="w-full max-w-md mb-4 rounded-lg" />
      <p>Categoria: {{ product.category.title }}</p>
      <p class="text-xl font-bold text-green-600">R$ {{ product.price }}</p>
    </template>
    <template #footer>
      <Button label="Adicionar" icon="pi pi-shopping-cart" @click="addProduct" />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useRouter } from "vue-router"
import Card from "primevue/card"
import Button from "primevue/button"
import { useShop } from "../composables/useShop"

type ApiError = Error & {
  status?: number
}

export default defineComponent({
  components: { Card, Button },
  props: {
    id: { type: String, required: true }
  },
  setup() {
    const shop = useShop()
    const router = useRouter()

    return {
      shop,
      router
    }
  },
  data() {
    return {
      product: null as ReturnType<typeof useShop>["state"]["products"][number] | null
    }
  },
  async mounted() {
    await this.shop.loadProducts()
    this.product = this.shop.getProductById(this.id)
  },
  methods: {
    async addProduct() {
      if (!this.product) {
        return
      }

      try {
        await this.shop.addToCart(this.product)
      } catch (error) {
        if ((error as ApiError).status === 401) {
          this.router.push({ name: "login", query: { redirect: this.$route.fullPath } })
          return
        }

        console.error(error)
      }
    }
  }
})
</script>
