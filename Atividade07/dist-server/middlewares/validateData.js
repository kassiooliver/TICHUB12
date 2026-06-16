export function validateData(schema, source = "body") {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);
        if (!result.success) {
            return res.status(400).json(result.error.format());
        }
        res.locals[source] = result.data;
        if (source !== "query") {
            req[source] = result.data;
        }
        return next();
    };
}
