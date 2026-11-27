"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { isAfrica } from "@/lib/geo";

/* ==========================================================================
   "Connection Network" (DESIGN.md §7.3, 3D/WebGL)
   A dot-matrix Africa; gold arcs plug Lagos and Abuja into capitals across
   the continent, with pulses travelling along each connection.
   ========================================================================== */

const HUBS = { lagos: [3.4, 6.5], abuja: [7.5, 9.1] } as const;
const CITIES: [string, number, number, keyof typeof HUBS][] = [
  ["Accra", -0.2, 5.6, "lagos"],
  ["Dakar", -17.4, 14.7, "lagos"],
  ["Casablanca", -7.6, 33.6, "lagos"],
  ["Kinshasa", 15.3, -4.3, "lagos"],
  ["Johannesburg", 28, -26.2, "lagos"],
  ["Cairo", 31.2, 30, "abuja"],
  ["Addis Ababa", 38.7, 9, "abuja"],
  ["Nairobi", 36.8, -1.3, "abuja"],
  ["Kigali", 30.1, -1.9, "abuja"],
  ["Luanda", 13.2, -8.8, "lagos"],
];

const SCALE = 1 / 10.5;
const project = (lon: number, lat: number) => new THREE.Vector3((lon - 17) * SCALE, (lat - 1) * SCALE, 0);

const NAVY_DOT = new THREE.Color("#5b86d6");
const GOLD = new THREE.Color("#f2cb7a");

const pointVert = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aRand;
  attribute float aGold;
  varying float vAlpha;
  varying float vGold;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float tw = 0.55 + 0.45 * sin(uTime * (0.6 + aRand * 1.4) + aRand * 40.0);
    vAlpha = mix(0.5, 1.0, tw) * mix(0.75, 1.0, aGold);
    vGold = aGold;
    gl_PointSize = (mix(4.2, 5.6, aGold) + tw * 1.2) * uPixelRatio * (10.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const pointFrag = /* glsl */ `
  uniform vec3 uNavy;
  uniform vec3 uGold;
  varying float vAlpha;
  varying float vGold;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.15, d) * vAlpha;
    gl_FragColor = vec4(mix(uNavy, uGold, vGold), a);
  }
`;

function DotMap() {
  const gl = useThree((s) => s.gl);
  const { geometry, material } = useMemo(() => {
    const pos: number[] = [];
    const rand: number[] = [];
    const gold: number[] = [];
    const step = 1.15;
    const hubs = [...Object.values(HUBS), ...CITIES.map((c) => [c[1], c[2]])];
    for (let lat = -36; lat <= 38; lat += step) {
      for (let lon = -18; lon <= 52; lon += step) {
        const jx = lon + (Math.random() - 0.5) * 0.25;
        const jy = lat + (Math.random() - 0.5) * 0.25;
        if (!isAfrica(jx, jy)) continue;
        const p = project(jx, jy);
        pos.push(p.x, p.y, (Math.random() - 0.5) * 0.06);
        rand.push(Math.random());
        const near = hubs.some(([x, y]) => Math.hypot(x - jx, y - jy) < 2.2);
        gold.push(near ? 1 : Math.random() < 0.025 ? 1 : 0);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("aRand", new THREE.Float32BufferAttribute(rand, 1));
    g.setAttribute("aGold", new THREE.Float32BufferAttribute(gold, 1));
    const m = new THREE.ShaderMaterial({
      vertexShader: pointVert,
      fragmentShader: pointFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.75) },
        uNavy: { value: NAVY_DOT },
        uGold: { value: GOLD },
      },
    });
    return { geometry: g, material: m };
  }, [gl]);

  useFrame((_, dt) => {
    material.uniforms.uTime.value += dt;
  });

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  return <points geometry={geometry} material={material} />;
}

type Arc = { curve: THREE.QuadraticBezierCurve3; line: THREE.Line; delay: number; pulse: THREE.Mesh; offset: number };

function Connections({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);
  const SEG = 72;

  const { arcs, nodes } = useMemo(() => {
    const lineMat = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false });
    const pulseGeo = new THREE.SphereGeometry(0.028, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: "#fff6dc", transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    const list: Arc[] = CITIES.map(([, lon, lat, hub], i) => {
      const a = project(HUBS[hub][0], HUBS[hub][1]);
      const b = project(lon, lat);
      const mid = a.clone().add(b).multiplyScalar(0.5);
      mid.z = a.distanceTo(b) * 0.55;
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(SEG));
      geo.setDrawRange(0, reduced ? SEG + 1 : 0);
      const line = new THREE.Line(geo, lineMat);
      const pulse = new THREE.Mesh(pulseGeo, pulseMat.clone());
      pulse.visible = false;
      return { curve, line, delay: 0.5 + i * 0.16, pulse, offset: Math.random() };
    });
    const nodeGeo = new THREE.RingGeometry(0.05, 0.065, 32);
    const nodeMat = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, side: THREE.DoubleSide, depthWrite: false });
    const coreGeo = new THREE.CircleGeometry(0.034, 24);
    const coreMat = new THREE.MeshBasicMaterial({ color: GOLD });
    const points = [...Object.values(HUBS), ...CITIES.map((c) => [c[1], c[2]] as const)];
    const nodeMeshes = points.map(([lon, lat], i) => {
      const g = new THREE.Group();
      g.position.copy(project(lon, lat));
      const ring = new THREE.Mesh(nodeGeo, nodeMat.clone());
      ring.userData.phase = i * 0.37;
      ring.userData.hub = i < 2;
      g.add(ring, new THREE.Mesh(coreGeo, coreMat));
      if (i < 2) g.scale.setScalar(1.6);
      return g;
    });
    return { arcs: list, nodes: nodeMeshes };
  }, [reduced]);

  useFrame((_, dt) => {
    t.current += dt;
    for (const arc of arcs) {
      const p = THREE.MathUtils.clamp((t.current - arc.delay) / 1.4, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (!reduced) arc.line.geometry.setDrawRange(0, Math.floor(eased * (SEG + 1)));
      if (p >= 1 && !reduced) {
        const k = (t.current * 0.22 + arc.offset) % 1;
        arc.pulse.visible = true;
        arc.pulse.position.copy(arc.curve.getPoint(k));
        (arc.pulse.material as THREE.MeshBasicMaterial).opacity = Math.sin(k * Math.PI);
      }
    }
    for (const n of nodes) {
      const ring = n.children[0] as THREE.Mesh;
      const k = ((t.current * 0.5 + ring.userData.phase) % 1.6) / 1.6;
      ring.scale.setScalar(1 + k * 2.2);
      (ring.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.7;
    }
  });

  return (
    <group ref={group}>
      {arcs.map((a, i) => (
        <group key={i}>
          <primitive object={a.line} />
          <primitive object={a.pulse} />
        </group>
      ))}
      {nodes.map((n, i) => (
        <primitive key={i} object={n} />
      ))}
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const camera = useThree((s) => s.camera);
  const aspect = useThree((s) => s.size.width / s.size.height);
  // Portrait screens: pull the camera back so the whole continent fits
  useEffect(() => {
    camera.position.z = aspect < 1 ? Math.min(18, 10.5 / Math.max(aspect, 0.55)) * 0.9 : 10.5;
    camera.updateProjectionMatrix();
  }, [aspect, camera]);
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const k = 1 - Math.pow(0.001, dt);
    // Mouse parallax (±4°) + slow breathing drift
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.18 + pointer.current.x * 0.07 + Math.sin(state.clock.elapsedTime * 0.15) * 0.03, k);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -0.22 + pointer.current.y * 0.05, k);
  });
  return (
    <group ref={ref} position={[0.95, 0.1, 0]} rotation={[-0.22, -0.18, 0.02]}>
      {children}
    </group>
  );
}

export default function HeroNetwork() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    const vis = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={reduced ? "demand" : visible ? "always" : "never"}
        camera={{ position: [0, 0, 10.5], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        aria-hidden
      >
        <Rig>
          <DotMap />
          <Connections reduced={reduced} />
        </Rig>
      </Canvas>
    </div>
  );
}
