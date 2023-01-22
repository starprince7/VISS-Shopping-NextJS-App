/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#89A67E",
                background: "#E8E8E8",
                linkBg: "rgba(137, 166, 126, 0.12)",
                gray: "#9C9C9C",
            }
        }
    },
    plugins: []
}
