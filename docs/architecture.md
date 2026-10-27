# Arquitectura del sistema TaskFlow

## 1. Arquitectura general

TaskFlow utilizará una arquitectura cliente-servidor dividida en tres componentes principales: frontend, backend y base de datos.

## 2. Componentes

### 2.1. Frontend

Tecnología: Angular y TypeScript.

Responsabilidades:
- Mostrar la interfaz de usuario.
- Presentar el listado y los detalles de las tareas.
- Permitir registrar, editar y eliminar tareas.
- Permitir actualizar el estado y consultar tareas vencidas.
- Enviar solicitudes HTTP al backend y mostrar sus respuestas.

### 2.2. Backend

Tecnología: Node.js, Express y TypeScript.

Responsabilidades:
- Exponer una API REST.
- Recibir y validar las solicitudes del frontend.
- Aplicar las reglas de negocio.
- Consultar y modificar los datos almacenados.
- Responder con datos JSON y códigos HTTP apropiados.

### 2.3. Base de datos

Tecnología: PostgreSQL.

Responsabilidades:
- Almacenar las tareas.
- Mantener la integridad de los datos.
- Permitir operaciones de consulta, inserción, actualización y eliminación.

## 3. Modelo de datos inicial

### Tabla: tareas

- id: identificador único de la tarea.
- titulo: nombre obligatorio de la tarea.
- descripcion: detalle de la actividad, opcional.
- prioridad: baja, media o alta.
- estado: pendiente, en progreso o completada.
- fecha_vencimiento: fecha límite opcional.
- fecha_creacion: fecha y hora de registro.

El identificador será la clave primaria. Los campos obligatorios y los valores permitidos deberán validarse tanto en el backend como en la base de datos cuando corresponda.

## 4. Comunicación entre componentes

1. El usuario interactúa con la interfaz Angular.
2. Angular envía una solicitud HTTP a la API REST de Express.
3. Express valida los datos y ejecuta la operación solicitada.
4. El backend consulta o modifica PostgreSQL.
5. Express devuelve una respuesta al frontend.
6. Angular actualiza la interfaz y muestra el resultado.

## 5. Endpoints REST previstos

- GET /api/tareas: obtener la lista de tareas.
- GET /api/tareas/:id: consultar una tarea por identificador.
- POST /api/tareas: registrar una tarea.
- PUT /api/tareas/:id: actualizar una tarea.
- PATCH /api/tareas/:id/estado: actualizar el estado de una tarea.
- DELETE /api/tareas/:id: eliminar una tarea.

Estos endpoints son parte del diseño inicial y deberán implementarse y probarse durante el desarrollo.

## 6. Seguridad y configuración

- Utilizar variables de entorno para la configuración del servidor y la conexión a PostgreSQL.
- Evitar publicar contraseñas, tokens u otros datos sensibles.
- Validar los datos recibidos antes de ejecutar operaciones.
- Gestionar los errores sin exponer información interna innecesaria.

## 7. Flujo de desarrollo

Git permitirá registrar el historial de cambios. GitHub alojará el repositorio y facilitará la colaboración mediante ramas, Issues y Pull Requests. GitHub Actions se utilizará para automatizar las comprobaciones definidas para el proyecto.
