/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
