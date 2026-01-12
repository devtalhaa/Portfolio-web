import React from 'react';
import theme from '@/theme';

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
        backgroundColor: theme.colors.background.surface,
        border: `1px solid ${theme.colors.border.DEFAULT}`,
        borderRadius: theme.radius.xl,
        transition: theme.transition.normal,
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: glow ? theme.shadows.card : 'none',
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
    icon: string;
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
                background: `linear-gradient(to bottom right, ${theme.colors.background.surface}, ${theme.colors.background.DEFAULT})`,
                border: `1px solid ${theme.colors.border.DEFAULT}`,
                transformStyle: 'preserve-3d',
                boxShadow: theme.shadows.card,
            }}
        >
            {/* Glow effect */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `linear-gradient(to right, transparent, ${theme.colors.primary.DEFAULT}10, transparent)`,
                }}
            />

            <div className="relative z-10">
                <div className="text-4xl mb-3 text-center">{icon}</div>
                <h3
                    className="font-semibold text-center mb-3"
                    style={{ color: theme.colors.text.primary }}
                >
                    {name}
                </h3>

                {/* Skill level bar */}
                <div
                    className="w-full rounded-full h-2 overflow-hidden"
                    style={{ backgroundColor: theme.colors.background.elevated }}
                >
                    <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                            width: `${level}%`,
                            background: `linear-gradient(to right, ${theme.colors.primary.DEFAULT}, ${theme.colors.secondary.DEFAULT})`,
                        }}
                    />
                </div>
                <p
                    className="text-xs text-center mt-2 font-medium"
                    style={{ color: theme.colors.primary.DEFAULT }}
                >
                    {level}%
                </p>
            </div>
        </div>
    );
};

// Service card
interface ServiceCardProps {
    icon: string;
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
                backgroundColor: theme.colors.background.surface,
                border: `1px solid ${theme.colors.border.DEFAULT}`,
                boxShadow: 'inset 0 1px 0 0 rgba(148, 163, 184, 0.1)',
            }}
        >
            <div className="text-5xl mb-6">{icon}</div>
            <h3
                className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors"
                style={{ color: theme.colors.text.primary }}
            >
                {title}
            </h3>
            <p
                className="mb-6 leading-relaxed"
                style={{ color: theme.colors.text.muted }}
            >
                {description}
            </p>
            <div className="space-y-2">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-2"
                        style={{ color: theme.colors.text.placeholder }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: theme.colors.primary.DEFAULT }}
                        />
                        <span className="text-sm">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;
