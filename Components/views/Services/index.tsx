"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, BarChart3, Zap, Server } from 'lucide-react';
import { ServiceCard, Button } from '@/Components/common';

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);

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

        tl.from('.services-header', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        })
            .from('.services-subtitle', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
            }, '-=0.4')
            .from('.services-scroller', {
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

        // Clone the services for seamless infinite scroll
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true) as HTMLElement;
            scrollerInner.appendChild(duplicatedItem);
        });

        // Calculate animation duration based on content width
        const scrollWidth = scrollerInner.scrollWidth / 2;
        const duration = scrollWidth / 50; // Adjust speed here (pixels per second)

        // Create infinite scroll animation (no pause on hover)
        gsap.to(scrollerInner, {
            x: -scrollWidth,
            duration: duration,
            ease: 'none',
            repeat: -1,
        });

        return () => {
            gsap.killTweensOf(scrollerInner);
        };
    }, []);

    return (
        <section ref={sectionRef} className="min-h-screen pt-24 pb-20 px-4 md:px-8 overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 -z-10">
                <div
                    className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full blur-3xl"
                    style={{ backgroundColor: 'var(--primary)' }}
                />
                <div
                    className="absolute bottom-0 left-0 w-96 h-96 opacity-10 rounded-full blur-3xl"
                    style={{ backgroundColor: 'var(--secondary)' }}
                />
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <span
                        className="services-header font-semibold text-lg tracking-wider uppercase mb-4 block"
                        style={{ color: 'var(--primary)' }}
                    >
                        What I Offer
                    </span>
                    <h1
                        className="services-header text-5xl md:text-7xl font-black mb-6"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        My <span style={{ color: 'var(--primary)' }}>Services</span>
                    </h1>
                    <p
                        className="services-subtitle text-xl max-w-2xl mx-auto"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        Transforming your ideas into exceptional digital experiences with cutting-edge technologies and creative solutions.
                    </p>
                </div>

                {/* Infinite scrolling container */}
                <div
                    ref={scrollerRef}
                    className="services-scroller relative mb-20"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    }}
                >
                    <div className="scroller-inner flex gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0"
                                style={{
                                    width: '380px',
                                }}
                            >
                                <ServiceCard
                                    icon={service.icon}
                                    title={service.title}
                                    description={service.description}
                                    features={service.features}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <p
                        className="text-lg mb-6"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        Interested in working together?
                    </p>
                    <Link href="/contact-us">
                        <Button variant="primary" size="lg">
                            Let's Talk
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServicesPage;
