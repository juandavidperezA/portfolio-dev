# Brainstorm de Diseño — Portafolio Personal Desarrollador Web

## Tres enfoques estilísticos

### Enfoque 1: "Lucario Forge"
Fondo oscuro profundo (azul noche), elementos con glow azul eléctrico, tipografía bold condensada. Inspirado en el aura de Lucario: poder contenido, tecnología avanzada.
**Probabilidad:** 0.07

### Enfoque 2: "Cinderace Arena"
Fondo blanco roto con toques de azul y dorado. Limpio, deportivo, moderno. Tarjetas flotantes con sombras suaves. Inspirado en la agilidad y elegancia de Cinderace.
**Probabilidad:** 0.03

### Enfoque 3: "Aura Dusk" ✅ ELEGIDO
Fondo oscuro azul-pizarra profundo (#0a0e1a) con gradientes hacia azul intenso. Elementos blancos cristalinos con glow dorado en los acentos. Combina la energía de Lucario con la pureza de Cinderace. Futurista, premium, memorable.
**Probabilidad:** 0.09

---

## Enfoque Elegido: "Aura Dusk"

### Design Movement
**Cyberpunk Premium / Neofuturismo Elegante** — Interfaces de alto contraste con iluminación de neón contenida, propias de videojuegos AAA y portfolios de diseñadores de vanguardia. Referencia: Pokémon Legends: Arceus UI + Cyberpunk 2077 menus.

### Core Principles
1. **Contraste dramático**: Fondos muy oscuros contra texto blanco y acentos dorados brillantes.
2. **Glow como lenguaje**: Los efectos de brillo no son decoración, son semántica — indican importancia y estado activo.
3. **Asimetría dinámica**: Layouts que rompen la cuadrícula para transmitir energía y movimiento.
4. **Profundidad en capas**: Glassmorphism sutil en tarjetas, creando sensación de profundidad holográfica.

### Color Philosophy
- **Fondo base**: `#0a0e1a` — Azul noche profundo, como el cielo antes del amanecer. Transmite misterio y tecnología.
- **Azul Lucario**: `#1e40af` / `#3b82f6` — Azul intenso eléctrico, energía y confianza.
- **Blanco Cinderace**: `#f0f4ff` — Blanco azulado, limpio y cristalino.
- **Dorado acento**: `#f59e0b` / `#fbbf24` — Ámbar cálido para botones, hover y highlights. Contraste máximo.
- **Glow azul**: `rgba(59, 130, 246, 0.4)` — Para sombras y efectos de brillo.

### Layout Paradigm
Diseño de **scroll narrativo vertical** con secciones de ancho completo. Cada sección tiene su propia "escena" visual. El hero usa una composición asimétrica (texto a la izquierda, ilustración a la derecha). Las tarjetas de proyectos usan un grid masonry-inspired.

### Signature Elements
1. **Líneas de energía**: Bordes con gradiente azul→dorado en tarjetas y separadores.
2. **Partículas flotantes**: Puntos luminosos sutiles en el hero (CSS puro).
3. **Glassmorphism azulado**: `backdrop-filter: blur` con borde semitransparente en tarjetas.

### Interaction Philosophy
Cada interacción debe sentirse como activar un poder especial. Los hovers iluminan el elemento, los botones tienen efecto de "carga de energía" al presionar. El scroll revela elementos con animaciones de entrada desde abajo.

### Animation
- **Entrada del hero**: Fade + slide-up escalonado (150ms entre elementos).
- **Scroll reveal**: `IntersectionObserver` con `opacity 0→1` + `translateY(30px→0)` en 600ms ease-out.
- **Hover en tarjetas**: `scale(1.02)` + intensificación del glow en 200ms.
- **Botones**: Scale 0.97 en active, glow pulse en hover.
- **Barras de habilidades**: Animación de llenado al entrar en viewport.

### Typography System
- **Display / Títulos**: `Orbitron` — Futurista, tecnológico, memorable. Usado para el nombre y títulos de sección.
- **Body / Texto**: `Inter` — Legible, profesional, neutro. Para párrafos y descripciones.
- **Jerarquía**: H1 (4xl-6xl bold Orbitron) → H2 (2xl-3xl semibold Orbitron) → Body (base Inter) → Caption (sm Inter muted).

### Brand Essence
**"El desarrollador que convierte visión en código con precisión y estilo — para quienes buscan un colaborador comprometido con el detalle."**
Personalidad: **Ambicioso · Preciso · Apasionado**

### Brand Voice
Headlines directas y con energía: *"Transformo ideas en experiencias web."* CTAs con acción clara: *"Explora mi trabajo"*, *"Hablemos."* Sin frases genéricas.

### Wordmark & Logo
Símbolo geométrico: hexágono con código `</>` inscrito, en gradiente azul→dorado. Representa la intersección de estructura (hexágono) y código (símbolo).

### Signature Brand Color
**Azul Lucario** `#3b82f6` — Inconfundible, tecnológico, energético.
