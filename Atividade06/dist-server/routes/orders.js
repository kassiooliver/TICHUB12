import { Router } from "express";
import { validateOrderBody } from "../middlewares/validateOrderBody.js";
const router = Router();
router.post("/", validateOrderBody, (req, res, _next) => {
    return res.status(201).json(req.body);
});
router.patch("/:id", (req, res, _next) => {
    const { id } = req.params;
    const { status } = req.body;
    return res.status(200).json({
        id,
        status
    });
});
router.delete("/:id", (_req, res, _next) => {
    return res.status(204).send();
});
export default router;
