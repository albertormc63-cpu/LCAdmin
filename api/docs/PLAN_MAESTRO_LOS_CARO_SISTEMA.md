# LOS CARO - SISTEMA

## Plan maestro de desarrollo

**Estado del documento:** borrador de planificación basado en la
conversación y en la revisión del repositorio `LCAdmin-main (1).zip`.\
**Fecha:** 23 de noviembre de 2026.\
**Propósito:** mantener una referencia funcional y técnica del proyecto
para guiar el desarrollo sin perder decisiones, alcance ni contexto.

------------------------------------------------------------------------

## 1. Visión del proyecto

LOS CARO - SISTEMA será una aplicación privada de administración de
proyectos musicales (corridos personalizados) para un equipo aproximado
de seis integrantes.

La primera versión funcionará exclusivamente dentro de una red local
(LAN). Una laptop será el servidor central durante las sesiones de
trabajo. Los integrantes podrán entrar desde navegadores de computadoras
y teléfonos conectados a la misma red Wi-Fi, consultar la información de
cada corrido, reproducir y subir audios, y actualizar la letra según sus
permisos.

La aplicación no administrará pagos, cobros, presupuestos, ingresos ni
información financiera. Su propósito es organizar el trabajo, la
información del cliente y los materiales de producción.

### Objetivo principal

Que todos los integrantes consulten una única fuente de información
actualizada para cada corrido. En particular, evitar que durante las
sesiones tengan que buscar conversaciones, archivos o versiones de
letras en distintos teléfonos.

### Unidad de organización

-   **Tanda:** agrupación que contiene varios corridos.
-   **Corrido:** proyecto musical individual dentro de una tanda.
-   **Elementos de un corrido:** letra, audios, información
    proporcionada por el cliente, estado de trabajo y condición
    activo/inactivo.

La identificación actual de los trabajos se basa en nombres como "Tanda
3, Corrido 6". La aplicación debe conservar esa forma de identificación.

------------------------------------------------------------------------

## 2. Alcance funcional

### Incluido en el alcance inicial

1.  Crear y consultar tandas.
2.  Abrir una tanda y consultar sus corridos.
3.  Crear y consultar corridos.
4.  Registrar y actualizar la información del cliente mediante captura
    manual o copiar/pegar.
5.  Consultar y editar la letra de un corrido.
6.  Conservar versiones anteriores de la letra.
7.  Subir, listar y reproducir audios asociados a un corrido.
8.  Conservar las distintas maquetas y grabaciones; no reemplazar
    silenciosamente archivos anteriores.
9.  Consultar y actualizar el estado del corrido de acuerdo con
    permisos.
10. Marcar un corrido como activo o inactivo.
11. Identificar quién realizó una modificación y cuándo.
12. Acceder a la aplicación mediante la red local.
13. Mostrar un código QR que facilite abrir la dirección local.
14. Administrar el inicio y cierre del servidor desde la laptop, una vez
    definida la experiencia de escritorio.
15. Realizar respaldos de la base de datos y de los archivos.

### Fuera del alcance inicial

-   Pagos, cobros, ingresos, gastos, presupuestos o cuentas por cobrar.
-   Integración automática con WhatsApp.
-   Acceso desde cualquier lugar por internet.
-   Sincronización entre varias sedes o servidores.
-   Edición simultánea de una letra al estilo Google Docs.

Estos puntos no se consideran parte de la primera versión. El acceso
remoto podría estudiarse después, mediante VPN o despliegue en hosting,
sin asumirlo como requisito actual.

------------------------------------------------------------------------

## 3. Usuarios y responsabilidades conocidas

El equipo está compuesto por seis perfiles funcionales:

  -----------------------------------------------------------------------
  N.º                     Perfil                  Necesidad principal
                                                  conocida
  ----------------------- ----------------------- -----------------------
  1                       Encargado de            Dar de alta tandas y
                          conseguir/registrar     corridos; registrar la
                          trabajos                información recibida
                                                  del cliente.

  2                       Compositor              Actualizar la letra y
                                                  subir maquetas o audios
                                                  de composición.

  3                       Guitarrista             Consultar audios y
                                                  letra para sacar
                                                  acordes, armonías,
                                                  requintos y arreglos;
                                                  puede necesitar subir
                                                  sus grabaciones.

  4                       Voz                     Consultar
                                                  principalmente la letra
                                                  vigente y escuchar los
                                                  audios de referencia.

  5                       Tololoche               Consultar audios y
                                                  letra cantada para
                                                  preparar bajos y
                                                  arreglos.

  6                       Productor               Opera la laptop que
                                                  centraliza el servidor,
                                                  la base de datos y los
                                                  archivos. También
                                                  participa en la
                                                  producción musical.
  -----------------------------------------------------------------------

### Consideraciones de permisos

Los perfiles anteriores describen necesidades de trabajo, pero todavía
no constituyen una matriz definitiva de permisos.

Se debe definir explícitamente: - Quién puede crear, editar, archivar y
reactivar tandas. - Quién puede crear, editar, cerrar o reabrir
corridos. - Quién puede editar letras. - Quién puede subir, eliminar o
marcar audios. - Quién puede modificar información del cliente. - Quién
administra usuarios y respaldos. - Si el productor tendrá permisos
administrativos completos o solamente permisos de producción más
administración técnica.

No asumir que el perfil técnico de quien opera la laptop equivale
automáticamente a todos los permisos funcionales.

------------------------------------------------------------------------

## 4. Arquitectura técnica objetivo

### 4.1 Componentes

  -----------------------------------------------------------------------
  Capa                    Tecnología planteada    Responsabilidad
  ----------------------- ----------------------- -----------------------
  Interfaz                React + TypeScript      Interfaz web adaptable
                                                  a escritorio y móvil.

  Aplicación de           Tauri 2 + Rust          Contenedor de
  escritorio                                      escritorio y, si se
                                                  decide, control local
                                                  del servidor.

  Backend                 Node.js + Fastify       API, autenticación,
                                                  permisos, lógica de
                                                  negocio y entrega de
                                                  archivos.

  Comunicación            HTTP/REST               Consultas, altas,
                                                  modificaciones y
                                                  cargas.

  Actualizaciones         WebSockets              Avisar a otros clientes
                                                  cuando cambien datos
                                                  relevantes.

  ORM                     Drizzle ORM             Consultas y definición
                                                  del esquema PostgreSQL.

  Base de datos           PostgreSQL              Datos estructurados y
                                                  metadatos.

  Archivos                Sistema de archivos de  Almacenamiento de
                          la laptop               audios y otros adjuntos
                                                  permitidos.

  Validación              Zod (propuesto)         Validar datos de
                                                  entrada y contratos
                                                  compartidos.
  -----------------------------------------------------------------------

### 4.2 Regla arquitectónica importante

El servidor Fastify debe ser independiente de la interfaz React y del
contenedor Tauri.

La laptop ejecutará el backend y alojará PostgreSQL y los archivos. Los
navegadores y la aplicación de escritorio serán clientes de ese backend.

Esto permite que: - La interfaz pueda abrirse desde Safari, Chrome u
otro navegador. - La misma interfaz pueda empaquetarse posteriormente
con Tauri. - El backend siga funcionando aunque no esté abierta la
ventana de escritorio, si así se implementa el proceso de servicio. -
Una futura migración a hosting no obligue a rehacer la lógica central.

**Punto por definir:** cómo se iniciará y detendrá el backend en macOS y
Windows. No se debe asumir que Tauri será automáticamente el
administrador del proceso servidor; se debe diseñar y probar ese ciclo
de vida.

### 4.3 Estructura de repositorio objetivo (propuesta, no implementada)

``` text
los-caro-sistema/
├── apps/
│   ├── web/                 # React + TypeScript
│   ├── desktop/             # Tauri 2 + Rust
│   └── server/              # Fastify + Node.js
│
├── packages/
│   ├── shared/              # Tipos y contratos compartidos
│   ├── schemas/             # Validaciones compartidas
│   └── config/              # Configuración compartida, si se necesita
│
├── docs/
│   ├── PLAN_MAESTRO.md
│   └── decisiones/
│
├── package.json
└── README.md
```

Esta estructura es una orientación para evaluar frente al repositorio
actual. No mover carpetas ni convertirlo en monorepo hasta acordar el
cambio y revisar el estado real del repositorio completo.

------------------------------------------------------------------------

## 5. Revisión del repositorio entregado

Se inspeccionó el contenido de `LCAdmin-main (1).zip`. El ZIP contiene
el directorio `api` y un archivo `Install`; no contiene frontend ni
proyecto Tauri.

### Estructura encontrada

``` text
LCAdmin-main/
├── Install
└── api/
    ├── .gitignore
    ├── drizzle.config.ts
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    ├── drizzle/
    │   └── meta/
    │       └── _journal.json
    └── src/
        ├── app.ts
        ├── server.ts
        └── db/
            ├── index.ts
            └── schema.ts
```

### Estado observado

  Elemento                   Estado en el ZIP
  -------------------------- -------------------------------------------------
  TypeScript                 Configurado en `api/tsconfig.json`.
  Node.js                    Proyecto ESM configurado en `api/package.json`.
  Fastify                    Instalado y usado en `src/app.ts`.
  PostgreSQL                 Driver `postgres` instalado.
  Drizzle ORM                Instalado y conectado en `src/db/index.ts`.
  Drizzle Kit                Configuración en `drizzle.config.ts`.
  Servidor HTTP              `src/server.ts` inicia Fastify en puerto 3000.
  Escucha en red             `host: "0.0.0.0"` ya está configurado.
  Ruta de prueba             `GET /` devuelve mensaje y estado de API.
  Esquema de BD              `src/db/schema.ts` está vacío.
  Rutas de negocio           No aparecen implementadas en el ZIP.
  Frontend                   No aparece en el ZIP.
  Tauri                      No aparece en el ZIP.
  QR                         No implementado en el ZIP.
  Almacenamiento de audios   No implementado en el ZIP.
  Autenticación/permisos     No implementados en el ZIP.

### Observaciones técnicas concretas

1.  `src/server.ts` ya escucha en `0.0.0.0:3000`. Esto es un buen punto
    de partida para aceptar conexiones de otros dispositivos, pero no
    garantiza por sí solo que Firewall, router y clientes permitan la
    comunicación.
2.  `src/db/index.ts` usa `process.env.DATABASE_URL!`. Antes de depender
    de esa conexión en producción local, conviene validar explícitamente
    las variables de entorno y presentar errores de configuración
    comprensibles.
3.  Se debe planear el cierre ordenado de Fastify y de la conexión
    PostgreSQL al apagar el servidor.
4.  `drizzle.config.ts` apunta a `src/db/schema.ts`; el esquema está
    vacío y el journal no contiene migraciones.
5.  El archivo `Install` contiene notas iniciales de instalación. Se
    debe convertir posteriormente en documentación reproducible, sin
    asumir que todos los pasos están completos.
6.  La revisión se limita a los archivos presentes en el ZIP. Cualquier
    código local que no se haya incluido no fue evaluado.

------------------------------------------------------------------------

## 6. Modelo de datos: propuesta conceptual para revisar

Esta sección propone las entidades que parecen necesarias a partir de
los requisitos descritos. **No es todavía un esquema definitivo ni debe
convertirse en migraciones hasta resolver las preguntas pendientes.**

### 6.1 Entidades principales

  -----------------------------------------------------------------------
  Entidad propuesta       Qué representa          Datos que podría
                                                  guardar
  ----------------------- ----------------------- -----------------------
  `users`                 Integrantes con acceso  Identificador, nombre
                                                  visible, usuario de
                                                  acceso, hash de
                                                  contraseña, estado de
                                                  cuenta, fechas.

  `roles`                 Perfiles funcionales    Nombre y descripción
                                                  del rol.

  `user_roles`            Relación usuario-rol    Usuario y rol asignado.
                                                  Permite más de un rol
                                                  si se decide necesario.

  `tandas`                Agrupación de trabajos  Identificador, número o
                                                  nombre visible,
                                                  descripción opcional,
                                                  estado, fechas,
                                                  creador.

  `corridos`              Proyecto musical        Tanda, número o nombre
                                                  visible, título
                                                  opcional, estado de
                                                  producción,
                                                  activo/inactivo,
                                                  fechas, creador.

  `client_info`           Información entregada   Nombre o referencia del
                          por el cliente          cliente, contacto y
                                                  texto/información
                                                  proporcionada, según
                                                  campos que se acuerden.

  `lyrics`                Versiones de letra      Corrido, número de
                                                  versión, contenido,
                                                  autor, fecha y nota de
                                                  cambio opcional.

  `audio_files`           Audios y maquetas       Corrido, nombre
                                                  original, nombre
                                                  almacenado, ruta
                                                  relativa, formato,
                                                  tamaño, duración si se
                                                  obtiene, autor/subidor,
                                                  fecha y descripción.

  `status_history`        Cambios de estado       Corrido, estado
                                                  anterior, estado nuevo,
                                                  usuario y fecha.

  `activity_logs`         Actividad relevante     Usuario, acción,
                                                  entidad afectada,
                                                  identificador, fecha y
                                                  metadatos mínimos.
  -----------------------------------------------------------------------

### 6.2 Relaciones conceptuales

-   Una tanda contiene muchos corridos.
-   Un corrido pertenece a una sola tanda.
-   Un corrido puede tener varias versiones de letra.
-   Un corrido puede tener muchos audios.
-   Un corrido puede tener uno o varios registros de información del
    cliente, dependiendo de si se conserva historial.
-   Un corrido puede tener muchos cambios de estado.
-   Un usuario puede crear o modificar distintos registros.
-   Los usuarios pueden tener uno o varios roles, según la decisión de
    permisos.

### 6.3 Información que no se debe almacenar como parte del sistema

No se crearán módulos ni tablas para: - Pagos. - Cobros. - Anticipos. -
Deudas. - Ingresos. - Gastos. - Comisiones. - Presupuestos o saldos.

El contacto del cliente y la información necesaria para producir el
corrido sí forman parte del alcance, pero debe acordarse cuáles datos
personales son realmente necesarios.

### 6.4 Reglas de integridad a considerar

-   Un corrido no debe quedar asociado a una tanda inexistente.
-   Cada versión de letra debe pertenecer a un corrido.
-   Cada audio debe pertenecer a un corrido.
-   Los registros deben conservar quién los creó o subió cuando
    corresponda.
-   La eliminación de un registro que tenga archivos asociados debe
    tratarse cuidadosamente para no dejar archivos huérfanos.
-   Se debe decidir si "inactivo" significa archivado, pausado o
    simplemente no visible en la lista principal.
-   Se debe decidir si las tandas también pueden estar
    activas/inactivas.
-   Se debe decidir si un corrido puede cambiar de tanda.

### 6.5 Versionado de letra

Recomendación para discusión: no sobrescribir la letra anterior sin
conservar una versión.

Ejemplo conceptual: - Corrido: Tanda 3 / Corrido 6. - Versión 1: primera
letra. - Versión 2: correcciones. - Versión 3: versión vigente.

La interfaz podría mostrar la versión vigente por defecto y permitir
consultar versiones anteriores. Queda por decidir si se permitirá
restaurar una versión anterior y quién podrá hacerlo.

### 6.6 Audios

Los archivos de audio se guardarían en el disco de la laptop, no como
contenido binario dentro de PostgreSQL. PostgreSQL conservaría sus
metadatos y una ruta relativa o clave de almacenamiento.

El sistema debería: - Aceptar únicamente formatos acordados. - Validar
tamaño y tipo de archivo en el servidor. - Generar un nombre interno
único para evitar colisiones. - Conservar el nombre original como
metadato. - Asociar cada archivo con corrido y usuario que lo subió. -
Permitir reproducir o descargar desde los clientes autorizados. - No
reemplazar una maqueta anterior al subir una nueva. - Gestionar
eliminaciones de manera controlada y auditada.

Quedan por decidir formatos permitidos, límite de tamaño, política de
eliminación y si se podrán subir archivos distintos de audio.

------------------------------------------------------------------------

## 7. Almacenamiento local de archivos

### Principio

Los audios y adjuntos vivirán en el almacenamiento interno de la laptop
que actúa como servidor. Los teléfonos no escribirán directamente en una
carpeta compartida del sistema operativo; enviarán el archivo a Fastify
mediante una petición autenticada y el servidor lo guardará.

### Estructura de carpetas ilustrativa

``` text
LOS-CARO-DATA/
├── uploads/
│   └── corridos/
│       └── <corrido-id>/
│           ├── <archivo-id>.mp3
│           ├── <archivo-id>.m4a
│           └── <archivo-id>.wav
│
├── backups/
│   ├── database/
│   └── files/
│
└── logs/
```

Esta estructura es ilustrativa. Se recomienda usar identificadores
internos estables en las rutas, no depender del texto editable "Tanda
3/Corrido 6". Así, renombrar un corrido no obliga a mover archivos.

### Requisitos técnicos

-   Ruta base configurable mediante variables de entorno.
-   Crear directorios necesarios al iniciar o al guardar.
-   Validar el archivo en backend.
-   Evitar que una ruta enviada por el usuario permita escribir fuera de
    la carpeta permitida (path traversal).
-   Guardar primero el archivo de forma segura y después registrar sus
    metadatos, con manejo de errores para evitar inconsistencias.
-   Servir los archivos mediante endpoints autorizados.
-   No exponer directamente toda la carpeta de almacenamiento al
    navegador.
-   Respaldar los archivos junto con la base de datos.
-   Documentar espacio libre y procedimiento de restauración.

### Preguntas pendientes

-   ¿Qué formatos se aceptarán: MP3, M4A, WAV, AAC, otros?
-   ¿Cuál será el tamaño máximo por archivo?
-   ¿Se permitirá eliminar un audio o solamente marcarlo como eliminado?
-   ¿Se guardarán documentos o imágenes además de audios?
-   ¿La laptop tendrá un disco externo o el almacenamiento será
    exclusivamente interno?

------------------------------------------------------------------------

## 8. Red local, Wi-Fi y acceso

### Escenario preferido para la primera versión

Una laptop conectada al mismo router Wi-Fi que los teléfonos y
computadoras del equipo.

El router no necesita tener conexión a internet. Solamente debe
proporcionar conectividad local entre los dispositivos.

### Flujo esperado

1.  Encender la laptop.
2.  Conectarla al router o red Wi-Fi de la sesión.
3.  Iniciar PostgreSQL.
4.  Iniciar el backend Fastify.
5.  Detectar la dirección IPv4 local utilizable de la laptop.
6.  Mostrar estado del servidor, dirección y puerto.
7.  Generar el QR de acceso.
8.  Los integrantes se conectan al mismo Wi-Fi.
9.  Escanean el QR o escriben la dirección local.
10. Inician sesión y trabajan contra el servidor central.

### Dirección de ejemplo

``` text
http://192.168.1.50:3000
```

La dirección anterior es ilustrativa, no una IP fija del proyecto.

### QR

El QR debe codificar la URL de acceso local que el servidor esté
anunciando. No debe codificar `localhost`, porque desde otro teléfono
`localhost` apuntaría al propio teléfono.

La pantalla de conexión debería mostrar: - Estado del servidor. - Nombre
de la red, si puede obtenerse de manera fiable. - Dirección local y
puerto. - QR. - Instrucción de conectarse al mismo Wi-Fi. - Mensaje
claro si no se detecta una interfaz de red válida.

La generación del QR es una comodidad de acceso; no reemplaza
autenticación ni permisos.

### IP dinámica

La IP de la laptop puede cambiar al conectarse a distintas redes. Por
eso: - No se debe depender de una IP escrita permanentemente en el
frontend. - El backend o la aplicación de escritorio deben determinar la
dirección anunciable. - Se recomienda reservar una IP para la laptop en
el router cuando sea posible. - Se debe permitir regenerar/actualizar el
QR si cambia la dirección.

### Pruebas de red obligatorias

-   Acceso desde otro equipo Windows.
-   Acceso desde macOS.
-   Acceso desde iPhone.
-   Acceso desde Android.
-   Acceso cuando el router no tiene internet.
-   Reconexión después de apagar y encender el servidor.
-   Cambio de red o IP.
-   Prueba con aislamiento de clientes Wi-Fi activado y desactivado, si
    el router ofrece esa función.

------------------------------------------------------------------------

## 9. Firewall y permisos del sistema operativo

Escuchar en `0.0.0.0` no garantiza que Windows o macOS permitan las
conexiones entrantes.

### Windows

Se deberá documentar y probar: - Permitir el ejecutable/proceso Node.js
o la aplicación empaquetada en el Firewall de Windows. - Autorizar
conexiones entrantes solamente en redes privadas cuando sea posible. -
Permitir el puerto que se defina para la API. - No abrir el puerto a
redes públicas ni configurar port forwarding del router para esta
primera etapa. - Verificar que el perfil de red de Windows esté
configurado como privado cuando corresponda.

### macOS

Se deberá documentar y probar: - Permitir conexiones entrantes para el
proceso o aplicación correspondiente mediante el Firewall. - Revisar
permisos de red y comportamiento al ejecutar el backend desde desarrollo
y desde la aplicación empaquetada. - Comprobar que el sistema no bloquee
conexiones entrantes. - Verificar permisos de lectura/escritura de la
carpeta de datos.

### Principios de seguridad

-   No desactivar globalmente el Firewall como solución.
-   No ejecutar el servidor con privilegios de administrador/root sin
    necesidad.
-   Restringir el acceso al almacenamiento a la cuenta del sistema que
    ejecuta el servicio.
-   Autenticar usuarios.
-   Autorizar operaciones por rol/permisos.
-   Validar entradas y archivos en el backend.
-   No confiar en que la red Wi-Fi por sí sola sea una barrera de
    seguridad.
-   No exponer PostgreSQL directamente a los teléfonos; los clientes se
    comunican con Fastify.
-   No publicar el servidor en internet en la primera etapa.

**Nota:** el puerto 3000 es el que aparece actualmente en el código. Se
debe decidir si se conserva o si se separa el puerto de frontend/API
antes de definir la configuración final.

------------------------------------------------------------------------

## 10. Aplicación web, móvil y escritorio

### Primera experiencia recomendada

Construir una interfaz React responsive y acceder a ella desde los
navegadores de los dispositivos.

-   Windows/Mac: navegador o aplicación Tauri.
-   iPhone: Safari.
-   Android: Chrome.
-   PWA: posibilidad posterior de instalar un acceso directo y mejorar
    la experiencia.

No es necesario desarrollar aplicaciones nativas independientes para iOS
y Android en la primera etapa.

### Punto técnico por resolver

Si la aplicación web se servirá desde Fastify, hay que decidir cómo se
servirán los archivos estáticos y cómo se configurarán las rutas del
frontend. Otra posibilidad es mantener frontend y API en puertos
separados durante desarrollo. La decisión debe tomarse cuando se revise
el frontend y el empaquetado.

### Tauri

Tauri es el contenedor de escritorio, no el servidor central por
definición. Antes de integrarlo hay que definir: - Si Tauri solamente
abrirá la interfaz web local. - Si iniciará/detendrá el proceso
Fastify. - Cómo se iniciará PostgreSQL. - Qué sucede si el usuario
cierra la ventana. - Cómo se evitará iniciar dos servidores
simultáneos. - Cómo se distribuirá y actualizará la aplicación en
Windows y macOS.

------------------------------------------------------------------------

## 11. Actualizaciones entre integrantes

Se plantea REST para operaciones normales y WebSockets para notificar
cambios.

Ejemplo de flujo: 1. Un integrante guarda una nueva versión de letra. 2.
Fastify valida al usuario y los datos. 3. PostgreSQL registra la nueva
versión. 4. Fastify emite un evento de actualización para ese corrido.
5. Los clientes que estén viendo ese corrido reciben el aviso. 6. La
interfaz vuelve a consultar la versión vigente o actualiza su vista.

No se requiere edición simultánea carácter por carácter en la primera
versión.

Se recomienda incorporar control de concurrencia para evitar que una
persona sobrescriba accidentalmente cambios más recientes de otra. El
mecanismo concreto queda pendiente de definir.

------------------------------------------------------------------------

## 12. Seguridad, cuentas y sesiones

Antes de permitir que los seis integrantes utilicen la aplicación, se
requiere: - Identificación individual de usuario. - Contraseñas
almacenadas mediante hash seguro, nunca en texto plano. - Sesiones o
tokens con expiración y cierre de sesión. - Control de acceso en el
backend, no solamente ocultar botones en la interfaz. - Registro de
acciones relevantes. - Protección de endpoints de subida, descarga y
eliminación de archivos. - Procedimiento para cambiar o restablecer
contraseñas.

Queda por decidir si los usuarios se crearán manualmente desde una
cuenta administradora y si habrá una cuenta técnica inicial para
configurar el sistema.

------------------------------------------------------------------------

## 13. Respaldos y recuperación

La laptop concentra base de datos y archivos, por lo que es un punto
único de falla.

La primera versión debe contemplar: - Respaldo de PostgreSQL. - Respaldo
de la carpeta de archivos. - Fecha y resultado del último respaldo. -
Destino de respaldo configurable. - Procedimiento probado de
restauración. - Recomendación de una segunda unidad física o destino
externo.

No basta con copiar la base de datos si los audios quedan fuera del
respaldo. Ambos componentes deben poder restaurarse de forma coherente.

Queda por decidir frecuencia, destino, retención y si los respaldos se
harán automáticamente al apagar el servidor o mediante una programación.

------------------------------------------------------------------------

## 14. Plan de trabajo por fases

Las fases son una secuencia propuesta. No implican que se deban
implementar todas sin validar cada etapa.

### Fase 0 --- Confirmación de requisitos y decisiones

-   Resolver preguntas pendientes de este documento.
-   Confirmar alcance de usuarios y permisos.
-   Confirmar campos de información del cliente.
-   Confirmar estados de producción.
-   Confirmar formatos y límites de archivos.
-   Confirmar forma de iniciar el servidor en Windows/macOS.
-   Revisar el repositorio completo y decidir si será monorepo.

**Criterio de salida:** decisiones funcionales y técnicas mínimas
documentadas.

### Fase 1 --- Base del backend

-   Validación de variables de entorno.
-   Configuración de PostgreSQL.
-   Configuración correcta de Drizzle.
-   Primera migración controlada.
-   Manejo de errores.
-   Cierre ordenado del servidor y conexión a BD.
-   Endpoint de salud.
-   Estructura modular de rutas, servicios y repositorios.

**Criterio de salida:** backend inicia, se conecta a PostgreSQL, ejecuta
migraciones y responde correctamente.

### Fase 2 --- Modelo de datos y administración

-   Implementar usuarios y permisos acordados.
-   Implementar tandas.
-   Implementar corridos.
-   Implementar información del cliente.
-   Implementar estados.
-   Implementar historial necesario.
-   Validar reglas de integridad.

**Criterio de salida:** se puede administrar la estructura de tandas y
corridos mediante API.

### Fase 3 --- Letras y versiones

-   Consultar letra vigente.
-   Crear/editar letra.
-   Guardar versiones.
-   Consultar historial.
-   Registrar autor y fecha.
-   Resolver conflictos de edición.

**Criterio de salida:** el compositor puede actualizar una letra y el
resto consulta la versión vigente.

### Fase 4 --- Almacenamiento y audios

-   Definir formatos y límites.
-   Configurar carpeta de almacenamiento.
-   Subir audios desde web/móvil.
-   Registrar metadatos.
-   Listar, reproducir y descargar.
-   Proteger rutas de archivos.
-   Resolver eliminación y recuperación.

**Criterio de salida:** los integrantes autorizados pueden subir y
escuchar maquetas desde sus dispositivos.

### Fase 5 --- Frontend responsive

-   Inicio de sesión.
-   Lista de tandas.
-   Lista de corridos por tanda.
-   Vista de detalle del corrido.
-   Letra vigente e historial.
-   Reproductor y lista de audios.
-   Información del cliente.
-   Estado y condición activo/inactivo.
-   Vistas y acciones según permisos.

**Criterio de salida:** flujo completo de trabajo desde navegador en
escritorio y teléfono.

### Fase 6 --- LAN, QR y Firewall

-   Servidor escuchando en interfaz de red adecuada.
-   Detección de IP.
-   Pantalla de conexión y QR.
-   Pruebas de Windows/macOS.
-   Pruebas iPhone/Android.
-   Reglas de Firewall documentadas.
-   Prueba sin internet.
-   Pruebas de reconexión y cambio de IP.

**Criterio de salida:** los seis usuarios pueden acceder desde una red
local sin internet, dentro de las limitaciones acordadas.

### Fase 7 --- Tauri y operación del servidor

-   Definir ciclo de vida del backend.
-   Integrar Tauri.
-   Configurar permisos de archivos.
-   Configurar inicio/cierre.
-   Empaquetar para Windows y macOS.
-   Probar instalación y actualización.

**Criterio de salida:** la laptop puede operar el sistema mediante una
experiencia de escritorio estable.

### Fase 8 --- Actualizaciones y respaldos

-   Notificaciones WebSocket.
-   Avisos de cambios de letra y audios.
-   Registro de actividad.
-   Respaldos automáticos.
-   Restauración comprobada.

**Criterio de salida:** cambios visibles para los demás clientes y
recuperación de información probada.

### Fase 9 --- Acceso remoto futuro (no incluido en primera versión)

-   Evaluar VPN privada o hosting.
-   Revisar autenticación, TLS y exposición de servicios.
-   Definir estrategia de migración.
-   No habilitar acceso externo hasta aprobar esta fase.

------------------------------------------------------------------------

## 15. Pruebas de aceptación de la primera versión local

La primera versión no se considerará lista solamente porque funcione en
la laptop.

Debe demostrarse que:

1.  El servidor inicia en la laptop.
2.  PostgreSQL queda disponible y la API se conecta.
3.  Se puede crear una tanda.
4.  Se puede crear un corrido dentro de esa tanda.
5.  Se puede registrar la información del cliente.
6.  El compositor puede guardar una letra y una nueva versión.
7.  El vocalista ve la versión vigente desde otro dispositivo.
8.  Se pueden subir varios audios al mismo corrido sin sobrescribir los
    anteriores.
9.  Los integrantes autorizados pueden reproducir los audios.
10. Los permisos impiden acciones no autorizadas desde el backend.
11. El QR permite abrir la dirección correcta desde un teléfono
    conectado a la misma red.
12. La aplicación funciona aunque el router no tenga internet.
13. Firewall permite el acceso local sin desactivar la protección
    global.
14. Reiniciar el servidor no pierde datos.
15. Existe un respaldo y se ha probado restaurarlo.

------------------------------------------------------------------------

## 16. Decisiones pendientes: no asumir

Estas preguntas deben resolverse antes de cerrar el diseño de base de
datos y comenzar migraciones definitivas.

### A. Identificación de tandas y corridos

1.  ¿"Tanda 3 / Corrido 6" significa que el número de corrido se
    reinicia dentro de cada tanda?
2.  ¿El título/nombre del corrido será obligatorio o basta con la
    numeración?
3.  ¿Se podrá cambiar un corrido de tanda?

### B. Información del cliente

4.  ¿Qué datos exactos se necesitan guardar? Por ejemplo: nombre,
    teléfono, nombre de contacto, indicaciones, dedicatoria, historia,
    nombres mencionados en el corrido y texto libre.
5.  ¿Se necesita guardar una sola ficha editable o conservar historial
    de lo que el cliente fue proporcionando?
6.  ¿Todos los integrantes pueden consultar esos datos o habrá
    restricciones?

### C. Estado del corrido

7.  ¿Cuáles serán los estados exactos del proceso? No se deben inventar
    estados sin validación.
8.  ¿"Activo/inactivo" es independiente del estado de producción?
9.  ¿Quién puede cambiar el estado y quién puede marcarlo inactivo?

### D. Letras

10. ¿Solamente el compositor (integrante 2) puede editar letras, o
    también el productor?
11. ¿Los demás integrantes solo consultan o pueden proponer
    correcciones?
12. ¿Se necesita restaurar una versión anterior?

### E. Audios

13. ¿Qué formatos se aceptarán?
14. ¿Qué tamaño máximo aproximado tendrá cada audio?
15. ¿Todos pueden subir audios o solo ciertos perfiles?
16. ¿Se permitirá borrar audios o únicamente archivarlos/marcarlos como
    eliminados?
17. ¿Se necesita clasificar el audio por tipo, por ejemplo maqueta, voz,
    guitarra, tololoche, mezcla u otro? ¿Cuáles categorías reales usan?

### F. Usuarios y permisos

18. ¿Cada integrante tendrá usuario y contraseña propios?
19. ¿Una persona puede tener más de un rol?
20. ¿Quién administrará altas, bajas y contraseñas?

### G. Servidor y red

21. ¿La laptop servidor será Windows, macOS o cualquiera de los dos
    según disponibilidad?
22. ¿La red de las reuniones normalmente tendrá router propio, router
    del lugar o se dependerá del hotspot de la laptop?
23. ¿Se acepta que la primera versión requiera un router Wi-Fi dedicado
    para garantizar una LAN estable?
24. ¿El servidor debe continuar funcionando al cerrar la ventana de
    Tauri?

### H. Archivos y respaldos

25. ¿Los audios se guardarán únicamente en el disco interno o se
    contempla un disco externo?
26. ¿Con qué frecuencia se desea respaldar y dónde?
27. ¿Se necesita que el sistema muestre cuánto espacio de almacenamiento
    queda?

------------------------------------------------------------------------

## 17. Forma de trabajo del proyecto

Para mantener el desarrollo ordenado:

1.  Trabajar sobre el repositorio existente, no reemplazarlo sin
    revisión.
2.  Resolver las dudas que afecten el diseño antes de implementar.
3.  Mantener este documento actualizado cuando una decisión quede
    confirmada.
4.  Separar claramente decisiones confirmadas, propuestas y pendientes.
5.  Implementar por fases pequeñas y comprobables.
6.  No agregar módulos de dinero o pagos.
7.  No integrar servicios externos ni depender de internet para el
    funcionamiento LAN.
8.  Antes de modificar archivos existentes, revisar su contenido actual.
9.  No considerar una fase terminada hasta verificar sus criterios de
    aceptación.

------------------------------------------------------------------------

## 18. Resumen de decisiones confirmadas hasta ahora

-   El proyecto se llama **LOS CARO - SISTEMA**.
-   Es una herramienta administrativa para organizar corridos
    personalizados.
-   La organización principal es por tandas y corridos.
-   Cada corrido contiene letra, audios, información del cliente, estado
    y condición activo/inactivo.
-   El equipo previsto es de seis integrantes con necesidades
    diferentes.
-   La primera etapa será local, sin depender de internet.
-   Una laptop centralizará servidor, base de datos y archivos.
-   Los integrantes accederán desde web en computadoras y teléfonos
    dentro de la misma LAN.
-   Se quiere facilitar el acceso mediante QR.
-   El stack planteado es TypeScript, React, Tauri + Rust, Node.js,
    Fastify, Drizzle y PostgreSQL.
-   No se administrará información de pagos ni dinero.
-   El repositorio compartido ya contiene una base inicial de API con
    Fastify, PostgreSQL y Drizzle.
-   El backend actual escucha en `0.0.0.0:3000`.
-   El esquema de Drizzle todavía está vacío.

## 19. Nota de continuidad

Este documento es la referencia de continuidad del proyecto. Cuando se
confirme una respuesta de la sección 16, actualizar la sección
correspondiente y el resumen de decisiones confirmadas. No convertir una
propuesta en requisito confirmado sin aprobación.

La memoria persistente de ChatGPT no está disponible en este proyecto;
por eso este archivo debe conservarse dentro del repositorio, idealmente
en `docs/PLAN_MAESTRO.md`, y compartirse de nuevo al retomar el trabajo
si el contexto de la conversación no está disponible.
