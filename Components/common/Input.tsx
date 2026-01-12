import React from 'react';
import theme from '@/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const inputBaseStyles: React.CSSProperties = {
    backgroundColor: theme.colors.background.surface,
    border: `1px solid ${theme.colors.border.DEFAULT}`,
    borderRadius: theme.radius.md,
    padding: '16px 20px',
    color: theme.colors.text.primary,
    width: '100%',
    outline: 'none',
    transition: theme.transition.normal,
};

export const Input: React.FC<InputProps> = ({
    label,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={props.id}
                    className="block font-medium mb-2"
                    style={{ color: theme.colors.text.secondary }}
                >
                    {label}
                </label>
            )}
            <input
                {...props}
                style={{
                    ...inputBaseStyles,
                    borderColor: error ? theme.colors.error : theme.colors.border.DEFAULT,
                }}
                className={`focus:border-[${theme.colors.primary.DEFAULT}] placeholder:text-slate-500 ${className}`}
                onFocus={(e) => {
                    e.target.style.borderColor = theme.colors.primary.DEFAULT;
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = error ? theme.colors.error : theme.colors.border.DEFAULT;
                    props.onBlur?.(e);
                }}
            />
            {error && (
                <p className="mt-1 text-sm" style={{ color: theme.colors.error }}>
                    {error}
                </p>
            )}
        </div>
    );
};

export const TextArea: React.FC<TextAreaProps> = ({
    label,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={props.id}
                    className="block font-medium mb-2"
                    style={{ color: theme.colors.text.secondary }}
                >
                    {label}
                </label>
            )}
            <textarea
                {...props}
                style={{
                    ...inputBaseStyles,
                    borderColor: error ? theme.colors.error : theme.colors.border.DEFAULT,
                    resize: 'none',
                }}
                className={`placeholder:text-slate-500 ${className}`}
                onFocus={(e) => {
                    e.target.style.borderColor = theme.colors.primary.DEFAULT;
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = error ? theme.colors.error : theme.colors.border.DEFAULT;
                    props.onBlur?.(e);
                }}
            />
            {error && (
                <p className="mt-1 text-sm" style={{ color: theme.colors.error }}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
