# Plan de desarrollo de TaskFlow

## Fase 1. Especificación y planificación

- Revisar los requisitos funcionales y no funcionales.
- Definir la arquitectura inicial.
- Organizar las tareas mediante GitHub Issues.
- Establecer criterios de aceptación.

**Estado:** documentación inicial creada.

## Fase 2. Preparación del entorno

- Configurar el proyecto Angular.
- Integrar Tailwind CSS para los estilos del frontend.
- Preparar el backend con Node.js, Express y TypeScript.
- Configurar la conexión a PostgreSQL.
- Definir las variables de entorno.
- Crear una estructura de carpetas organizada.

**Estado:** frontend Angular, backend y conexión con PostgreSQL preparados. Tailwind CSS instalado; pendiente completar y validar la adaptación de la interfaz.

## Fase 3. Desarrollo del backend

- Implementar y verificar la conexión a PostgreSQL.
- Crear la tabla de tareas.
- Implementar los endpoints REST para gestionar tareas.
- Validar los datos recibidos.
- Gestionar errores y respuestas HTTP.

**Estado:** API inicial y endpoints de comprobación de salud implementados. La gestión de tareas está pendiente.

## Fase 4. Desarrollo del frontend

- Construir la interfaz principal.
- Aplicar estilos con Tailwind CSS.
- Mostrar el listado de tareas.
- Implementar el registro y la consulta.
- Implementar la edición y eliminación.
- Incorporar el cambio de estado y la identificación de tareas vencidas.
- Integrar los servicios del frontend con los endpoints del backend.

**Estado:** interfaz inicial en desarrollo. Las funcionalidades de gestión de tareas están pendientes.

## Fase 5. Pruebas y calidad

- Probar las operaciones de la API.
- Verificar las validaciones.
- Crear pruebas automatizadas.
- Corregir los errores detectados.
- Configurar GitHub Actions para ejecutar comprobaciones.

**Estado:** se han comprobado los endpoints iniciales y la conexión con PostgreSQL. Las pruebas de las funcionalidades de tareas y la automatización están pendientes.

## Fase 6. Colaboración y control de versiones

- Crear ramas para las funcionalidades.
- Registrar avances mediante commits.
- Revisar los cambios mediante Pull Requests.
- Utilizar Issues para documentar problemas y tareas.
- Mantener actualizada la documentación.

**Estado:** repositorio GitHub y documentación inicial preparados. Las demás actividades se realizarán según avance el desarrollo.

## Fase 7. Validación y presentación

- Verificar los criterios de aceptación.
- Comprobar la integración entre Angular, Express y PostgreSQL.
- Registrar evidencias reales del funcionamiento.
- Documentar los resultados y las limitaciones.

**Estado:** pendiente de completar tras implementar las funcionalidades principales.

## Orden de prioridad

1. Completar la configuración del entorno y Tailwind CSS.
2. Implementar el modelo de datos y los endpoints del backend.
3. Desarrollar la interfaz y las funcionalidades del frontend.
4. Integrar los componentes y ejecutar pruebas.
5. Configurar la automatización y finalizar la documentación.

## Criterio de finalización

El proyecto se considerará validado cuando las funcionalidades principales estén implementadas, las pruebas definidas se ejecuten correctamente y exista evidencia verificable de la colaboración y automatización configuradas.
