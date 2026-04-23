/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./script.js",
        "./content.json"
    ],
    safelist: [
        // Syntax highlighting colors for code block - Light mode
        'text-purple-600',
        'text-blue-600',
        'text-orange-600',
        'text-green-600',
        'text-gray-500',
        // Syntax highlighting colors for code block - Dark mode
        'text-purple-400',
        'text-yellow-200',
        'text-blue-400',
        'text-orange-300',
        'text-green-300',
        'text-gray-400',
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#a855f7",
                "primary-hover": "#9333ea",
                // Light mode defaults
                "background": "#fafafa",
                "card": "#ffffff",
                "accent": "#9333ea",
                "text-main": "#111827",
                "text-muted": "#4b5563",
                "border-color": "#e5e7eb",
                // Dark mode variants
                "background-dark": "#121212",
                "card-dark": "#1e1e1e",
                "accent-dark": "#c084fc",
                "text-main-dark": "#f0f6fc",
                "text-muted-dark": "#8b949e",
                "border-color-dark": "#2d2d2d",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "body": ["IBM Plex Sans", "sans-serif"],
                "mono": ["JetBrains Mono", "monospace"],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
                'grid-pattern-dark': "linear-gradient(to right, #2d2d2d 1px, transparent 1px), linear-gradient(to bottom, #2d2d2d 1px, transparent 1px)",
            }
        },
    },
    plugins: [],
}