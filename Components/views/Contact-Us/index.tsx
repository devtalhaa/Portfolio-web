"use client";

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Input, TextArea, Button } from '@/Components/common';
import { Card } from '@/Components/common';

const ContactUsPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('.contact-info', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });

        tl.from('.form-field', {
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
        }, '-=0.5');

    }, { scope: containerRef });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Form submitted:', formData);
        console.log('Email would be sent to: dev.talhaa@gmail.com');

        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', location: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <div ref={containerRef} className="min-h-screen pt-24 pb-20 px-4 md:px-8">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div
                    className="absolute top-1/3 left-0 w-96 h-96 opacity-10 rounded-full blur-3xl"
                    style={{ backgroundColor: 'var(--primary)' }}
                />
                <div
                    className="absolute bottom-1/3 right-0 w-96 h-96 opacity-10 rounded-full blur-3xl"
                    style={{ backgroundColor: 'var(--secondary)' }}
                />
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <div className="contact-info">
                        <span
                            className="font-semibold text-lg tracking-wider uppercase mb-4 block"
                            style={{ color: 'var(--primary)' }}
                        >
                            Get in Touch
                        </span>
                        <h1
                            className="text-5xl md:text-6xl font-black mb-6"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Let's <span style={{ color: 'var(--primary)' }}>Connect</span>
                        </h1>
                        <p
                            className="text-lg mb-12 leading-relaxed"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Have a project in mind or just want to chat about frontend development? I'd love to hear from you. Fill out the form and I'll get back to you as soon as possible.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                    style={{
                                        backgroundColor: 'var(--background-elevated)',
                                        border: `1px solid ${'var(--border-light)'}`
                                    }}
                                >
                                    <span className="text-2xl">📧</span>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-placeholder)' }} className="text-sm">Email</p>
                                    <a
                                        href="mailto:dev.talhaa@gmail.com"
                                        className="hover:opacity-80 transition-colors"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        dev.talhaa@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                    style={{
                                        backgroundColor: 'var(--background-elevated)',
                                        border: `1px solid ${'var(--border-light)'}`
                                    }}
                                >
                                    <span className="text-2xl">📍</span>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-placeholder)' }} className="text-sm">Location</p>
                                    <p style={{ color: 'var(--text-primary)' }}>Lahore, Pakistan</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                    style={{
                                        backgroundColor: 'var(--background-elevated)',
                                        border: `1px solid ${'var(--border-light)'}`
                                    }}
                                >
                                    <span className="text-2xl">💼</span>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-placeholder)' }} className="text-sm">LinkedIn</p>
                                    <a
                                        href="https://linkedin.com/in/muhammad-talha-12a40a376"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:opacity-80 transition-colors"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        Connect on LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card className="md:p-10 pb-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="form-field">
                                <Input
                                    label="Full Name *"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="form-field">
                                <Input
                                    label="Email Address *"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="form-field">
                                <Input
                                    label="Your Location"
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="City, Country"
                                />
                            </div>

                            <div className="form-field">
                                <Input
                                    label="Subject *"
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="Project Inquiry"
                                />
                            </div>

                            <div className="form-field">
                                <TextArea
                                    label="Message *"
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                loading={isSubmitting}
                                disabled={isSubmitted}
                                className="form-field mb-2"
                            >
                                {isSubmitted ? 'Message Sent!' : 'Send Message'}
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;

