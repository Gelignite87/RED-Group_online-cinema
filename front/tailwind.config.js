/** @type {import('tailwindcss').Config} */
//аннотация помогает редактору понимать, что объект, экспортируемый с помощью module.exports, должен соответствовать типу конфигурации Tailwind. Благодаря этому, при добавлении свойств, таких как theme, content и plugins, разработчик получает подсказки и автодополнение, что упрощает настройку конфигурации и помогает избежать ошибок

const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
const primary = '#E30B13'

module.exports = {
	content: [
		//указываем tailwind папки в которых он будет работать
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./application/components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		colors: {
			//удаляем все цвета из tailwind и прописываем свои цвета
			primary,
			black: colors.black,
			white: colors.white,
			transparent: colors.transparent,
			yellow: '#F5C521',
			gray: {
				300: '#d9dae8',
				500: '#999AA5',
				600: '#66676E',
				700: '#39393F',
				800: '#242529',
				900: '#191B1F',
				950: '#101215',
			},
			opacityGrey: {
				500: 'rgba(80, 80, 80, 0.80)',
				900: 'rgba(10, 10, 10, 0.2)',
			},
		},
		extend: {
			//расширения (добавляем промежуточные значения которых нам не хватает)
			spacing: {
				0.5: '0.12rem',
				layout: '2.75rem',
			},
			fontSize: {
				'2lg': '1.38rem',
			},
			borderRadius: {
				image: '0.5rem',
				layout: '0.8rem',
			},
			transitionTimingFunction: {
				DEFAULT: 'ease-in-out', //меняем дефолтное значение
			},
			transitionDuration: {
				DEFAULT: '200ms', //меняем дефолтное значение
			},
			zIndex: {
				1: '1',
				2: '2',
				3: '3',
			},
			keyframes: {
				fade: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				scaleIn: {
					'0%': {
						opacity: 0,
						transform: 'scale(0.9)',
					},
					'50%': {
						opacity: 0.3,
					},
					'100%': {
						opacity: 1,
						transform: 'scale(1)',
					},
				},
			},
			animation: {
				fade: 'fade .5s ease-in-out',
				scaleIn: 'scaleIn .35s ease-in-out',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		//плагин @tailwindcss/forms предназначен для стилизации форм и их элементов, таких как input, select, textarea, checkbox, radio, и других. Пример: class="form-input"
		require('@tailwindcss/aspect-ratio'),
		//плагин @tailwindcss/aspect-ratio используется для контроля соотношения сторон (aspect ratio) у элементов, таких как видео, изображения, блоки и контейнеры. Пример: class="aspect-w-16 aspect-h-9" (соотношение сторон 16:9)
		plugin(({ addComponents, theme, addUtilities }) => {
			//addComponents - комплексные компоненты, theme - ссылка на то, что мы написали ранее, addUtilities - мелкие утилитарные классы
			addComponents({
				//на addComponents не действуют медиазапросы и вариации состояний (например, hover, focus). Их нужно прописывать самостоятельно
				'.btn-primary': {
					backgroundColor: primary,
					color: '#fff',
					borderRadius: '0.65rem',
					transition: 'background-color .3s ease-in-out',
					'&:hover': {
						backgroundColor: '#ff0009',
					},
				},
				'.text-link': {
					textUnderLineOffset: 4,
					color: 'rgba(255,255,255,.9)',
					transition: 'text-decoration-color .3s ease-in-out',
					textDecorationLine: 'underline',
					textDecorationColor: 'rgba(255,255,255,.2)',
					'&:hover': {
						textDecorationColor: 'rgba(255,255,255,.9)',
					},
				},
				'.air-block': {
					borderRadius: theme('borderRadius.layout'),
					backgroundColor: theme('colors.grey.950'),
					color: theme('colors.white'),
					boxShadow: theme('boxShadow.lg'),
				},
			}),
				addUtilities({
					//на addUtilities действуют медиазапросы и вариации состояний (например, hover, focus)
					'.text-shadow': {
						textShadow: '1px 1px rgba(0,0,0,0.4)',
					},
					'.outline-border-none': {
						outline: 'none',
						border: 'none',
					},
					'.flex-center-between': {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					},
					'.image-like-bg': {
						objectPosition: 'center',
						objectFit: 'cover',
						pointerEvents: 'none',
					},
				})
		}),
	],
}
