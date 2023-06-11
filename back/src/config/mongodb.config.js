import mongoose from 'mongoose'

export const connectMongoDB = async () => {
	try {
		const conDB = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		console.log(
			`MongoDB Connected: ${conDB.connection.host}, base: ${conDB.connection.name}!`
				.cyan.underline
		)
	} catch (error) {
		console.error(`Error: ${error.massage}!!!`.red.underline.bold)
		process.exit(1)
	}
}
