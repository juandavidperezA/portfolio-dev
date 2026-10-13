export const projects = [
  {
    id: "java",
    number: "01",
    name: "Java Management Systems",
    category: "Java",
    repo: "https://github.com/juandavidperezA/java-oop-management-systems",
    label: "PROYECTO MÁS RECIENTE",
    description:
      "Cinco sistemas de gestión. Una base sólida en programación orientada a objetos.",
    detail:
      "Una colección de aplicaciones de consola para banca, gestión académica, tienda, contactos y calificaciones. Construida para llevar la lógica de negocio a clases, colecciones y archivos.",
    tags: ["Java", "Maven", "POO", "Archivos"],
    features: [
      "Cuentas, transferencias e historial de movimientos.",
      "Estudiantes, asignaturas y reportes de calificaciones.",
      "Catálogo, inventario y compras.",
      "Búsqueda de contactos y persistencia en archivos.",
      "Promedios, curvas de calificación y estadísticas.",
    ],
    note: "Proyecto académico de consola · Java 26 y Apache Maven.",
  },
  {
    id: "n8n",
    number: "02",
    name: "Pokémon Research Manager",
    category: "Automatización",
    repo: "https://github.com/juandavidperezA/actividad_n8n",
    label: "DEL FORMULARIO AL FLUJO",
    description:
      "Datos que encuentran su camino. Registro y clasificación conectados con n8n.",
    detail:
      "Un formulario web envía registros a un webhook de n8n. El flujo prepara la información, clasifica los Pokémon por tipo y nivel, e integra el registro con PostgreSQL y Google Sheets.",
    tags: ["n8n", "JavaScript", "PostgreSQL", "Webhooks"],
    features: [
      "Formulario web con envío de datos en JSON.",
      "Clasificación por tipo, nivel y prioridad.",
      "Integración con PostgreSQL y Google Sheets.",
      "Workflow exportado para explorar su estructura.",
    ],
    note: "Proyecto académico · Requiere configurar n8n y las credenciales de sus integraciones.",
  },
  {
    id: "acme",
    number: "03",
    name: "Acme School",
    category: "Web",
    repo: "https://github.com/juandavidperezA/proyectofinaljs",
    label: "INTERFACES CON LÓGICA",
    description:
      "Una interfaz para crear, editar y organizar usuarios desde el navegador.",
    detail:
      "Gestión de usuarios de una institución educativa con validación de formularios, asignación de cargos y almacenamiento local. Un ejercicio práctico de estado, eventos y manipulación del DOM.",
    tags: ["JavaScript", "HTML", "CSS", "localStorage"],
    features: [
      "Creación, edición y eliminación de usuarios.",
      "Validación de nombres, correos y contraseñas.",
      "Control de identificaciones y correos duplicados.",
      "Persistencia de datos en el navegador.",
    ],
    note: "Proyecto académico de frontend · Almacenamiento local, sin backend.",
  },
  {
    id: "cine",
    number: "04",
    name: "Cine Colombia",
    category: "Web",
    repo: "https://github.com/juandavidperezA/cinecolombiapropio",
    label: "EXPLORACIÓN FRONTEND",
    description:
      "Cartelera dinámica, contenido conectado y una experiencia de cine multipágina.",
    detail:
      "Una práctica de desarrollo web inspirada en una plataforma de cine. Combina una API de películas, catálogos de comida en JSON y navegación entre cartelera, cine alternativo y multiplex.",
    tags: ["JavaScript", "Fetch API", "HTML", "CSS"],
    features: [
      "Cartelera alimentada por una API externa.",
      "Clasificación de películas por año.",
      "Catálogo de comidas desde archivos JSON.",
      "Navegación multipágina y simulación de inicio de sesión.",
    ],
    note: "Proyecto académico inspirado en Cine Colombia · No es el sitio oficial.",
  },
];

export type Project = (typeof projects)[number];
