/** @type {import('next').NextConfig} */
const nextConfig = {
	// reactStrictMode: true, //отключаем строгий режим потому что не все библиотеки с ним работают
	poweredByHeader: false, //убираем метку что сайт сделан на NEXT
	env: {
		//чтобы использовать содержимое файла .env
		APP_SERVER_URL: process.env.APP_SERVER_URL,
		APP_URL_CANONICAL: process.env.APP_URL_CANONICAL,
	},
	async rewrites() {
		//редирект путей без хоста
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.APP_SERVER_URL}/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `${process.env.APP_SERVER_URL}/uploads/:path*`,
			},
		]
	},
}

module.exports = nextConfig
