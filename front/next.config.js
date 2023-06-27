/** @type {import('next').NextConfig} */
const nextConfig = {
	// reactStrictMode: true, //отключаем строгий режим потому что не все библиотеки с ним работают
	poweredByHeader: false, //убираем метку что сайт сделан на NEXTjs
	env: {
		//чтобы использовать содержимое файла .env в NEXTjs
		APP_SERVER_URL: process.env.APP_SERVER_URL,
	},
	async rewrites() {
		//переписываем пути чтобы localhost:3000/api переходил на localhost:4200/api
		return [
			{
				source: '/api/:path*',
				// destination: 'http://localhost:4200/api/:path*',
				// destination: 'http://host.docker.internal:4200/api/:path*',
				destination: `${process.env.APP_SERVER_URL}/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				// destination: 'http://localhost:4200/uploads/:path*',
				// destination: 'http://host.docker.internal:4200/uploads/:path*',1
				destination: `${process.env.APP_SERVER_URL}/uploads/:path*`,
			},
		]
	},
}

module.exports = nextConfig
