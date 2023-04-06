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

camera.position.setZ(40);

renderer.render(scene, camera);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(10, 3, 32, 200),
  new THREE.MeshToonMaterial({
    color: new THREE.Color('#7869DC'),
  })
)

const torus2 = new THREE.Mesh(
  new THREE.TorusGeometry(20, 3, 32, 200),
  new THREE.MeshToonMaterial({
    color: new THREE.Color('#E84A5F'),
  })
)

scene.add(torus)
scene.add(torus2)

const ball = new THREE.Mesh(
  new THREE.SphereGeometry(4, 64, 64),
  new THREE.MeshToonMaterial({
    color: new THREE.Color('#5edcae'),
  })
)

scene.add(ball)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshToonMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(800));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(2000).fill().forEach(addStar)

function moveCamera() {
  const t  = document.body.getBoundingClientRect().top;

  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.01;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.015;
  torus.rotation.y += 0.005;

  torus2.rotation.x += 0.005;
  torus2.rotation.y += 0.015;

  controls.update();

  renderer.render(scene, camera);
}

animate();
