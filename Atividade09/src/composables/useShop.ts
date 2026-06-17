import { computed, reactive } from "vue"
import { Product } from "../models/Product"
import { CartItem } from "../interfaces/CartItem"
import { useAuthStore } from "../stores/auth"

const API_URL = "http://localhost:3001"

type ApiProduct = {
  id: string
  name: string
  price: number
  stock: number
  categoryId: string
}

type ApiError = Error & {
  status?: number
}

const state = reactive({
  products: [] as Product[],
  cartItems: [] as CartItem[]
})

function getAuthHeaders() {
  const auth = useAuthStore()

  if (!auth.token) {
    throw new Error("Faca login para usar o carrinho.")
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.token}`
  }
}

function mapProduct(product: ApiProduct): Product {
  const name = product.name.toLowerCase()

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock,
    categoryId: product.categoryId,
    category: {
      id: product.categoryId,
      title: "Categoria"
    },
    image: name.includes("notebook")
      ? "/src/assets/notebook.jpg"
      : name.includes("tablet")
        ? "/src/assets/tablet.jpg"
        : "/src/assets/smartphone.jpg"
  }
}

async function createApiError(response: Response, fallbackMessage: string) {
  const data = await response.json().catch(() => null)
  const error = new Error(data?.message ?? fallbackMessage) as ApiError
  error.status = response.status
  return error
}

async function loadProducts() {
  const response = await fetch(`${API_URL}/products`)

  if (!response.ok) {
    throw await createApiError(response, "Nao foi possivel carregar os produtos.")
  }

  const result = await response.json()
  state.products = result.data.map(mapProduct)
}

async function loadCart() {
  const auth = useAuthStore()

  if (!auth.token) {
    state.cartItems = []
    return
  }

  const response = await fetch(`${API_URL}/cart`, {
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    state.cartItems = []
    return
  }

  const result = await response.json()
  state.cartItems = result.data.map((item: { product: ApiProduct; quantity: number }) => ({
    product: mapProduct(item.product),
    quantity: item.quantity
  }))
}

async function addToCart(product: Product) {
  const response = await fetch(`${API_URL}/cart/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ productId: product.id, quantity: 1 })
  })

  if (!response.ok) {
    throw await createApiError(response, "Nao foi possivel adicionar ao carrinho.")
  }

  await loadCart()
}

async function updateItem(productId: string, quantity: number) {
  const response = await fetch(`${API_URL}/cart/items/${productId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ quantity })
  })

  if (!response.ok) {
    throw new Error("Nao foi possivel atualizar o carrinho.")
  }

  await loadCart()
}

async function removeItem(productId: string) {
  const response = await fetch(`${API_URL}/cart/items/${productId}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  })

  if (!response.ok) {
    throw new Error("Nao foi possivel remover do carrinho.")
  }

  state.cartItems = state.cartItems.filter(item => item.product.id !== productId)
}

async function clearCart() {
  const auth = useAuthStore()

  if (auth.token) {
    await fetch(`${API_URL}/cart`, {
      method: "DELETE",
      headers: getAuthHeaders()
    })
  }

  state.cartItems = []
}

function resetCart() {
  state.cartItems = []
}

function getProductById(id: string) {
  return state.products.find(product => product.id === id) ?? null
}

export function useShop() {
  return {
    state,
    loadProducts,
    loadCart,
    addToCart,
    updateItem,
    removeItem,
    clearCart,
    resetCart,
    getProductById,
    totalItems: computed(() => state.cartItems.reduce((t, i) => t + i.quantity, 0)),
    totalPrice: computed(() => state.cartItems.reduce((t, i) => t + i.product.price * i.quantity, 0))
  }
}
