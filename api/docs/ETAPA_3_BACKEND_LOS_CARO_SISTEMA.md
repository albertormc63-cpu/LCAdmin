# LOS CARO - SISTEMA
## Etapa 3 — Backend: Fastify y TypeScript

**Fecha de definición:** 24 de noviembre de 2026  
**Estado:** Diseño y planificación; implementación pendiente.

---

## 1. Objetivo

Preparar el backend para soportar las funcionalidades del sistema mediante una API organizada, mantenible y coherente con la arquitectura del proyecto.

La base actual ya es funcional:
- Fastify inicia correctamente.
- La ruta de prueba `GET /` responde con `LC Admin API` y estado `online`.
- El arranque del servidor está separado de la construcción de la aplicación mediante `server.ts` y `app.ts`.

El objetivo no es rehacer esa base, sino ampliarla de forma controlada.

## 2. Bloques de trabajo

1. Estructura y responsabilidades del backend.
2. Separación de responsabilidades entre rutas, controladores, servicios y acceso a datos.
3. Validación de solicitudes y datos.
4. Manejo centralizado de errores.
5. Configuración y ciclo de vida del servidor y la conexión a PostgreSQL.
6. Contrato de la API: endpoints, datos de entrada y respuestas.

Primero se definirá la arquitectura interna; después se implementarán sus componentes.

## 3. Propuesta inicial de organización

Se propone organizar el backend por módulos de negocio:

```text
api/
└── src/
    ├── server.ts
    ├── app.ts
    ├── config/
    ├── db/
    │   └── dbConnection.ts
    ├── modules/
    │   ├── clients/
    │   ├── tandas/
    │   ├── corridos/
    │   ├── lyrics/
    │   ├── audio/
    │   └── client-information/
    ├── plugins/
    └── shared/
```

Esta es una propuesta para discutir, no una instrucción para crear todas las carpetas inmediatamente. La estructura definitiva se acordará en el bloque 1, respetando el código existente.

## 4. Responsabilidades previstas

| Componente | Responsabilidad |
|---|---|
| `server.ts` | Iniciar y detener el servidor. |
| `app.ts` | Construir Fastify y registrar plugins y rutas. |
| `dbConnection.ts` | Inicializar y exportar la conexión a PostgreSQL mediante Drizzle. |
| Rutas (`routes`) | Definir endpoints HTTP y recibir solicitudes. |
| Controladores (`controllers`) | Coordinar la petición y construir la respuesta. |
| Servicios (`services`) | Ejecutar las reglas de negocio. |
| Repositorios (`repositories`) | Encapsular las consultas a la base de datos. |

No se crearán archivos o capas por rutina: cada componente deberá tener una responsabilidad real y justificada.

### Conexión a la base de datos

Se propone renombrar `db/index` a `db/dbConnection`, porque su responsabilidad principal es inicializar y exportar la conexión para que otros módulos la utilicen. No deberá contener consultas específicas ni lógica de negocio. La extensión deberá ser coherente con la configuración TypeScript y el sistema de módulos del proyecto.

## 5. Validación de solicitudes

Se definirá una estrategia común para validar los datos que recibe la API. Por ejemplo, al registrar un cliente, el nombre será obligatorio y los datos deberán cumplir las reglas acordadas. Las solicitudes inválidas deberán recibir respuestas claras y consistentes.

Se evaluará Zod como herramienta de validación; su incorporación queda pendiente de decisión.

## 6. Manejo centralizado de errores

Se diseñará un mecanismo común para responder ante:
- Datos inválidos.
- Recursos inexistentes, como clientes o corridos.
- Conflictos de integridad, por ejemplo números de corrido duplicados dentro de una tanda.
- Problemas de conexión con PostgreSQL.
- Errores inesperados del servidor.

Los endpoints no deberán implementar mecanismos incompatibles entre sí.

## 7. Configuración y ciclo de vida

Se revisarán y definirán:
- Validación de variables de entorno.
- Configuración del puerto y host.
- Inicialización y cierre ordenado de PostgreSQL.
- Cierre ordenado de Fastify.
- Comportamiento cuando PostgreSQL no está disponible.
- Endpoint de salud para comprobar el estado de la API y, cuando corresponda, la conexión a la base de datos.

## 8. Contrato inicial de la API

| Módulo | Operaciones previstas |
|---|---|
| Clientes | Crear, consultar, actualizar y listar. |
| Tandas | Crear, consultar, actualizar y listar. |
| Corridos | Crear, consultar, actualizar y cambiar estado. |
| Letras | Crear versiones y consultar el historial. |
| Información del cliente | Registrar y actualizar información asociada al corrido. |
| Audios | Subir, listar, reproducir y descargar. |

Este es el alcance funcional preliminar. Los endpoints concretos, métodos HTTP, esquemas de entrada y formatos de respuesta se definirán en el bloque 6.

## 9. Método de trabajo

Cada bloque seguirá este proceso:

1. Definir el objetivo.
2. Diseñar la solución.
3. Revisar y acordar las decisiones técnicas.
4. Implementar únicamente con autorización.
5. Verificar el resultado.
6. Documentar avances y pendientes.

Reglas:
- Diseño antes de implementación.
- Revisar y respetar el código existente.
- No crear capas, archivos, dependencias ni abstracciones sin necesidad.
- Mantener responsabilidades claras y coherencia arquitectónica.
- Revisar el impacto de cada cambio antes de aplicarlo.
- No modificar el repositorio sin cerrar el diseño y recibir autorización.
- Mantener esta documentación actualizada.

---

# Bloque 1 — Estructura y responsabilidades del backend

**Estado:** Pendiente de diseño y acuerdo.

## Objetivo

Definir la organización interna del backend por módulos de negocio, aclarando qué pertenece a cada módulo y qué elementos serán compartidos.

## Propuesta de partida

Organizar el backend por módulos:
- `clients`
- `tandas`
- `corridos`
- `lyrics`
- `audio`
- `client-information`

Mantener fuera de esos módulos los componentes transversales, como configuración, conexión a base de datos, plugins y utilidades compartidas.

## Decisiones pendientes

Antes de crear o mover archivos, se revisará:
- La estructura real y actual de `api/src`.
- Qué archivos y componentes existentes deben conservarse.
- La estructura interna mínima que necesita cada módulo.
- Qué responsabilidades serán compartidas y cuáles permanecerán dentro de cada módulo.
- La ubicación y el papel de `dbConnection`.

## Criterio de cierre

El bloque se considerará cerrado cuando exista una estructura acordada, con responsabilidades claras y sin carpetas o capas innecesarias. Solo entonces se pasará a implementar los cambios autorizados.
