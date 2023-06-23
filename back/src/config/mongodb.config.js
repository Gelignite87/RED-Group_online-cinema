import mongoose from 'mongoose'

export const connectMongoDB = async () => {
	try {
		const conDB = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		console.log(
			`MongoDB connected: `.cyan +
				`${conDB.connection.host}`.cyan.bold.underline +
				` base: `.cyan +
				`${conDB.connection.name}!`.cyan.bold
		)
	} catch (error) {
		console.error('Ошибка соединения с MongoDB'.red, error.message)
		// process.exit(1)
	}
}
