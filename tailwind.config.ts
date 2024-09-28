import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				secondary: 'rgb(135, 103, 170,1)',
				'secondary-500': 'rgba(135, 103, 170, 1)',
				primary: 'rgba(232, 100, 83, 1)',
				muted: 'rgba(170, 162, 161, 1)',
				'primary-700': 'rgba(139, 60, 50, 1)',
				tertiary: 'rgba(122, 114, 113, 1)',
			},
		},
	},
	plugins: [],
};
export default config;
