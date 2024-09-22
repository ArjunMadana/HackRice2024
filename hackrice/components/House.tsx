"use client"; // Ensure this file is a client component

import { useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense } from 'react';
import { Sky, useGLTF } from '@react-three/drei'; // UseGLTF to load terrain
import * as THREE from 'three'; // Import THREE for scene management
import HouseRender from './HouseRender'; // Import the full house model
import { CSSProperties } from 'react'; // Import CSSProperties for proper type

// Load the Valley Terrain model and apply rotation and positioning
function Terrain() {
  const { scene } = useGLTF('/Valley Terrain.glb'); // Assuming this is the correct path
  return (
    <primitive
      object={scene}
      scale={[0.4, 0.4, 0.4]} // Increased scale for terrain to span full width
      position={[0, -14, -30]} // Adjust the position to fit the screen better
      rotation={[-Math.PI / 12, 0, 0]} // Adjust the tilt for better fit
    />
  );
}

export default function House() {
  // State to track user points
  const [points, setPoints] = useState(100); // Starting points

  // State variables for the visibility of each part
  const [isRoofVisible, setRoofVisible] = useState(false);
  const [isGarageVisible, setGarageVisible] = useState(false);
  const [isChimneyVisible, setChimneyVisible] = useState(false);
  const [isPorchVisible, setPorchVisible] = useState(false);
  const [isShedVisible, setShedVisible] = useState(false);
  const [isBalconyVisible, setBalconyVisible] = useState(false);
  const [isWindowsVisible, setWindowsVisible] = useState(false);
  const [isSecondFloorVisible, setSecondFloorVisible] = useState(false);

  // Handle purchase logic, preventing duplicate purchases
  const handlePurchase = (
    cost: number,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isVisible: boolean
  ) => {
    if (isVisible) {
      alert('You already bought this component!');
      return;
    }

    if (points >= cost) {
      setPoints((prev) => prev - cost);
      setVisible(true);
    } else {
      alert("Not enough points to buy this component!");
    }
  };

  return (
    <>
      {/* Main Canvas displaying the entire house and terrain */}
      <Canvas
        camera={{ position: [0, 15, 30], fov: 45 }} // Adjust camera to fit the much larger house
        style={{ width: '100%', height: '100vh', marginTop: '0' }} // Remove any white space by resetting margin and setting full height
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
          {/* Load Valley Terrain */}
          <Terrain />
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
        <p style={shopStyles.points}>Points: {points}</p>
        <div style={shopStyles.shopSlots}>
          {/* Shop items in a 4x2 layout */}
          <div style={shopStyles.row}>
            <ShopSlot
              onClick={() => handlePurchase(20, setRoofVisible, isRoofVisible)}
              label="Buy Roof (20 Points)"
              imageSrc="/Roof.png" // Custom image for Roof
            />
            <ShopSlot
              onClick={() => handlePurchase(30, setGarageVisible, isGarageVisible)}
              label="Buy Garage (30 Points)"
              imageSrc="/Garage.png" // Custom image for Garage
            />
            <ShopSlot
              onClick={() => handlePurchase(15, setChimneyVisible, isChimneyVisible)}
              label="Buy Chimney (15 Points)"
              imageSrc="/Chimney.png" // Custom image for Chimney
            />
            <ShopSlot
              onClick={() => handlePurchase(25, setPorchVisible, isPorchVisible)}
              label="Buy Porch (25 Points)"
              imageSrc="/Porch.png" // Custom image for Porch
            />
          </div>
          <div style={shopStyles.row}>
            <ShopSlot
              onClick={() => handlePurchase(10, setShedVisible, isShedVisible)}
              label="Buy Shed (10 Points)"
              imageSrc="/Shed.png" // Custom image for Shed
            />
            <ShopSlot
              onClick={() => handlePurchase(30, setBalconyVisible, isBalconyVisible)}
              label="Buy Balcony (30 Points)"
              imageSrc="/Balcony.png" // Custom image for Balcony
            />
            <ShopSlot
              onClick={() => handlePurchase(20, setWindowsVisible, isWindowsVisible)}
              label="Buy Windows (20 Points)"
              imageSrc="/Window.png" // Custom image for Windows
            />
            <ShopSlot
              onClick={() => handlePurchase(40, setSecondFloorVisible, isSecondFloorVisible)}
              label="Buy Second Floor (40 Points)"
              imageSrc="/SecondFloor.png" // Custom image for Second Floor
            />
          </div>
        </div>
      </div>
    </>
  );
}

// A shop slot component for displaying the label and handling the buy action with an image
function ShopSlot({
  onClick,
  label,
  imageSrc,
}: {
  onClick: () => void;
  label: string;
  imageSrc: string;
}) {
  const imageStyle: CSSProperties = {
    width: '70px', // Further reduced size for more compact shop
    height: '70px',
    objectFit: 'contain' as const, // Change from 'cover' to 'contain' for better fit
    marginBottom: '8px', // Smaller margin
    borderRadius: '6px', // Smaller rounded corners
    border: '2px solid #00008B', // Dark blue border
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)', // Slightly reduced shadow for compactness
  };

  const buttonStyle: CSSProperties = {
    backgroundColor: '#00008B', // Dark blue theme
    color: '#fff', // White text
    padding: '5px 8px', // Smaller buttons to match reduced shop size
    border: 'none',
    borderRadius: '6px', // Smaller border radius
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '12px', // Smaller font size
    transition: 'background-color 0.3s',
  };

  return (
    <div style={shopStyles.slot}>
      <img src={imageSrc} alt={label} style={imageStyle} />
      <button onClick={onClick} style={buttonStyle}>
        {label}
      </button>
    </div>
  );
}

// Shop UI Styling to position it at the bottom of the screen
const shopStyles = {
  shopContainer: {
    position: 'absolute' as 'absolute',
    bottom: '15px', // Reduce space from bottom
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%', // Further reduce overall width for smaller shop
    padding: '12px', // Smaller padding
    backgroundColor: 'rgba(173, 216, 230, 0.95)', // Light blue with slight transparency
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
    borderRadius: '10px', // Slightly reduced border radius
    zIndex: 1000,
  },
  points: {
    textAlign: 'center' as 'center',
    fontWeight: 'bold' as 'bold',
    fontSize: '14px', // Slightly smaller text
    marginBottom: '8px', // Reduce bottom margin
  },
  shopSlots: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'space-between' as 'space-between',
    alignItems: 'center', // Align items in the center
  },
  row: {
    display: 'flex',
    justifyContent: 'space-evenly' as 'space-evenly', // Ensure even spacing
    marginBottom: '10px', // Reduce spacing between rows
    width: '100%',
  },
  slot: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
  },
};
