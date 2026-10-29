import pool from "../config/database";

export type TaskStatus = "pendiente" | "en progreso" | "completada";
export type TaskPriority = "baja" | "media" | "alta";

export interface Task {
  id: number;
  titulo: string;
  descripcion: string | null;
  prioridad: TaskPriority;
  estado: TaskStatus;
  fecha_vencimiento: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTaskInput {
  titulo: string;
  descripcion?: string | null;
  prioridad?: TaskPriority;
  estado?: TaskStatus;
  fecha_vencimiento?: string | null;
}

export interface UpdateTaskInput {
  titulo?: string;
  descripcion?: string | null;
  prioridad?: TaskPriority;
  estado?: TaskStatus;
  fecha_vencimiento?: string | null;
}

export class TaskRepository {
  async findAll(): Promise<Task[]> {
    const result = await pool.query<Task>(
      `SELECT id, titulo, descripcion, prioridad, estado,
              fecha_vencimiento, created_at, updated_at
       FROM tareas
       ORDER BY id DESC`,
    );

    return result.rows;
  }

  async findById(id: number): Promise<Task | null> {
    const result = await pool.query<Task>(
      `SELECT id, titulo, descripcion, prioridad, estado,
              fecha_vencimiento, created_at, updated_at
       FROM tareas
       WHERE id = $1`,
      [id],
    );

    return result.rows[0] ?? null;
  }

  async create(input: CreateTaskInput): Promise<Task> {
    const result = await pool.query<Task>(
      `INSERT INTO tareas
         (titulo, descripcion, prioridad, estado, fecha_vencimiento)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, titulo, descripcion, prioridad, estado,
                 fecha_vencimiento, created_at, updated_at`,
      [
        input.titulo,
        input.descripcion ?? null,
        input.prioridad ?? "media",
        input.estado ?? "pendiente",
        input.fecha_vencimiento ?? null,
      ],
    );

    return result.rows[0];
  }

  async update(id: number, input: UpdateTaskInput): Promise<Task | null> {
    const fields: string[] = [];
    const values: unknown[] = [];

    const addField = (column: string, value: unknown): void => {
      values.push(value);
      fields.push(`${column} = $${values.length}`);
    };

    if (input.titulo !== undefined) addField("titulo", input.titulo);
    if (input.descripcion !== undefined) addField("descripcion", input.descripcion);
    if (input.prioridad !== undefined) addField("prioridad", input.prioridad);
    if (input.estado !== undefined) addField("estado", input.estado);
    if (input.fecha_vencimiento !== undefined) {
      addField("fecha_vencimiento", input.fecha_vencimiento);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push("updated_at = CURRENT_TIMESTAMP");
    values.push(id);

    const result = await pool.query<Task>(
      `UPDATE tareas
       SET ${fields.join(", ")}
       WHERE id = $${values.length}
       RETURNING id, titulo, descripcion, prioridad, estado,
                 fecha_vencimiento, created_at, updated_at`,
      values,
    );

    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      "DELETE FROM tareas WHERE id = $1",
      [id],
    );

    return result.rowCount !== null && result.rowCount > 0;
  }
}

export default new TaskRepository();
