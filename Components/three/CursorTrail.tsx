"use client";

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CursorTrailProps {
    count?: number;
    color?: string;
}

const CursorTrail: React.FC<CursorTrailProps> = ({
    count = 50,
    color = '#22d3ee'
}) => {
    const pointsRef = useRef<THREE.Points>(null);
    const { mouse, viewport } = useThree();

    const trail = useRef<THREE.Vector3[]>(
        Array.from({ length: count }, () => new THREE.Vector3())
    );

    useEffect(() => {
        if (!pointsRef.current) return;

        const geometry = pointsRef.current.geometry;
        const positions = new Float32Array(count * 3);

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }, [count]);

    useFrame(() => {
        if (!pointsRef.current) return;
        if (!pointsRef.current.geometry.attributes.position) return;

        const x = (mouse.x * viewport.width) / 2;
        const y = (mouse.y * viewport.height) / 2;

        for (let i = trail.current.length - 1; i > 0; i--) {
            trail.current[i].lerp(trail.current[i - 1], 0.3);
        }

        trail.current[0].set(x, y, 0);

        const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
            posArray[i * 3] = trail.current[i].x;
            posArray[i * 3 + 1] = trail.current[i].y;
            posArray[i * 3 + 2] = trail.current[i].z;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry />
            <pointsMaterial
                size={0.15}
                color={color}
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

export default CursorTrail;
