# Arquitectura del sistema TaskFlow

## 1. Arquitectura general

TaskFlow utiliza una arquitectura cliente-servidor organizada en tres componentes principales: frontend, backend y base de datos. El frontend se comunica con el backend mediante una API REST, mientras que el backend gestiona el acceso a PostgreSQL.

## 2. Componentes

### 2.1. Frontend

**Tecnologías:** Angular 22, TypeScript y Tailwind CSS v4.

**Responsabilidades:**
- Mostrar la interfaz de usuario.
- Presentar el listado y los detalles de las tareas.
- Permitir registrar, editar y eliminar tareas.
- Permitir actualizar el estado y consultar tareas vencidas.
- Enviar solicitudes HTTP al backend y mostrar sus respuestas.
- Utilizar Tailwind CSS para construir una interfaz consistente y adaptable a diferentes tamaños de pantalla.

El frontend utiliza componentes standalone de Angular y servicios para centralizar la comunicación con la API.

### 2.2. Backend

**Tecnologías:** Node.js, Express, TypeScript y pg.

**Responsabilidades:**
- Exponer una API REST.
- Recibir y validar las solicitudes del frontend.
- Aplicar las reglas de negocio.
- Consultar y modificar los datos almacenados en PostgreSQL.
- Responder con datos JSON y códigos HTTP apropiados.
- Gestionar errores sin exponer información interna innecesaria.

El backend dispone de endpoints de comprobación del estado del servicio y de la conexión con PostgreSQL.

### 2.3. Base de datos

**Tecnología:** PostgreSQL.

**Responsabilidades:**
- Almacenar las tareas.
- Mantener la integridad de los datos.
- Permitir operaciones de consulta, inserción, actualización y eliminación.
- Proporcionar persistencia a la información del sistema.

La conexión se configura mediante variables de entorno y el paquete `pg`.

## 3. Modelo de datos inicial

### Tabla: tareas

- `id`: identificador único de la tarea.
- `titulo`: nombre obligatorio de la tarea.
- `descripcion`: detalle de la actividad, opcional.
- `prioridad`: baja, media o alta.
- `estado`: pendiente, en progreso o completada.
- `fecha_vencimiento`: fecha límite opcional.
- `fecha_creacion`: fecha y hora de registro.

El identificador será la clave primaria. Los campos obligatorios y los valores permitidos deberán validarse tanto en el backend como en la base de datos cuando corresponda.

Este modelo representa el diseño inicial y deberá contrastarse con el esquema de PostgreSQL cuando se implemente el módulo de tareas.

## 4. Comunicación entre componentes

1. El usuario interactúa con la interfaz Angular.
2. Angular utiliza sus servicios para enviar una solicitud HTTP a la API REST de Express.
3. Express recibe la solicitud y valida los datos.
4. El backend ejecuta la operación solicitada y, cuando corresponde, consulta o modifica PostgreSQL.
5. Express devuelve una respuesta con los datos y el código HTTP correspondiente.
6. Angular procesa la respuesta y actualiza la interfaz.

## 5. Endpoints REST

### 5.1. Endpoints implementados

- `GET /api`: devuelve información general de la API.
- `GET /api/health`: comprueba el funcionamiento del backend.
- `GET /api/health/db`: comprueba la conexión con PostgreSQL.

Estos endpoints se utilizan para verificar el estado de los componentes principales.

### 5.2. Endpoints previstos para la gestión de tareas

- `GET /api/tareas`: obtener la lista de tareas.
- `GET /api/tareas/:id`: consultar una tarea por identificador.
- `POST /api/tareas`: registrar una tarea.
- `PUT /api/tareas/:id`: actualizar una tarea.
- `PATCH /api/tareas/:id/estado`: actualizar el estado de una tarea.
- `DELETE /api/tareas/:id`: eliminar una tarea.

Estos endpoints pertenecen al diseño inicial. Su implementación y sus pruebas se realizarán durante el desarrollo del módulo de tareas.

## 6. Seguridad y configuración

- Utilizar variables de entorno para configurar el servidor y la conexión a PostgreSQL.
- Evitar publicar contraseñas, tokens y otros datos sensibles.
- Validar los datos recibidos antes de ejecutar operaciones.
- Gestionar los errores sin exponer información interna innecesaria.
- Mantener las dependencias y los archivos de configuración del proyecto bajo control de versiones, excluyendo secretos y dependencias instaladas.

## 7. Flujo de desarrollo y control de versiones

Git permitirá registrar el historial de cambios y administrar las ramas de desarrollo. GitHub alojará el repositorio y facilitará la organización del trabajo mediante Issues, Projects y Pull Requests.

GitHub Actions podrá utilizarse para automatizar las comprobaciones y pruebas definidas para el proyecto.

La documentación técnica se mantendrá en archivos Markdown dentro de la carpeta `docs/`.
