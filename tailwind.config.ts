import type { Config } from 'tailwindcss'
import themes from 'daisyui/src/theming/themes'

const colorPalette = {
	primary: {
		// 緑系統,successとプライマリ
		light: '#66A54D',
		main: '#2E7D32',
		dark: '#1E5821',
	},
	seconday: {
		// 赤系統,errorとセカンダリ
		light: '#E3646B',
		main: '#DD2E44',
		dark: '#A22130',
	},
	tertiary: {
		// 黄色系統,warningとテルティアリ
		light: '#F0CB51',
		main: '#E6B422',
		dark: '#B39019',
	},
	bg: {
		white: '#FFFFFF',
		light: '#F9F9F9', // デフォルトの背景色
		dark: '#232323', // ダークモード時の背景色
	},
	text: {
		light: '#232323', // デフォルトのテキスト色
		dark: '#F9F9F9', // ダークモード時のテキスト色
	},
	border: {
		light: '#DDDDDD', // デフォルトのボーダー色
		dark: '#F8F8F8', // ダークモード時のボーダー色
	},
	accent: {
		bg: '#D9D9D9',
		blue: '#3C87E0', // リンク色とinfo
		purple: '#9B59B6',
	},
	other: {
		google: '#2180FC',
		outlook: '#0072C6',
		yahoo: '#720E9E',
		ios: '#000000',
	},
}

const daisyLight = {
	...themes['light'],
	primary: colorPalette['primary']['main'],
	'primary-content': colorPalette['text']['dark'],
	secondary: colorPalette['seconday']['main'],
	'secondary-content': colorPalette['text']['light'],
	accent: colorPalette['accent']['blue'],
	'accent-content': colorPalette['text']['light'],
	neutral: colorPalette['bg']['light'],
	'neutral-content': colorPalette['text']['light'],
	'base-100': colorPalette['bg']['light'],
	'base-200': colorPalette['border']['light'],
	'base-300': colorPalette['accent']['bg'],
	'base-content': colorPalette['text']['light'],
	info: colorPalette['accent']['blue'],
	'info-content': colorPalette['text']['light'],
	success: colorPalette['primary']['main'],
	'success-content': colorPalette['text']['light'],
	warning: colorPalette['tertiary']['main'],
	'warning-content': colorPalette['text']['light'],
	error: colorPalette['seconday']['main'],
	'error-content': colorPalette['text']['light'],
}

const daisyDark = {
	...themes['dark'],
	primary: colorPalette['primary']['main'],
	'primary-content': colorPalette['text']['light'],
	secondary: colorPalette['seconday']['main'],
	'secondary-content': colorPalette['text']['light'],
	accent: colorPalette['accent']['blue'],
	'accent-content': colorPalette['text']['light'],
	neutral: colorPalette['bg']['light'],
	'neutral-content': colorPalette['text']['dark'],
	'base-100': colorPalette['bg']['light'],
	'base-200': colorPalette['border']['dark'],
	'base-300': colorPalette['accent']['bg'],
	'base-content': colorPalette['text']['dark'],
	info: colorPalette['accent']['blue'],
	'info-content': colorPalette['text']['light'],
	success: colorPalette['primary']['main'],
	'success-content': colorPalette['text']['light'],
	warning: colorPalette['tertiary']['main'],
	'warning-content': colorPalette['text']['light'],
	error: colorPalette['seconday']['main'],
	'error-content': colorPalette['text']['light'],
}

const screens = {
	sm: '600px',
	md: '768px',
	lg: '900px',
	xl: '1280px',
	'2xl': '1536px',
}

const config: Config = {
	content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			fontFamily: {
				nicoMoji: ['Nicomoji', 'sans-serif'],
				notojp: ['var(--font-noto-jp)', 'sans-serif'],
			},
			fontSize: {
				xxxs: ['0.375rem', { lineHeight: 'normal' }], // 6px
				xxs: ['0.563rem', { lineHeight: '1rem' }], // 9px
				xs: ['0.625rem', { lineHeight: '1rem' }], // 10px
				sm: ['0.875rem', { lineHeight: '1.25rem' }],
				base: ['1rem', { lineHeight: '1.5rem' }],
				lg: ['1.125rem', { lineHeight: '1.75rem' }],
				xl: ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
				'7xl': ['4.5rem', { lineHeight: '1' }],
				'8xl': ['6rem', { lineHeight: '1' }],
				'9xl': ['8rem', { lineHeight: '1' }],
			},
		},
		colors: {
			...colorPalette,
			...daisyLight,
			'bg-white': colorPalette['bg']['white'],
		},
		screens,
	},
	darkMode: 'class',
	plugins: [require('daisyui')],
	daisyui: {
		styled: true,

		themes: [
			{
				light: {
					...themes['light'],
					...daisyLight,
				},
				// dark: {
				// 	...themes['dark'],
				// 	...daisyDark,
				// },
			},
		],
	},
}

export default config
