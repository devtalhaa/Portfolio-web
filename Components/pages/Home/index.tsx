"use client";

import React from 'react';
import Hero from './Hero';
import About from './About';
import Expertise from './Expertise';
import ServicesPage from '../Services';
import ContactUsPage from '../Contact-Us';

const HomePage = () => {
    return (
        <div className="min-h-screen">
            <Hero />
            <About />
            <Expertise />
            <ServicesPage />
            <ContactUsPage />
        </div>
    );
};

export default HomePage;

