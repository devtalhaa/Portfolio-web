"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu } from 'lucide-react';

const Navbar = () => {
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    const navLinks = [
        { href: '/home', label: 'Home' },
        { href: '/services', label: 'Services' },
        { href: '/contact-us', label: 'Contact Us' },
    ];

    useEffect(() => {
        // Initial animation - navbar slides in from top
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
        );

        // Stagger animation for nav links
        if (linksRef.current) {
            gsap.fromTo(linksRef.current.children,
                { y: -20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out',
                    delay: 0.5
                }
            );
        }
    }, []);

    // Move indicator to active link
    useEffect(() => {
        if (linksRef.current && indicatorRef.current) {
            const activeLink = linksRef.current.querySelector(`[data-active="true"]`) as HTMLElement;
            if (activeLink) {
                gsap.to(indicatorRef.current, {
                    width: activeLink.offsetWidth,
                    x: activeLink.offsetLeft,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        }
    }, [pathname]);

    return (
        <nav
            ref={navRef}
            className="fixed top-0 w-full z-50 backdrop-blur-xl"
            style={{
                background: 'linear-gradient(to right, var(--background)ee, var(--background-surface)dd)',
                borderBottom: '1px solid var(--border)',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    {/* Logo with hover animation */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/home"
                            className="flex items-center group"
                        >
                            <div className="relative overflow-hidden rounded-lg p-1 transition-all duration-300 group-hover:scale-105">
                                <Image
                                    src="/logo.svg"
                                    alt="Logo"
                                    width={120}
                                    height={40}
                                    className="h-10 w-auto relative z-10 transition-transform duration-300 group-hover:animate-pulse"
                                />
                                {/* Glow effect on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"
                                    style={{ backgroundColor: 'var(--primary)' }}
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Navigation links with animated indicator - CENTERED */}
                    <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div
                            ref={linksRef}
                            className="relative flex items-center space-x-1"
                        >
                            {/* Animated underline indicator */}
                            <div
                                ref={indicatorRef}
                                className="absolute bottom-0 h-0.5 rounded-full transition-all"
                                style={{
                                    backgroundColor: 'var(--primary)',
                                    boxShadow: 'var(--shadow-glow)',
                                }}
                            />

                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        data-active={isActive}
                                        className="relative px-5 py-2.5 text-base font-medium transition-all duration-300 rounded-lg group"
                                        style={{
                                            color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                                        }}
                                    >
                                        {/* Hover background */}
                                        <span
                                            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
                                        />

                                        {/* Text with hover effect */}
                                        <span className="relative z-10 group-hover:text-cyan-400 transition-colors duration-300">
                                            {link.label}
                                        </span>

                                        {/* Active dot indicator */}
                                        {isActive && (
                                            <span
                                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full animate-pulse"
                                                style={{ backgroundColor: 'var(--primary)' }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile menu button (placeholder for future) */}
                    <div className="md:hidden">
                        <button
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
