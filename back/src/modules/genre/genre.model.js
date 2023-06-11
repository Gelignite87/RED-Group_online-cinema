import mongoose from 'mongoose'

const genreSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
  },
  {
    minimize: false, // получаем все свойства объекта даже если они пустые
    timestamps: true, // дата и время записи и изменения
  }
)

export const GenreModel = mongoose.model('Genre', genreSchema, 'Genre')
