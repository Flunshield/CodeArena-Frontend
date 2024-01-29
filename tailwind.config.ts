/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            xs: '384px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        extend: {
            colors: {
                primary: '#0D1117',
                secondary: '#161B22',
                tertiari: '#E3E8EF',
                quaternary: '#0F1319',
                error: '#de2916',
                red: '#D63864',
            },
        },
    },
    plugins: [],
}

