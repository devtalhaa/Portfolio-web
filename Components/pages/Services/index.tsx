"use client";

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Rocket, BarChart3, Zap, Server } from 'lucide-react';
import { ServiceCard, Button } from '@/Components/common';

const ServicesPage = () => {
    const pathname = usePathname();
    const isServicesPage = pathname === '/services';
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let animationFrameId: number;
        const startTime = Date.now();
        const animate = () => {
            // Calculate time elapsed in seconds since mount
            const elapsed = (Date.now() - startTime) / 1000;
            setTime(elapsed);
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const services = [
        {
            title: 'Frontend Development',
            description: 'Building blazing-fast, responsive web applications using React.js and Next.js. Pixel-perfect implementations with modern UI/UX practices.',
            icon: <Rocket className="w-12 h-12" style={{ color: 'var(--primary)' }} />,
            features: ['React.js / Next.js', 'Tailwind CSS', 'Material UI', 'Performance Optimization'],
        },
        {
            title: 'Backend Development',
            description: 'Developing robust server-side applications with Python. Building RESTful APIs, database management, and scalable backend architectures.',
            icon: <Server className="w-12 h-12" style={{ color: 'var(--primary)' }} />,
            features: ['Python / Django', 'FastAPI / Flask', 'PostgreSQL / MongoDB', 'API Development'],
        },
        {
            title: 'Dashboard Development',
            description: 'Crafting intuitive admin panels and management systems. Data visualization, real-time updates, and seamless user workflows.',
            icon: <BarChart3 className="w-12 h-12" style={{ color: 'var(--primary)' }} />,
            features: ['Admin Panels', 'Data Visualization', 'Order Management', 'Real-time Updates'],
        },
        {
            title: 'API Integration',
            description: 'Seamless connection between frontend and backend systems. RESTful API integration with robust error handling and debugging.',
            icon: <Zap className="w-12 h-12" style={{ color: 'var(--primary)' }} />,
            features: ['REST APIs', 'Error Handling', 'Postman Testing', 'Cross-device Compatibility'],
        },
    ];

    const cardCount = services.length;

    // Track scroll and calculate which card should be active
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top; // Negative as we scroll down
            const windowHeight = window.innerHeight;

            // Total scrollable distance for the card sequence
            // We want 1 card = 1 viewport height of scroll roughly
            // Increase this to "slow down" the scroll
            const scrollPerCard = windowHeight * 0.8;

            // Calculate progress
            const rawIndex = Math.abs(sectionTop) / scrollPerCard;

            const clampedIndex = Math.max(0, Math.min(cardCount - 1, rawIndex));

            setActiveIndex(clampedIndex);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [cardCount]);

    // Calculate card position and rotation in the fan carousel
    const getCardStyle = (index: number) => {
        // Position relative to active card (-2, -1, 0, 1, 2...)
        const relativePosition = index - activeIndex;
        const absPos = Math.abs(relativePosition);

        // Card spread settings - TIGHTER layout
        const spreadX = 120; // Reduced horizontal spread
        const spreadY = 20;  // Reduced vertical offset
        const maxRotation = 18; // Rotation angle
        const scaleReduction = 0.06; // Scale reduction per position

        // Calculate horizontal position (cards stack closer)
        const translateX = relativePosition * spreadX;

        // Calculate vertical position (slight curve down)
        const translateY = absPos * spreadY;

        // Calculate rotation (left cards rotate counterclockwise, right clockwise)
        const rotation = relativePosition * maxRotation;

        // Calculate scale (center = 1, edges smaller - makes side cards 50% visible feel)
        const scale = Math.max(0.7, 1 - absPos * scaleReduction);

        // Calculate opacity (side cards more faded)
        const opacity = Math.max(0.4, 1 - absPos * 0.3);

        // Z-index: cards CLOSER to center are ON TOP (higher z-index)
        const zIndex = 100 - Math.round(absPos * 10);

        // Floating animation for active card only
        // Time comes from state to avoid hydration mismatch

        const isActive = absPos < 0.5;
        const floatY = isActive ? Math.sin(time * 0.5) * 4 : 0;
        const floatRotate = isActive ? Math.sin(time * 0.3) * 1.5 : 0;

        return {
            transform: `
                translateX(${translateX}px)
                translateY(${translateY + floatY}px)
                rotate(${rotation + floatRotate}deg)
                scale(${scale})
            `,
            opacity,
            zIndex,
            transition: 'transform 0.12s ease-out, opacity 0.2s ease-out',
            pointerEvents: (absPos < 0.5 ? 'auto' : 'none') as 'auto' | 'none',
        };
    };

    return (
        <section
            ref={sectionRef}
            className="relative"
            style={{
                // Height = viewport (sticky) + scroll distance for cards
                // Increased scale for slower scroll and spaced out footer
                height: `${(cardCount * 120) + 100}vh`
            }}
        >
            {/* 
              STICKY CONTAINER
              Occupies 100vh and sticks to top. 
              Holds Header + Cards.
              Flex justify-center ensures cards are VERTICALLY CENTERED when locked.
              NO overflow-hidden, so cards can float outside bounds if needed.
            */}
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">

                {/* Gradient overlays (Inside sticky so they stay put) */}
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                    <div
                        className="absolute top-0 right-0 w-[700px] h-[700px] opacity-10 rounded-full blur-[120px]"
                        style={{
                            backgroundColor: 'var(--primary)',
                            transform: `translate(${activeIndex * 30}px, ${activeIndex * -20}px)`,
                            transition: 'transform 0.5s ease-out'
                        }}
                    />
                    <div
                        className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-8 rounded-full blur-[100px]"
                        style={{
                            backgroundColor: 'var(--secondary)',
                            transform: `translate(${activeIndex * -20}px, ${activeIndex * 15}px)`,
                            transition: 'transform 0.5s ease-out'
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto relative w-full px-4" style={{ zIndex: 10 }}>
                    {/* Header - Absolute top to stay out of the way of centered cards */}
                    {/* Fades out as you scroll to focus on cards */}
                    <div className="absolute top-[-35vh] left-0 right-0 text-center transition-opacity duration-500"
                        style={{ opacity: activeIndex > 0.3 ? 0 : 1, pointerEvents: activeIndex > 0.3 ? 'none' : 'auto' }}
                    >
                        <span
                            className="font-semibold text-lg tracking-wider uppercase mb-4 block"
                            style={{
                                color: 'var(--primary)',
                                textShadow: '0 0 40px rgba(34, 211, 238, 0.6)'
                            }}
                        >
                            What We Offer
                        </span>
                        <h1
                            className="text-5xl md:text-7xl font-black mb-4"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            My <span
                                style={{
                                    color: 'var(--primary)',
                                    textShadow: '0 0 50px rgba(34, 211, 238, 0.5)'
                                }}
                            >Services</span>
                        </h1>
                        <p
                            className="text-lg max-w-2xl mx-auto"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Transforming ideas into exceptional digital experiences
                        </p>
                    </div>

                    {/* Scroll instruction */}
                    {isServicesPage && (
                        <div
                            className="absolute bottom-[-35vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                            style={{
                                opacity: activeIndex < 0.5 ? 1 : 0,
                                zIndex: 100,
                                transition: 'opacity 0.3s ease',
                                pointerEvents: activeIndex > 0.5 ? 'none' : 'auto'
                            }}
                        >
                            <span
                                className="text-sm font-medium px-4 py-2 rounded-full"
                                style={{
                                    color: 'var(--primary)',
                                    backgroundColor: 'rgba(34, 211, 238, 0.1)',
                                    border: '1px solid rgba(34, 211, 238, 0.3)'
                                }}
                            >
                                Scroll to explore services
                            </span>
                            <div className="animate-bounce">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--primary)' }}>
                                    <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* Card progress indicator */}
                    {isServicesPage && (
                        <div
                            className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 hidden md:flex"
                            style={{ zIndex: 100 }}
                        >
                            {services.map((_, index) => (
                                <div
                                    key={index}
                                    className="w-2 h-2 rounded-full transition-all duration-300"
                                    style={{
                                        backgroundColor: Math.round(activeIndex) === index
                                            ? 'var(--primary)'
                                            : 'var(--border)',
                                        boxShadow: Math.round(activeIndex) === index
                                            ? '0 0 10px rgba(34, 211, 238, 0.6)'
                                            : 'none',
                                        transform: Math.round(activeIndex) === index
                                            ? 'scale(1.5)'
                                            : 'scale(1)',
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Fan Carousel Cards Container */}
                    <div
                        className="flex items-center justify-center overflow-visible"
                        style={{
                            height: '500px',
                            perspective: '2000px',
                        }}
                    >
                        <div
                            className="relative w-full flex items-end justify-center"
                            style={{
                                transformStyle: 'preserve-3d',
                                height: '500px',
                            }}
                        >
                            {services.map((service, index) => {
                                const cardStyle = getCardStyle(index);

                                return (
                                    <div
                                        key={index}
                                        className="absolute w-[320px] md:w-[360px] origin-bottom"
                                        style={{
                                            ...cardStyle,
                                            transformStyle: 'preserve-3d',
                                            bottom: '50px',
                                        }}
                                    >
                                        {/* Card glow */}
                                        <div
                                            className="absolute inset-0 rounded-2xl opacity-40 blur-xl -z-10"
                                            style={{
                                                background: `linear-gradient(135deg, var(--primary), var(--secondary))`,
                                                transform: 'scale(1.05) translateY(10px)',
                                            }}
                                        />

                                        {/* Card container with theme styling */}
                                        <div
                                            className="rounded-2xl overflow-hidden"
                                            style={{
                                                backgroundColor: 'var(--background-card)',
                                                border: '1px solid var(--border)',
                                                boxShadow: `
                                                    0 25px 60px -15px rgba(0, 0, 0, 0.6),
                                                    0 0 30px rgba(34, 211, 238, 0.08)
                                                `,
                                            }}
                                        >
                                            <ServiceCard
                                                icon={service.icon}
                                                title={service.title}
                                                description={service.description}
                                                features={service.features}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA at bottom - reveals when sticky container unsticks */}
            <div
                className="absolute bottom-0 w-full text-center py-20 pb-40"
            >
                <h2
                    className="text-3xl font-bold mb-6"
                    style={{ color: 'var(--text-primary)' }}
                >
                    Ready to build something amazing?
                </h2>
                <Link href="/contact-us">
                    <Button variant="primary" size="lg">
                        Let's Talk
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default ServicesPage;
