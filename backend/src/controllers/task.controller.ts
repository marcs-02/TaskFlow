import type { Request, Response } from "express";
import taskRepository, {
  type CreateTaskInput,
  type TaskPriority,
  type TaskStatus,
  type UpdateTaskInput,
} from "../repositories/task.repository";

const validPriorities: TaskPriority[] = ["baja", "media", "alta"];
const validStatuses: TaskStatus[] = [
  "pendiente",
  "en progreso",
  "completada",
];

const allowedFields = [
  "titulo",
  "descripcion",
  "prioridad",
  "estado",
  "fecha_vencimiento",
];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidDate(value: unknown): boolean {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

function validateTaskInput(
  body: unknown,
  partial = false,
): { data?: CreateTaskInput | UpdateTaskInput; error?: string } {
  if (!isObject(body)) {
    return { error: "El cuerpo de la solicitud debe ser un objeto JSON." };
  }

  const unknownFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field),
  );

  if (unknownFields.length > 0) {
    return {
      error: `Campos no permitidos: ${unknownFields.join(", ")}.`,
    };
  }

  if (!partial && (!("titulo" in body) || typeof body.titulo !== "string")) {
    return { error: "El título es obligatorio y debe ser texto." };
  }

  const data: UpdateTaskInput = {};

  if ("titulo" in body) {
    if (typeof body.titulo !== "string" || !body.titulo.trim()) {
      return { error: "El título es obligatorio y no puede estar vacío." };
    }

    if (body.titulo.trim().length > 150) {
      return { error: "El título no puede superar los 150 caracteres." };
    }

    data.titulo = body.titulo.trim();
  }

  if ("descripcion" in body) {
    if (body.descripcion !== null && typeof body.descripcion !== "string") {
      return { error: "La descripción debe ser texto o null." };
    }

    data.descripcion =
      typeof body.descripcion === "string"
        ? body.descripcion.trim() || null
        : null;
  }

  if ("prioridad" in body) {
    if (
      typeof body.prioridad !== "string" ||
      !validPriorities.includes(body.prioridad as TaskPriority)
    ) {
      return { error: "La prioridad debe ser baja, media o alta." };
    }

    data.prioridad = body.prioridad as TaskPriority;
  }

  if ("estado" in body) {
    if (
      typeof body.estado !== "string" ||
      !validStatuses.includes(body.estado as TaskStatus)
    ) {
      return {
        error: "El estado debe ser pendiente, en progreso o completada.",
      };
    }

    data.estado = body.estado as TaskStatus;
  }

  if ("fecha_vencimiento" in body) {
    const date = body.fecha_vencimiento;

    if (date !== null && date !== "" && !isValidDate(date)) {
      return {
        error: "La fecha de vencimiento debe ser una fecha válida en formato AAAA-MM-DD.",
      };
    }

    data.fecha_vencimiento = date === "" ? null : (date as string | null);
  }

  return { data };
}

function parseId(value: string): number | null {
  if (!/^[1-9]\d*$/.test(value)) {
    return null;
  }

  const id = Number(value);

  return Number.isSafeInteger(id) ? id : null;
}

class TaskController {
  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const tasks = await taskRepository.findAll();

      res.status(200).json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      console.error("Error al consultar tareas:", error);
      res.status(500).json({
        success: false,
        message: "No se pudieron consultar las tareas.",
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    const idParam = req.params.id;
    const id = typeof idParam === "string" ? parseId(idParam) : null;

    if (id === null) {
      res.status(400).json({
        success: false,
        message: "El identificador de la tarea no es válido.",
      });
      return;
    }

    try {
      const task = await taskRepository.findById(id);

      if (!task) {
        res.status(404).json({
          success: false,
          message: "La tarea solicitada no existe.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      console.error("Error al consultar la tarea:", error);
      res.status(500).json({
        success: false,
        message: "No se pudo consultar la tarea.",
      });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const validation = validateTaskInput(req.body);

    if (validation.error || !validation.data) {
      res.status(400).json({
        success: false,
        message: validation.error ?? "Los datos de la tarea no son válidos.",
      });
      return;
    }

    try {
      const task = await taskRepository.create(
        validation.data as CreateTaskInput,
      );

      res.status(201).json({
        success: true,
        message: "Tarea creada correctamente.",
        data: task,
      });
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      res.status(500).json({
        success: false,
        message: "No se pudo crear la tarea.",
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const idParam = req.params.id;
    const id = typeof idParam === "string" ? parseId(idParam) : null;

    if (id === null) {
      res.status(400).json({
        success: false,
        message: "El identificador de la tarea no es válido.",
      });
      return;
    }

    const validation = validateTaskInput(req.body, true);

    if (validation.error || !validation.data) {
      res.status(400).json({
        success: false,
        message: validation.error ?? "Los datos de la tarea no son válidos.",
      });
      return;
    }

    if (Object.keys(req.body as object).length === 0) {
      res.status(400).json({
        success: false,
        message: "Debes enviar al menos un campo para actualizar.",
      });
      return;
    }

    try {
      const task = await taskRepository.update(
        id,
        validation.data as UpdateTaskInput,
      );

      if (!task) {
        res.status(404).json({
          success: false,
          message: "La tarea que intentas actualizar no existe.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Tarea actualizada correctamente.",
        data: task,
      });
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      res.status(500).json({
        success: false,
        message: "No se pudo actualizar la tarea.",
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const idParam = req.params.id;
    const id = typeof idParam === "string" ? parseId(idParam) : null;

    if (id === null) {
      res.status(400).json({
        success: false,
        message: "El identificador de la tarea no es válido.",
      });
      return;
    }

    try {
      const deleted = await taskRepository.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "La tarea que intentas eliminar no existe.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Tarea eliminada correctamente.",
      });
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      res.status(500).json({
        success: false,
        message: "No se pudo eliminar la tarea.",
      });
    }
  }
}

export default new TaskController();
