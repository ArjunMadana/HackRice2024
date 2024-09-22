import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group, Object3D, MeshStandardMaterial } from "three";
import { Html } from "@react-three/drei"; // Add Html from drei

useGLTF.preload("/ModernHouse.glb");

export default function HouseRender() {
    const group = useRef<Group>(null);
    const { scene } = useGLTF("/ModernHouse.glb");

    // State for visibility
    const [isRoofVisible, setRoofVisible] = useState(false);
    const [isShedVisible, setShedVisible] = useState(false);
    const [isChimneyVisible, setChimneyVisible] = useState(false);
    const [isBalconyVisible, setBalconyVisible] = useState(false);
    const [isGarageVisible, setGarageVisible] = useState(false);
    const [isPorchVisible, setPorchVisible] = useState(false);
    const [isSecondFloorVisible, setSecondFloorVisible] = useState(false);
    const [isWindowsVisible, setWindowsVisible] = useState(false);
    const [isHouseVisible, setHouseVisible] = useState(true);

    // Rotate the house model
    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.y += delta * 0.5; // Adjust rotation speed if needed
        }
    });

    // Function to set transparency with depthWrite disabled for transparent objects
    const setMaterialTransparency = (material: MeshStandardMaterial, isVisible: boolean) => {
        const clonedMaterial = material.clone();
        clonedMaterial.transparent = true;
        clonedMaterial.opacity = isVisible ? 1 : 0.2; // Full opacity if visible, 0.2 if transparent
        clonedMaterial.depthWrite = isVisible; // Disable depthWrite for transparent parts
        return clonedMaterial;
    };

    // Function to determine the visibility of the component based on parent name
    const getVisibilityByComponent = (parentName: string) => {
        switch (parentName) {
            case "Roof":
                return isRoofVisible;
            case "Shed":
                return isShedVisible;
            case "Chimney":
                return isChimneyVisible;
            case "Balcony":
                return isBalconyVisible;
            case "Garage":
                return isGarageVisible;
            case "Porch":
                return isPorchVisible;
            case "SecondFloor":
                return isSecondFloorVisible;
            case "Windows":
                return isWindowsVisible;
            case "House":
                return isHouseVisible;
            default:
                return false;
        }
    };

    // Recursive function to apply transparency and renderOrder to components
    const applyTransparencyToMeshes = (object: Object3D) => {
        if (object instanceof Mesh) {
            if (object.parent) {
                const isVisible = getVisibilityByComponent(object.parent.name);

                // Set render order based on visibility
                object.renderOrder = isVisible ? 1 : 2; // Opaque parts render first, then transparent

                // Handle the case where material is an array or a single material
                if (Array.isArray(object.material)) {
                    object.material = object.material.map((material) => {
                        if (material instanceof MeshStandardMaterial) {
                            return setMaterialTransparency(material, isVisible);
                        }
                        return material;
                    });
                } else if (object.material instanceof MeshStandardMaterial) {
                    object.material = setMaterialTransparency(object.material, isVisible);
                }
            }
        } else if (object instanceof Group) {
            object.children.forEach(applyTransparencyToMeshes);
        }
    };

    // Traverse the scene and find the correct meshes
    useEffect(() => {
        // Log the full scene structure for debugging
        console.log("Scene structure:", scene);

        // Start by traversing the root scene and applying transparency settings
        scene.children.forEach(applyTransparencyToMeshes);
    }, [scene, isRoofVisible, isShedVisible, isChimneyVisible, isBalconyVisible, isGarageVisible, isPorchVisible, isSecondFloorVisible, isWindowsVisible, isHouseVisible]);

    return (
        <>
            <group ref={group}>
                <primitive object={scene} scale={[0.1, 0.1, 0.1]} />
            </group>
            {/* Use Html from @react-three/drei to overlay standard HTML elements */}
            <Html position={[0, 0, 0]}>
                <button onClick={() => setRoofVisible(!isRoofVisible)}>
                    Toggle Roof Visibility
                </button>
            </Html>
        </>
    );
}
