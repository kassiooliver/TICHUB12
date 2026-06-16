import { Request, Response } from "express"

interface Category {
  id: string
  name: string
}

const categories: Category[] = [
  {
    id: "0f2a5b2c-2e59-4d11-8a16-339dc4c81d67",
    name: "Eletronicos"
  }
]

export function listCategories(req: Request, res: Response) {
  const { page, size } = res.locals.query as { page: number; size: number }
  const start = (page - 1) * size
  const paginatedCategories = categories.slice(start, start + size)

  return res.status(200).json({
    page,
    size,
    total: categories.length,
    data: paginatedCategories
  })
}

export function getCategoryById(req: Request, res: Response) {
  const { id } = req.params
  const category = categories.find(item => item.id === id)

  if (!category) {
    return res.status(404).json({ message: "Categoria nao encontrada." })
  }

  return res.status(200).json(category)
}

export function createCategory(req: Request, res: Response) {
  const { name } = req.body as { name: string }
  const category = {
    id: crypto.randomUUID(),
    name
  }

  categories.push(category)

  return res.status(201).json(category)
}

export function updateCategory(req: Request, res: Response) {
  const { id } = req.params
  const { name } = req.body as { name: string }
  const category = categories.find(item => item.id === id)

  if (!category) {
    return res.status(404).json({ message: "Categoria nao encontrada." })
  }

  category.name = name

  return res.status(200).json(category)
}

export function deleteCategory(req: Request, res: Response) {
  const { id } = req.params
  const categoryIndex = categories.findIndex(item => item.id === id)

  if (categoryIndex === -1) {
    return res.status(404).json({ message: "Categoria nao encontrada." })
  }

  categories.splice(categoryIndex, 1)

  return res.status(204).send()
}
