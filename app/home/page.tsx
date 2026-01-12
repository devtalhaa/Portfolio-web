"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillCard } from '@/Components/common';
import { Card } from '@/Components/common';
import theme from '@/theme';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.hero-title', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
        })
            .from('.hero-subtitle', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            }, '-=0.5')
            .from('.hero-cta', {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: 'back.out(1.7)',
            }, '-=0.3');

        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: aboutRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });

        gsap.from('.skill-item', {
            scrollTrigger: {
                trigger: skillsRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            y: 100,
            opacity: 0,
            rotationX: -90,
            transformOrigin: 'bottom',
            duration: 0.8,
            stagger: {
                each: 0.15,
                from: 'start',
            },
            ease: 'back.out(1.2)',
        });

        // Magnetic hover effect for skill cards
        const skillCards = document.querySelectorAll('.skill-item');
        skillCards.forEach((card) => {
            const htmlCard = card as HTMLElement;

            htmlCard.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.1,
                    rotationY: 5,
                    rotationX: 5,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            });

            htmlCard.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            });

            htmlCard.addEventListener('mousemove', (e) => {
                const rect = htmlCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                gsap.to(card, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });
        });
    }, { scope: containerRef });

    const skills = [
        { name: 'React.js', icon: '⚛️', level: 90 },
        { name: 'Next.js', icon: '▲', level: 85 },
        { name: 'Tailwind CSS', icon: '🎨', level: 95 },
        { name: 'Material UI', icon: '💎', level: 80 },
        { name: 'API Integration', icon: '🔌', level: 88 },
        { name: 'Git/GitHub', icon: '📦', level: 90 },
        { name: 'Postman', icon: '📮', level: 85 },
        { name: 'Responsive Design', icon: '📱', level: 92 }
    ];

    return (
        <div ref={containerRef} className="min-h-screen">
            {/* Hero Section */}
            <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
                <div
                    className="absolute inset-0 opacity-80"
                    style={{
                        background: `linear-gradient(to bottom right, ${theme.colors.background.DEFAULT}, ${theme.colors.background.surface}, ${theme.colors.primary.DEFAULT}20)`,
                    }}
                />
                <div
                    className="absolute top-1/4 left-1/4 w-96 h-96 opacity-20 rounded-full blur-3xl animate-pulse"
                    style={{ backgroundColor: theme.colors.primary.DEFAULT }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-20 rounded-full blur-3xl animate-pulse"
                    style={{ backgroundColor: theme.colors.secondary.DEFAULT }}
                />

                <div className="relative z-10 text-center">
                    <h1
                        className="hero-title text-6xl md:text-8xl font-black mb-4"
                        style={{ color: theme.colors.primary.DEFAULT }}
                    >
                        Samsung
                    </h1>
                    <p
                        className="hero-subtitle text-xl md:text-3xl mb-8 font-light"
                        style={{ color: theme.colors.text.muted }}
                    >
                        Crafting Digital Experiences with Code
                    </p>
                    <div className="hero-cta flex gap-4 justify-center flex-wrap">
                        <Link
                            href="/services"
                            className="px-8 py-4 rounded-full text-white font-semibold hover:opacity-90 transition-all duration-300"
                            style={{ backgroundColor: theme.colors.primary.hover }}
                        >
                            Explore Services
                        </Link>
                        <Link
                            href="/contact-us"
                            className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:opacity-80"
                            style={{
                                border: `1px solid ${theme.colors.border.light}`,
                                color: theme.colors.text.secondary,
                            }}
                        >
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section ref={aboutRef} className="py-32 px-4 md:px-8 max-w-6xl mx-auto">
                <div className="about-content">
                    <h2
                        className="text-4xl md:text-5xl font-bold mb-8"
                        style={{ color: theme.colors.text.primary }}
                    >
                        About <span style={{ color: theme.colors.primary.DEFAULT }}>Me</span>
                    </h2>
                    <Card className="md:p-12">
                        <p
                            className="text-lg md:text-xl leading-relaxed mb-6"
                            style={{ color: theme.colors.text.muted }}
                        >
                            I'm a passionate <span style={{ color: theme.colors.primary.DEFAULT, fontWeight: 600 }}>Frontend Developer</span> specializing in building responsive and performant web applications.
                            With hands-on experience in React.js, Next.js, and modern CSS frameworks, I transform ideas into pixel-perfect digital realities.
                        </p>
                        <p
                            className="text-lg md:text-xl leading-relaxed"
                            style={{ color: theme.colors.text.muted }}
                        >
                            Currently, I'm building a comprehensive laundry management system—developing both the admin dashboard and user-facing interfaces.
                            My focus is always on clean code, smooth user experiences, and scalable solutions.
                        </p>
                    </Card>
                </div>
            </section>

            {/* Skills Section */}
            <section ref={skillsRef} className="py-32 px-4 md:px-8 max-w-6xl mx-auto" style={{ perspective: '1000px' }}>
                <h2
                    className="text-4xl md:text-5xl font-bold mb-4 text-center"
                    style={{ color: theme.colors.text.primary }}
                >
                    My <span style={{ color: theme.colors.primary.DEFAULT }}>Expertise</span>
                </h2>
                <p
                    className="text-center mb-16 text-lg"
                    style={{ color: theme.colors.text.muted }}
                >
                    Hover to interact
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <SkillCard
                            key={index}
                            icon={skill.icon}
                            name={skill.name}
                            level={skill.level}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
