import { Request, Response } from "express"

interface Product {
  id: string
  name: string
  price: number
  categoryId: string
}

const products: Product[] = [
  {
    id: "29d1ad0e-7093-4079-8a82-6c6b7d053cce",
    name: "Smartphone",
    price: 2000,
    categoryId: "0f2a5b2c-2e59-4d11-8a16-339dc4c81d67"
  },
  {
    id: "779f6862-2d62-46ce-922c-48e49ff61442",
    name: "Notebook",
    price: 5000,
    categoryId: "0f2a5b2c-2e59-4d11-8a16-339dc4c81d67"
  }
]

export function listProducts(req: Request, res: Response) {
  const { category } = res.locals.query as { category?: string }

  if (category) {
    const filteredProducts = products.filter(product => product.categoryId === category)
    return res.status(200).json(filteredProducts)
  }

  return res.status(200).json(products)
}

export function createProduct(req: Request, res: Response) {
  const { name, price, categoryId } = req.body as Omit<Product, "id">
  const product = {
    id: crypto.randomUUID(),
    name,
    price,
    categoryId
  }

  products.push(product)

  return res.status(201).json(product)
}

export function deleteProduct(req: Request, res: Response) {
  const { id } = req.params
  const productIndex = products.findIndex(product => product.id === id)

  if (productIndex !== -1) {
    products.splice(productIndex, 1)
  }

  return res.status(204).send()
}
