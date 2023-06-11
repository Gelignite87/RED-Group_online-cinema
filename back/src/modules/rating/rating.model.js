import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const ratingSchema = mongoose.Schema(
  {
    userId: [{ type: ObjectId, ref: 'UserModel', required: true }],
    movieId: [{ type: ObjectId, ref: 'MovieModel', required: true }],
    value: { type: Number, required: true },
  },
  {
    minimize: false, // получаем все свойства объекта даже если они пустые
    timestamps: true, // дата и время записи и изменения
  }
)

export const RatingModel = mongoose.model('Rating', ratingSchema, 'Rating')
