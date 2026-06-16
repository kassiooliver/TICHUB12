export function authorize(role) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Token nao informado." });
        }
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Acesso negado." });
        }
        return next();
    };
}
