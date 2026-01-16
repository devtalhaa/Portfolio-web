"use client";

import React from 'react';
import Hero from './Hero';
import About from './About';
import Expertise from './Expertise';

const HomePage = () => {
    return (
        <div className="min-h-screen">
            <Hero />
            <About />
            <Expertise />
        </div>
    );
};

export default HomePage;

