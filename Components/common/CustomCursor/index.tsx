"use client";

import React, { useEffect, useState } from 'react';

interface TrailDot {
    x: number;
    y: number;
    id: number;
}

const CustomCursor: React.FC = () => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [trail, setTrail] = useState<TrailDot[]>([]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let trailId = 0;
        const maxTrailLength = 50; // Increased for denser trail

        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;

            setCursorPos({ x, y });

            // Add new trail dot
            setTrail(prevTrail => {
                const newDot: TrailDot = { x, y, id: trailId++ };
                return [...prevTrail, newDot].slice(-maxTrailLength);
            });
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseenter', handleMouseEnter);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Fade out trail dots - slower for smoother effect
        const fadeInterval = setInterval(() => {
            setTrail(prevTrail => prevTrail.slice(1));
        }, 36);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('mouseleave', handleMouseLeave);
            clearInterval(fadeInterval);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Custom cursor */}
            <div
                className="pointer-events-none fixed z-[9999] mix-blend-difference"
                style={{
                    left: `${cursorPos.x}px`,
                    top: `${cursorPos.y}px`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {/* Main cursor dot */}
                <div
                    className="rounded-full"
                    style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: 'var(--primary)',
                        boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)',
                    }}
                />
            </div>

            {/* Cursor outer ring */}
            <div
                className="pointer-events-none fixed z-[9998] transition-all duration-150 ease-out"
                style={{
                    left: `${cursorPos.x}px`,
                    top: `${cursorPos.y}px`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div
                    className="rounded-full border-2"
                    style={{
                        width: '40px',
                        height: '40px',
                        borderColor: 'var(--primary)',
                        opacity: 0.3,
                    }}
                />
            </div>

            {/* Blurry trail effect */}
            {trail.map((dot, index) => {
                const opacity = (index + 1) / trail.length;
                const size = 40 + (opacity * 40); // 40-80px

                return (
                    <div
                        key={dot.id}
                        className="pointer-events-none fixed z-[9997] rounded-full"
                        style={{
                            left: `${dot.x}px`,
                            top: `${dot.y}px`,
                            transform: 'translate(-50%, -50%)',
                            width: `${size}px`,
                            height: `${size}px`,
                            background: `radial-gradient(circle, rgba(34, 211, 238, ${opacity * 0.6}) 0%, rgba(34, 211, 238, ${opacity * 0.3}) 40%, transparent 70%)`,
                            filter: `blur(${8 + (opacity * 12)}px)`,
                            opacity: opacity,
                            transition: 'opacity 0.2s ease-out',
                        }}
                    />
                );
            })}
        </>
    );
};

export default CustomCursor;
