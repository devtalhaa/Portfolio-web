"use client";

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
    count?: number;
    color?: string;
}

const ParticleField: React.FC<ParticleFieldProps> = ({
    count = 500,
    color = '#22d3ee'
}) => {
    const pointsRef = useRef<THREE.Points>(null);
    const velocitiesRef = useRef<Float32Array | null>(null);

    useEffect(() => {
        if (!pointsRef.current) return;

        const geometry = pointsRef.current.geometry;
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

            velocities[i * 3] = (Math.random() - 0.5) * 0.01;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        velocitiesRef.current = velocities;
    }, [count]);

    useFrame((state) => {
        if (!pointsRef.current || !velocitiesRef.current) return;
        if (!pointsRef.current.geometry.attributes.position) return;

        const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const velocities = velocitiesRef.current;
        const time = state.clock.elapsedTime;

        for (let i = 0; i < count; i++) {
            posArray[i * 3] += velocities[i * 3];
            posArray[i * 3 + 1] += velocities[i * 3 + 1] + Math.sin(time * 0.5 + i) * 0.002;
            posArray[i * 3 + 2] += velocities[i * 3 + 2];

            if (posArray[i * 3] > 15) posArray[i * 3] = -15;
            if (posArray[i * 3] < -15) posArray[i * 3] = 15;
            if (posArray[i * 3 + 1] > 10) posArray[i * 3 + 1] = -10;
            if (posArray[i * 3 + 1] < -10) posArray[i * 3 + 1] = 10;
            if (posArray[i * 3 + 2] > 7.5) posArray[i * 3 + 2] = -7.5;
            if (posArray[i * 3 + 2] < -7.5) posArray[i * 3 + 2] = 7.5;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.rotation.y = time * 0.02;
        pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry />
            <pointsMaterial
                size={0.08}
                color={color}
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

export default ParticleField;
