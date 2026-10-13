# Juan David Pérez · Portafolio espacial

Portafolio personal en React, TypeScript y Vite, con una mascota original llamada Codex modelada en Three.js.

## Desarrollo

Requiere Node.js 24 y pnpm 10.4.1 (la versión declarada en package.json).

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm exec vite build --base=/portfolio-dev/
pnpm exec vite preview --base=/portfolio-dev/
```

GitHub Actions publica automáticamente los cambios de main en GitHub Pages.

## Editar contenido

- Proyectos: `client/src/data/projects.ts`.
- Secciones, enlaces y recorrido: `client/src/pages/Home.tsx`.
- Diseño y adaptación móvil: `client/src/pages/spatial.css`.
- Personaje: `client/src/components/spatial/CodexScene.tsx`.

Las imágenes de las tarjetas son interpretaciones visuales de los proyectos, no capturas de aplicaciones. Los botones de código llevan a repositorios reales.

## Interacciones y accesibilidad

Codex responde al puntero, gira al arrastrarlo y abre un recorrido de cuatro secciones con clic, toque o teclado. La guía permanece disponible durante toda la visita. La escena pausa cuando sale de pantalla o la pestaña queda oculta; existe una representación CSS si WebGL no está disponible.

El control de pausa permite reducir el movimiento y conserva la preferencia localmente. Se respeta también la preferencia del sistema. Los detalles de proyectos utilizan un diálogo nativo con cierre mediante Escape. No hay chatbot remoto ni envío de datos por parte de Codex.

## Comprobaciones del rediseño

- TypeScript y compilación de producción para `/portfolio-dev/`.
- Instalación con lockfile congelado.
- Filtros de proyectos, enlaces de repositorios y diálogo.
- Recorrido de Codex, controles de movimiento y foco por teclado.
- Menú y composición móvil a 390 px y 320 px.
