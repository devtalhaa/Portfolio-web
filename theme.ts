// Theme Configuration
// Edit colors here to change the entire project's theme

export const theme = {
    colors: {
        // Primary - Most used accent color (cyan)
        primary: {
            DEFAULT: '#22d3ee', // cyan-400
            light: '#67e8f9',   // cyan-300
            dark: '#06b6d4',    // cyan-500
            hover: '#0891b2',   // cyan-600
        },

        // Secondary - Second most used accent (blue)
        secondary: {
            DEFAULT: '#2563eb', // blue-600
            light: '#3b82f6',   // blue-500
            dark: '#1d4ed8',    // blue-700
        },

        // Background colors
        background: {
            DEFAULT: '#020617', // slate-950 - main background
            surface: '#0f172a', // slate-900 - cards, containers
            elevated: '#1e293b', // slate-800 - elevated elements
        },

        // Border colors
        border: {
            DEFAULT: '#1e293b', // slate-800
            light: '#334155',   // slate-700
            focus: '#22d3ee',   // cyan-400
        },

        // Text colors
        text: {
            primary: '#f1f5f9',   // slate-100 - headings
            secondary: '#cbd5e1', // slate-300 - body text
            muted: '#94a3b8',     // slate-400 - subtle text
            placeholder: '#64748b', // slate-500 - placeholders
        },

        // Status colors
        success: '#22c55e', // green-500
        error: '#ef4444',   // red-500
        warning: '#f59e0b', // amber-500
    },

    // Border radius
    radius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
    },

    // Shadows
    shadows: {
        glow: '0 0 20px rgba(34, 211, 238, 0.3)',
        card: '0 10px 30px -10px rgba(6, 182, 212, 0.3)',
    },

    // Transitions
    transition: {
        fast: '150ms ease',
        normal: '300ms ease',
        slow: '500ms ease',
    },
};

// CSS variable names for use in Tailwind/CSS
export const cssVars = {
    '--color-primary': theme.colors.primary.DEFAULT,
    '--color-primary-light': theme.colors.primary.light,
    '--color-primary-dark': theme.colors.primary.dark,
    '--color-secondary': theme.colors.secondary.DEFAULT,
    '--color-background': theme.colors.background.DEFAULT,
    '--color-surface': theme.colors.background.surface,
    '--color-border': theme.colors.border.DEFAULT,
    '--color-text-primary': theme.colors.text.primary,
    '--color-text-secondary': theme.colors.text.secondary,
};

export default theme;
