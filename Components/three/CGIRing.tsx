"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Premium color palette - deep contrast
const COLORS = {
    primary: '#00ffff',      // Bright cyan
    secondary: '#0066ff',    // Deep blue
    accent: '#ff00ff',       // Magenta accent
    highlight: '#ffffff',    // White highlights
    dark: '#001133',         // Deep dark blue
};

interface CGIRingProps {
    scrollProgress?: number;
}

// Single thread strand with high detail
const ThreadStrand: React.FC<{
    baseRadius: number;
    tubeRadius: number;
    offset: number;
    waveAmplitude: number;
    waveFrequency: number;
    color: THREE.Color;
    scrollProgress: number;
    groupPosition: THREE.Vector3;
    groupRotation: THREE.Euler;
}> = ({ baseRadius, tubeRadius, offset, waveAmplitude, waveFrequency, color, scrollProgress, groupPosition, groupRotation }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const timeRef = useRef(Math.random() * Math.PI * 2);

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        timeRef.current += delta * 0.5;

        // Apply parent position and rotation
        meshRef.current.position.copy(groupPosition);
        meshRef.current.rotation.copy(groupRotation);

        // Add individual offset rotation
        meshRef.current.rotation.x += offset * 0.1;
        meshRef.current.rotation.z += offset * 0.05;
    });

    // Create wavy torus geometry for thread-like appearance
    const geometry = useMemo(() => {
        const segments = 256;
        const tubeSegments = 32;
        const geometry = new THREE.TorusGeometry(baseRadius, tubeRadius, tubeSegments, segments);

        // Modify vertices to create wave pattern
        const positions = geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const z = positions.getZ(i);

            const angle = Math.atan2(y, x);
            const wave = Math.sin(angle * waveFrequency + offset) * waveAmplitude;

            const dist = Math.sqrt(x * x + y * y);
            const newDist = dist + wave;

            positions.setX(i, (x / dist) * newDist);
            positions.setY(i, (y / dist) * newDist);
            positions.setZ(i, z + Math.sin(angle * waveFrequency * 0.5 + offset) * waveAmplitude * 0.5);
        }

        geometry.computeVertexNormals();
        return geometry;
    }, [baseRadius, tubeRadius, waveAmplitude, waveFrequency, offset]);

    return (
        <mesh ref={meshRef} geometry={geometry}>
            <meshStandardMaterial
                color={color}
                metalness={0.98}
                roughness={0.02}
                emissive={color}
                emissiveIntensity={0.15}
                envMapIntensity={1.5}
            />
        </mesh>
    );
};

// Main ring structure with many thread strands
const CGIThreadRing: React.FC<CGIRingProps> = ({ scrollProgress = 0 }) => {
    const groupRef = useRef<THREE.Group>(null);
    const timeRef = useRef(0);
    const positionRef = useRef(new THREE.Vector3(-6, 3, -15));
    const rotationRef = useRef(new THREE.Euler(0.3, 0, 0.2));

    // Generate thread configurations - 50 threads for heavy detail
    const threads = useMemo(() => {
        const result = [];
        const threadCount = 50;

        // Color gradient from cyan to blue to magenta
        const colors = [
            new THREE.Color(COLORS.primary),
            new THREE.Color(COLORS.secondary),
            new THREE.Color(COLORS.accent),
        ];

        for (let i = 0; i < threadCount; i++) {
            const t = i / threadCount;
            const layer = Math.floor(i / 10); // 5 layers of 10 threads each

            // Blend colors
            const colorIndex = Math.floor(t * (colors.length - 1));
            const colorT = (t * (colors.length - 1)) % 1;
            const color = colors[colorIndex].clone().lerp(
                colors[Math.min(colorIndex + 1, colors.length - 1)],
                colorT
            );

            result.push({
                baseRadius: 5 + layer * 0.15, // Layered radius
                tubeRadius: 0.02 + Math.random() * 0.02, // Thin threads
                offset: (i / threadCount) * Math.PI * 2,
                waveAmplitude: 0.1 + Math.random() * 0.15,
                waveFrequency: 3 + Math.floor(Math.random() * 5),
                color,
            });
        }

        return result;
    }, []);

    // Additional decorative outer threads
    const outerThreads = useMemo(() => {
        const result = [];
        const count = 30;

        for (let i = 0; i < count; i++) {
            const t = i / count;
            result.push({
                baseRadius: 5.8 + Math.random() * 0.3,
                tubeRadius: 0.015,
                offset: t * Math.PI * 4,
                waveAmplitude: 0.2 + Math.random() * 0.1,
                waveFrequency: 6 + Math.floor(Math.random() * 4),
                color: new THREE.Color(COLORS.highlight).multiplyScalar(0.5 + Math.random() * 0.5),
            });
        }

        return result;
    }, []);

    // Inner accent threads
    const innerThreads = useMemo(() => {
        const result = [];
        const count = 20;

        for (let i = 0; i < count; i++) {
            const t = i / count;
            result.push({
                baseRadius: 4.2 + Math.random() * 0.2,
                tubeRadius: 0.025,
                offset: t * Math.PI * 3,
                waveAmplitude: 0.08,
                waveFrequency: 8,
                color: new THREE.Color(COLORS.accent).lerp(new THREE.Color(COLORS.primary), Math.random()),
            });
        }

        return result;
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        timeRef.current += delta;
        const time = timeRef.current;

        // Scroll-based position movement
        // Moves from top-left to bottom-right as you scroll
        const targetX = -6 + scrollProgress * 14; // -6 to +8
        const targetY = 3 - scrollProgress * 8;   // 3 to -5
        const targetZ = -15 + scrollProgress * 5; // Comes forward slightly

        // Smooth interpolation
        positionRef.current.x += (targetX - positionRef.current.x) * 0.03;
        positionRef.current.y += (targetY - positionRef.current.y) * 0.03;
        positionRef.current.z += (targetZ - positionRef.current.z) * 0.03;

        // Add floating motion
        positionRef.current.x += Math.sin(time * 0.2) * 0.02;
        positionRef.current.y += Math.cos(time * 0.15) * 0.03;

        // Rotation based on scroll and time
        rotationRef.current.x = 0.3 + scrollProgress * Math.PI * 0.4 + Math.sin(time * 0.1) * 0.05;
        rotationRef.current.y = time * 0.05 + scrollProgress * Math.PI * 0.3;
        rotationRef.current.z = 0.2 + Math.cos(time * 0.08) * 0.1 + scrollProgress * 0.5;

        // Apply to group
        groupRef.current.position.copy(positionRef.current);
        groupRef.current.rotation.copy(rotationRef.current);
    });

    return (
        <group ref={groupRef}>
            {/* Main thread strands */}
            {threads.map((thread, index) => (
                <ThreadStrand
                    key={`main-${index}`}
                    {...thread}
                    scrollProgress={scrollProgress}
                    groupPosition={positionRef.current}
                    groupRotation={rotationRef.current}
                />
            ))}

            {/* Outer decorative threads */}
            {outerThreads.map((thread, index) => (
                <ThreadStrand
                    key={`outer-${index}`}
                    {...thread}
                    scrollProgress={scrollProgress}
                    groupPosition={positionRef.current}
                    groupRotation={rotationRef.current}
                />
            ))}

            {/* Inner accent threads */}
            {innerThreads.map((thread, index) => (
                <ThreadStrand
                    key={`inner-${index}`}
                    {...thread}
                    scrollProgress={scrollProgress}
                    groupPosition={positionRef.current}
                    groupRotation={rotationRef.current}
                />
            ))}

            {/* Core glow */}
            <mesh position={positionRef.current} rotation={rotationRef.current}>
                <torusGeometry args={[5, 1.5, 32, 128]} />
                <meshBasicMaterial
                    color={COLORS.primary}
                    transparent
                    opacity={0.03}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Outer halo */}
            <mesh position={positionRef.current} rotation={rotationRef.current}>
                <torusGeometry args={[6, 0.8, 16, 64]} />
                <meshBasicMaterial
                    color={COLORS.secondary}
                    transparent
                    opacity={0.02}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

// Ambient floating particles
const AmbientParticles: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
    const pointsRef = useRef<THREE.Points>(null);
    const timeRef = useRef(0);
    const count = 200;

    React.useEffect(() => {
        if (!pointsRef.current) return;

        const geometry = pointsRef.current.geometry;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const primaryColor = new THREE.Color(COLORS.primary);
        const secondaryColor = new THREE.Color(COLORS.secondary);

        for (let i = 0; i < count; i++) {
            // Distribute around the ring
            const angle = Math.random() * Math.PI * 2;
            const radius = 4 + Math.random() * 4;

            positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 5;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
            positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 5 - 15;

            const color = Math.random() > 0.5 ? primaryColor : secondaryColor;
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }, []);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;
        if (!pointsRef.current.geometry.attributes.position) return;

        timeRef.current += delta;
        const time = timeRef.current;
        const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

        // Move with the ring
        const offsetX = -6 + scrollProgress * 14;
        const offsetY = 3 - scrollProgress * 8;

        for (let i = 0; i < count; i++) {
            posArray[i * 3] += Math.sin(time + i * 0.1) * 0.005;
            posArray[i * 3 + 1] += Math.cos(time * 0.7 + i * 0.1) * 0.005;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Follow ring position
        pointsRef.current.position.x = offsetX * 0.3;
        pointsRef.current.position.y = offsetY * 0.3;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry />
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

// Main component
const CGIRing: React.FC<CGIRingProps> = ({ scrollProgress = 0 }) => {
    return (
        <group>
            {/* Lighting for CGI quality */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[20, 20, 10]} intensity={1.5} color="#ffffff" />
            <directionalLight position={[-15, -10, 5]} intensity={0.8} color={COLORS.primary} />
            <pointLight position={[-6, 3, -10]} intensity={2} color={COLORS.primary} distance={30} decay={2} />
            <pointLight position={[8, -5, -12]} intensity={1.5} color={COLORS.secondary} distance={25} decay={2} />
            <pointLight position={[0, 0, -5]} intensity={0.5} color={COLORS.accent} distance={20} decay={2} />
            <spotLight
                position={[0, 15, 0]}
                angle={0.6}
                penumbra={0.8}
                intensity={1}
                color="#ffffff"
                castShadow
            />

            {/* The CGI Ring */}
            <CGIThreadRing scrollProgress={scrollProgress} />

            {/* Ambient particles */}
            <AmbientParticles scrollProgress={scrollProgress} />
        </group>
    );
};

export default CGIRing;
