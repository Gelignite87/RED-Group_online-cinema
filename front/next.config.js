/** @type {import('next').NextConfig} */
const nextConfig = {
	// reactStrictMode: true, //отключаем строгий режим потому что не все библиотеки с ним работают
	poweredByHeader: false, //убираем метку что сайт сделан на NEXTjs
	optimizeFonts: false,
	env: {
		//чтобы использовать содержимое файла .env в NEXTjs
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
	},
	async rewrites() {
		//переписываем пути чтобы localhost:3000/api переходил на localhost:4200/api
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:4200/api/:path*',
			},
			{
				source: '/uploads/:path*',
				destination: 'http://localhost:4200/uploads/:path*',
			},
		]
	},
}

module.exports = nextConfig
