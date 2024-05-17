import type { Config } from 'tailwindcss';
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ["'Space Grotesk Variable'", 'sans']
			}
		}
	},

	plugins: []
} satisfies Config;
