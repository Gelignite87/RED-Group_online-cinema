import jwt from 'jsonwebtoken'

import { UserModel } from '../user/user.model.js'

// import bcryptjs from 'bcryptjs'

export const AuthService = {
	async login(dto) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueTokenPair(String(user._id))

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	},

	async getNewTokens({ refreshToken }) {
		if (!refreshToken) throw new Error('Please sign in!')

		const result = await jwt.verify(refreshToken, process.env.JWT_SECRET)
		if (!result) throw new Error('Invalid token or expired!')

		const user = await UserModel.findById(result._id)
		const tokens = await this.issueTokenPair(String(user._id))

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	},

	async register(dto) {
		const oldUser = await UserModel.findOne({ email: dto.email })
		if (oldUser)
			throw new Error('User with this email is already in the system')

		// const salt = await bcryptjs.genSalt(10)
		const newUser = new UserModel({
			email: dto.email,
			password: dto.password,
		})

		newUser.save()

		const tokens = await this.issueTokenPair(String(newUser._id))

		return {
			user: this.returnUserFields(newUser),
			...tokens,
		}
	},

	async validateUser(dto) {
		const user = await UserModel.findOne({ email: dto.email })
		if (!user) throw new Error('User not found!')

		const isValidPassword = await user.matchPassword(dto.password)
		// bcryptjs.compare(dto.password, user.password)
		if (!isValidPassword) throw new Error('Invalid password!')

		return user
	},

	async issueTokenPair(userId) {
		const data = { _id: userId }

		const refreshToken = jwt.sign(data, process.env.JWT_SECRET, {
			expiresIn: '15d',
		})
		const accessToken = jwt.sign(data, process.env.JWT_SECRET, {
			expiresIn: '1h',
		})

		return { refreshToken, accessToken }
	},

	returnUserFields(user) {
		return {
			_id: user._id,
			email: user.email,
			isAdmin: user.isAdmin,
		}
	},
}
