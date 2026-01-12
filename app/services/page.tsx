"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ServiceCard, Button } from '@/Components/common';
import theme from '@/theme';

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.services-header', {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });

        gsap.from('.service-card', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.3,
        });
    }, { scope: containerRef });

    const services = [
        {
            title: 'Frontend Development',
            description: 'Building blazing-fast, responsive web applications using React.js and Next.js. Pixel-perfect implementations with modern UI/UX practices.',
            icon: '🚀',
            features: ['React.js / Next.js', 'Tailwind CSS', 'Material UI', 'Performance Optimization'],
        },
        {
            title: 'Dashboard Development',
            description: 'Crafting intuitive admin panels and management systems. Data visualization, real-time updates, and seamless user workflows.',
            icon: '📊',
            features: ['Admin Panels', 'Data Visualization', 'Order Management', 'Real-time Updates'],
        },
        {
            title: 'API Integration',
            description: 'Seamless connection between frontend and backend systems. RESTful API integration with robust error handling and debugging.',
            icon: '⚡',
            features: ['REST APIs', 'Error Handling', 'Postman Testing', 'Cross-device Compatibility'],
        },
    ];

    return (
        <div ref={containerRef} className="min-h-screen pt-24 pb-20 px-4 md:px-8">
            {/* Background elements */}
            <div className="fixed inset-0 -z-10">
                <div
                    className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full blur-3xl"
                    style={{ backgroundColor: theme.colors.primary.DEFAULT }}
                />
                <div
                    className="absolute bottom-0 left-0 w-96 h-96 opacity-10 rounded-full blur-3xl"
                    style={{ backgroundColor: theme.colors.secondary.DEFAULT }}
                />
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="services-header text-center mb-20">
                    <span
                        className="font-semibold text-lg tracking-wider uppercase mb-4 block"
                        style={{ color: theme.colors.primary.DEFAULT }}
                    >
                        What I Offer
                    </span>
                    <h1
                        className="text-5xl md:text-7xl font-black mb-6"
                        style={{ color: theme.colors.text.primary }}
                    >
                        My <span style={{ color: theme.colors.primary.DEFAULT }}>Services</span>
                    </h1>
                    <p
                        className="text-xl max-w-2xl mx-auto"
                        style={{ color: theme.colors.text.muted }}
                    >
                        Transforming your ideas into exceptional digital experiences with cutting-edge technologies and creative solutions.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            features={service.features}
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-20">
                    <p
                        className="text-lg mb-6"
                        style={{ color: theme.colors.text.muted }}
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
        </div>
    );
};

export default ServicesPage;
