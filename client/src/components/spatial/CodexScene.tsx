import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./CodexScene.css";

type CodexSceneProps = {
  reducedMotion: boolean;
  onInteract: () => void;
  className?: string;
};

/** Rounded, beveled solids keep the character self-contained: no models or textures to fetch. */
function roundedSolid(
  width: number,
  height: number,
  depth: number,
  radius: number
) {
  const shape = new THREE.Shape();
  const left = -width / 2;
  const bottom = -height / 2;
  shape.moveTo(left + radius, bottom);
  shape.lineTo(left + width - radius, bottom);
  shape.quadraticCurveTo(left + width, bottom, left + width, bottom + radius);
  shape.lineTo(left + width, bottom + height - radius);
  shape.quadraticCurveTo(
    left + width,
    bottom + height,
    left + width - radius,
    bottom + height
  );
  shape.lineTo(left + radius, bottom + height);
  shape.quadraticCurveTo(left, bottom + height, left, bottom + height - radius);
  shape.lineTo(left, bottom + radius);
  shape.quadraticCurveTo(left, bottom, left + radius, bottom);
  const bevel = Math.min(depth * 0.24, radius * 0.48);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: depth - bevel * 2,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 10,
  });
  geometry.center();
  return geometry;
}

export default function CodexScene({
  reducedMotion,
  onInteract,
  className = "",
}: CodexSceneProps) {
  const hostRef = useRef<HTMLButtonElement>(null);
  const [fallback, setFallback] = useState(false);
  const interactRef = useRef(onInteract);
  const draggedRef = useRef(false);
  interactRef.current = onInteract;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      setFallback(true);
      return;
    }
    setFallback(false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.className = "codex-scene__canvas";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
    camera.position.set(0, 1.2, 9.6);
    camera.lookAt(0, -0.1, 0);

    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const textures: THREE.Texture[] = [];
    const material = <T extends THREE.Material>(value: T) => {
      materials.push(value);
      return value;
    };
    const mesh = (geometry: THREE.BufferGeometry, surface: THREE.Material) => {
      geometries.push(geometry);
      return new THREE.Mesh(geometry, surface);
    };
    const porcelain = material(
      new THREE.MeshPhysicalMaterial({
        color: 0xf1f5ff,
        metalness: 0.13,
        roughness: 0.25,
        clearcoat: 0.7,
        clearcoatRoughness: 0.18,
      })
    );
    const silver = material(
      new THREE.MeshStandardMaterial({
        color: 0x8391a8,
        roughness: 0.32,
        metalness: 0.7,
      })
    );
    const charcoal = material(
      new THREE.MeshPhysicalMaterial({
        color: 0x060f20,
        roughness: 0.21,
        metalness: 0.34,
        clearcoat: 1,
      })
    );
    const seam = material(
      new THREE.MeshStandardMaterial({
        color: 0x34445d,
        roughness: 0.52,
        metalness: 0.4,
      })
    );
    const cyan = material(
      new THREE.MeshStandardMaterial({
        color: 0x65fff3,
        emissive: 0x24dccc,
        emissiveIntensity: 1.8,
        roughness: 0.25,
      })
    );
    const lilac = material(
      new THREE.MeshStandardMaterial({
        color: 0xb29bff,
        emissive: 0x7861de,
        emissiveIntensity: 0.6,
        roughness: 0.2,
      })
    );

    scene.add(new THREE.HemisphereLight(0xc8deff, 0x465472, 3));
    const key = new THREE.DirectionalLight(0xffffff, 5.5);
    key.position.set(-3, 5, 5);
    scene.add(key);
    const edge = new THREE.DirectionalLight(0x80ffee, 3);
    edge.position.set(4, 2, -2);
    scene.add(edge);
    const fill = new THREE.DirectionalLight(0xa18dff, 2.5);
    fill.position.set(-4, -1, 1);
    scene.add(fill);

    const robot = new THREE.Group();
    robot.position.y = 0.25;
    robot.rotation.y = -0.18;
    robot.rotation.z = -0.045;
    scene.add(robot);

    const head = new THREE.Group();
    head.position.y = 0.95;
    robot.add(head);
    head.add(mesh(roundedSolid(2.08, 1.47, 1.34, 0.35), porcelain));

    const visorRim = mesh(roundedSolid(1.88, 1.04, 0.13, 0.31), silver);
    visorRim.position.set(0, -0.04, 0.716);
    head.add(visorRim);
    const visor = mesh(roundedSolid(1.79, 0.95, 0.105, 0.27), charcoal);
    visor.position.set(0, -0.04, 0.8);
    head.add(visor);
    const eyes = new THREE.Group();
    eyes.position.set(0, 0.02, 0.875);
    [-0.42, 0.42].forEach(x => {
      const eye = mesh(roundedSolid(0.16, 0.31, 0.035, 0.075), cyan);
      eye.position.x = x;
      eyes.add(eye);
    });
    head.add(eyes);
    const mouth = mesh(roundedSolid(0.23, 0.034, 0.023, 0.016), cyan);
    mouth.position.set(0, -0.265, 0.87);
    head.add(mouth);

    // A thin visor highlight gives the face the appearance of polished glass.
    const reflection = material(
      new THREE.MeshBasicMaterial({
        color: 0xc2d9ff,
        transparent: true,
        opacity: 0.13,
      })
    );
    const highlight = mesh(roundedSolid(0.54, 0.032, 0.015, 0.015), reflection);
    highlight.position.set(-0.45, 0.345, 0.873);
    head.add(highlight);
    [-1, 1].forEach(side => {
      const ear = mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.16, 32), seam);
      ear.rotation.z = Math.PI / 2;
      ear.position.set(side * 1.13, -0.03, 0);
      head.add(ear);
      const earCap = mesh(
        new THREE.CylinderGeometry(0.215, 0.215, 0.19, 32),
        porcelain
      );
      earCap.rotation.z = Math.PI / 2;
      earCap.position.set(side * 1.18, -0.03, 0);
      head.add(earCap);
    });

    const antenna = mesh(
      new THREE.CylinderGeometry(0.037, 0.055, 0.23, 16),
      silver
    );
    antenna.position.set(0.58, 0.92, -0.13);
    head.add(antenna);
    const antennaTip = mesh(new THREE.SphereGeometry(0.095, 20, 16), cyan);
    antennaTip.position.set(0.58, 1.065, -0.13);
    head.add(antennaTip);

    const neck = mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.26, 32), seam);
    neck.position.y = 0.03;
    robot.add(neck);
    const body = mesh(roundedSolid(1.3, 1.12, 0.96, 0.28), porcelain);
    body.position.y = -0.61;
    robot.add(body);
    const chest = mesh(roundedSolid(0.49, 0.3, 0.028, 0.065), charcoal);
    chest.position.set(0, -0.5, 0.526);
    robot.add(chest);
    [0, 1, 2].forEach(i => {
      const bar = mesh(
        roundedSolid(0.045, 0.055 + i * 0.035, 0.016, 0.015),
        cyan
      );
      bar.position.set(-0.105 + i * 0.105, -0.5, 0.55);
      robot.add(bar);
    });
    const waist = mesh(roundedSolid(0.86, 0.16, 0.65, 0.065), seam);
    waist.position.set(0, -1.24, 0);
    robot.add(waist);
    const thruster = mesh(
      new THREE.CylinderGeometry(0.23, 0.32, 0.1, 32),
      cyan
    );
    thruster.position.set(0, -1.39, 0);
    robot.add(thruster);

    const arms: THREE.Group[] = [];
    [-1, 1].forEach(side => {
      const arm = new THREE.Group();
      arm.position.set(side * 0.82, -0.22, 0);
      arm.rotation.z = side * 0.2;
      robot.add(arm);
      const joint = mesh(new THREE.SphereGeometry(0.21, 24, 16), seam);
      arm.add(joint);
      const upper = mesh(roundedSolid(0.33, 0.69, 0.4, 0.145), porcelain);
      upper.position.set(side * 0.09, -0.42, 0);
      arm.add(upper);
      const hand = mesh(new THREE.SphereGeometry(0.255, 28, 20), porcelain);
      hand.scale.set(0.89, 1.12, 0.9);
      hand.position.set(side * 0.09, -0.91, 0.05);
      arm.add(hand);
      const wrist = mesh(
        new THREE.CylinderGeometry(0.14, 0.14, 0.07, 24),
        seam
      );
      wrist.position.set(side * 0.09, -0.72, 0.025);
      arm.add(wrist);
      arms.push(arm);
    });

    const platform = new THREE.Group();
    platform.position.y = -1.96;
    scene.add(platform);
    const baseMaterial = material(
      new THREE.MeshPhysicalMaterial({
        color: 0x1a283c,
        metalness: 0.65,
        roughness: 0.4,
        transparent: true,
        opacity: 0.85,
      })
    );
    const base = mesh(
      new THREE.CylinderGeometry(1.46, 1.53, 0.1, 72),
      baseMaterial
    );
    platform.add(base);
    const ringMaterial = material(
      new THREE.MeshBasicMaterial({
        color: 0x77fce6,
        transparent: true,
        opacity: 0.72,
      })
    );
    [1.43, 1.65, 2.05].forEach((radius, i) => {
      const ring = mesh(
        new THREE.TorusGeometry(radius, i === 0 ? 0.018 : 0.008, 8, 100),
        i === 0 ? cyan : ringMaterial
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = i === 0 ? 0.06 : -0.015;
      platform.add(ring);
    });
    // Soft grounded shadow without an expensive continuously rendered shadow map.
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 3, 64, 64, 64);
      gradient.addColorStop(0, "rgba(0,0,0,0.8)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
      const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
      textures.push(shadowTexture);
      const shadow = mesh(
        new THREE.PlaneGeometry(2.5, 2.5),
        material(
          new THREE.MeshBasicMaterial({
            map: shadowTexture,
            transparent: true,
            depthWrite: false,
          })
        )
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = 0.059;
      platform.add(shadow);
    }

    const satellites = new THREE.Group();
    scene.add(satellites);
    const satelliteData = [
      { position: [-2.03, 1.36, -0.55], size: 0.085, surface: cyan },
      { position: [1.98, 0.48, -0.1], size: 0.09, surface: lilac },
      { position: [-1.86, -0.82, 0.2], size: 0.055, surface: lilac },
    ];
    satelliteData.forEach(({ position, size, surface }) => {
      const sphere = mesh(new THREE.IcosahedronGeometry(size, 1), surface);
      sphere.position.set(position[0], position[1], position[2]);
      satellites.add(sphere);
    });

    let frameId = 0;
    let visible = true;
    let disposed = false;
    let contextLost = false;
    let elapsed = 0;
    let lastTime = 0;
    let dragging = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let previousX = 0;
    let rotation = -0.18;
    let targetX = 0;
    let targetY = 0;

    const paint = () => {
      if (!disposed && !contextLost) renderer.render(scene, camera);
    };
    const animate = (now: number) => {
      if (
        disposed ||
        contextLost ||
        !visible ||
        document.hidden ||
        reducedMotion
      ) {
        frameId = 0;
        return;
      }
      const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.06) : 0;
      lastTime = now;
      elapsed += delta;
      robot.position.y = 0.25 + Math.sin(elapsed * 1.5) * 0.105;
      robot.rotation.y +=
        (rotation - robot.rotation.y) * Math.min(delta * 8, 1);
      robot.rotation.z = -0.045 + Math.sin(elapsed * 0.85) * 0.016;
      head.rotation.y +=
        (targetX * 0.24 - head.rotation.y) * Math.min(delta * 6, 1);
      head.rotation.x +=
        (-targetY * 0.14 - head.rotation.x) * Math.min(delta * 6, 1);
      eyes.position.x +=
        (targetX * 0.055 - eyes.position.x) * Math.min(delta * 9, 1);
      const blinkPhase = elapsed % 5.4;
      eyes.scale.y =
        blinkPhase > 5.24
          ? Math.max(0.08, Math.abs(blinkPhase - 5.32) / 0.08)
          : 1;
      arms[0].rotation.z = -0.19 + Math.sin(elapsed * 1.4) * 0.045;
      arms[1].rotation.z = 0.24 + Math.cos(elapsed * 1.2) * 0.055;
      satellites.rotation.y = Math.sin(elapsed * 0.25) * 0.12;
      satellites.position.y = Math.sin(elapsed * 1.05) * 0.075;
      paint();
      frameId = requestAnimationFrame(animate);
    };
    const start = () => {
      if (
        !frameId &&
        !disposed &&
        !contextLost &&
        visible &&
        !document.hidden &&
        !reducedMotion
      ) {
        lastTime = 0;
        frameId = requestAnimationFrame(animate);
      }
    };
    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
      lastTime = 0;
    };
    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = camera.aspect < 0.85 ? 11.1 : 9.6;
      camera.updateProjectionMatrix();
      paint();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(
      entries => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible) {
          paint();
          start();
        } else stop();
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(host);
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      targetX = THREE.MathUtils.clamp(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -1,
        1
      );
      targetY = THREE.MathUtils.clamp(
        1 - ((event.clientY - bounds.top) / bounds.height) * 2,
        -1,
        1
      );
      if (dragging) {
        if (
          Math.hypot(
            event.clientX - pointerStartX,
            event.clientY - pointerStartY
          ) > 7
        )
          draggedRef.current = true;
        rotation += (event.clientX - previousX) * 0.008;
        previousX = event.clientX;
      }
      if (reducedMotion && dragging) {
        robot.rotation.y = rotation;
        paint();
      }
    };
    const onDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      dragging = true;
      draggedRef.current = false;
      pointerStartX = previousX = event.clientX;
      pointerStartY = event.clientY;
      host.setPointerCapture(event.pointerId);
    };
    const onUp = () => {
      dragging = false;
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      stop();
      renderer.domElement.style.visibility = "hidden";
      setFallback(true);
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointerup", onUp);
    host.addEventListener("pointercancel", onUp);
    host.addEventListener("pointerleave", onLeave);
    resize();
    start();

    return () => {
      disposed = true;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerup", onUp);
      host.removeEventListener("pointercancel", onUp);
      host.removeEventListener("pointerleave", onLeave);
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        onContextLost
      );
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(surface => surface.dispose());
      textures.forEach(texture => texture.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reducedMotion]);

  return (
    <button
      ref={hostRef}
      type="button"
      className={`codex-scene ${className}`}
      aria-label="Hablar con Codex, tu guía del portafolio. Puedes arrastrarlo para girarlo."
      onClick={event => {
        if (event.detail === 0 || !draggedRef.current) interactRef.current();
        draggedRef.current = false;
      }}
    >
      <span className="codex-scene__halo" aria-hidden="true" />
      {fallback && (
        <span className="codex-scene__fallback" aria-hidden="true">
          <span className="codex-scene__fallback-head">
            <span className="codex-scene__fallback-face">
              <i />
              <i />
            </span>
          </span>
          <span className="codex-scene__fallback-body">
            <i />
          </span>
          <span className="codex-scene__fallback-arm codex-scene__fallback-arm--left" />
          <span className="codex-scene__fallback-arm codex-scene__fallback-arm--right" />
          <span className="codex-scene__fallback-ring" />
        </span>
      )}
      <span className="codex-scene__hint" aria-hidden="true">
        <span /> Arrastra para explorar · Toca para hablar
      </span>
    </button>
  );
}
