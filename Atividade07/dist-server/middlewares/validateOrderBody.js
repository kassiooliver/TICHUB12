export function validateOrderBody(req, res, next) {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "O corpo da requisicao e obrigatorio." });
    }
    next();
}
