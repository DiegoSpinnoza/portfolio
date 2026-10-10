import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function disposeModel(root) {
  root.traverse((object) => {
    object.geometry?.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.filter(Boolean).forEach((material) => {
      Object.values(material).forEach((value) => {
        if (value?.isTexture) value.dispose();
      });
      material.dispose();
    });
  });
}

export default function HumanModel({ onOpen }) {
  const mountRef = React.useRef(null);
  const pointerStartRef = React.useRef(null);
  const draggedRef = React.useRef(false);
  const [loadFailed, setLoadFailed] = React.useState(false);

  React.useEffect(() => {
    const element = mountRef.current;
    if (!element) return undefined;

    let disposed = false;
    let model = null;
    let frameId = 0;
    let renderer;
    let controls;

    try {
      const scene = new THREE.Scene();
      const width = element.clientWidth || 1;
      const height = element.clientHeight || 1;
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
      camera.position.set(0, 0.5, 5);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      element.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.07;
      controls.enableZoom = false;
      controls.enablePan = false;

      scene.add(new THREE.HemisphereLight(0xf2eee5, 0x242027, 1.7));

      const keyLight = new THREE.DirectionalLight(0xfff4df, 3.1);
      keyLight.position.set(4, 6, 5);
      scene.add(keyLight);

      const rimLight = new THREE.PointLight(0x7775ff, 9, 12);
      rimLight.position.set(-3, 1.2, 2.5);
      scene.add(rimLight);

      const loader = new GLTFLoader();
      loader.load(
        "/models/bdat-human.glb",
        (gltf) => {
          if (disposed) {
            disposeModel(gltf.scene);
            return;
          }

          model = gltf.scene;
          const bounds = new THREE.Box3().setFromObject(model);
          const center = bounds.getCenter(new THREE.Vector3());
          const size = bounds.getSize(new THREE.Vector3());
          model.position.sub(center);
          scene.add(model);

          const maxDimension = Math.max(size.x, size.y, size.z, 0.01);
          const fovRadians = THREE.MathUtils.degToRad(camera.fov);
          const cameraDistance = (maxDimension / (2 * Math.tan(fovRadians / 2))) * 1.32;
          camera.position.set(0, size.y * 0.04, cameraDistance);
          camera.near = Math.max(cameraDistance / 100, 0.01);
          camera.far = cameraDistance * 100;
          camera.updateProjectionMatrix();
          controls.target.set(0, 0, 0);
          controls.update();
        },
        undefined,
        () => {
          if (!disposed) setLoadFailed(true);
        }
      );

      const resizeObserver = new ResizeObserver(() => {
        if (disposed) return;
        const nextWidth = element.clientWidth || 1;
        const nextHeight = element.clientHeight || 1;
        camera.aspect = nextWidth / nextHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(nextWidth, nextHeight);
      });
      resizeObserver.observe(element);

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const animate = () => {
        if (disposed) return;
        frameId = window.requestAnimationFrame(animate);
        if (model && !reduceMotion) model.rotation.y += 0.002;
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        disposed = true;
        window.cancelAnimationFrame(frameId);
        resizeObserver.disconnect();
        controls.dispose();
        if (model) disposeModel(model);
        renderer.dispose();
        renderer.forceContextLoss();
        if (element.contains(renderer.domElement)) element.removeChild(renderer.domElement);
      };
    } catch {
      setLoadFailed(true);
      return () => {
        disposed = true;
        if (frameId) window.cancelAnimationFrame(frameId);
        controls?.dispose();
        renderer?.dispose();
        if (renderer && element.contains(renderer.domElement)) element.removeChild(renderer.domElement);
      };
    }
  }, []);

  const handlePointerDown = (event) => {
    pointerStartRef.current = [event.clientX, event.clientY];
    draggedRef.current = false;
  };

  const handlePointerMove = (event) => {
    if (!pointerStartRef.current) return;
    const dx = event.clientX - pointerStartRef.current[0];
    const dy = event.clientY - pointerStartRef.current[1];
    if (Math.hypot(dx, dy) > 5) draggedRef.current = true;
  };

  const handleClick = () => {
    if (!draggedRef.current) onOpen?.();
    draggedRef.current = false;
    pointerStartRef.current = null;
  };

  return (
    <div
      ref={mountRef}
      className={`bdat-human-model${loadFailed ? " is-fallback" : ""}`}
      role="button"
      tabIndex={0}
      aria-label="Modelo 3D de BDAT. Arrastra para girarlo o pulsa para ver los detalles del proyecto."
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={() => { pointerStartRef.current = null; }}
      onPointerCancel={() => { pointerStartRef.current = null; }}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen?.();
        }
      }}
    >
      {loadFailed ? <img src="/images/bdat-home.png" alt="Vista previa de BDAT" /> : null}
      <span className="bdat-model-title">BDAT</span>
    </div>
  );
}
