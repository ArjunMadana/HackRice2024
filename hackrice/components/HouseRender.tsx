"use client";

import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { MeshStandardMaterial, Object3D, Mesh, Group } from 'three';
import { useFrame } from '@react-three/fiber';

interface HouseRenderProps {
  isRoofVisible: boolean;
  isGarageVisible: boolean;
  isChimneyVisible: boolean;
  isPorchVisible: boolean;
  isShedVisible: boolean;
  isBalconyVisible: boolean;
  isWindowsVisible: boolean;
  isSecondFloorVisible: boolean;
}

useGLTF.preload('/ModernHouse.glb');

export default function HouseRender({
  isRoofVisible,
  isGarageVisible,
  isChimneyVisible,
  isPorchVisible,
  isShedVisible,
  isBalconyVisible,
  isWindowsVisible,
  isSecondFloorVisible,
}: HouseRenderProps) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF('/ModernHouse.glb');

  // Function to set transparency
  const setMaterialTransparency = (material: MeshStandardMaterial, isVisible: boolean) => {
    const clonedMaterial = material.clone();
    clonedMaterial.transparent = true;
    clonedMaterial.opacity = isVisible ? 1 : 0.2;
    clonedMaterial.depthWrite = isVisible;
    return clonedMaterial;
  };

  const applyTransparencyToMeshes = (object: Object3D) => {
    if (object instanceof Mesh) {
      if (object.parent && object.parent.name) {
        const partVisible =
          object.parent.name === 'Roof'
            ? isRoofVisible
            : object.parent.name === 'Garage'
            ? isGarageVisible
            : object.parent.name === 'Chimney'
            ? isChimneyVisible
            : object.parent.name === 'Porch'
            ? isPorchVisible
            : object.parent.name === 'Shed'
            ? isShedVisible
            : object.parent.name === 'Balcony'
            ? isBalconyVisible
            : object.parent.name === 'Windows'
            ? isWindowsVisible
            : object.parent.name === 'SecondFloor'
            ? isSecondFloorVisible
            : true;

        if (Array.isArray(object.material)) {
          object.material = object.material.map((material) =>
            material instanceof MeshStandardMaterial ? setMaterialTransparency(material, partVisible) : material
          );
        } else if (object.material instanceof MeshStandardMaterial) {
          object.material = setMaterialTransparency(object.material, partVisible);
        }
      }
    }
  };

  useEffect(() => {
    scene.traverse(applyTransparencyToMeshes);
  }, [
    scene,
    isRoofVisible,
    isGarageVisible,
    isChimneyVisible,
    isPorchVisible,
    isShedVisible,
    isBalconyVisible,
    isWindowsVisible,
    isSecondFloorVisible,
  ]);

  // Add rotation logic using useFrame
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5; // Adjust rotation speed if needed
    }
  });

  return <primitive object={scene} scale={[0.1, 0.1, 0.1]} ref={group} />;
}
