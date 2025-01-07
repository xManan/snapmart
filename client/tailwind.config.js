/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            borderRadius: {
            },
            colors: {
                pgreen: 'var(--primary-green)',
                porange: 'var(--primary-orange)',
            },
            fontFamily: {
                sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
}
