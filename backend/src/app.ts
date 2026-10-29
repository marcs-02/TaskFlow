import cors from "cors";
import express from "express";
import pool from "./config/database";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlow API funcionando correctamente",
  });
});

app.get("/api", (_req, res) => {
  res.status(200).json({
    name: "TaskFlow API",
    version: "1.0.0",
    status: "online",
  });
});

app.get("/api/health/db", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS server_time");

    res.status(200).json({
      success: true,
      message: "Conexión con PostgreSQL correcta",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error al conectar con PostgreSQL:", error);

    res.status(503).json({
      success: false,
      message: "No se pudo conectar con PostgreSQL",
    });
  }
});

app.use("/api/tareas", taskRoutes);

export default app;

