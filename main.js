import './style.scss';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { addWindowResizeCallback } from './helpers/window-size-helper.js';

const canvas = document.querySelector('#canvas');

// TODO: Use the ResizeObservers contentRect's instead of getting innerWidth/innerHeight from window here.
let innerWidth, innerHeight;
const updateWindowSize = () => { ({ innerWidth, innerHeight } = window); };
updateWindowSize();


/**
 * Scene
 */
const scene = new THREE.Scene();


/**
 * Axis helper
 *
 * Renders:
 * - Red line for x-axis
 * - Green line for y-axis
 * - Blue line for z-axis
 */
const axisHelper = new THREE.AxesHelper(4);
scene.add(axisHelper);


/**
 * Grid helper
 */
const gridHelper = new THREE.GridHelper(4);
scene.add(gridHelper);


/**
 * Point light
 */
const pointLight = new THREE.PointLight(0xf5da62, 0.75, 1000, 2);
pointLight.position.set(-3, 8, 6);
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 5);
scene.add(pointLightHelper);


/**
 * Ambient light
 */
const ambientLight = new THREE.AmbientLight(0xfffdf7, 0.70);
scene.add(ambientLight);

// const ambientLightHelper = new THREE.AmbientLightHelper(ambientLight, 5);
// scene.add(ambientLightHelper);


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15; // zoom out
camera.position.x = 4;
camera.position.y = 4;
scene.add(camera);


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.physicallyCorrectLights = true;
const render = () => { renderer.render(scene, camera); };

addWindowResizeCallback(() => {
  updateWindowSize();
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  render();
});


/**
 * Camera orbit controls
 *
 * NOTE: orbitControls.update() must be called after any manual changes to the camera's transform.
 */
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableZoom = true;
orbitControls.zoomSpeed = 1.7;
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.08; // default = 0.05, higher is less damping

function animate () {
  requestAnimationFrame(animate);

  // Required if orbitControls.enableDamping or orbitControls.autoRotate are set to true.
  orbitControls.update();
  render();
}


///////////////////////////////////////////////////////////


animate();
