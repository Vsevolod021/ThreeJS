import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import './App.css';

const initializeFigures = (cubeGeometry, cubeMaterial, edgesGeometry, edgesMaterial) => ({
  cube1: new THREE.Mesh(cubeGeometry, cubeMaterial),
  cube2: new THREE.Mesh(cubeGeometry, cubeMaterial),
  edges1: new THREE.LineSegments(edgesGeometry, edgesMaterial),
  edges2: new THREE.LineSegments(edgesGeometry, edgesMaterial)
});

const setPositions = (figure) => {
  const { cube1, cube2, edges1, edges2 } = figure;

  cube1.position.x = -0.5;
  cube2.position.x = 0.5;
  edges1.position.x = -0.5;
  edges2.position.x = 0.5;
};

const fillContainer = (container, figures) => {
  Object.values(figures).forEach((figure) => container.add(figure));
};

function App() {
  useEffect(() => {
    const width = 1280;
    const height = 720;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const rerender = new THREE.WebGLRenderer();
    rerender.setSize(width, height);

    const threeCanvas = rerender.domElement;

    document.querySelector('.App').appendChild(threeCanvas);

    camera.position.set(0, 0, 1);

    // cube params
    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x57e457 });

    const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

    const count = 6;
    const cubeContainers = new Array(count);

    for (let index = 0; index < count; index++) {
      const container = new THREE.Object3D();

      const figures = initializeFigures(cubeGeometry, cubeMaterial, edgesGeometry, edgesMaterial);

      setPositions(figures);
      fillContainer(container, figures);

      cubeContainers[index] = container;

      container.position.z = -index * 0.75;
      container.rotation.z = ((index + 1) / (count - 1)) * Math.PI;
    }

    // render
    cubeContainers.forEach((container) => scene.add(container));
    rerender.render(scene, camera);

    function animate() {
      rerender.render(scene, camera);
      cubeContainers.forEach((container) => (container.rotation.z += 0.01));
    }
    rerender.setAnimationLoop(animate);

    return () => {
      document.querySelector('.App').removeChild(threeCanvas);
    };
  }, []);

  return <div className="App"></div>;
}

export default App;
