"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Theme colors - more saturated, no white
const THEME = {
    primary: '#0891b2',      // Darker cyan
    primaryBright: '#22d3ee', // Bright cyan
    primaryDark: '#0e7490',  // Deep cyan
    secondary: '#06b6d4',    // Mid cyan
};

interface GeometricRingProps {
    scrollProgress?: number;
}

// Helper function for torus point
const getTorusPoint = (
    R: number,  // Major radius
    r: number,  // Minor radius (tube)
    u: number,  // Angle around the ring (0 to 2π)
    v: number   // Angle around the tube (0 to 2π)
): THREE.Vector3 => {
    const x = (R + r * Math.cos(v)) * Math.cos(u);
    const y = (R + r * Math.cos(v)) * Math.sin(u);
    const z = r * Math.sin(v);
    return new THREE.Vector3(x, y, z);
};

// Create the symmetric dense ring
const DenseTorusRing: React.FC<GeometricRingProps> = ({ scrollProgress = 0 }) => {
    const groupRef = useRef<THREE.Group>(null);
    const timeRef = useRef(0);
    const positionRef = useRef(new THREE.Vector3(-6, 2, -14));

    // Generate symmetric line pattern
    const lines = useMemo(() => {
        const result: THREE.Line[] = [];

        const R = 8;    // Major radius
        const r = 2;    // Minor radius

        const primaryColor = new THREE.Color(THEME.primary);
        const brightColor = new THREE.Color(THEME.primaryBright);
        const darkColor = new THREE.Color(THEME.primaryDark);

        // LAYER 1: Dense longitudinal lines (around the tube, along the ring)
        // These create the main structural lines
        const longitudinalCount = 192;
        for (let i = 0; i < longitudinalCount; i++) {
            const v = (i / longitudinalCount) * Math.PI * 2; // Position around tube
            const points: THREE.Vector3[] = [];

            const segments = 200;
            for (let j = 0; j <= segments; j++) {
                const u = (j / segments) * Math.PI * 2;
                points.push(getTorusPoint(R, r, u, v));
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const color = primaryColor.clone().lerp(brightColor, i / longitudinalCount);
            const material = new THREE.LineBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.35,
                blending: THREE.NormalBlending,
                depthWrite: false,
            });

            result.push(new THREE.Line(geometry, material));
        }

        // LAYER 2: Dense circumference lines (circles around the tube)
        const circumferenceCount = 240;
        for (let i = 0; i < circumferenceCount; i++) {
            const u = (i / circumferenceCount) * Math.PI * 2; // Position along ring
            const points: THREE.Vector3[] = [];

            const segments = 48;
            for (let j = 0; j <= segments; j++) {
                const v = (j / segments) * Math.PI * 2;
                points.push(getTorusPoint(R, r, u, v));
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const color = darkColor.clone().lerp(primaryColor, i / circumferenceCount);
            const material = new THREE.LineBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.3,
                blending: THREE.NormalBlending,
                depthWrite: false,
            });

            result.push(new THREE.Line(geometry, material));
        }

        // LAYER 3: Spiral lines wrapping around (creates the cross pattern)
        // Forward spirals
        const spiralCount = 145;
        for (let i = 0; i < spiralCount; i++) {
            const offset = (i / spiralCount) * Math.PI * 2;
            const points: THREE.Vector3[] = [];

            const segments = 300;
            const wraps = 12; // How many times spiral wraps around tube
            for (let j = 0; j <= segments; j++) {
                const t = j / segments;
                const u = t * Math.PI * 2;
                const v = offset + t * Math.PI * 2 * wraps;
                points.push(getTorusPoint(R, r, u, v));
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const color = brightColor.clone().lerp(primaryColor, i / spiralCount);
            const material = new THREE.LineBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.32,
                blending: THREE.NormalBlending,
                depthWrite: false,
            });

            result.push(new THREE.Line(geometry, material));
        }

        // LAYER 4: Reverse spirals (opposite direction for symmetry)
        for (let i = 0; i < spiralCount; i++) {
            const offset = (i / spiralCount) * Math.PI * 2;
            const points: THREE.Vector3[] = [];

            const segments = 300;
            const wraps = 12;
            for (let j = 0; j <= segments; j++) {
                const t = j / segments;
                const u = t * Math.PI * 2;
                const v = offset - t * Math.PI * 2 * wraps; // Negative for reverse
                points.push(getTorusPoint(R, r, u, v));
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const color = darkColor.clone().lerp(brightColor, i / spiralCount);
            const material = new THREE.LineBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.28,
                blending: THREE.NormalBlending,
                depthWrite: false,
            });

            result.push(new THREE.Line(geometry, material));
        }

        // LAYER 5: Cross-hatch spirograph lines (short connecting lines)
        const crossCount = 385;
        for (let i = 0; i < crossCount; i++) {
            const t = i / crossCount;
            const u1 = t * Math.PI * 2;
            const v1 = t * Math.PI * 8;

            const twist = 6;
            const u2 = u1 + (Math.PI * 2 / crossCount) * twist;
            const v2 = v1 + Math.PI * 0.5;

            const p1 = getTorusPoint(R, r * 1.02, u1, v1);
            const p2 = getTorusPoint(R, r * 1.02, u2, v2);

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(
                new Float32Array([p1.x, p1.y, p1.z, p2.x, p2.y, p2.z]), 3
            ));

            const color = primaryColor.clone().lerp(brightColor, t);
            const material = new THREE.LineBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.4,
                blending: THREE.NormalBlending,
                depthWrite: false,
            });

            result.push(new THREE.Line(geometry, material));
        }

        // LAYER 6: Reverse cross-hatch for symmetry
        for (let i = 0; i < crossCount; i++) {
            const t = i / crossCount;
            const u1 = t * Math.PI * 2;
            const v1 = -t * Math.PI * 8; // Negative for symmetry

            const twist = -6; // Reverse twist
            const u2 = u1 + (Math.PI * 2 / crossCount) * twist;
            const v2 = v1 - Math.PI * 0.5;

            const p1 = getTorusPoint(R, r * 0.98, u1, v1);
            const p2 = getTorusPoint(R, r * 0.98, u2, v2);

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(
                new Float32Array([p1.x, p1.y, p1.z, p2.x, p2.y, p2.z]), 3
            ));

            const color = darkColor.clone().lerp(primaryColor, t);
            const material = new THREE.LineBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.35,
                blending: THREE.NormalBlending,
                depthWrite: false,
            });

            result.push(new THREE.Line(geometry, material));
        }

        return result;
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        timeRef.current += delta;
        const time = timeRef.current;

        // Frame-rate independent smooth factor (higher = smoother)
        const smoothFactor = 1 - Math.pow(0.001, delta);

        // Scroll-based position with smooth interpolation
        const targetX = -6 + scrollProgress * 14;
        const targetY = 2 - scrollProgress * 7;
        const targetZ = -14 + scrollProgress * 5;

        // Smooth lerp using delta time for consistent 60fps feel
        positionRef.current.x += (targetX - positionRef.current.x) * smoothFactor;
        positionRef.current.y += (targetY - positionRef.current.y) * smoothFactor;
        positionRef.current.z += (targetZ - positionRef.current.z) * smoothFactor;

        // Gentle floating motion (sine waves for smooth oscillation)
        const floatX = Math.sin(time * 0.2) * 0.015;
        const floatY = Math.cos(time * 0.15) * 0.02;

        groupRef.current.position.set(
            positionRef.current.x + floatX,
            positionRef.current.y + floatY,
            positionRef.current.z
        );

        // Smooth rotation using delta time
        groupRef.current.rotation.x = scrollProgress * Math.PI * 0.4 + Math.sin(time * 0.08) * 0.1;
        groupRef.current.rotation.y = time * 0.03 + scrollProgress * Math.PI * 0.25;
        groupRef.current.rotation.z = Math.cos(time * 0.06) * 0.08;

        // Reduced shimmer updates for performance (every 3rd frame)
        if (Math.floor(time * 60) % 3 === 0) {
            const shimmerSpeed = 1.2;
            lines.forEach((line, i) => {
                const material = line.material as THREE.LineBasicMaterial;
                const baseOpacity = material.opacity > 0.55 ? 0.65 : 0.5;
                const pulse = Math.sin(time * shimmerSpeed + i * 0.01) * 0.1 + 0.9;
                material.opacity = baseOpacity * pulse;
            });
        }
    });

    return (
        <group ref={groupRef}>
            {lines.map((line, index) => (
                <primitive key={index} object={line} />
            ))}

            {/* Inner core glow */}
            <mesh>
                <torusGeometry args={[8, 1.6, 24, 120]} />
                <meshBasicMaterial
                    color={THEME.primaryBright}
                    transparent
                    opacity={0.08}
                    blending={THREE.NormalBlending}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Outer halo */}
            <mesh>
                <torusGeometry args={[8, 2.8, 24, 120]} />
                <meshBasicMaterial
                    color={THEME.primaryDark}
                    transparent
                    opacity={0.05}
                    blending={THREE.NormalBlending}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

// Floating particles
const DustParticles: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
    const pointsRef = useRef<THREE.Points>(null);
    const timeRef = useRef(0);
    const count = 200;

    React.useEffect(() => {
        if (!pointsRef.current) return;

        const geometry = pointsRef.current.geometry;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const color = new THREE.Color(THEME.primary);

        for (let i = 0; i < count; i++) {
            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI * 2;
            const R = 8;
            const r = 2.5 + Math.random() * 2;

            positions[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
            positions[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u);
            positions[i * 3 + 2] = r * Math.sin(v);

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

        for (let i = 0; i < count; i++) {
            posArray[i * 3] += Math.sin(time * 0.4 + i) * 0.002;
            posArray[i * 3 + 1] += Math.cos(time * 0.3 + i * 0.5) * 0.002;
            posArray[i * 3 + 2] += Math.sin(time * 0.35 + i * 0.3) * 0.002;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        const offsetX = -6 + scrollProgress * 14;
        const offsetY = 2 - scrollProgress * 7;
        pointsRef.current.position.x = offsetX;
        pointsRef.current.position.y = offsetY;
        pointsRef.current.position.z = -14 + scrollProgress * 5;

        pointsRef.current.rotation.x = scrollProgress * Math.PI * 0.4;
        pointsRef.current.rotation.y = time * 0.03;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry />
            <pointsMaterial
                size={0.04}
                vertexColors
                transparent
                opacity={0.5}
                sizeAttenuation
                blending={THREE.NormalBlending}
                depthWrite={false}
            />
        </points>
    );
};

// Main component
const GeometricRing: React.FC<GeometricRingProps> = ({ scrollProgress = 0 }) => {
    return (
        <group>
            <ambientLight intensity={0.15} />
            <DenseTorusRing scrollProgress={scrollProgress} />
            <DustParticles scrollProgress={scrollProgress} />
        </group>
    );
};

export default GeometricRing;
