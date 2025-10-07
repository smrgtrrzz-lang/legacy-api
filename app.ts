import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok", message: "Server running 🚀" }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

export default app;
