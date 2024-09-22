"use client"; // Ensure this file is a client component

import { useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense } from 'react';
import { Sky } from '@react-three/drei'; // Sky for environmental lighting
import * as THREE from 'three'; // Import THREE to use Scene types
import HouseRender from './HouseRender'; // Import the full house model

export default function House() {
  // State variables for the visibility of each part
  const [isRoofVisible, setRoofVisible] = useState(false);
  const [isGarageVisible, setGarageVisible] = useState(false);
  const [isChimneyVisible, setChimneyVisible] = useState(false);
  const [isPorchVisible, setPorchVisible] = useState(false);
  const [isShedVisible, setShedVisible] = useState(false);
  const [isBalconyVisible, setBalconyVisible] = useState(false);
  const [isWindowsVisible, setWindowsVisible] = useState(false);
  const [isSecondFloorVisible, setSecondFloorVisible] = useState(false);

  return (
    <>
      {/* Main Canvas displaying the entire house */}
      <Canvas
        camera={{ position: [0, 2, 10], fov: 45 }}
        style={{ width: '100%', height: '100vh' }}
      >
        <directionalLight position={[-1, -1, 1]} intensity={1} />
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <Sky
            distance={450000}
            sunPosition={[1, 0, 0]}
            inclination={0}
            azimuth={1}
          />
          <HouseRender
            isRoofVisible={isRoofVisible}
            isGarageVisible={isGarageVisible}
            isChimneyVisible={isChimneyVisible}
            isPorchVisible={isPorchVisible}
            isShedVisible={isShedVisible}
            isBalconyVisible={isBalconyVisible}
            isWindowsVisible={isWindowsVisible}
            isSecondFloorVisible={isSecondFloorVisible}
          />
        </Suspense>
      </Canvas>

      {/* Shop UI */}
      <div style={shopStyles.shopContainer}>
        <ShopSlot
          extractPart={(scene: THREE.Scene) => findPartByName(scene, 'Roof')}
          onClick={() => setRoofVisible(!isRoofVisible)}
          label={isRoofVisible ? 'Hide Roof' : 'Buy Roof'}
        />
        <ShopSlot
          extractPart={(scene: THREE.Scene) => findPartByName(scene, 'Garage')}
          onClick={() => setGarageVisible(!isGarageVisible)}
          label={isGarageVisible ? 'Hide Garage' : 'Buy Garage'}
        />
        <ShopSlot
          extractPart={(scene: THREE.Scene) => findPartByName(scene, 'Chimney')}
          onClick={() => setChimneyVisible(!isChimneyVisible)}
          label={isChimneyVisible ? 'Hide Chimney' : 'Buy Chimney'}
        />
        <ShopSlot
          extractPart={(scene: THREE.Scene) => findPartByName(scene, 'Porch')}
          onClick={() => setPorchVisible(!isPorchVisible)}
          label={isPorchVisible ? 'Hide Porch' : 'Buy Porch'}
        />
        <ShopSlot
          extractPart={(scene: THREE.Scene) => findPartByName(scene, 'Shed')}
          onClick={() => setShedVisible(!isShedVisible)}
          label={isShedVisible ? 'Hide Shed' : 'Buy Shed'}
        />
        <ShopSlot
          extractPart={(scene: THREE.Scene) => findPartByName(scene, 'Balcony')}
          onClick={() => setBalconyVisible(!isBalconyVisible)}
          label={isBalconyVisible ? 'Hide Balcony' : 'Buy Balcony'}
        />
        <ShopSlot
          extractPart={(scene: THREE.Scene) => findPartByName(scene, 'Windows')}
          onClick={() => setWindowsVisible(!isWindowsVisible)}
          label={isWindowsVisible ? 'Hide Windows' : 'Buy Windows'}
        />
        <ShopSlot
          extractPart={(scene: THREE.Scene) => findPartByName(scene, 'SecondFloor')}
          onClick={() => setSecondFloorVisible(!isSecondFloorVisible)}
          label={isSecondFloorVisible ? 'Hide Second Floor' : 'Buy Second Floor'}
        />
      </div>
    </>
  );
}

// A recursive function to find nested parts by name
function findPartByName(object: THREE.Object3D, name: string): THREE.Object3D | null {
  if (object.name === name) {
    return object;
  }

  for (const child of object.children) {
    const result = findPartByName(child, name);
    if (result) return result;
  }

  return null;
}

// A shop slot that contains a 3D rendered component and a buy button
function ShopSlot({
  extractPart,
  onClick,
  label,
}: {
  extractPart: (scene: THREE.Scene) => THREE.Object3D | null;
  onClick: () => void;
  label: string;
}) {
  return (
    <div style={shopStyles.slot}>
      <Canvas
        style={shopStyles.canvas}
        camera={{ position: [0, 0, 3], fov: 50 }}
        onCreated={({ gl }) => gl.setClearColor('transparent')}
      >
        {/* Add some lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        <Suspense fallback={null}>
          <ExtractedPart extractPart={extractPart} />
        </Suspense>
      </Canvas>
      <button onClick={onClick}>{label}</button>
    </div>
  );
}

// A component that extracts and renders a specific part of the house
function ExtractedPart({ extractPart }: { extractPart: (scene: THREE.Scene) => THREE.Object3D | null }) {
  const { scene } = useThree();

  // Log the entire scene structure for debugging purposes
  console.log('Scene structure:', scene);

  const part = extractPart(scene);

  // Log only if no part is found for debugging
  if (!part) {
    console.log('Part not found:', part);
  }

  // If the part is found, clone and render it; if not, render a fallback cube
  return part ? (
    <primitive object={part.clone()} />
  ) : (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

// Shop UI Styling to position it at the bottom of the screen
const shopStyles = {
  shopContainer: {
    position: 'absolute' as 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '10px',
    borderRadius: '12px',
    zIndex: 1000,
  },
  slot: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    gap: '10px',
  },
  canvas: {
    width: '100px',
    height: '100px',
  },
};
