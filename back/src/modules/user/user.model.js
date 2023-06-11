import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const { ObjectId } = mongoose.Schema

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: false },
    favorites: [{ type: ObjectId, ref: 'Movie', default: [], required: false }],
  },
  {
    minimize: false, // получаем все свойства объекта даже если они пустые
    timestamps: true, // дата и время записи и изменения
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  // мидлвар перед записью в модель User меняет this.password на хешированную версию
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcryptjs.genSalt(10)
  this.password = await bcryptjs.hash(this.password, salt)
})

export const UserModel = mongoose.model('User', userSchema, 'User')
