import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react"
import { Group } from "three"

useGLTF.preload("/forest_house.glb");

export default function HouseRender(){
    const group = useRef<Group>(null);
    const { nodes, materials, animations, scene } = useGLTF(
        "/forest_house.glb"
    )
    const {actions, clips } = useAnimations(animations, scene)
    const scroll = useScroll();

    // useEffect(() => {
    //     console.log(actions)

    //     actions["Experiment"].play().paused = true
    // }, [])
    // useFrame(
    //     () =>
    //     (
    //         (actions["Experiment"].time = (actions["Experiment"].getClip().duration * scroll.offset) / 8)
    //     )
    // )
    return (
        <group ref={group}>
            <primitive object={scene}          
            scale={[0.1, 0.1, 0.1]} />
        </group>
    )
}