"use client";

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import GeometricRing from './GeometricRing';

const ThreeBackground: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
            setScrollProgress(Math.max(0, Math.min(1, progress)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="fixed inset-0 -z-10"
            style={{
                pointerEvents: 'none',
                background: 'transparent',
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 12], fov: 60 }}
                style={{ background: 'transparent' }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance',
                }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    {/* Geometric Spirograph Ring - visible on all pages */}
                    <GeometricRing scrollProgress={scrollProgress} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
