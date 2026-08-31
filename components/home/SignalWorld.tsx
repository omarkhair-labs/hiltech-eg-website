'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  rootId: string;
};

export default function SignalWorld({ rootId }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const root = document.getElementById(rootId);
    if (!mount || !root) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCompact = window.matchMedia('(max-width: 767px)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050806, isCompact ? 0.065 : 0.045);

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 80);
    camera.position.set(isCompact ? 0.2 : 1.4, 1.2, isCompact ? 10.5 : 11.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isCompact,
      alpha: true,
      powerPreference: 'high-performance',
    });

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCompact ? 1.2 : 1.65));
    renderer.setClearColor(0x050806, 0);
    mount.appendChild(renderer.domElement);

    const world = new THREE.Group();
    scene.add(world);

    const graphite = new THREE.MeshStandardMaterial({
      color: 0x0c1210,
      roughness: 0.82,
      metalness: 0.35,
    });
    const edge = new THREE.MeshStandardMaterial({
      color: 0x151c18,
      emissive: 0x0b1d11,
      emissiveIntensity: 0.65,
      roughness: 0.55,
      metalness: 0.65,
    });
    const signalMaterial = new THREE.MeshStandardMaterial({
      color: 0x96ff59,
      emissive: 0x65ff2e,
      emissiveIntensity: 2.4,
      roughness: 0.25,
      metalness: 0.15,
    });

    const ambient = new THREE.HemisphereLight(0xc7ffd5, 0x050806, 1.2);
    scene.add(ambient);
    const key = new THREE.PointLight(0x8dff5a, 22, 24, 2);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0x7fb6ff, 10, 18, 2);
    rim.position.set(-6, 2, -2);
    scene.add(rim);

    const nodeGeometry = new THREE.BoxGeometry(1, 0.34, 1.5);
    const rackGeometry = new THREE.BoxGeometry(1.2, 3.4, 1.45);

    const nodes: THREE.Mesh[] = [];
    const nodePositions = [
      [-4.8, -1.5, 0.5],
      [-2.8, -0.7, -0.4],
      [-0.8, -1.2, 0.4],
      [1.3, -0.5, -0.6],
      [3.4, -1.1, 0.3],
      [5.1, -0.4, -0.8],
    ] as const;

    nodePositions.forEach(([x, y, z], index) => {
      const node = new THREE.Mesh(nodeGeometry, index === 3 ? edge : graphite);
      node.position.set(x, y, z);
      node.rotation.y = (index % 2 ? -1 : 1) * 0.12;
      world.add(node);
      nodes.push(node);
    });

    const rack = new THREE.Mesh(rackGeometry, edge);
    rack.position.set(1.45, 0.95, -0.75);
    world.add(rack);

    const portGeometry = new THREE.BoxGeometry(0.12, 0.06, 0.05);
    const ports = new THREE.InstancedMesh(portGeometry, signalMaterial, 42);
    const matrix = new THREE.Matrix4();
    for (let i = 0; i < 42; i += 1) {
      const col = i % 6;
      const row = Math.floor(i / 6);
      matrix.makeTranslation(
        0.98 + col * 0.17,
        -0.25 + row * 0.32,
        0.0,
      );
      ports.setMatrixAt(i, matrix);
    }
    ports.position.z = 0.02;
    world.add(ports);

    const routePoints = [
      new THREE.Vector3(-6.2, -1.9, 1.2),
      new THREE.Vector3(-4.1, -1.25, 0.55),
      new THREE.Vector3(-2.2, -0.35, 0.15),
      new THREE.Vector3(-0.2, -0.9, 0.35),
      new THREE.Vector3(1.45, 0.1, -0.55),
      new THREE.Vector3(3.5, -0.55, 0.25),
      new THREE.Vector3(6.4, -0.35, -0.65),
    ];
    const mainCurve = new THREE.CatmullRomCurve3(routePoints);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(mainCurve, 180, isCompact ? 0.028 : 0.045, 8, false),
      new THREE.MeshBasicMaterial({
        color: 0x8bff55,
        transparent: true,
        opacity: 0.86,
      }),
    );
    world.add(tube);

    const secondaryCurves: THREE.Mesh[] = [];
    for (let route = 0; route < (isCompact ? 4 : 8); route += 1) {
      const offset = (route - 3.5) * 0.12;
      const curve = new THREE.CatmullRomCurve3(
        routePoints.map((point, index) => new THREE.Vector3(
          point.x,
          point.y + offset * (0.45 + index * 0.07),
          point.z + offset,
        )),
      );
      const mesh = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 120, 0.012, 6, false),
        new THREE.MeshBasicMaterial({
          color: route % 3 === 0 ? 0xb7d4ff : 0x58d835,
          transparent: true,
          opacity: route % 3 === 0 ? 0.22 : 0.28,
        }),
      );
      world.add(mesh);
      secondaryCurves.push(mesh);
    }

    const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), signalMaterial);
    world.add(pulse);

    const grid = new THREE.GridHelper(22, 42, 0x1d3823, 0x0d1711);
    grid.position.y = -2.2;
    const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.36;
    });
    world.add(grid);

    const progress = { value: 0 };
    let frame = 0;

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };
    resize();

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top top+=64',
      end: 'bottom bottom',
      scrub: 0.65,
      onUpdate: (self) => {
        progress.value = self.progress;
      },
    });

    const render = () => {
      const t = performance.now() * 0.001;
      const p = prefersReducedMotion ? 0.15 : progress.value;
      const chapter = Math.min(1, Math.max(0, p));

      world.rotation.y = THREE.MathUtils.lerp(-0.1, 0.34, chapter);
      world.rotation.x = THREE.MathUtils.lerp(-0.04, 0.08, chapter);

      if (chapter < 0.34) {
        const local = chapter / 0.34;
        camera.position.x = THREE.MathUtils.lerp(isCompact ? 0.2 : 1.4, 0.3, local);
        camera.position.y = THREE.MathUtils.lerp(1.2, 0.15, local);
        camera.position.z = THREE.MathUtils.lerp(isCompact ? 10.5 : 11.8, 7.2, local);
      } else if (chapter < 0.68) {
        const local = (chapter - 0.34) / 0.34;
        camera.position.x = THREE.MathUtils.lerp(0.3, -1.8, local);
        camera.position.y = THREE.MathUtils.lerp(0.15, -0.55, local);
        camera.position.z = THREE.MathUtils.lerp(7.2, 5.5, local);
      } else {
        const local = (chapter - 0.68) / 0.32;
        camera.position.x = THREE.MathUtils.lerp(-1.8, 0.1, local);
        camera.position.y = THREE.MathUtils.lerp(-0.55, 1.65, local);
        camera.position.z = THREE.MathUtils.lerp(5.5, isCompact ? 10.6 : 13.8, local);
      }

      camera.lookAt(0.4, -0.35, 0);

      const pulseProgress = prefersReducedMotion ? 0.48 : (t * 0.12 + chapter * 1.35) % 1;
      pulse.position.copy(mainCurve.getPointAt(pulseProgress));
      const pulseScale = 0.82 + Math.sin(t * 4.2) * 0.16;
      pulse.scale.setScalar(pulseScale);

      nodes.forEach((node, index) => {
        const breathe = 1 + Math.sin(t * 0.8 + index) * 0.012;
        node.scale.y = breathe;
      });

      renderer.render(scene, camera);
      if (!prefersReducedMotion) frame = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      trigger.kill();
      window.removeEventListener('resize', onResize);
      if (frame) window.cancelAnimationFrame(frame);

      world.traverse((object) => {
        const renderable = object as THREE.Object3D & {
          geometry?: THREE.BufferGeometry;
          material?: THREE.Material | THREE.Material[];
        };
        renderable.geometry?.dispose();
        if (Array.isArray(renderable.material)) renderable.material.forEach((material) => material.dispose());
        else renderable.material?.dispose();
      });

      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [rootId]);

  return <div ref={mountRef} className="hiltech-world-canvas" aria-hidden="true" />;
}
