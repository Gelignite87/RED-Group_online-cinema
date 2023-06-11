import mongoose from 'mongoose'

const actorSchema = mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    slug: { type: String, unique: true, required: true },
    photo: { type: String, required: true },
  },
  {
    minimize: false, // получаем все свойства объекта даже если они пустые
    timestamps: true, // дата и время записи и изменения
  }
)

export const ActorModel = mongoose.model('Actor', actorSchema, 'Actor')
