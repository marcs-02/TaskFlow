
import { Injectable } from '@angular/core';

export interface ApiHealthResponse {
  success: boolean;
  message: string;
}

export type TaskPriority = 'baja' | 'media' | 'alta';
export type TaskStatus = 'pendiente' | 'en progreso' | 'completada';

export interface Task {
  id: number;
  titulo: string;
  descripcion: string | null;
  prioridad: TaskPriority;
  estado: TaskStatus;
  fecha_vencimiento: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaskInput {
  titulo: string;
  descripcion?: string | null;
  prioridad?: TaskPriority;
  estado?: TaskStatus;
  fecha_vencimiento?: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:3000/api';

  async checkHealth(): Promise<ApiHealthResponse> {
    const response = await fetch(`${this.apiUrl}/health`);

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    return response.json() as Promise<ApiHealthResponse>;
  }

  async checkDatabase(): Promise<ApiHealthResponse> {
    const response = await fetch(`${this.apiUrl}/health/db`);

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    return response.json() as Promise<ApiHealthResponse>;
  }

  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${this.apiUrl}/tareas`);
    const result = (await response.json()) as ApiResponse<Task[]>;

    if (!response.ok || !result.success) {
      throw new Error(result.message ?? 'No se pudieron cargar las tareas.');
    }

    return result.data ?? [];
  }

  async getTask(id: number): Promise<Task> {
    const response = await fetch(`${this.apiUrl}/tareas/${id}`);
    const result = (await response.json()) as ApiResponse<Task>;

    if (!response.ok || !result.success || !result.data) {
      throw new Error(result.message ?? 'No se pudo consultar la tarea.');
    }

    return result.data;
  }

  async createTask(input: TaskInput): Promise<Task> {
    const response = await fetch(`${this.apiUrl}/tareas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const result = (await response.json()) as ApiResponse<Task>;

    if (!response.ok || !result.success || !result.data) {
      throw new Error(result.message ?? 'No se pudo crear la tarea.');
    }

    return result.data;
  }

  async updateTask(
    id: number,
    input: Partial<TaskInput>,
  ): Promise<Task> {
    const response = await fetch(`${this.apiUrl}/tareas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const result = (await response.json()) as ApiResponse<Task>;

    if (!response.ok || !result.success || !result.data) {
      throw new Error(result.message ?? 'No se pudo actualizar la tarea.');
    }

    return result.data;
  }

  async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/tareas/${id}`, {
      method: 'DELETE',
    });

    const result = (await response.json()) as ApiResponse<unknown>;

    if (!response.ok || !result.success) {
      throw new Error(result.message ?? 'No se pudo eliminar la tarea.');
    }
  }
}
