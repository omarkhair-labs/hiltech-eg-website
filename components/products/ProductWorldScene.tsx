'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Props = {
  family:
    | 'fiber'
    | 'copper'
    | 'connectivity'
    | 'access'
    | 'rack'
    | 'pathways'
    | 'cctv';
};

const palette = {
  signal: 0x8ff257,
  cool: 0x8fb7ff,
  dark: 0x071008,
  mid: 0x395144,
};

function disposeObject(root: THREE.Object3D) {
  root.traverse((object) => {
    const renderable = object as THREE.Object3D & {
      geometry?: THREE.BufferGeometry;
      material?: THREE.Material | THREE.Material[];
    };
    renderable.geometry?.dispose();
    if (Array.isArray(renderable.material)) renderable.material.forEach((material) => material.dispose());
    else renderable.material?.dispose();
  });
}

export default function ProductWorldScene({ family }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const compact = window.matchMedia('(max-width: 767px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040705, compact ? 0.075 : 0.05);

    const camera = new THREE.PerspectiveCamera(compact ? 52 : 45, 1, 0.1, 70);
    camera.position.set(compact ? 0 : 0.8, 0.45, compact ? 8.8 : 9.6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !compact,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.04;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.1 : 1.45));
    renderer.setClearColor(0x040705, 0);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xdfffe5, 0x020403, 1.3));
    const signalLight = new THREE.PointLight(palette.signal, 22, 18, 2);
    signalLight.position.set(3.4, 2.1, 4.3);
    scene.add(signalLight);
    const coolLight = new THREE.PointLight(palette.cool, 8, 18, 2);
    coolLight.position.set(-4.5, 2.6, 2.2);
    scene.add(coolLight);

    const root = new THREE.Group();
    scene.add(root);

    const signalMaterial = new THREE.MeshStandardMaterial({
      color: 0x9cff67,
      emissive: 0x64ff2b,
      emissiveIntensity: 2.2,
      roughness: 0.26,
      metalness: 0.05,
    });
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x101713,
      emissive: 0x0a1b0e,
      emissiveIntensity: 0.45,
      roughness: 0.62,
      metalness: 0.48,
    });
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x577463,
      transparent: true,
      opacity: 0.55,
    });

    if (family === 'fiber') {
      const curves: THREE.CatmullRomCurve3[] = [];
      const count = compact ? 9 : 17;
      for (let index = 0; index < count; index += 1) {
        const spread = index / Math.max(1, count - 1) - 0.5;
        const points = [
          new THREE.Vector3(-6.5, spread * 3.6, Math.sin(index * 1.2) * 0.5),
          new THREE.Vector3(-3.2, spread * 2.2, 0.3),
          new THREE.Vector3(-0.4, spread * 0.9, -0.2),
          new THREE.Vector3(2.4, spread * 0.45, -0.35),
          new THREE.Vector3(4.2, spread * 0.2, -0.45),
        ];
        const curve = new THREE.CatmullRomCurve3(points);
        curves.push(curve);
        const active = index === Math.floor(count * 0.56);
        root.add(
          new THREE.Mesh(
            new THREE.TubeGeometry(curve, compact ? 70 : 110, active ? 0.055 : 0.018, active ? 8 : 5, false),
            active
              ? signalMaterial
              : new THREE.MeshBasicMaterial({
                  color: index % 4 === 0 ? palette.cool : 0x72937c,
                  transparent: true,
                  opacity: index % 4 === 0 ? 0.32 : 0.22,
                }),
          ),
        );
      }
      const activeCurve = curves[Math.floor(count * 0.56)];
      const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), signalMaterial);
      pulse.userData.curve = activeCurve;
      pulse.userData.motion = 'curve';
      root.add(pulse);

      const odf = new THREE.Mesh(new THREE.BoxGeometry(2.5, 3.5, 1.2), darkMaterial);
      odf.position.set(4.8, 0, -0.5);
      root.add(odf);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(odf.geometry), lineMaterial);
      edges.position.copy(odf.position);
      root.add(edges);
    }

    if (family === 'copper') {
      const pairColors = [0x6fa2ff, 0xffffff, 0x60c06c, 0xf4f4f4, 0xe9a443, 0xf4f4f4, 0x9a6cff, 0xf4f4f4];
      for (let pair = 0; pair < 4; pair += 1) {
        for (let wire = 0; wire < 2; wire += 1) {
          const points: THREE.Vector3[] = [];
          for (let step = 0; step < 40; step += 1) {
            const t = step / 39;
            const angle = t * Math.PI * 7 + wire * Math.PI;
            points.push(
              new THREE.Vector3(
                THREE.MathUtils.lerp(-5.8, 4.3, t),
                (pair - 1.5) * 0.72 + Math.sin(angle) * 0.16,
                Math.cos(angle) * 0.16 + (pair % 2 ? 0.15 : -0.15),
              ),
            );
          }
          const curve = new THREE.CatmullRomCurve3(points);
          root.add(
            new THREE.Mesh(
              new THREE.TubeGeometry(curve, 110, 0.055, 7, false),
              new THREE.MeshStandardMaterial({
                color: pairColors[pair * 2 + wire],
                roughness: 0.55,
                metalness: 0.04,
              }),
            ),
          );
        }
      }
      const jacket = new THREE.Mesh(
        new THREE.CylinderGeometry(0.78, 0.78, 3.2, 32, 1, true),
        new THREE.MeshStandardMaterial({
          color: 0x202a22,
          transparent: true,
          opacity: 0.72,
          roughness: 0.72,
          side: THREE.DoubleSide,
        }),
      );
      jacket.rotation.z = Math.PI / 2;
      jacket.position.x = 4.4;
      root.add(jacket);
    }

    if (family === 'connectivity') {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(5.8, 2.2, 0.5), darkMaterial);
      panel.position.set(0.5, 0.4, -1.2);
      root.add(panel);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(panel.geometry), lineMaterial);
      edges.position.copy(panel.position);
      root.add(edges);

      for (let row = 0; row < 2; row += 1) {
        for (let col = 0; col < 8; col += 1) {
          const active = row === 0 && col === 5;
          const port = new THREE.Mesh(
            new THREE.BoxGeometry(0.42, 0.3, 0.14),
            active ? signalMaterial : darkMaterial.clone(),
          );
          port.position.set(-1.9 + col * 0.63, 0.72 - row * 0.66, -0.92);
          root.add(port);
        }
      }

      for (let index = 0; index < 6; index += 1) {
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-5.2, -1.8 + index * 0.38, 0.5),
          new THREE.Vector3(-2.7, -1.1 + index * 0.2, 0),
          new THREE.Vector3(-0.7 + index * 0.62, 0.72 - (index % 2) * 0.66, -0.7),
        ]);
        root.add(
          new THREE.Mesh(
            new THREE.TubeGeometry(curve, 70, index === 4 ? 0.045 : 0.024, 6, false),
            index === 4 ? signalMaterial : new THREE.MeshBasicMaterial({ color: 0x718a78 }),
          ),
        );
      }
    }

    if (family === 'access') {
      const plate = new THREE.Mesh(new THREE.BoxGeometry(4.8, 4.8, 0.45), new THREE.MeshStandardMaterial({
        color: 0xe7ece7,
        roughness: 0.78,
        metalness: 0.02,
      }));
      plate.position.z = -1.1;
      root.add(plate);

      for (let index = 0; index < 4; index += 1) {
        const accessModule = new THREE.Mesh(
          new THREE.BoxGeometry(1.25, 1.6, 0.38),
          index === 2 ? signalMaterial : darkMaterial,
        );
        accessModule.position.set(index % 2 ? 0.85 : -0.85, index < 2 ? 0.95 : -0.95, -0.76);
        root.add(accessModule);
      }
    }

    if (family === 'rack') {
      const positions = [-2.2, 0, 2.2];
      positions.forEach((x, rackIndex) => {
        const rack = new THREE.Mesh(new THREE.BoxGeometry(1.6, 4.8, 1.8), darkMaterial.clone());
        rack.position.set(x, 0.2, -1.1 - rackIndex * 0.22);
        root.add(rack);
        const edge = new THREE.LineSegments(new THREE.EdgesGeometry(rack.geometry), lineMaterial);
        edge.position.copy(rack.position);
        root.add(edge);

        for (let unit = 0; unit < 10; unit += 1) {
          const active = rackIndex === 1 && unit === 6;
          const bar = new THREE.Mesh(
            new THREE.BoxGeometry(1.18, 0.13, 0.12),
            active ? signalMaterial : new THREE.MeshBasicMaterial({ color: 0x475c4e }),
          );
          bar.position.set(x, -1.7 + unit * 0.37, -0.14 - rackIndex * 0.22);
          root.add(bar);
        }
      });
      const floor = new THREE.GridHelper(14, 24, 0x31533b, 0x132017);
      floor.position.y = -2.25;
      root.add(floor);
    }

    if (family === 'pathways') {
      const routeMaterial = new THREE.MeshStandardMaterial({
        color: 0x202923,
        roughness: 0.76,
        metalness: 0.2,
      });
      const paths = [
        [[-5, 1.6], [-2.2, 1.6], [-2.2, -0.4], [0.7, -0.4], [0.7, 1.2], [4.8, 1.2]],
        [[-5, -1.6], [-3.1, -1.6], [-3.1, 0.25], [2.1, 0.25], [2.1, -1.2], [4.8, -1.2]],
      ];
      paths.forEach((route, routeIndex) => {
        for (let index = 0; index < route.length - 1; index += 1) {
          const [x1, y1] = route[index];
          const [x2, y2] = route[index + 1];
          const horizontal = y1 === y2;
          const length = Math.hypot(x2 - x1, y2 - y1);
          const duct = new THREE.Mesh(
            new THREE.BoxGeometry(horizontal ? length : 0.58, horizontal ? 0.58 : length, 0.72),
            routeIndex === 0 && index === 4 ? signalMaterial : routeMaterial,
          );
          duct.position.set((x1 + x2) / 2, (y1 + y2) / 2, -0.9);
          root.add(duct);
        }
      });
    }

    if (family === 'cctv') {
      const room = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(8.2, 4.6, 5.6)),
        lineMaterial,
      );
      room.position.z = -2.2;
      root.add(room);

      const cameras = [
        [-3.2, 1.6, -0.2, 0.65],
        [3.2, 1.6, -0.2, -0.65],
        [-3.2, -1.2, -0.2, 0.35],
        [3.2, -1.2, -0.2, -0.35],
      ];
      cameras.forEach(([x, y, z, rot], index) => {
        const cameraBody = new THREE.Mesh(
          new THREE.CylinderGeometry(0.24, 0.34, 0.85, 18),
          index === 1 ? signalMaterial : darkMaterial,
        );
        cameraBody.rotation.z = Math.PI / 2;
        cameraBody.rotation.y = rot;
        cameraBody.position.set(x, y, z);
        root.add(cameraBody);

        const cone = new THREE.Mesh(
          new THREE.ConeGeometry(1.25, 3.4, 28, 1, true),
          new THREE.MeshBasicMaterial({
            color: index === 1 ? palette.signal : 0x476452,
            transparent: true,
            opacity: index === 1 ? 0.12 : 0.06,
            side: THREE.DoubleSide,
          }),
        );
        cone.rotation.z = Math.PI / 2;
        cone.rotation.y = rot;
        cone.position.set(x + Math.cos(rot) * 1.6, y, z - 0.4);
        root.add(cone);
      });
    }

    const frame = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(12, 6.8, 6.2)),
      new THREE.LineBasicMaterial({
        color: 0x1c2c21,
        transparent: true,
        opacity: 0.35,
      }),
    );
    frame.position.z = -1.8;
    root.add(frame);

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let animationFrame = 0;
    const render = () => {
      const now = performance.now() * 0.001;
      if (!reduced) {
        root.rotation.y = Math.sin(now * 0.18) * 0.08;
        root.rotation.x = Math.sin(now * 0.14) * 0.018;

        root.traverse((object) => {
          if (object.userData.motion === 'curve' && object.userData.curve) {
            const curve = object.userData.curve as THREE.CatmullRomCurve3;
            object.position.copy(curve.getPointAt((now * 0.12) % 1));
          }
        });

        signalLight.intensity = 20 + Math.sin(now * 3.2) * 2.5;
      }

      camera.lookAt(new THREE.Vector3(0, 0, -1.1));
      renderer.render(scene, camera);
      if (!reduced) animationFrame = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      disposeObject(root);
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [family]);

  return <div ref={mountRef} className="hiltech-product-world-canvas" aria-hidden="true" />;
}
