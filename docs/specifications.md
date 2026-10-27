# Especificaciones del sistema TaskFlow

## 1. Descripción del proyecto

TaskFlow es un sistema web de gestión de tareas que permite organizar actividades, registrar sus detalles y realizar un seguimiento de su estado. El proyecto se desarrollará utilizando Angular para el frontend, Node.js con Express para el backend y PostgreSQL para la base de datos.

## 2. Problema identificado

La gestión manual o desorganizada de tareas puede provocar pérdida de información, dificultades para identificar actividades pendientes y falta de seguimiento sobre las responsabilidades y fechas de entrega.

## 3. Objetivo general

Desarrollar un sistema web que permita registrar, consultar, actualizar y eliminar tareas, facilitando la organización y el seguimiento de las actividades.

## 4. Usuarios del sistema

- Usuario: administra sus tareas personales dentro del sistema.
- Desarrollador: implementa y mantiene las funcionalidades.
- Equipo de desarrollo: utiliza Git y GitHub para colaborar, revisar cambios y documentar el proyecto.

## 5. Requisitos funcionales

- RF-01: El sistema permitirá registrar una tarea con título, descripción, prioridad, estado y fecha de vencimiento.
- RF-02: El sistema permitirá consultar la lista de tareas registradas.
- RF-03: El sistema permitirá visualizar los detalles de una tarea.
- RF-04: El sistema permitirá modificar los datos de una tarea.
- RF-05: El sistema permitirá eliminar una tarea.
- RF-06: El sistema permitirá cambiar el estado de una tarea entre pendiente, en progreso y completada.
- RF-07: El sistema permitirá identificar las tareas vencidas.
- RF-08: El sistema mostrará mensajes de confirmación o error en las operaciones principales.

## 6. Requisitos no funcionales

- RNF-01: La interfaz será clara, adaptable y fácil de utilizar.
- RNF-02: El backend validará los datos recibidos antes de procesarlos.
- RNF-03: La información se almacenará en PostgreSQL.
- RNF-04: El código fuente se gestionará mediante Git y GitHub.
- RNF-05: Los cambios se organizarán mediante ramas y Pull Requests.
- RNF-06: GitHub Actions ejecutará comprobaciones automatizadas del proyecto.
- RNF-07: Las credenciales y variables sensibles no se incluirán en el repositorio.

## 7. Reglas de negocio

- RN-01: El título de una tarea será obligatorio.
- RN-02: Cada tarea tendrá un estado válido: pendiente, en progreso o completada.
- RN-03: Cada tarea tendrá una prioridad válida: baja, media o alta.
- RN-04: La fecha de vencimiento será opcional.
- RN-05: No se permitirá registrar tareas con título vacío.
- RN-06: Las tareas vencidas se identificarán comparando su fecha de vencimiento con la fecha actual, siempre que no estén completadas.

## 8. Criterios de aceptación

- CA-01: Una tarea válida podrá registrarse y aparecer en el listado.
- CA-02: Una tarea podrá consultarse, editarse y eliminarse.
- CA-03: El estado y la prioridad solo aceptarán valores permitidos.
- CA-04: Los datos inválidos producirán una respuesta de error comprensible.
- CA-05: Las pruebas automatizadas comprobarán las operaciones principales.
- CA-06: Los cambios enviados mediante Pull Requests deberán revisarse antes de integrarse a la rama principal.

## 9. Fuera del alcance inicial

La primera versión no incluirá notificaciones por correo, aplicaciones móviles nativas, colaboración en tiempo real ni integración con calendarios externos.

## 10. Tecnologías previstas

- Frontend: Angular y TypeScript.
- Backend: Node.js, Express y TypeScript.
- Base de datos: PostgreSQL.
- Control de versiones y colaboración: Git y GitHub.
- Automatización: GitHub Actions.
- Pruebas: herramientas compatibles con las tecnologías seleccionadas.
