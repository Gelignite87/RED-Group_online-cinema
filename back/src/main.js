import colors from 'colors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'

import { connectMongoDB } from './config/mongodb.config.js'
import { logsToTelegram } from './helpers/logsToTelegram.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import ActorRoutes from './modules/actor/actor.router.js'
import AuthRoutes from './modules/auth/auth.router.js'
import FileRoutes from './modules/file/file.router.js'
import GenreRoutes from './modules/genre/genre.router.js'
import MovieRoutes from './modules/movie/movie.router.js'
import RatingRoutes from './modules/rating/rating.router.js'
import UserRoutes from './modules/user/user.router.js'

const app = express()
dotenv.config() /* Подключаем dotenv */
connectMongoDB() /* Подключаемся к MongoDB */
const __filename = fileURLToPath(import.meta.url)
const parentDir = path.resolve(__filename, '..')
const __dirname = path.dirname(parentDir) /* статическая папка */

app.use(express.json()) /* Сервер понимает json */
app.use((req, res, next) => {
	/* Решаем проблему CORS */
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next()
})
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev')) /* morgan выводит в терминал все обращения к серверу */
	app.use((req, res, next) => logsToTelegram(req, res, next)) /* логи req res */
}
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/actors', ActorRoutes)
app.use('/api/auth', AuthRoutes)
app.use('/api/files', FileRoutes)
app.use('/api/genres', GenreRoutes)
app.use('/api/movies', MovieRoutes)
app.use('/api/ratings', RatingRoutes)
app.use('/api/users', UserRoutes)
app.use(notFound, errorHandler) /* обработка некорректного адреса */

app.listen(
	process.env.PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}!`
			.cyan.bold.underline
	)
)
