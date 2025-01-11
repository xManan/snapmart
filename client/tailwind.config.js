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
                'sm-green': 'var(--green)',
                'sm-orange': 'var(--orange)',
                'sm-light-green': 'var(--light-green)',
                'sm-cream-green': 'var(--cream-green)',
            },
            fontFamily: {
                sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
}
