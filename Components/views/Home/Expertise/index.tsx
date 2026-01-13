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
    const skillsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
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
    }, { scope: skillsRef });

    useEffect(() => {
        // Magnetic hover effect for skill cards
        const skillCards = document.querySelectorAll('.skill-item');
        const handlers: Array<{
            card: Element;
            enter: () => void;
            leave: () => void;
            move: (e: MouseEvent) => void;
        }> = [];

        skillCards.forEach((card) => {
            const htmlCard = card as HTMLElement;

            const enter = () => {
                gsap.to(card, {
                    scale: 1.1,
                    rotationY: 5,
                    rotationX: 5,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            };

            const leave = () => {
                gsap.to(card, {
                    scale: 1,
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            };

            const move = (e: MouseEvent) => {
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
            };

            htmlCard.addEventListener('mouseenter', enter);
            htmlCard.addEventListener('mouseleave', leave);
            htmlCard.addEventListener('mousemove', move);

            handlers.push({ card, enter, leave, move });
        });

        return () => {
            handlers.forEach(({ card, enter, leave, move }) => {
                const htmlCard = card as HTMLElement;
                htmlCard.removeEventListener('mouseenter', enter);
                htmlCard.removeEventListener('mouseleave', leave);
                htmlCard.removeEventListener('mousemove', move);
            });
        };
    }, []);

    return (
        <section ref={skillsRef} className="py-32 px-4 md:px-8 max-w-6xl mx-auto" style={{ perspective: '1000px' }}>
            <h2
                className="text-4xl md:text-5xl font-bold mb-4 text-center"
                style={{ color: 'var(--text-primary)' }}
            >
                My <span style={{ color: 'var(--primary)' }}>Expertise</span>
            </h2>
            <p
                className="text-center mb-16 text-lg"
                style={{ color: 'var(--text-muted)' }}
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
    );
};

export default Expertise;
