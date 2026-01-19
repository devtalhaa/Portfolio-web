"use client";

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface GeometryProps {
    position: [number, number, number];
    rotationSpeed?: number;
    scale?: number;
    color?: string;
}

const WireframeIcosahedron: React.FC<GeometryProps> = ({
    position,
    rotationSpeed = 0.005,
    scale = 1,
    color = '#00e5ff'
}) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { mouse } = useThree();

    useFrame((state) => {
        if (!meshRef.current) return;

        // Base rotation
        meshRef.current.rotation.x += rotationSpeed;
        meshRef.current.rotation.y += rotationSpeed * 0.7;

        // Subtle mouse attraction
        meshRef.current.position.x = position[0] + mouse.x * 0.3;
        meshRef.current.position.y = position[1] + mouse.y * 0.2;

        // Scroll-based depth movement
        const scrollY = window.scrollY || 0;
        meshRef.current.position.z = position[2] + Math.sin(scrollY * 0.002) * 0.5;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <icosahedronGeometry args={[1, 0]} />
                <meshBasicMaterial
                    color={color}
                    wireframe
                    transparent
                    opacity={0.4}
                />
            </mesh>
        </Float>
    );
};

const WireframeTorusKnot: React.FC<GeometryProps> = ({
    position,
    rotationSpeed = 0.003,
    scale = 0.5,
    color = '#00e5ff'
}) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { mouse } = useThree();

    useFrame((state) => {
        if (!meshRef.current) return;

        // Base rotation
        meshRef.current.rotation.x += rotationSpeed;
        meshRef.current.rotation.z += rotationSpeed * 1.2;

        // Subtle mouse attraction (opposite direction)
        meshRef.current.position.x = position[0] - mouse.x * 0.2;
        meshRef.current.position.y = position[1] - mouse.y * 0.15;

        // Breathing scale effect
        const time = state.clock.elapsedTime;
        meshRef.current.scale.setScalar(scale + Math.sin(time) * 0.05);
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <torusKnotGeometry args={[1, 0.3, 100, 16]} />
                <meshBasicMaterial
                    color={color}
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </Float>
    );
};

const WireframeOctahedron: React.FC<GeometryProps> = ({
    position,
    rotationSpeed = 0.004,
    scale = 0.8,
    color = '#00e5ff'
}) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;

        // Rotation
        meshRef.current.rotation.y += rotationSpeed;
        meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;

        // Floating motion
        meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.35}
            />
        </mesh>
    );
};

const FloatingGeometry: React.FC = () => {
    return (
        <group>
            {/* Main featured shapes */}
            <WireframeIcosahedron
                position={[-5, 2, -3]}
                scale={1.5}
                rotationSpeed={0.004}
            />
            <WireframeTorusKnot
                position={[6, -1, -5]}
                scale={0.6}
                rotationSpeed={0.003}
            />
            <WireframeOctahedron
                position={[4, 3, -4]}
                scale={0.9}
                rotationSpeed={0.005}
            />

            {/* Background shapes */}
            <WireframeIcosahedron
                position={[-8, -3, -8]}
                scale={0.7}
                rotationSpeed={0.002}
                color="#00b8d4"
            />
            <WireframeOctahedron
                position={[8, 4, -6]}
                scale={0.5}
                rotationSpeed={0.003}
                color="#00b8d4"
            />
            <WireframeTorusKnot
                position={[-4, -4, -7]}
                scale={0.4}
                rotationSpeed={0.002}
                color="#00b8d4"
            />
        </group>
    );
};

export default FloatingGeometry;
