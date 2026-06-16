const categories = [
    {
        id: "0f2a5b2c-2e59-4d11-8a16-339dc4c81d67",
        name: "Eletronicos"
    }
];
export function listCategories(req, res) {
    const { page, size } = res.locals.query;
    const start = (page - 1) * size;
    const paginatedCategories = categories.slice(start, start + size);
    return res.status(200).json({
        page,
        size,
        total: categories.length,
        data: paginatedCategories
    });
}
export function getCategoryById(req, res) {
    const { id } = req.params;
    const category = categories.find(item => item.id === id);
    if (!category) {
        return res.status(404).json({ message: "Categoria nao encontrada." });
    }
    return res.status(200).json(category);
}
export function createCategory(req, res) {
    const { name } = req.body;
    const category = {
        id: crypto.randomUUID(),
        name
    };
    categories.push(category);
    return res.status(201).json(category);
}
export function updateCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const category = categories.find(item => item.id === id);
    if (!category) {
        return res.status(404).json({ message: "Categoria nao encontrada." });
    }
    category.name = name;
    return res.status(200).json(category);
}
export function deleteCategory(req, res) {
    const { id } = req.params;
    const categoryIndex = categories.findIndex(item => item.id === id);
    if (categoryIndex === -1) {
        return res.status(404).json({ message: "Categoria nao encontrada." });
    }
    categories.splice(categoryIndex, 1);
    return res.status(204).send();
}
