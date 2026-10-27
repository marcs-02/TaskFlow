# Tareas de desarrollo de TaskFlow

## T-01. Preparación del repositorio

- **Objetivo:** organizar los archivos y configurar el entorno de trabajo.
- **Requisitos relacionados:** RNF-04, RNF-05.
- **Criterio de aceptación:** el repositorio contiene una estructura organizada y documentación inicial.
- **Estado:** completada. Repositorio y documentación inicial preparados.

## T-02. Configuración del backend

- **Objetivo:** preparar Node.js, Express y TypeScript.
- **Requisitos relacionados:** RNF-02.
- **Criterio de aceptación:** el servidor inicia correctamente y expone una ruta de comprobación.
- **Estado:** completada. Servidor y endpoints iniciales de comprobación disponibles.

## T-03. Configuración de PostgreSQL

- **Objetivo:** preparar la base de datos y la tabla tareas.
- **Requisitos relacionados:** RNF-03, RN-01, RN-02, RN-03.
- **Criterio de aceptación:** es posible conectar con la base de datos y almacenar tareas.
- **Estado:** parcial. La conexión con PostgreSQL está comprobada; falta implementar y validar el almacenamiento de tareas.

## T-04. API REST de tareas

- **Objetivo:** implementar las operaciones de consulta, registro, actualización y eliminación.
- **Requisitos relacionados:** RF-01, RF-02, RF-03, RF-04, RF-05.
- **Criterio de aceptación:** los endpoints responden correctamente ante solicitudes válidas y gestionan los errores.
- **Estado:** pendiente. Las operaciones CRUD de tareas están por implementar.

## T-05. Validaciones y reglas de negocio

- **Objetivo:** validar título, prioridad, estado y fecha de vencimiento.
- **Requisitos relacionados:** RF-06, RF-07, RF-08, RN-01, RN-02, RN-03, RN-04, RN-05, RN-06.
- **Criterio de aceptación:** los datos inválidos son rechazados y los errores se comunican claramente.
- **Estado:** pendiente. Falta implementar y probar las validaciones de tareas.

## T-06. Interfaz Angular

- **Objetivo:** construir la interfaz para administrar tareas.
- **Requisitos relacionados:** RF-01, RF-02, RF-03, RF-04, RF-05, RNF-01.
- **Criterio de aceptación:** el usuario puede interactuar con el listado y los formularios de tareas.
- **Estado:** en desarrollo. Angular está configurado, Tailwind CSS está instalado y se está preparando el panel inicial de TaskFlow.

## T-07. Integración frontend y backend

- **Objetivo:** conectar Angular con la API REST.
- **Requisitos relacionados:** RF-01 a RF-08.
- **Criterio de aceptación:** las operaciones de la interfaz se reflejan en los datos almacenados.
- **Estado:** parcial. El frontend dispone de servicios para comprobar el backend y la conexión con la base de datos; falta integrar las operaciones de tareas.

## T-08. Pruebas automatizadas

- **Objetivo:** comprobar las operaciones principales y las validaciones.
- **Requisitos relacionados:** CA-01, CA-02, CA-03, CA-04, CA-05.
- **Criterio de aceptación:** las pruebas configuradas se ejecutan y permiten identificar fallos.
- **Estado:** pendiente. Falta implementar y ejecutar las pruebas de las funcionalidades principales.

## T-09. Automatización con GitHub Actions

- **Objetivo:** ejecutar comprobaciones del código en el flujo de integración.
- **Requisitos relacionados:** RNF-06, CA-06.
- **Criterio de aceptación:** el flujo de trabajo se ejecuta en GitHub y muestra el resultado de las comprobaciones.
- **Estado:** pendiente. Falta configurar y verificar el flujo de trabajo.

## T-10. Flujo colaborativo y documentación

- **Objetivo:** documentar el trabajo mediante Issues, ramas, Pull Requests y evidencias.
- **Requisitos relacionados:** RNF-04, RNF-05, CA-06.
- **Criterio de aceptación:** los cambios y las decisiones del proyecto quedan documentados.
- **Estado:** parcial. El repositorio y la documentación inicial están preparados; falta completar y evidenciar el flujo colaborativo.

## 11. Prioridad de desarrollo

1. Completar la interfaz inicial con Angular y Tailwind CSS.
2. Preparar la tabla de tareas en PostgreSQL.
3. Implementar la API REST y las reglas de negocio.
4. Integrar el frontend con las operaciones de tareas.
5. Crear y ejecutar las pruebas automatizadas.
6. Configurar GitHub Actions y documentar las evidencias.

## 12. Criterio general de finalización

El proyecto se considerará terminado cuando las funcionalidades de gestión de tareas estén implementadas e integradas, los datos se almacenen correctamente en PostgreSQL, las pruebas definidas se ejecuten satisfactoriamente y la automatización y documentación del repositorio estén verificadas.
