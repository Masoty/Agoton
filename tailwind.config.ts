import type {Config} from "tailwindcss";

//@ts-ignore
const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                grey: '#454545',
                lightGrey: '#323232',
                violet: '#7F9BE4',
                greyRGBA: 'rgb(29, 28, 28)'
            },
            backgroundImage: {
                "galactic": "url('/galactic.gif')",
                'bg': 'url("/bg.jpg")'
            },
        }
    },
    plugins: [],
};
export default config;
