import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/public", express.static(path.join(__dirname, "../public")));

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    res.status(500).json({
      error: "Server error",
      details: err.message || "Unknown error",
    });
  }
);

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
