"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 3000;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, sizes]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = arr[i3];
      const y = arr[i3 + 1];
      const z = arr[i3 + 2];

      const dist = Math.sqrt(x * x + y * y + z * z);
      const angle = time * 0.1 + dist * 0.05;

      arr[i3] += Math.sin(angle + i * 0.001) * 0.002;
      arr[i3 + 1] += Math.cos(angle + i * 0.001) * 0.002;
      arr[i3 + 2] += Math.sin(angle * 0.5 + i * 0.002) * 0.001;

      if (dist > 10) {
        arr[i3] *= 0.99;
        arr[i3 + 1] *= 0.99;
        arr[i3 + 2] *= 0.99;
      }
    }
    posAttr.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.02;
    meshRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#B08D57"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Connections() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(300 * 6);
    const colors = new Float32Array(300 * 6);

    for (let i = 0; i < 300; i++) {
      const i6 = i * 6;
      positions[i6] = (Math.random() - 0.5) * 12;
      positions[i6 + 1] = (Math.random() - 0.5) * 12;
      positions[i6 + 2] = (Math.random() - 0.5) * 12;
      positions[i6 + 3] = positions[i6] + (Math.random() - 0.5) * 4;
      positions[i6 + 4] = positions[i6 + 1] + (Math.random() - 0.5) * 4;
      positions[i6 + 5] = positions[i6 + 2] + (Math.random() - 0.5) * 4;

      const c = 0.4 + Math.random() * 0.3;
      colors[i6] = c;
      colors[i6 + 1] = c * 0.8;
      colors[i6 + 2] = c * 0.5;
      colors[i6 + 3] = c;
      colors[i6 + 4] = c * 0.8;
      colors[i6 + 5] = c * 0.5;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    lineRef.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial vertexColors transparent opacity={0.15} />
    </lineSegments>
  );
}

export default function GenesisScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.2} />
        <Particles />
        <Connections />
      </Canvas>
    </div>
  );
}
