import { Category } from "../entities/Category.js"

export class CreateCategoryDto {
  private constructor(public readonly name: string) {}

  static create(data: { name: string }) {
    return new CreateCategoryDto(data.name)
  }
}

export class UpdateCategoryDto {
  private constructor(public readonly name: string) {}

  static create(data: { name: string }) {
    return new UpdateCategoryDto(data.name)
  }
}

export class CategoryResponseDto {
  private constructor(
    public readonly id: string,
    public readonly name: string
  ) {}

  static create(category: Category) {
    return new CategoryResponseDto(category.id, category.name)
  }
}

export class CategoryListDto {
  private constructor(
    public readonly data: CategoryResponseDto[],
    public readonly page: number,
    public readonly size: number
  ) {}

  static create(categories: Category[], page: number, size: number) {
    return new CategoryListDto(categories.map(CategoryResponseDto.create), page, size)
  }
}
