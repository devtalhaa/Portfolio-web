"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/Components/common';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const aboutRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
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
    }, { scope: aboutRef });

    return (
        <section ref={aboutRef} className="py-32 px-4 md:px-8 max-w-6xl mx-auto">
            <div className="about-content">
                <h2
                    className="text-4xl md:text-5xl font-bold mb-8"
                    style={{ color: 'var(--text-primary)' }}
                >
                    About <span style={{ color: 'var(--primary)' }}>Me</span>
                </h2>
                <Card className="md:p-12">
                    <p
                        className="text-lg md:text-xl leading-relaxed mb-6"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        I'm a passionate <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Frontend Developer</span> specializing in building responsive and performant web applications.
                        With hands-on experience in React.js, Next.js, and modern CSS frameworks, I transform ideas into pixel-perfect digital realities.
                    </p>
                    <p
                        className="text-lg md:text-xl leading-relaxed"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        Currently, I'm building a comprehensive laundry management system—developing both the admin dashboard and user-facing interfaces.
                        My focus is always on clean code, smooth user experiences, and scalable solutions.
                    </p>
                </Card>
            </div>
        </section>
    );
};

export default About;

