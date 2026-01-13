"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);

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
    }, { scope: heroRef });

    return (
        <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
            <div
                className="absolute inset-0 opacity-80"
                style={{
                    background: `linear-gradient(to bottom right, var(--background), var(--background-surface), color-mix(in srgb, var(--primary), transparent 80%))`,
                }}
            />
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 opacity-20 rounded-full blur-3xl animate-pulse"
                style={{ backgroundColor: 'var(--primary)' }}
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-20 rounded-full blur-3xl animate-pulse"
                style={{ backgroundColor: 'var(--secondary)' }}
            />

            <div className="relative z-10 text-center">
                <h1
                    className="hero-title text-6xl md:text-8xl font-black mb-4"
                    style={{ color: 'var(--primary)' }}
                >
                    Samsung
                </h1>
                <p
                    className="hero-subtitle text-xl md:text-3xl mb-8 font-light"
                    style={{ color: 'var(--text-muted)' }}
                >
                    Crafting Digital Experiences with Code
                </p>
                <div className="hero-cta flex gap-4 justify-center flex-wrap">
                    <Link
                        href="/services"
                        className="px-8 py-4 rounded-full text-white font-semibold hover:opacity-90 transition-all duration-300"
                        style={{ backgroundColor: 'var(--primary-hover)' }}
                    >
                        Explore Services
                    </Link>
                    <Link
                        href="/contact-us"
                        className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:opacity-80"
                        style={{
                            border: '1px solid var(--border-light)',
                            color: 'var(--text-secondary)',
                        }}
                    >
                        Get In Touch
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;

