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
                "background-dark": "#0f1115",
                "card-dark": "#161b22",
                "accent": "#38bdf8",
                "text-main": "#f0f6fc",
                "text-muted": "#8b949e",
                "border-color": "#30363d",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "body": ["IBM Plex Sans", "sans-serif"],
                "mono": ["JetBrains Mono", "monospace"],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #30363d 1px, transparent 1px), linear-gradient(to bottom, #30363d 1px, transparent 1px)",
            }
        },
    },
    plugins: [],
}