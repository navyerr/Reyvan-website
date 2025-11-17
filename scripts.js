// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 20;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls (zoom & rotate)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.5;

// Planet
const planetGeometry = new THREE.SphereGeometry(5, 64, 64);
const planetMaterial = new THREE.MeshStandardMaterial({
    color: 0xff66cc,
    emissive: 0x550033,
    roughness: 0.3
});
const planet = new THREE.Mesh(planetGeometry, planetMaterial);
scene.add(planet);

// Lights
const light = new THREE.PointLight(0xffffff, 2);
light.position.set(10, 10, 10);
scene.add(light);

// Star Particles
const starGeometry = new THREE.BufferGeometry();
const starCount = 20000;
const positions = [];

for(let i = 0; i < starCount; i++){
    positions.push((Math.random() - 0.5) * 300);
    positions.push((Math.random() - 0.5) * 300);
    positions.push((Math.random() - 0.5) * 300);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const starMaterial = new THREE.PointsMaterial({
    color: 0xff66cc,
    size: 0.4
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
const loader = new THREE.TextureLoader();

function createFloatingImage(url, x, y, z) {
    const texture = loader.load(url);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);

    sprite.scale.set(4, 4, 1);
    sprite.position.set(x, y, z);

    scene.add(sprite);
}

// contoh:
createFloatingImage("images/img1.jpg", 10, 2, -15);
createFloatingImage("images/img2.jpg", -5, 6, -10);

