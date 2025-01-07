import { useEffect } from 'react';
import * as THREE from 'three';

const Globe = () => {
  useEffect(() => {
    const width = 1280;
    const height = 720;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    const threeCanvas = renderer.domElement;
    document.querySelector('.globe').appendChild(threeCanvas);

    camera.position.set(0, 0, 0);

    // texture
    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load(
      'panorama.jpg', // Замените на путь к вашему изображению
      () => {
        renderer.setAnimationLoop(animation);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error happened', error);
      }
    );

    // sphere params
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

    const sphere = new THREE.Mesh(geometry, material);

    renderer.render(scene, camera);

    scene.add(sphere);

    function animation() {
      renderer.render(scene, camera);
      sphere.rotation.y -= 0.001;
    }
    renderer.setAnimationLoop(animation);

    window.addEventListener('keydown', () => console.log('konsole.log'));

    return () => {
      document.querySelector('.globe')?.removeChild(threeCanvas);
    };
  }, []);

  return <div className="globe"></div>;
};

export default Globe;
