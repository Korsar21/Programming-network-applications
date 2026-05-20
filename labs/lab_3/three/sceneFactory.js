import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function addLights(scene) {
    const ambient = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(8, 10, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7aa2ff, 0.9);
    rimLight.position.set(-7, 5, -6);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x5c84ff, 0.7, 20);
    fillLight.position.set(0, 3, 0);
    scene.add(fillLight);
}

function addFloor(scene) {
    const floor = new THREE.Mesh(
        new THREE.CylinderGeometry(4.6, 4.9, 0.28, 48),
        new THREE.MeshStandardMaterial({
            color: 0x5a5a60,
            roughness: 0.95,
            metalness: 0.08
        })
    );
    floor.position.y = -0.82;
    scene.add(floor);

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(3.7, 0.06, 12, 64),
        new THREE.MeshStandardMaterial({
            color: 0x8fa9d6,
            metalness: 0.7,
            roughness: 0.25
        })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.67;
    scene.add(ring);
}

function createSolarPanel(width = 1.2, height = 0.6) {
    const group = new THREE.Group();

    const panel = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.05, height),
        new THREE.MeshStandardMaterial({
            color: 0x214d93,
            emissive: 0x0b2248,
            metalness: 0.55,
            roughness: 0.28
        })
    );
    group.add(panel);

    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(width + 0.08, 0.025, height + 0.08),
        new THREE.MeshStandardMaterial({
            color: 0xbcc8da,
            metalness: 0.85,
            roughness: 0.22
        })
    );
    frame.position.y = -0.04;
    group.add(frame);

    return group;
}

function createOxygenPlant() {
    const group = new THREE.Group();

    const platform = new THREE.Mesh(
        new THREE.CylinderGeometry(1.45, 1.65, 0.36, 32),
        new THREE.MeshStandardMaterial({
            color: 0x8b97a8,
            metalness: 0.75,
            roughness: 0.32
        })
    );
    group.add(platform);

    const reactorBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.55, 1.4, 24),
        new THREE.MeshStandardMaterial({
            color: 0xd4dce9,
            metalness: 0.9,
            roughness: 0.18
        })
    );
    reactorBase.position.set(0, 0.9, 0);
    group.add(reactorBase);

    const reactorCore = new THREE.Mesh(
        new THREE.SphereGeometry(0.42, 28, 28),
        new THREE.MeshStandardMaterial({
            color: 0x66b5ff,
            emissive: 0x1a4d92,
            emissiveIntensity: 1.2,
            metalness: 0.35,
            roughness: 0.12
        })
    );
    reactorCore.position.set(0, 1.9, 0);
    group.add(reactorCore);

    const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.38, 0.32, 16),
        new THREE.MeshStandardMaterial({
            color: 0xe6edf8,
            metalness: 0.9,
            roughness: 0.15
        })
    );
    cap.position.set(0, 2.45, 0);
    group.add(cap);

    const tankMaterial = new THREE.MeshStandardMaterial({
        color: 0xf0f4fb,
        metalness: 0.92,
        roughness: 0.16
    });

    for (let i = 0; i < 3; i += 1) {
        const angle = i * (Math.PI * 2 / 3) + 0.3;
        const tank = new THREE.Mesh(
            new THREE.CylinderGeometry(0.17, 0.17, 1.15, 16),
            tankMaterial
        );
        tank.position.set(Math.cos(angle) * 1.15, 0.55, Math.sin(angle) * 1.15);
        group.add(tank);

        const top = new THREE.Mesh(
            new THREE.SphereGeometry(0.17, 14, 14),
            tankMaterial
        );
        top.position.set(Math.cos(angle) * 1.15, 1.13, Math.sin(angle) * 1.15);
        group.add(top);

        const pipe = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 0.72, 12),
            new THREE.MeshStandardMaterial({
                color: 0xc7d2e5,
                metalness: 0.9,
                roughness: 0.18
            })
        );
        pipe.rotation.z = Math.PI / 2;
        pipe.position.set(Math.cos(angle) * 0.58, 0.88, Math.sin(angle) * 0.58);
        pipe.lookAt(new THREE.Vector3(0, 0.88, 0));
        pipe.rotateZ(Math.PI / 2);
        group.add(pipe);
    }

    const antenna = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.9, 10),
        new THREE.MeshStandardMaterial({
            color: 0xcfd9ea,
            metalness: 0.85,
            roughness: 0.2
        })
    );
    antenna.position.set(-0.55, 2.2, 0.45);
    group.add(antenna);

    const dish = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshStandardMaterial({
            color: 0xe7eef7,
            metalness: 0.82,
            roughness: 0.18
        })
    );
    dish.rotation.x = -Math.PI / 2.4;
    dish.position.set(-0.55, 2.63, 0.45);
    group.add(dish);

    const panelLeft = createSolarPanel(1.1, 0.55);
    panelLeft.position.set(-1.7, 0.65, 0);
    panelLeft.rotation.z = 0.15;
    group.add(panelLeft);

    const panelRight = createSolarPanel(1.1, 0.55);
    panelRight.position.set(1.7, 0.65, 0);
    panelRight.rotation.z = -0.15;
    group.add(panelRight);

    return group;
}

function createMetalModule() {
    const group = new THREE.Group();

    const base = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 0.28, 2),
        new THREE.MeshStandardMaterial({
            color: 0x6b7380,
            metalness: 0.65,
            roughness: 0.45
        })
    );
    group.add(base);

    const furnace = new THREE.Mesh(
        new THREE.BoxGeometry(1.35, 1.15, 1.05),
        new THREE.MeshStandardMaterial({
            color: 0x9aa5b8,
            metalness: 0.72,
            roughness: 0.3
        })
    );
    furnace.position.set(-0.25, 0.72, 0);
    group.add(furnace);

    const meltWindow = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.35, 0.08),
        new THREE.MeshStandardMaterial({
            color: 0xff9f40,
            emissive: 0xff5a00,
            emissiveIntensity: 1.3,
            metalness: 0.2,
            roughness: 0.1
        })
    );
    meltWindow.position.set(-0.25, 0.72, 0.57);
    group.add(meltWindow);

    const chimney = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.18, 1.1, 16),
        new THREE.MeshStandardMaterial({
            color: 0xb8c2d1,
            metalness: 0.82,
            roughness: 0.22
        })
    );
    chimney.position.set(-0.7, 1.45, -0.2);
    group.add(chimney);

    const armBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.16, 0.95, 16),
        new THREE.MeshStandardMaterial({
            color: 0x93a0b7,
            metalness: 0.85,
            roughness: 0.22
        })
    );
    armBase.position.set(0.95, 0.48, -0.2);
    group.add(armBase);

    const armUpper = new THREE.Mesh(
        new THREE.BoxGeometry(1.15, 0.12, 0.12),
        new THREE.MeshStandardMaterial({
            color: 0xb7c2d4,
            metalness: 0.86,
            roughness: 0.2
        })
    );
    armUpper.position.set(0.45, 1.02, -0.2);
    armUpper.rotation.z = -0.45;
    group.add(armUpper);

    const armLower = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.1, 0.1),
        new THREE.MeshStandardMaterial({
            color: 0xd5dde8,
            metalness: 0.9,
            roughness: 0.15
        })
    );
    armLower.position.set(0.0, 1.38, -0.2);
    armLower.rotation.z = 0.8;
    group.add(armLower);

    const claw = new THREE.Mesh(
        new THREE.TorusGeometry(0.09, 0.025, 8, 18, Math.PI),
        new THREE.MeshStandardMaterial({
            color: 0xe4ebf5,
            metalness: 0.95,
            roughness: 0.12
        })
    );
    claw.rotation.z = Math.PI / 2;
    claw.position.set(-0.2, 1.58, -0.2);
    group.add(claw);

    const conveyor = new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 0.18, 0.75),
        new THREE.MeshStandardMaterial({
            color: 0x4c5563,
            metalness: 0.45,
            roughness: 0.55
        })
    );
    conveyor.position.set(0.75, 0.18, 0.55);
    group.add(conveyor);

    const ingotMat = new THREE.MeshStandardMaterial({
        color: 0xdbe3ef,
        metalness: 1,
        roughness: 0.1
    });

    for (let i = 0; i < 3; i += 1) {
        const ingot = new THREE.Mesh(
            new THREE.BoxGeometry(0.34, 0.18, 0.24),
            ingotMat
        );
        ingot.position.set(0.35 + i * 0.34, 0.34, 0.55);
        group.add(ingot);
    }

    return group;
}

function createHabitatBlock() {
    const group = new THREE.Group();

    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(1.7, 1.95, 0.26, 40),
        new THREE.MeshStandardMaterial({
            color: 0x7a818d,
            metalness: 0.38,
            roughness: 0.6
        })
    );
    group.add(base);

    const dome = new THREE.Mesh(
        new THREE.SphereGeometry(1.0, 30, 30, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshStandardMaterial({
            color: 0xcfd8e6,
            metalness: 0.3,
            roughness: 0.28,
            transparent: true,
            opacity: 0.88
        })
    );
    dome.position.y = 0.52;
    group.add(dome);

    const coreBlock = new THREE.Mesh(
        new THREE.BoxGeometry(1.25, 0.75, 0.95),
        new THREE.MeshStandardMaterial({
            color: 0xecf1f8,
            metalness: 0.55,
            roughness: 0.25
        })
    );
    coreBlock.position.set(0, 0.25, 0);
    group.add(coreBlock);

    const airlock = new THREE.Mesh(
        new THREE.CylinderGeometry(0.26, 0.26, 0.95, 18),
        new THREE.MeshStandardMaterial({
            color: 0xb7c4d7,
            metalness: 0.7,
            roughness: 0.22
        })
    );
    airlock.rotation.z = Math.PI / 2;
    airlock.position.set(1.12, 0.12, 0);
    group.add(airlock);

    const airlockDoor = new THREE.Mesh(
        new THREE.CircleGeometry(0.22, 18),
        new THREE.MeshStandardMaterial({
            color: 0x203148,
            metalness: 0.35,
            roughness: 0.75
        })
    );
    airlockDoor.position.set(1.6, 0.12, 0);
    airlockDoor.rotation.y = -Math.PI / 2;
    group.add(airlockDoor);

    const panelLeft = createSolarPanel(1.1, 0.55);
    panelLeft.position.set(-1.75, 0.18, 0.85);
    panelLeft.rotation.y = 0.3;
    group.add(panelLeft);

    const panelRight = createSolarPanel(1.1, 0.55);
    panelRight.position.set(-1.75, 0.18, -0.85);
    panelRight.rotation.y = -0.3;
    group.add(panelRight);

    const tower = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.75, 10),
        new THREE.MeshStandardMaterial({
            color: 0xdce5f2,
            metalness: 0.9,
            roughness: 0.16
        })
    );
    tower.position.set(0.35, 1.12, -0.1);
    group.add(tower);

    const dish = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 14, 14, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshStandardMaterial({
            color: 0xf2f6fb,
            metalness: 0.8,
            roughness: 0.16
        })
    );
    dish.rotation.x = -Math.PI / 2.2;
    dish.rotation.z = 0.25;
    dish.position.set(0.35, 1.48, -0.1);
    group.add(dish);

    const roverBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.52, 0.22, 0.35),
        new THREE.MeshStandardMaterial({
            color: 0xd3dce9,
            metalness: 0.6,
            roughness: 0.24
        })
    );
    roverBody.position.set(0.15, -0.03, 1.08);
    group.add(roverBody);

    const roverWheelMat = new THREE.MeshStandardMaterial({
        color: 0x23262d,
        metalness: 0.2,
        roughness: 0.9
    });

    const wheelPositions = [
        [-0.05, -0.16, 0.92],
        [0.35, -0.16, 0.92],
        [-0.05, -0.16, 1.24],
        [0.35, -0.16, 1.24]
    ];

    wheelPositions.forEach(([x, y, z]) => {
        const wheel = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.08, 0.06, 14),
            roverWheelMat
        );
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, y, z);
        group.add(wheel);
    });

    return group;
}

function createModelByType(type) {
    switch (type) {
        case "oxygen":
            return createOxygenPlant();
        case "metal":
            return createMetalModule();
        case "habitat":
        default:
            return createHabitatBlock();
    }
}

function fitCamera(camera, model, distanceFactor = 2.15) {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    camera.position.set(maxDim * distanceFactor, maxDim * 1.2, maxDim * distanceFactor);
    camera.lookAt(center);
}

function createRenderer(container, alpha = true) {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    return renderer;
}

export function initCardPreview(container, modelType = "habitat") {
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        40,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );

    const renderer = createRenderer(container);
    addLights(scene);
    addFloor(scene);

    const model = createModelByType(modelType);
    model.rotation.y = Math.PI / 5;
    scene.add(model);

    fitCamera(camera, model, 1.95);
    renderer.render(scene, camera);
}

export function initDetailViewer(container, modelType = "habitat") {
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );

    const renderer = createRenderer(container);
    addLights(scene);
    addFloor(scene);

    const model = createModelByType(modelType);
    model.rotation.y = Math.PI / 4;
    scene.add(model);

    fitCamera(camera, model, 2.25);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, 0.5, 0);
    controls.update();

    function animate() {
        requestAnimationFrame(animate);
        model.rotation.y += 0.003;
        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}