"use client";

import {Canvas, useThree} from "@react-three/fiber";
import { Suspense } from "react";
import HouseRender from "./HouseRender";
import { ScrollControls } from "@react-three/drei";

export default function House(){
    return(
        <Canvas
        camera={{ position: [0, 2, 10], fov: 45 }} // Camera settings
        style={{ width: '100%', height: '100vh' }} // Full screen canvas
        >
            <directionalLight position={[-500, -500, 500]} intensity={4} />
            <Suspense fallback={null}>
                <ScrollControls pages={5}>
                <HouseRender />
                </ScrollControls>
            </Suspense>
        </Canvas>
    )
}