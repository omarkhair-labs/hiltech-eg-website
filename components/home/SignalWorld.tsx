'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  rootId: string;
};

function setMaterialOpacity(materials: THREE.Material[], opacity: number) {
  materials.forEach((material) => {
    material.opacity = opacity;
    material.transparent = opacity < 0.999;
  });
}

export default function SignalWorld({ rootId }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const root = document.getElementById(rootId);
    if (!mount || !root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 767px)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030604, compact ? 0.078 : 0.048);

    const camera = new THREE.PerspectiveCamera(compact ? 52 : 46, 1, 0.1, 90);
    camera.position.set(compact ? 0.15 : 0.9, 0.55, compact ? 9.8 : 9.3);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !compact,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.15 : 1.55));
    renderer.setClearColor(0x030604, 0);
    mount.appendChild(renderer.domElement);

    const worldRoot = new THREE.Group();
    scene.add(worldRoot);

    const fiberGroup = new THREE.Group();
    const terminationGroup = new THREE.Group();
    const systemGroup = new THREE.Group();
    worldRoot.add(fiberGroup, terminationGroup, systemGroup);

    const ambient = new THREE.HemisphereLight(0xd9ffe4, 0x020403, 1.35);
    scene.add(ambient);

    const signalLight = new THREE.PointLight(0x8ff257, 24, 20, 2);
    signalLight.position.set(2.7, 1.4, 4.5);
    scene.add(signalLight);

    const coolRim = new THREE.PointLight(0x8fb7ff, 9, 22, 2);
    coolRim.position.set(-5.5, 2.7, 1.4);
    scene.add(coolRim);

    const activeFiberMaterial = new THREE.MeshBasicMaterial({
      color: 0x9cff63,
      transparent: true,
      opacity: 0.96,
    });

    const passiveFiberMaterials: THREE.MeshBasicMaterial[] = [];
    const fiberCurves: THREE.CatmullRomCurve3[] = [];

    const strandCount = compact ? 11 : 22;
    for (let index = 0; index < strandCount; index += 1) {
      const normalized = index / (strandCount - 1);
      const spread = normalized - 0.5;
      const vertical = spread * (compact ? 2.8 : 4.2);
      const depth = Math.sin(index * 1.73) * (compact ? 0.72 : 1.2);
      const endY = spread * 1.45;

      const points = [
        new THREE.Vector3(-8.2, vertical * 1.15, depth + 1.1),
        new THREE.Vector3(-5.8, vertical * 0.8, depth * 0.8 + 0.65),
        new THREE.Vector3(-3.1, vertical * 0.5, depth * 0.45 + 0.15),
        new THREE.Vector3(-0.6, vertical * 0.25, depth * 0.2 - 0.1),
        new THREE.Vector3(2.3, endY * 0.35, -0.28),
        new THREE.Vector3(3.35, endY * 0.12, -0.42),
      ];

      const curve = new THREE.CatmullRomCurve3(points);
      fiberCurves.push(curve);

      const isActive = index === Math.floor(strandCount * 0.55);
      const material = isActive
        ? activeFiberMaterial
        : new THREE.MeshBasicMaterial({
            color: index % 4 === 0 ? 0xa9c9ff : 0x78a384,
            transparent: true,
            opacity: index % 4 === 0 ? 0.3 : 0.22,
          });

      if (!isActive) passiveFiberMaterials.push(material);

      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(
          curve,
          compact ? 90 : 150,
          isActive ? (compact ? 0.052 : 0.072) : (compact ? 0.018 : 0.027),
          isActive ? 8 : 6,
          false,
        ),
        material,
      );
      fiberGroup.add(tube);
    }

    const activeCurve = fiberCurves[Math.floor(strandCount * 0.55)];

    const pulseMaterial = new THREE.MeshStandardMaterial({
      color: 0xc2ff9e,
      emissive: 0x74ff34,
      emissiveIntensity: 3.4,
      roughness: 0.16,
      metalness: 0.05,
    });
    const pulse = new THREE.Mesh(new THREE.SphereGeometry(compact ? 0.09 : 0.12, 18, 18), pulseMaterial);
    fiberGroup.add(pulse);

    const terminationShell = new THREE.Mesh(
      new THREE.BoxGeometry(compact ? 2.2 : 2.7, compact ? 3.2 : 3.8, 1.4),
      new THREE.MeshStandardMaterial({
        color: 0x090e0b,
        roughness: 0.64,
        metalness: 0.58,
        emissive: 0x0c2b13,
        emissiveIntensity: 1.05,
        transparent: true,
        opacity: 0.97,
      }),
    );
    terminationShell.position.set(4.55, 0.05, -0.62);
    terminationShell.rotation.y = -0.1;
    terminationGroup.add(terminationShell);

    const terminationEdge = new THREE.LineSegments(
      new THREE.EdgesGeometry(terminationShell.geometry),
      new THREE.LineBasicMaterial({
        color: 0x6c9f79,
        transparent: true,
        opacity: 0.72,
      }),
    );
    terminationEdge.position.copy(terminationShell.position);
    terminationEdge.rotation.copy(terminationShell.rotation);
    terminationGroup.add(terminationEdge);

    const connectorShell = new THREE.Mesh(
      new THREE.CylinderGeometry(0.34, 0.34, 1.6, 32, 1, false),
      new THREE.MeshStandardMaterial({
        color: 0x111a14,
        roughness: 0.42,
        metalness: 0.78,
        emissive: 0x0b2010,
        emissiveIntensity: 0.72,
      }),
    );
    connectorShell.rotation.z = Math.PI / 2;
    connectorShell.position.set(3.48, 0.02, -0.47);
    terminationGroup.add(connectorShell);

    const connectorCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.105, 0.105, 1.82, 24, 1, false),
      new THREE.MeshStandardMaterial({
        color: 0xbaff91,
        emissive: 0x6dff32,
        emissiveIntensity: 3.6,
        roughness: 0.18,
        metalness: 0.06,
      }),
    );
    connectorCore.rotation.z = Math.PI / 2;
    connectorCore.position.set(3.45, 0.02, -0.47);
    terminationGroup.add(connectorCore);

    const connectorRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.39, 0.035, 12, 36),
      new THREE.MeshBasicMaterial({
        color: 0x8ff257,
        transparent: true,
        opacity: 0.55,
      }),
    );
    connectorRing.rotation.y = Math.PI / 2;
    connectorRing.position.set(2.66, 0.02, -0.47);
    terminationGroup.add(connectorRing);

    const portGeometry = new THREE.BoxGeometry(0.24, 0.11, 0.07);
    const portMaterial = new THREE.MeshStandardMaterial({
      color: 0x141d17,
      roughness: 0.5,
      metalness: 0.55,
      emissive: 0x0d1c10,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.96,
    });
    const activePortMaterial = new THREE.MeshStandardMaterial({
      color: 0x93ff58,
      emissive: 0x65ff2c,
      emissiveIntensity: 2.6,
      roughness: 0.24,
      metalness: 0.08,
    });

    for (let row = 0; row < 9; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        const active = row === 4 && col === 1;
        const port = new THREE.Mesh(portGeometry, active ? activePortMaterial : portMaterial);
        port.position.set(
          3.47 + col * 0.39,
          -1.24 + row * 0.31,
          -1.41,
        );
        terminationGroup.add(port);
      }
    }

    const rackMaterial = new THREE.MeshStandardMaterial({
      color: 0x101713,
      roughness: 0.73,
      metalness: 0.62,
      transparent: true,
      opacity: 0,
    });
    const rackEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0x496052,
      transparent: true,
      opacity: 0,
    });

    const rackPositions = [
      [-4.8, 0.5, -5.6],
      [-2.6, 0.5, -5.9],
      [-0.4, 0.5, -6.2],
      [1.8, 0.5, -6.0],
      [4.0, 0.5, -5.7],
      [-3.7, 0.5, -9.0],
      [-1.4, 0.5, -9.2],
      [0.9, 0.5, -9.1],
      [3.2, 0.5, -8.8],
    ] as const;

    rackPositions.slice(0, compact ? 5 : rackPositions.length).forEach(([x, y, z], index) => {
      const geometry = new THREE.BoxGeometry(1.3, 4.2, 1.5);
      const rack = new THREE.Mesh(geometry, rackMaterial);
      rack.position.set(x, y + (index % 2) * 0.08, z);
      systemGroup.add(rack);

      const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), rackEdgeMaterial);
      edge.position.copy(rack.position);
      systemGroup.add(edge);
    });

    const floor = new THREE.GridHelper(26, 36, 0x294431, 0x0c1710);
    floor.position.set(0, -1.62, -6.5);
    const floorMaterials = Array.isArray(floor.material) ? floor.material : [floor.material];
    floorMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0;
    });
    systemGroup.add(floor);

    const allTerminationMaterials = [
      terminationShell.material as THREE.Material,
      terminationEdge.material as THREE.Material,
      portMaterial,
    ];

    const progress = { value: 0 };
    let animationFrame = 0;

    const resize = () => {
      const width = mount.clientWidth;
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener('resize', resize);

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
      const now = performance.now() * 0.001;
      const chapter = reduced ? 0.08 : THREE.MathUtils.clamp(progress.value, 0, 1);

      if (chapter < 0.34) {
        const local = chapter / 0.34;
        camera.position.x = THREE.MathUtils.lerp(compact ? 0.1 : 0.9, -0.35, local);
        camera.position.y = THREE.MathUtils.lerp(0.55, 0.15, local);
        camera.position.z = THREE.MathUtils.lerp(compact ? 9.8 : 9.3, compact ? 7.5 : 6.5, local);
        worldRoot.rotation.y = THREE.MathUtils.lerp(-0.06, 0.08, local);
        worldRoot.rotation.x = THREE.MathUtils.lerp(-0.03, 0.025, local);

        setMaterialOpacity(passiveFiberMaterials, THREE.MathUtils.lerp(0.22, 0.36, local));
        setMaterialOpacity(allTerminationMaterials, THREE.MathUtils.lerp(0.94, 0.72, local));
        rackMaterial.opacity = 0;
        rackEdgeMaterial.opacity = 0;
        floorMaterials.forEach((material) => { material.opacity = 0; });
        systemGroup.scale.setScalar(0.82);
      } else if (chapter < 0.68) {
        const local = (chapter - 0.34) / 0.34;
        camera.position.x = THREE.MathUtils.lerp(-0.35, -2.3, local);
        camera.position.y = THREE.MathUtils.lerp(0.15, -0.35, local);
        camera.position.z = THREE.MathUtils.lerp(compact ? 7.5 : 6.5, compact ? 5.9 : 4.7, local);
        worldRoot.rotation.y = THREE.MathUtils.lerp(0.08, 0.23, local);

        setMaterialOpacity(passiveFiberMaterials, THREE.MathUtils.lerp(0.36, 0.44, local));
        setMaterialOpacity(allTerminationMaterials, THREE.MathUtils.lerp(0.72, 0.3, local));
        rackMaterial.opacity = 0;
        rackEdgeMaterial.opacity = 0;
        floorMaterials.forEach((material) => { material.opacity = 0; });
      } else {
        const local = (chapter - 0.68) / 0.32;
        camera.position.x = THREE.MathUtils.lerp(-2.3, compact ? 0.4 : 1.25, local);
        camera.position.y = THREE.MathUtils.lerp(-0.35, compact ? 1.1 : 2.35, local);
        camera.position.z = THREE.MathUtils.lerp(compact ? 5.9 : 4.7, compact ? 12.4 : 15.2, local);
        worldRoot.rotation.y = THREE.MathUtils.lerp(0.23, -0.04, local);
        worldRoot.rotation.x = THREE.MathUtils.lerp(0.025, 0.09, local);

        setMaterialOpacity(passiveFiberMaterials, THREE.MathUtils.lerp(0.44, 0.1, local));
        setMaterialOpacity(allTerminationMaterials, THREE.MathUtils.lerp(0.3, 0.12, local));
        rackMaterial.opacity = THREE.MathUtils.lerp(0, 0.82, local);
        rackEdgeMaterial.opacity = THREE.MathUtils.lerp(0, 0.42, local);
        floorMaterials.forEach((material) => {
          material.opacity = THREE.MathUtils.lerp(0, 0.38, local);
        });
        const scale = THREE.MathUtils.lerp(0.82, 1, local);
        systemGroup.scale.setScalar(scale);
      }

      camera.lookAt(chapter < 0.68 ? new THREE.Vector3(0.8, -0.1, -0.45) : new THREE.Vector3(0, 0, -6.7));

      const travel = reduced ? 0.62 : (now * 0.11 + chapter * 1.42) % 1;
      pulse.position.copy(activeCurve.getPointAt(travel));
      const pulseScale = 0.82 + Math.sin(now * 5.2) * 0.18;
      pulse.scale.setScalar(pulseScale);
      signalLight.position.copy(pulse.position).add(new THREE.Vector3(0.4, 0.5, 2.4));
      signalLight.intensity = 20 + Math.sin(now * 4.8) * 3.5;

      activeFiberMaterial.opacity = 0.78 + Math.sin(now * 2.4) * 0.1;
      terminationGroup.rotation.z = Math.sin(now * 0.22) * 0.008;

      renderer.render(scene, camera);
      if (!reduced) animationFrame = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      trigger.kill();
      window.removeEventListener('resize', resize);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);

      worldRoot.traverse((object) => {
        const renderable = object as THREE.Object3D & {
          geometry?: THREE.BufferGeometry;
          material?: THREE.Material | THREE.Material[];
        };
        renderable.geometry?.dispose();
        if (Array.isArray(renderable.material)) {
          renderable.material.forEach((material) => material.dispose());
        } else {
          renderable.material?.dispose();
        }
      });

      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [rootId]);

  return <div ref={mountRef} className="hiltech-world-canvas" aria-hidden="true" />;
}
