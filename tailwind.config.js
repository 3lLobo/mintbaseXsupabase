module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
    theme: {
        extend: {
            fontFamily: {
                jost: ['Jost', 'sans-serif'],
                'work-sans': ['Work Sans', 'sans-serif'],
                cursive: ['Cursive', 'sans-serif'],
            },
            colors: {
                brand: {
                    DEFAULT: '#9510AC',
                    dark: '#0F0111',
                    gray: '#202020',
                    text: '#747474',
                    social: '#2D76F9',
                },
                team: {
                    header: '#252B42',
                    content: '#737373',
                },
                profile: {
                    blue: {
                        50: '#B0B6D0',
                        100: '#90C8EB',
                        200: '#6697E2',
                        300: '#223758',
                        400: '#1D232D',
                    },
                    gray: {
                        200: '#282828',
                        300: '#E5E5E5',
                    },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
