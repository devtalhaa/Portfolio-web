import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    fullWidth?: boolean;
};

const getVariantStyles = (variant: ButtonVariant): React.CSSProperties => {
    switch (variant) {
        case 'primary':
            return {
                backgroundColor: 'var(--primary-hover)',
                color: '#ffffff',
                border: 'none',
            };
        case 'secondary':
            return {
                backgroundColor: 'var(--secondary)',
                color: '#ffffff',
                border: 'none',
            };
        case 'outline':
            return {
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-light)',
            };
        case 'ghost':
            return {
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                border: 'none',
            };
        default:
            return {};
    }
};

const getSizeStyles = (size: ButtonSize): React.CSSProperties => {
    switch (size) {
        case 'sm':
            return {
                padding: '8px 16px',
                fontSize: '14px',
            };
        case 'md':
            return {
                padding: '12px 24px',
                fontSize: '16px',
            };
        case 'lg':
            return {
                padding: '16px 32px',
                fontSize: '18px',
            };
        default:
            return {};
    }
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    disabled,
    children,
    className = '',
    style,
    ...props
}) => {
    const baseStyles: React.CSSProperties = {
        borderRadius: 'var(--radius-full)',
        fontWeight: 600,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'var(--transition-normal)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: fullWidth ? '100%' : 'auto',
        ...getVariantStyles(variant),
        ...getSizeStyles(size),
        ...style,
    };

    return (
        <button
            {...props}
            disabled={disabled || loading}
            style={baseStyles}
            className={`hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] ${className}`}
        >
            {loading && (
                <Loader2 className="animate-spin h-4 w-4" />
            )}
            {children}
        </button>
    );
};

export default Button;
