import React, { Suspense, useEffect, useState } from "react";
import { Text } from '@react-three/drei';
import GltfModel from "./gltf";


// const ModelViewer = ({modelPath, scale = 0.01, position = [0,0,0]}) => {
//     return(
//         <Suspense fallback={null}>
//             <GltfModel modelPath={modelPath} scale={scale} position={position}/>
//             <OrbitControls/>
//         </Suspense>
//     )
// }

// export default ModelViewer;
const ModelViewer = ({ modelPath, scale = 1, position = [0, 0, 0] }) => {
    const [isModelLoaded, setIsModelLoaded] = useState(false);

    useEffect(() => {
        

        if (modelPath) {
            // Model yüklendiğinde işareti ayarla
            setIsModelLoaded(true);
        }
    }, [modelPath]);

    return (
        <group>
            {isModelLoaded ? (
                <GltfModel modelPath={modelPath} scale={scale} position={position} />
            ) : (
                // Model yüklenirken gösterilecek yedek bileşen veya animasyonu buraya ekleyin
                <Text position={[0, 0, 0]} fontSize={1}>
                    Loading 3D Model...
                </Text>
            )}
        </group>
    );
}

export default ModelViewer;