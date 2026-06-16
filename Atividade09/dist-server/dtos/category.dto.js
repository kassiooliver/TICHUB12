export class CreateCategoryDto {
    constructor(name) {
        this.name = name;
    }
    static create(data) {
        return new CreateCategoryDto(data.name);
    }
}
export class UpdateCategoryDto {
    constructor(name) {
        this.name = name;
    }
    static create(data) {
        return new UpdateCategoryDto(data.name);
    }
}
export class CategoryResponseDto {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static create(category) {
        return new CategoryResponseDto(category.id, category.name);
    }
}
export class CategoryListDto {
    constructor(data, page, size) {
        this.data = data;
        this.page = page;
        this.size = size;
    }
    static create(categories, page, size) {
        return new CategoryListDto(categories.map(CategoryResponseDto.create), page, size);
    }
}
