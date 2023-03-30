/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
  content: [],
=======
    content: [
<<<<<<< HEAD
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
      ],
>>>>>>> first commit, config proyect whit vue
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
=======
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            keyframes: {
                'fade-in-down': {
                    "from": {
                        transform: "translateY(-0.75rem)",
                        opacity: '0'
                    },
                    "to": {
                        transform: "translateY(0rem)",
                        opacity: '1'
                    },
                },
            },
            animation: {
                'fade-in-down': "fade-in-down 0.2s ease-in-out both",
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
>>>>>>> Commit for test
}
