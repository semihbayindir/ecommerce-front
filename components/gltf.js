import React, {useRef, useState} from 'react';
import {useLoader, useFrame} from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Clock, AnimationMixer } from 'three';


const GltfModel = ({modelPath, scale = 1, position = [0,0,0]}) => {
    const ref = useRef();
    const gltf = useLoader(GLTFLoader,modelPath);
    const [hovered,setHover] = useState(false);

    const mixer = new AnimationMixer(gltf.scene);

  // Animasyonları alın
  const animations = gltf.animations;

  // Animasyonu başlatın (örneğin, ilk animasyonu başlatmak için)
  if (animations && animations.length) {
    const action = mixer.clipAction(animations[0]);
    action.play();
  }

  const clock = new Clock();

  useFrame((state, delta) => {
    const elapsedTime = clock.getElapsedTime();

    // Mixer'ı güncelleyin
    mixer.update(delta);

    // Modeli döndürün veya başka animasyonlarınızı burada güncelleyin
    ref.current.rotation.y = elapsedTime * 0.1;
  });

    return(
        <primitive
            ref={ref}
            dispose={null}
            object={gltf.scene}
            scale={hovered ? scale * 1.001 : scale}
            position={position}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        />
    )
}

export default GltfModel;