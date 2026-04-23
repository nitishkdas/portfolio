/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./script.js",
        "./content.json"
    ],
    safelist: [
        // Syntax highlighting colors for code block - Dark mode only
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
                // Dark mode only (no light: prefix needed)
                "background": "#121212",
                "card": "#1e1e1e",
                "accent": "#c084fc",
                "text-main": "#f0f6fc",
                "text-muted": "#8b949e",
                "border-color": "#2d2d2d",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "body": ["IBM Plex Sans", "sans-serif"],
                "mono": ["JetBrains Mono", "monospace"],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #2d2d2d 1px, transparent 1px), linear-gradient(to bottom, #2d2d2d 1px, transparent 1px)",
            }
        },
    },
    plugins: [],
}