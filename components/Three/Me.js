// components/ThreeScene.js
import React, { useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

const ModelWithAnimation = () => {
  const model = useGLTF('/models/avatar.glb');
  const anim = useLoader(FBXLoader, '/animations/wave.fbx');
  
  let mixer;
  if (anim.animations.length){
    mixer = new THREE.AnimationMixer(model.scene);
    anim.animations.forEach(clip => {
      const action = mixer.clipAction(clip);
      action.play();
    })
  }

  useFrame((state, delta) => {
    mixer?.update(delta)
  })

  return <primitive object={model.scene} />;
};

const CameraSetup = () => {
  const { camera } = useThree();

  useEffect(() => {
    if (camera){
      camera.position.set(0, 1.5, 1.5);
      camera.lookAt(0, 1, 0);
      camera.updateProjectionMatrix();
    }
  }, []);

  return null;
}

// Main component for the scene
const Me = () => {

  return (
    <Canvas
      camera={{ position: [0, 3, 1], fov: 75 }}
      gl={{ alpha: true }}
    >
      <CameraSetup />
      <ambientLight intensity={2} />
      <ModelWithAnimation />          
    </Canvas>
  );
};

export default Me;