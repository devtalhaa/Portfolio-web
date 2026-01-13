import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
};

const inputBaseStyles: React.CSSProperties = {
    backgroundColor: 'var(--background-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '16px 20px',
    color: 'var(--text-primary)',
    width: '100%',
    outline: 'none',
    transition: 'var(--transition-normal)',
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
                    style={{ color: 'var(--text-secondary)' }}
                >
                    {label}
                </label>
            )}
            <input
                {...props}
                style={{
                    ...inputBaseStyles,
                    borderColor: error ? 'var(--error)' : 'var(--border)',
                }}
                className={`placeholder: text - slate - 500 ${className} `}
                onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = error ? 'var(--error)' : 'var(--border)';
                    props.onBlur?.(e);
                }}
            />
            {error && (
                <p className="mt-1 text-sm" style={{ color: 'var(--error)' }}>
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
                    style={{ color: 'var(--text-secondary)' }}
                >
                    {label}
                </label>
            )}
            <textarea
                {...props}
                style={{
                    ...inputBaseStyles,
                    borderColor: error ? 'var(--error)' : 'var(--border)',
                    resize: 'none',
                }}
                className={`placeholder:text-slate-500 ${className}`}
                onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = error ? 'var(--error)' : 'var(--border)';
                    props.onBlur?.(e);
                }}
            />
            {error && (
                <p className="mt-1 text-sm" style={{ color: 'var(--error)' }}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
