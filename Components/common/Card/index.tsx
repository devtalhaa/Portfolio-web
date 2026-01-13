import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
    onClick?: () => void;
    style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hover = false,
    glow = false,
    onClick,
    style,
}) => {
    const baseStyles: React.CSSProperties = {
        backgroundColor: 'var(--background-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        transition: 'var(--transition-normal)',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: glow ? 'var(--shadow-card)' : 'none',
        overflow: 'visible',
        ...style,
    };

    const hoverClasses = hover
        ? 'hover:border-cyan-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10'
        : '';

    return (
        <div
            className={`p-6 md:p-8 ${hoverClasses} ${className}`}
            style={baseStyles}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

// Specialized skill card with 3D effects
interface SkillCardProps {
    icon: React.ReactNode;
    name: string;
    level: number;
    className?: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({
    icon,
    name,
    level,
    className = '',
}) => {
    return (
        <div
            className={`skill-item relative bg-gradient-to-br rounded-2xl p-6 cursor-pointer ${className}`}
            style={{
                background: 'linear-gradient(to bottom right, var(--background-surface), var(--background))',
                border: '1px solid var(--border)',
                transformStyle: 'preserve-3d',
                boxShadow: 'var(--shadow-card)',
            }}
        >
            {/* Glow effect */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: 'linear-gradient(to right, transparent, color-mix(in srgb, var(--primary), transparent 90%), transparent)',
                }}
            />

            <div className="relative z-10">
                <div className="text-4xl mb-3 text-center flex justify-center">{icon}</div>
                <h3
                    className="font-semibold text-center mb-3"
                    style={{ color: 'var(--text-primary)' }}
                >
                    {name}
                </h3>

                {/* Skill level bar */}
                <div
                    className="w-full rounded-full h-2 overflow-hidden"
                    style={{ backgroundColor: 'var(--background-elevated)' }}
                >
                    <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                            width: `${level}%`,
                            background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                        }}
                    />
                </div>
                <p
                    className="text-xs text-center mt-2 font-medium"
                    style={{ color: 'var(--primary)' }}
                >
                    {level}%
                </p>
            </div>
        </div>
    );
};

// Service card
interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
    icon,
    title,
    description,
    features,
    className = '',
}) => {
    return (
        <div
            className={`service-card group rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}
            style={{
                backgroundColor: 'var(--background-surface)',
                border: '1px solid var(--border)',
                boxShadow: 'inset 0 1px 0 0 rgba(148, 163, 184, 0.1)',
            }}
        >
            <div className="text-5xl mb-6 flex justify-center">{icon}</div>
            <h3
                className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors"
                style={{ color: 'var(--text-primary)' }}
            >
                {title}
            </h3>
            <p
                className="mb-6 leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
            >
                {description}
            </p>
            <div className="space-y-2">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-2"
                        style={{ color: 'var(--text-placeholder)' }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: 'var(--primary)' }}
                        />
                        <span className="text-sm">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;
