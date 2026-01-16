"use client";

import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Atom, Triangle, Palette, Gem, Plug, Package, Mail, Smartphone } from 'lucide-react';
import { SkillCard } from '@/Components/common';

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: 'React.js', icon: <Atom className="w-10 h-10" style={{ color: 'var(--primary)' }} />, level: 90 },
    { name: 'Next.js', icon: <Triangle className="w-10 h-10" style={{ color: 'var(--primary)' }} />, level: 85 },
    { name: 'Tailwind CSS', icon: <Palette className="w-10 h-10" style={{ color: 'var(--primary)' }} />, level: 95 },
    { name: 'Material UI', icon: <Gem className="w-10 h-10" style={{ color: 'var(--primary)' }} />, level: 80 },
    { name: 'API Integration', icon: <Plug className="w-10 h-10" style={{ color: 'var(--primary)' }} />, level: 88 },
    { name: 'Git/GitHub', icon: <Package className="w-10 h-10" style={{ color: 'var(--primary)' }} />, level: 90 },
    { name: 'Postman', icon: <Mail className="w-10 h-10" style={{ color: 'var(--primary)' }} />, level: 85 },
    { name: 'Responsive Design', icon: <Smartphone className="w-10 h-10" style={{ color: 'var(--primary)' }} />, level: 92 }
];

const Expertise = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);

    // Scroll-triggered entrance animation
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse',
            }
        });

        tl.from('.expertise-title', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        })
            .from('.expertise-subtitle', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
            }, '-=0.4')
            .from('.skills-scroller', {
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                ease: 'back.out(1.2)',
            }, '-=0.3');
    }, { scope: sectionRef });

    // Infinite horizontal scroll animation
    useEffect(() => {
        if (!scrollerRef.current) return;

        const scroller = scrollerRef.current;
        const scrollerInner = scroller.querySelector('.scroller-inner') as HTMLElement;

        if (!scrollerInner) return;

        // Clone the skills for seamless infinite scroll
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true) as HTMLElement;
            scrollerInner.appendChild(duplicatedItem);
        });

        // Calculate animation duration based on content width
        const scrollWidth = scrollerInner.scrollWidth / 2;
        const duration = scrollWidth / 50; // Adjust speed here (pixels per second)

        // Create infinite scroll animation
        const animation = gsap.to(scrollerInner, {
            x: -scrollWidth,
            duration: duration,
            ease: 'none',
            repeat: -1,
        });

        // Pause on hover
        scroller.addEventListener('mouseenter', () => animation.pause());
        scroller.addEventListener('mouseleave', () => animation.play());

        return () => {
            animation.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-32 px-4 md:px-8 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto">
                <h2
                    className="expertise-title text-4xl md:text-5xl font-bold mb-4 text-center"
                    style={{ color: 'var(--text-primary)' }}
                >
                    My <span style={{ color: 'var(--primary)' }}>Expertise</span>
                </h2>
                <p
                    className="expertise-subtitle text-center mb-16 text-lg"
                    style={{ color: 'var(--text-muted)' }}
                >
                    Hover to pause scrolling
                </p>

                {/* Infinite scrolling container */}
                <div
                    ref={scrollerRef}
                    className="skills-scroller relative"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    }}
                >
                    <div className="scroller-inner flex gap-6">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0"
                                style={{
                                    width: '280px',
                                    perspective: '1000px'
                                }}
                            >
                                <SkillCard
                                    icon={skill.icon}
                                    name={skill.name}
                                    level={skill.level}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Expertise;
