import { computed, reactive } from "vue"
import { Product } from "../models/Product"
import { Category } from "../models/Category"
import { CartItem } from "../interfaces/CartItem"

const electronics: Category = { id: 1, title: "Eletrônicos" }

const state = reactive({
  products: [
    { id: 1, name: "Smartphone", price: 2000, category: electronics, image: "/src/assets/smartphone.jpg" },
    { id: 2, name: "Notebook", price: 5000, category: electronics, image: "/src/assets/notebook.jpg" },
    { id: 3, name: "Tablet", price: 1500, category: electronics, image: "/src/assets/tablet.jpg" }
  ] as Product[],
  cartItems: [] as CartItem[]
})

function addToCart(product: Product) {
  const item = state.cartItems.find(i => i.product.id === product.id)
  if (item) item.quantity++
  else state.cartItems.push({ product, quantity: 1 })
}

function removeItem(productId: number) {
  state.cartItems = state.cartItems.filter(item => item.product.id !== productId)
}

function clearCart() {
  state.cartItems = []
}

function getProductById(id: number) {
  return state.products.find(product => product.id === id) ?? null
}

export function useShop() {
  return {
    state,
    addToCart,
    removeItem,
    clearCart,
    getProductById,
    totalItems: computed(() => state.cartItems.reduce((t, i) => t + i.quantity, 0)),
    totalPrice: computed(() => state.cartItems.reduce((t, i) => t + i.product.price * i.quantity, 0))
  }
}
