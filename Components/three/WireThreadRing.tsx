"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Theme colors
const THEME_COLORS = {
    primary: '#22d3ee',
    primaryLight: '#67e8f9',
    primaryDark: '#06b6d4',
    secondary: '#2563eb',
    background: '#020617',
};

interface WireThreadRingProps {
    scrollProgress?: number;
}

// Create a single wire/thread that wraps around the ring
const WireThread: React.FC<{
    radius: number;
    tubeRadius: number;
    rotationOffset: number;
    color: THREE.Color;
    scrollProgress: number;
    groupRef: React.RefObject<THREE.Group | null>;
}> = ({ radius, tubeRadius, rotationOffset, color, scrollProgress, groupRef }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const timeRef = useRef(Math.random() * 100);

    useFrame((state, delta) => {
        if (!meshRef.current || !groupRef.current) return;
        timeRef.current += delta;

        // Follow parent group position
        meshRef.current.position.copy(groupRef.current.position);
        meshRef.current.rotation.x = groupRef.current.rotation.x + rotationOffset;
        meshRef.current.rotation.y = groupRef.current.rotation.y;
        meshRef.current.rotation.z = groupRef.current.rotation.z + rotationOffset * 0.5;
    });

    return (
        <mesh ref={meshRef}>
            <torusGeometry args={[radius, tubeRadius, 32, 200]} />
            <meshStandardMaterial
                color={color}
                metalness={0.95}
                roughness={0.05}
                emissive={color}
                emissiveIntensity={0.2}
            />
        </mesh>
    );
};

// Multiple wire threads forming the ring structure
const ThreadedRingStructure: React.FC<{
    scrollProgress: number;
    baseRadius: number;
}> = ({ scrollProgress, baseRadius }) => {
    const groupRef = useRef<THREE.Group>(null);
    const timeRef = useRef(0);

    // Create multiple thread colors based on theme
    const threadColors = useMemo(() => [
        new THREE.Color(THEME_COLORS.primary),
        new THREE.Color(THEME_COLORS.primaryLight),
        new THREE.Color(THEME_COLORS.primaryDark),
        new THREE.Color(THEME_COLORS.secondary),
        new THREE.Color(THEME_COLORS.primary).lerp(new THREE.Color(THEME_COLORS.secondary), 0.5),
    ], []);

    // Generate thread configurations
    const threads = useMemo(() => {
        const result = [];
        const threadCount = 12; // Number of wire threads

        for (let i = 0; i < threadCount; i++) {
            const angle = (i / threadCount) * Math.PI * 2;
            const radiusOffset = Math.sin(angle * 3) * 0.3;

            result.push({
                radius: baseRadius + radiusOffset,
                tubeRadius: 0.08 + Math.random() * 0.04,
                rotationOffset: angle,
                color: threadColors[i % threadColors.length],
            });
        }

        return result;
    }, [baseRadius, threadColors]);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        timeRef.current += delta;
        const time = timeRef.current;

        // Scroll-based position - moves to empty area on right side
        // As scroll increases, ring moves from center-left to right side
        const targetX = -8 + scrollProgress * 16; // Moves from left (-8) to right (8)
        const targetY = 2 - scrollProgress * 6; // Moves from top (2) to bottom (-4)
        const targetZ = -12 + scrollProgress * 4; // Comes slightly forward

        // Smooth position interpolation
        groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
        groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
        groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.05;

        // Floating wobble
        groupRef.current.position.x += Math.sin(time * 0.3) * 0.1;
        groupRef.current.position.y += Math.cos(time * 0.25) * 0.15;

        // Rotation based on scroll and time
        groupRef.current.rotation.x = Math.PI / 4 + scrollProgress * Math.PI * 0.5 + Math.sin(time * 0.2) * 0.1;
        groupRef.current.rotation.y = time * 0.08 + scrollProgress * Math.PI;
        groupRef.current.rotation.z = Math.sin(time * 0.15) * 0.15 + scrollProgress * 0.3;
    });

    return (
        <group ref={groupRef} position={[-8, 2, -12]}>
            {/* Render all wire threads */}
            {threads.map((thread, index) => (
                <WireThread
                    key={index}
                    radius={thread.radius}
                    tubeRadius={thread.tubeRadius}
                    rotationOffset={thread.rotationOffset}
                    color={thread.color}
                    scrollProgress={scrollProgress}
                    groupRef={groupRef}
                />
            ))}
        </group>
    );
};

// Outer glow effect for the ring
const RingGlow: React.FC<{ scrollProgress: number; radius: number }> = ({ scrollProgress, radius }) => {
    const glowRef = useRef<THREE.Mesh>(null);
    const timeRef = useRef(0);

    useFrame((state, delta) => {
        if (!glowRef.current) return;
        timeRef.current += delta;
        const time = timeRef.current;

        // Match main ring position
        const targetX = -8 + scrollProgress * 16;
        const targetY = 2 - scrollProgress * 6;
        const targetZ = -12 + scrollProgress * 4 - 0.5;

        glowRef.current.position.x += (targetX - glowRef.current.position.x) * 0.05;
        glowRef.current.position.y += (targetY - glowRef.current.position.y) * 0.05;
        glowRef.current.position.z += (targetZ - glowRef.current.position.z) * 0.05;

        glowRef.current.position.x += Math.sin(time * 0.3) * 0.1;
        glowRef.current.position.y += Math.cos(time * 0.25) * 0.15;

        glowRef.current.rotation.x = Math.PI / 4 + scrollProgress * Math.PI * 0.5 + Math.sin(time * 0.2) * 0.1;
        glowRef.current.rotation.y = time * 0.08 + scrollProgress * Math.PI;

        // Pulsing scale
        const pulse = 1 + Math.sin(time * 2) * 0.02;
        glowRef.current.scale.setScalar(pulse);
    });

    return (
        <mesh ref={glowRef} position={[-8, 2, -12.5]}>
            <torusGeometry args={[radius * 1.05, 0.5, 16, 100]} />
            <meshBasicMaterial
                color={THEME_COLORS.primary}
                transparent
                opacity={0.15}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

// Inner core glow
const InnerGlow: React.FC<{ scrollProgress: number; radius: number }> = ({ scrollProgress, radius }) => {
    const glowRef = useRef<THREE.Mesh>(null);
    const timeRef = useRef(0);

    useFrame((state, delta) => {
        if (!glowRef.current) return;
        timeRef.current += delta;
        const time = timeRef.current;

        const targetX = -8 + scrollProgress * 16;
        const targetY = 2 - scrollProgress * 6;
        const targetZ = -12 + scrollProgress * 4;

        glowRef.current.position.x += (targetX - glowRef.current.position.x) * 0.05;
        glowRef.current.position.y += (targetY - glowRef.current.position.y) * 0.05;
        glowRef.current.position.z += (targetZ - glowRef.current.position.z) * 0.05;

        glowRef.current.position.x += Math.sin(time * 0.3) * 0.1;
        glowRef.current.position.y += Math.cos(time * 0.25) * 0.15;

        glowRef.current.rotation.x = Math.PI / 4 + scrollProgress * Math.PI * 0.5 + Math.sin(time * 0.2) * 0.1;
        glowRef.current.rotation.y = time * 0.08 + scrollProgress * Math.PI;
    });

    return (
        <mesh ref={glowRef} position={[-8, 2, -12]}>
            <ringGeometry args={[radius * 0.3, radius * 0.95, 64]} />
            <meshBasicMaterial
                color={THEME_COLORS.secondary}
                transparent
                opacity={0.08}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

// Floating energy particles around the ring
const EnergyParticles: React.FC<{ scrollProgress: number; count?: number }> = ({
    scrollProgress,
    count = 150
}) => {
    const pointsRef = useRef<THREE.Points>(null);
    const timeRef = useRef(0);
    const initialRef = useRef<Float32Array | null>(null);

    React.useEffect(() => {
        if (!pointsRef.current) return;

        const geometry = pointsRef.current.geometry;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const primaryColor = new THREE.Color(THEME_COLORS.primary);
        const secondaryColor = new THREE.Color(THEME_COLORS.secondary);

        for (let i = 0; i < count; i++) {
            // Distribute particles in a ring pattern
            const angle = (i / count) * Math.PI * 2;
            const radius = 6 + Math.random() * 2;

            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
            positions[i * 3 + 2] = Math.sin(angle) * radius;

            const color = i % 2 === 0 ? primaryColor : secondaryColor;
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        initialRef.current = new Float32Array(positions);
    }, [count]);

    useFrame((state, delta) => {
        if (!pointsRef.current || !initialRef.current) return;
        if (!pointsRef.current.geometry.attributes.position) return;

        timeRef.current += delta;
        const time = timeRef.current;
        const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

        // Follow main ring position
        const baseX = -8 + scrollProgress * 16;
        const baseY = 2 - scrollProgress * 6;
        const baseZ = -12 + scrollProgress * 4;

        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2 + time * 0.3;
            const radius = 6.5 + Math.sin(time * 2 + i * 0.1) * 0.5;

            posArray[i * 3] = baseX + Math.cos(angle) * radius + Math.sin(time * 0.3) * 0.1;
            posArray[i * 3 + 1] = baseY + Math.sin(time * 1.5 + i * 0.2) * 0.8 + Math.cos(time * 0.25) * 0.15;
            posArray[i * 3 + 2] = baseZ + Math.sin(angle) * radius;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Rotate with main ring
        pointsRef.current.rotation.x = Math.PI / 4 + scrollProgress * Math.PI * 0.5;
        pointsRef.current.rotation.y = time * 0.08 + scrollProgress * Math.PI;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry />
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

const WireThreadRing: React.FC<WireThreadRingProps> = ({
    scrollProgress = 0
}) => {
    const ringRadius = 6; // Large ring - covers about half the viewport

    return (
        <group>
            {/* Lighting for metallic appearance */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[15, 15, 10]} intensity={1.2} color="#ffffff" />
            <directionalLight position={[-10, -5, 5]} intensity={0.6} color={THEME_COLORS.primary} />
            <pointLight position={[-8, 2, -8]} intensity={1.5} color={THEME_COLORS.primary} distance={20} />
            <pointLight position={[8, -2, -10]} intensity={0.8} color={THEME_COLORS.secondary} distance={15} />
            <spotLight
                position={[0, 10, 0]}
                angle={0.5}
                penumbra={0.5}
                intensity={0.5}
                color="#ffffff"
            />

            {/* Outer glow */}
            <RingGlow scrollProgress={scrollProgress} radius={ringRadius} />

            {/* Inner glow/disc */}
            <InnerGlow scrollProgress={scrollProgress} radius={ringRadius} />

            {/* Main threaded ring structure */}
            <ThreadedRingStructure scrollProgress={scrollProgress} baseRadius={ringRadius} />

            {/* Energy particles */}
            <EnergyParticles scrollProgress={scrollProgress} count={120} />
        </group>
    );
};

export default WireThreadRing;
