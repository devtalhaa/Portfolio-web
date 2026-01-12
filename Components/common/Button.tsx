import React from 'react';
import theme from '@/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    fullWidth?: boolean;
}

const getVariantStyles = (variant: ButtonVariant): React.CSSProperties => {
    switch (variant) {
        case 'primary':
            return {
                backgroundColor: theme.colors.primary.hover,
                color: '#ffffff',
                border: 'none',
            };
        case 'secondary':
            return {
                backgroundColor: theme.colors.secondary.DEFAULT,
                color: '#ffffff',
                border: 'none',
            };
        case 'outline':
            return {
                backgroundColor: 'transparent',
                color: theme.colors.text.secondary,
                border: `1px solid ${theme.colors.border.light}`,
            };
        case 'ghost':
            return {
                backgroundColor: 'transparent',
                color: theme.colors.text.secondary,
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
        borderRadius: theme.radius.full,
        fontWeight: 600,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: theme.transition.normal,
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
                <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {children}
        </button>
    );
};

export default Button;
