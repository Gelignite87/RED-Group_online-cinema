import colors from 'colors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import { connectMongoDB } from './config/mongodb.config.js'
import { CORS } from './middleware/CORS.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import { logsReqRes } from './middleware/logsReqRes.js'
import ActorRoutes from './modules/actor/actor.router.js'
import AuthRoutes from './modules/auth/auth.router.js'
import FileRoutes from './modules/file/file.router.js'
import GenreRoutes from './modules/genre/genre.router.js'
import MovieRoutes from './modules/movie/movie.router.js'
import RatingRoutes from './modules/rating/rating.router.js'
import UserRoutes from './modules/user/user.router.js'
import bot from './telegram/telegram.bot.js'

const app = express()
dotenv.config() /* Загрузка переменных окружения */
connectMongoDB() /* Подключаемся к MongoDB */
const __dirname = path.resolve(fileURLToPath(import.meta.url), '../..')

app.use(express.json()) /* Сервер понимает json */
app.use(CORS, logsReqRes) /* логирование */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/actors', ActorRoutes)
app.use('/api/auth', AuthRoutes)
app.use('/api/files', FileRoutes)
app.use('/api/genres', GenreRoutes)
app.use('/api/movies', MovieRoutes)
app.use('/api/ratings', RatingRoutes)
app.use('/api/users', UserRoutes)
app.use(notFound, errorHandler) /* обработка ошибок */

app.listen(
	process.env.PORT,
	console.log(
		`Server running on port: `.cyan +
			`${process.env.PORT}`.cyan.bold.underline +
			` in mode `.cyan +
			`${process.env.NODE_ENV}!`.cyan.bold
	)
)
