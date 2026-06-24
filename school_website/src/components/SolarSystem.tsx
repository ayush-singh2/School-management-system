"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const IMG = "/assets/solar/images/";

/**
 * Realistic 3D solar system used as the hero background.
 * Ported from github.com/N3rson/Solar-System-3D (MIT) — visuals only:
 * GUI, info panels, click-to-zoom and orbit controls removed; runs as a
 * non-interactive animated backdrop with a subtle mouse parallax.
 */
export default function SolarSystem() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      canvas.style.display = "none";
      return;
    }
    // transparent until the scene/skybox loads, so the hero's dark
    // background shows through (no black or old-animation flash)
    renderer.setClearColor(0x000000, 0);
    const W = wrap.clientWidth || window.innerWidth;
    const H = wrap.clientHeight || window.innerHeight;
    const isMobile = W < 768;
    // lower DPR on phones to keep it smooth
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setSize(W, H, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(-175, 115, 5);
    // on phones, aim higher so the system (and bright sun) sits LOWER on
    // screen, away from the centered hero text
    const lookY = isMobile ? 58 : 0;
    camera.lookAt(0, lookY, 0);

    const loadTexture = new THREE.TextureLoader();
    const cubeTextureLoader = new THREE.CubeTextureLoader();

    // postprocessing — bloom for the glowing sun
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), isMobile ? 0.5 : 1, 0.4, 0.85);
    bloom.threshold = 1;
    bloom.radius = 0.9;
    composer.addPass(bloom);
    composer.setSize(W, H);

    scene.add(new THREE.AmbientLight(0x222222, 6));

    // star skybox — applied only once loaded, so the canvas stays
    // transparent (dark hero bg visible) instead of flashing black
    cubeTextureLoader.load(
      [
        IMG + "3.jpg",
        IMG + "1.jpg",
        IMG + "2.jpg",
        IMG + "2.jpg",
        IMG + "4.jpg",
        IMG + "2.jpg",
      ],
      (cube) => {
        scene.background = cube;
      },
    );

    const settings = {
      accelerationOrbit: 1,
      acceleration: 1,
      sunIntensity: isMobile ? 1.0 : 1.9,
    };

    // ---- Sun ----
    const sunSize = 697 / 40;
    const sunMat = new THREE.MeshStandardMaterial({
      emissive: 0xfff88f,
      emissiveMap: loadTexture.load(IMG + "sun.jpg"),
      emissiveIntensity: settings.sunIntensity,
    });
    const sun = new THREE.Mesh(new THREE.SphereGeometry(sunSize, 32, 20), sunMat);
    scene.add(sun);
    const pointLight = new THREE.PointLight(0xfdffd3, 1200, 400, 1.4);
    scene.add(pointLight);

    type Moon = {
      size?: number;
      texture: string;
      bump?: string;
      orbitSpeed: number;
      orbitRadius: number;
      mesh?: THREE.Mesh;
    };
    type Planet = {
      name: string;
      planet: THREE.Mesh;
      planet3d: THREE.Object3D;
      Atmosphere?: THREE.Mesh;
      moons?: Moon[];
      planetSystem: THREE.Group;
      Ring?: THREE.Mesh;
    };

    function createPlanet(
      name: string,
      size: number,
      position: number,
      tilt: number,
      texture: string | THREE.Material,
      bump?: string | null,
      ring?: { innerRadius: number; outerRadius: number; texture: string } | null,
      atmosphere?: string | null,
      moons?: Moon[],
    ): Planet {
      let material: THREE.Material;
      if (texture instanceof THREE.Material) material = texture;
      else if (bump)
        material = new THREE.MeshPhongMaterial({
          map: loadTexture.load(texture),
          bumpMap: loadTexture.load(bump),
          bumpScale: 0.7,
        });
      else material = new THREE.MeshPhongMaterial({ map: loadTexture.load(texture) });

      const geometry = new THREE.SphereGeometry(size, 32, 20);
      const planet = new THREE.Mesh(geometry, material);
      const planet3d = new THREE.Object3D();
      const planetSystem = new THREE.Group();
      planetSystem.add(planet);
      let Atmosphere: THREE.Mesh | undefined;
      let Ring: THREE.Mesh | undefined;
      planet.position.x = position;
      planet.rotation.z = (tilt * Math.PI) / 180;

      const orbitPath = new THREE.EllipseCurve(0, 0, position, position, 0, 2 * Math.PI, false, 0);
      const pts = orbitPath.getPoints(100);
      const orbit = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.03 }),
      );
      orbit.rotation.x = Math.PI / 2;
      planetSystem.add(orbit);

      if (ring) {
        Ring = new THREE.Mesh(
          new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 30),
          new THREE.MeshStandardMaterial({
            map: loadTexture.load(ring.texture),
            side: THREE.DoubleSide,
          }),
        );
        planetSystem.add(Ring);
        Ring.position.x = position;
        Ring.rotation.x = -0.5 * Math.PI;
        Ring.rotation.y = (-tilt * Math.PI) / 180;
      }

      if (atmosphere) {
        Atmosphere = new THREE.Mesh(
          new THREE.SphereGeometry(size + 0.1, 32, 20),
          new THREE.MeshPhongMaterial({
            map: loadTexture.load(atmosphere),
            transparent: true,
            opacity: 0.4,
            depthTest: true,
            depthWrite: false,
          }),
        );
        Atmosphere.rotation.z = 0.41;
        planet.add(Atmosphere);
      }

      if (moons) {
        moons.forEach((moon) => {
          const moonMaterial = moon.bump
            ? new THREE.MeshStandardMaterial({
                map: loadTexture.load(moon.texture),
                bumpMap: loadTexture.load(moon.bump),
                bumpScale: 0.5,
              })
            : new THREE.MeshStandardMaterial({ map: loadTexture.load(moon.texture) });
          const moonMesh = new THREE.Mesh(
            new THREE.SphereGeometry(moon.size ?? 1, 32, 20),
            moonMaterial,
          );
          moonMesh.position.set(size * 1.5, 0, 0);
          planetSystem.add(moonMesh);
          moon.mesh = moonMesh;
        });
      }
      planet3d.add(planetSystem);
      scene.add(planet3d);
      return { name, planet, planet3d, Atmosphere, moons, planetSystem, Ring };
    }

    // Earth day/night shader
    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: loadTexture.load(IMG + "earth_daymap.jpg") },
        nightTexture: { value: loadTexture.load(IMG + "earth_nightmap.jpg") },
        sunPosition: { value: sun.position },
      },
      vertexShader: `
        varying vec3 vNormal; varying vec2 vUv; varying vec3 vSunDirection;
        uniform vec3 sunPosition;
        void main(){
          vUv = uv;
          vec4 wp = modelMatrix * vec4(position,1.0);
          vNormal = normalize(modelMatrix * vec4(normal,0.0)).xyz;
          vSunDirection = normalize(sunPosition - wp.xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }`,
      fragmentShader: `
        uniform sampler2D dayTexture; uniform sampler2D nightTexture;
        varying vec3 vNormal; varying vec2 vUv; varying vec3 vSunDirection;
        void main(){
          float i = max(dot(vNormal, vSunDirection), 0.0);
          vec4 day = texture2D(dayTexture, vUv);
          vec4 night = texture2D(nightTexture, vUv) * 0.2;
          gl_FragColor = mix(night, day, i);
        }`,
    });

    const earthMoon: Moon[] = [
      { size: 1.6, texture: IMG + "moonmap.jpg", bump: IMG + "moonbump.jpg", orbitSpeed: 0.001, orbitRadius: 10 },
    ];
    const jupiterMoons: Moon[] = [
      { size: 1.6, texture: IMG + "jupiterIo.jpg", orbitRadius: 20, orbitSpeed: 0.0005 },
      { size: 1.4, texture: IMG + "jupiterEuropa.jpg", orbitRadius: 24, orbitSpeed: 0.00025 },
      { size: 2, texture: IMG + "jupiterGanymede.jpg", orbitRadius: 28, orbitSpeed: 0.000125 },
      { size: 1.7, texture: IMG + "jupiterCallisto.jpg", orbitRadius: 32, orbitSpeed: 0.00006 },
    ];

    const mercury = createPlanet("Mercury", 2.4, 40, 0, IMG + "mercurymap.jpg", IMG + "mercurybump.jpg");
    const venus = createPlanet("Venus", 6.1, 65, 3, IMG + "venusmap.jpg", IMG + "venusmap.jpg", null, IMG + "venus_atmosphere.jpg");
    const earth = createPlanet("Earth", 6.4, 90, 23, earthMaterial, null, null, IMG + "earth_atmosphere.jpg", earthMoon);
    const mars = createPlanet("Mars", 3.4, 115, 25, IMG + "marsmap.jpg", IMG + "marsbump.jpg");
    const jupiter = createPlanet("Jupiter", 69 / 4, 200, 3, IMG + "jupiter.jpg", null, null, null, jupiterMoons);
    const saturn = createPlanet("Saturn", 58 / 4, 270, 26, IMG + "saturnmap.jpg", null, {
      innerRadius: 18,
      outerRadius: 29,
      texture: IMG + "saturn_ring.png",
    });
    const uranus = createPlanet("Uranus", 25 / 4, 320, 82, IMG + "uranus.jpg", null, {
      innerRadius: 6,
      outerRadius: 8,
      texture: IMG + "uranus_ring.png",
    });
    const neptune = createPlanet("Neptune", 24 / 4, 340, 28, IMG + "neptune.jpg");
    const pluto = createPlanet("Pluto", 1, 350, 57, IMG + "plutomap.jpg");

    const orbiters = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto];

    // ---- Asteroid belts ----
    const asteroids: THREE.Object3D[] = [];
    function loadAsteroids(path: string, count: number, minR: number, maxR: number) {
      new GLTFLoader().load(path, (gltf) => {
        gltf.scene.traverse((child) => {
          const m = child as THREE.Mesh;
          if (m.isMesh) {
            for (let i = 0; i < count / 12; i++) {
              const a = m.clone();
              const r = THREE.MathUtils.randFloat(minR, maxR);
              const ang = Math.random() * Math.PI * 2;
              a.position.set(r * Math.cos(ang), 0, r * Math.sin(ang));
              a.scale.setScalar(THREE.MathUtils.randFloat(0.8, 1.2));
              scene.add(a);
              asteroids.push(a);
            }
          }
        });
      });
    }
    // skip the heavy asteroid belts on phones for performance
    if (!isMobile) {
      loadAsteroids("/assets/solar/asteroids/asteroidPack.glb", 360, 130, 160);
      loadAsteroids("/assets/solar/asteroids/asteroidPack.glb", 900, 352, 370);
    } else {
      loadAsteroids("/assets/solar/asteroids/asteroidPack.glb", 120, 130, 160);
    }

    // mouse parallax
    const target = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const basePos = new THREE.Vector3(-175, 115, 5);
    let raf = 0;
    let visible = true;

    function animate() {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      const a = settings.acceleration;
      const ao = settings.accelerationOrbit;

      sun.rotateY(0.001 * a);
      const spin = [0.001, 0.0005, 0.005, 0.01, 0.005, 0.01, 0.005, 0.005, 0.001];
      const orbit = [0.004, 0.0006, 0.001, 0.0007, 0.0003, 0.0002, 0.0001, 0.00008, 0.00006];
      orbiters.forEach((p, i) => {
        p.planet.rotateY(spin[i] * a);
        p.planet3d.rotateY(orbit[i] * ao);
      });
      venus.Atmosphere?.rotateY(0.0005 * a);
      earth.Atmosphere?.rotateY(0.001 * a);

      const now = performance.now();
      earth.moons?.forEach((moon) => {
        if (!moon.mesh) return;
        const tilt = (5 * Math.PI) / 180;
        moon.mesh.position.set(
          earth.planet.position.x + moon.orbitRadius * Math.cos(now * moon.orbitSpeed),
          moon.orbitRadius * Math.sin(now * moon.orbitSpeed) * Math.sin(tilt),
          earth.planet.position.z + moon.orbitRadius * Math.sin(now * moon.orbitSpeed) * Math.cos(tilt),
        );
        moon.mesh.rotateY(0.01);
      });
      jupiter.moons?.forEach((moon) => {
        if (!moon.mesh) return;
        moon.mesh.position.set(
          jupiter.planet.position.x + moon.orbitRadius * Math.cos(now * moon.orbitSpeed),
          moon.orbitRadius * Math.sin(now * moon.orbitSpeed),
          jupiter.planet.position.z + moon.orbitRadius * Math.sin(now * moon.orbitSpeed),
        );
        moon.mesh.rotateY(0.01);
      });
      asteroids.forEach((ast) => {
        ast.rotation.y += 0.0001;
        const px = ast.position.x;
        ast.position.x = px * Math.cos(0.0001 * ao) + ast.position.z * Math.sin(0.0001 * ao);
        ast.position.z = ast.position.z * Math.cos(0.0001 * ao) - px * Math.sin(0.0001 * ao);
      });

      // gentle parallax around the base view
      camera.position.x += (basePos.x + target.x * 18 - camera.position.x) * 0.04;
      camera.position.y += (basePos.y - target.y * 10 - camera.position.y) * 0.04;
      camera.lookAt(0, lookY, 0);

      composer.render();
    }
    animate();

    const io = new IntersectionObserver((e) => (visible = e[0].isIntersecting), {
      threshold: 0.01,
    });
    io.observe(wrap);

    const ro = new ResizeObserver(() => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
    });
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      io.disconnect();
      ro.disconnect();
      composer.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        const m = obj as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else if (mat) (mat as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
