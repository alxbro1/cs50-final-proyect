import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import session from "./routes/session";
import usersRouter from "./routes/users";
import professionalRouter from "./routes/profesional";
import appointmentRouter from "./routes/appointment";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/session", session);
app.use("/professionals", professionalRouter);
app.use("/users", usersRouter);
app.use("/appointments", appointmentRouter);

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    console.error(err.stack);
    res.status(500).json({
      error: "Server error",
      message: err.message || "Unknown error",
    });
  }
);

// For local development only
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Export the Express API for serverless deployment
export default app;
