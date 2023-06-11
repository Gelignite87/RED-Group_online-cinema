import { UserModel } from './user.model.js'

export const UserService = {
	async byId(_id) {
		const user = await UserModel.findById(_id)
		if (!user) throw new Error('User not found!')
		return user
	},

	async updateProfile(_id, dto) {
		const user = await this.byId(_id)
		const isSameUser = await UserModel.findOne({ email: dto.email })

		if (isSameUser && String(_id) !== String(isSameUser._id))
			throw new Error('Email busy')

		if (dto.password) user.password = dto.password
		user.email = dto.email
		if (dto.isAdmin || dto.isAdmin === false) user.isAdmin = dto.isAdmin

		await user.save()
		return
	},

	async getCount() {
		return UserModel.find().count().exec()
	},

	async getAll(searchTerm = '') {
		let options = {}
		if (searchTerm)
			options = {
				$or: [{ email: new RegExp(searchTerm, 'i') }],
			}
		return UserModel.find(options)
			.select('-password -updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	},

	async delete(id) {
		return UserModel.findByIdAndDelete(id).exec()
	},

	async toggleFavorite(movieId, { _id, favorites }) {
		await UserModel.findByIdAndUpdate(_id, {
			favorites: favorites.includes(movieId)
				? favorites.filter((id) => String(id) !== String(movieId)) //удаление через метод filter
				: [...favorites, movieId],
		})
	},

	async getFavoriteMovies(_id) {
		return UserModel.findById(_id, 'favorites') //ищем пользователя и берем у него поле favorites
			.populate({ path: 'favorites', populate: { path: 'genres' } }) //deep populate, глубокое раскрытие
			.exec()
			.then((data) => data.favorites) //из результата берем содержимое поля favorites
	},
}
