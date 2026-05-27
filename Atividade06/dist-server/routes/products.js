import { Router } from "express";
import { products } from "../data/products.js";
const router = Router();
router.get("/", (req, res, _next) => {
    const category = req.query.category;
    if (typeof category === "string") {
        const filteredProducts = products.filter(product => product.category === category);
        return res.status(200).json(filteredProducts);
    }
    return res.status(200).json(products);
});
router.get("/:id", (req, res, _next) => {
    const id = Number(req.params.id);
    if (id < 0) {
        return res.status(400).json({ message: "O ID do produto nao pode ser negativo." });
    }
    const product = products.find(item => item.id === id);
    if (!product) {
        return res.status(404).json({ message: "Produto nao encontrado." });
    }
    return res.status(200).json(product);
});
export default router;
