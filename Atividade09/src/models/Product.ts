import { Category } from "./Category"

export interface Product {
  id: string
  name: string
  price: number
  stock: number
  categoryId: string
  category: Category
  image: string
}
