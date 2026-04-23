/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./script.js",
        "./content.json"
    ],
    safelist: [
        // Syntax highlighting colors for code block
        'text-purple-400',
        'text-yellow-200',
        'text-gray-400',
        'text-blue-400',
        'text-orange-300',
        'text-green-300',
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#3a73f8",
                "primary-hover": "#2563eb",
                "accent": "#38bdf8",
                // Light mode defaults
                "background": "#ffffff",
                "card": "#f5f5f5",
                "text-main": "#111111",
                "text-muted": "#4a5568",
                "border-color": "#e2e8f0",
                // Dark mode variants (used with dark: prefix)
                "background-dark": "#0f1115",
                "card-dark": "#161b22",
                "text-main-dark": "#f0f6fc",
                "text-muted-dark": "#8b949e",
                "border-color-dark": "#30363d",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "body": ["IBM Plex Sans", "sans-serif"],
                "mono": ["JetBrains Mono", "monospace"],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
                'grid-pattern-dark': "linear-gradient(to right, #30363d 1px, transparent 1px), linear-gradient(to bottom, #30363d 1px, transparent 1px)",
            }
        },
    },
    plugins: [],
}