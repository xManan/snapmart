const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        flowbite.content(),
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
            animation: {
                slide: 'slide 3s ease-in-out infinite',
            },
        }
    },
    plugins: [
        require("tailwindcss-animate"),
        flowbite.plugin(),
    ],
}
