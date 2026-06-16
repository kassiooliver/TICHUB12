import express from "express";
import { pathToFileURL } from "url";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { logger } from "./middlewares/logger.js";
import categoryRouter from "./routes/category.router.js";
import ordersRouter from "./routes/orders.js";
import productsRouter from "./routes/products.js";
const app = express();
const port = Number(process.env.PORT) || 3001;
app.use(express.json());
app.use(logger);
app.get("/", (_req, res) => {
    return res.status(200).json({ message: "API rodando." });
});
app.use("/categories", categoryRouter);
app.use("/category", categoryRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use(errorMiddleware);
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}
export default app;
