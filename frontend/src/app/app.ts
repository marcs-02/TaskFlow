import { Component, OnInit, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {
  ApiService,
  type Task,
  type TaskInput,
  type TaskPriority,
  type TaskStatus,
} from './services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, TitleCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = 'TaskFlow';

  protected readonly backendStatus = signal('Verificando...');
  protected readonly databaseStatus = signal('Verificando...');
  protected readonly backendConnected = signal(false);
  protected readonly databaseConnected = signal(false);

  protected readonly tasks = signal<Task[]>([]);
  protected readonly loadingTasks = signal(false);
  protected readonly savingTask = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly successMessage = signal('');

  protected readonly editingTaskId = signal<number | null>(null);

  protected readonly priorities: TaskPriority[] = ['baja', 'media', 'alta'];
  protected readonly statuses: TaskStatus[] = [
    'pendiente',
    'en progreso',
    'completada',
  ];

  protected form: TaskInput = this.emptyForm();

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    void this.checkConnections();
    void this.loadTasks();
  }

  private emptyForm(): TaskInput {
    return {
      titulo: '',
      descripcion: '',
      prioridad: 'media',
      estado: 'pendiente',
      fecha_vencimiento: null,
    };
  }

  protected async checkConnections(): Promise<void> {
    this.backendStatus.set('Verificando...');
    this.databaseStatus.set('Verificando...');
    this.backendConnected.set(false);
    this.databaseConnected.set(false);

    try {
      const response = await this.apiService.checkHealth();
      this.backendConnected.set(response.success);
      this.backendStatus.set(
        response.success ? 'Conectado' : 'No disponible',
      );
    } catch {
      this.backendStatus.set('Desconectado');
    }

    try {
      const response = await this.apiService.checkDatabase();
      this.databaseConnected.set(response.success);
      this.databaseStatus.set(
        response.success ? 'Conectada' : 'No disponible',
      );
    } catch {
      this.databaseStatus.set('Desconectada');
    }
  }

  protected async loadTasks(): Promise<void> {
    this.loadingTasks.set(true);
    this.errorMessage.set('');

    try {
      this.tasks.set(await this.apiService.getTasks());
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error ? error.message : 'No se pudieron cargar las tareas.',
      );
    } finally {
      this.loadingTasks.set(false);
    }
  }

  protected async saveTask(): Promise<void> {
    this.errorMessage.set('');
    this.successMessage.set('');

    const titulo = this.form.titulo?.trim() ?? '';

    if (!titulo) {
      this.errorMessage.set('El título es obligatorio.');
      return;
    }

    this.savingTask.set(true);

    const input: TaskInput = {
      titulo,
      descripcion: this.form.descripcion?.trim() || null,
      prioridad: this.form.prioridad ?? 'media',
      estado: this.form.estado ?? 'pendiente',
      fecha_vencimiento: this.form.fecha_vencimiento || null,
    };

    try {
      const editingId = this.editingTaskId();

      if (editingId !== null) {
        await this.apiService.updateTask(editingId, input);
        this.successMessage.set('Tarea actualizada correctamente.');
      } else {
        await this.apiService.createTask(input);
        this.successMessage.set('Tarea creada correctamente.');
      }

      this.cancelEdit();
      await this.loadTasks();
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error ? error.message : 'No se pudo guardar la tarea.',
      );
    } finally {
      this.savingTask.set(false);
    }
  }

  protected startEdit(task: Task): void {
    this.editingTaskId.set(task.id);
    this.form = {
      titulo: task.titulo,
      descripcion: task.descripcion ?? '',
      prioridad: task.prioridad,
      estado: task.estado,
      fecha_vencimiento: task.fecha_vencimiento?.slice(0, 10) ?? null,
    };

    this.errorMessage.set('');
    this.successMessage.set('');
  }

  protected cancelEdit(): void {
    this.editingTaskId.set(null);
    this.form = this.emptyForm();
  }

  protected async changeStatus(task: Task): Promise<void> {
    const nextStatus: TaskStatus =
      task.estado === 'completada' ? 'pendiente' : 'completada';

    try {
      await this.apiService.updateTask(task.id, { estado: nextStatus });
      this.successMessage.set('Estado de la tarea actualizado.');
      this.errorMessage.set('');
      await this.loadTasks();
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error ? error.message : 'No se pudo cambiar el estado.',
      );
    }
  }

  protected async deleteTask(task: Task): Promise<void> {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar la tarea "${task.titulo}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await this.apiService.deleteTask(task.id);
      this.successMessage.set('Tarea eliminada correctamente.');
      this.errorMessage.set('');
      await this.loadTasks();

      if (this.editingTaskId() === task.id) {
        this.cancelEdit();
      }
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error ? error.message : 'No se pudo eliminar la tarea.',
      );
    }
  }

  protected trackTask(_index: number, task: Task): number {
    return task.id;
  }
}
