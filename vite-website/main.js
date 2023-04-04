import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const earthTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/noahschofield/pics/main/earth.webp');
const earthNormal = new THREE.TextureLoader().load('https://raw.githubusercontent.com/noahschofield/pics/main/earth_normalmap.webp');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthNormal
  })
)

scene.add(sun)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(2000).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader();
scene.background = spaceTexture.load('https://raw.githubusercontent.com/noahschofield/pics/main/17520.webp');

const moonTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/noahschofield/pics/main/moon.webp');
const moonNormal = new THREE.TextureLoader().load('https://raw.githubusercontent.com/noahschofield/pics/main/moon_normalmap.webp');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormal
  })
)

scene.add(moon)

moon.position.z = 30;
moon.position.x = -10;

function moveCamera() {
  const t  = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.01;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.005;
  moon.rotation.y += 0.005;

  controls.update();

  renderer.render(scene, camera);
}

animate();
