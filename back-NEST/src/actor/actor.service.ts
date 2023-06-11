import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { ActorModel } from './actor.model'
import { ActorDto } from './actor.dto'
import mongoose from 'mongoose'

@Injectable()
export class ActorService {
  constructor(
    @InjectModel(ActorModel) private readonly ActorModel: ModelType<ActorModel>
  ) {}

  async bySlug(slug: string) {
    const doc = await this.ActorModel.findOne({ slug }).exec()
    if (!doc) throw new NotFoundException('Actor not found!')
    return doc
  }

  async getAll(searchTerm?: string) {
    let options = {}
    if (searchTerm)
      options = {
        $or: [
          { name: new RegExp(searchTerm, 'i') },
          { slug: new RegExp(searchTerm, 'i') },
        ],
      }
    return this.ActorModel.aggregate() //Агрегация
      .match(options) //то же самое что и find
      .lookup({
        from: 'Movie', //смотрим в коллекцию Movie
        foreignField: 'actors', //в коллекции Movie обращаемся к полю actors (там лежат id актеров)
        localField: '_id', //в коллекции Actor обращаемся к _id
        as: 'movies', //записываем в новое поле movies массив фильмов где играет актер
      })
      .addFields({ countMovies: { $size: '$movies' } }) //добавляем поле countMovies, обращаемся к полю movies и с помощью оператора $size узнаем размер массива
      .project({
        __v: 0,
        updatedAt: 0, //аналог .select('-__v -updatedAt')
        movies: {
          poster: 0,
          bigPoster: 0,
          description: 0,
          slug: 0,
          rating: 0,
          videoUrl: 0,
          countOpened: 0,
          genres: 0,
          actors: 0,
          isSendTelegram: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          parameters: 0,
        },
      })
      .sort({ createdAt: -1 })
      .exec()
  }

  /* Admin place */

  async byId(_id: string) {
    // const genre = await this.ActorModel.findById(_id)
    // if (!genre) throw new NotFoundException('Actor not found!')

    const ObjectId = new mongoose.Types.ObjectId(_id)

    const aggregate = await this.ActorModel.aggregate()
      .match({ _id: ObjectId })
      .lookup({
        from: 'Movie', //смотрим в коллекцию Movie
        foreignField: 'actors', //в коллекции Movie обращаемся к полю actors (там лежат id актеров)
        localField: '_id', //в коллекции Actor обращаемся к _id
        as: 'movies', //записываем в новое поле movies массив фильмов где играет актер
      })
      .addFields({ countMovies: { $size: '$movies' } }) //добавляем поле countMovies, обращаемся к полю movies и с помощью оператора $size узнаем размер массива
      .project({
        __v: 0,
        updatedAt: 0, //аналог .select('-__v -updatedAt')
        movies: 0,
      })
      .exec()

    if (aggregate.length === 0) throw new NotFoundException('Actor not found!')

    return aggregate[0]
  }

  async create() {
    const defaultValue: ActorDto = {
      name: '',
      slug: '',
      photo: '',
    }
    const genre = await this.ActorModel.create(defaultValue)
    return genre._id
  }

  async update(_id: string, dto: ActorDto) {
    const updateGenre = await this.ActorModel.findByIdAndUpdate(_id, dto, {
      new: true, //new: true означает что findByIdAndUpdate возвращает новую версию
    }).exec()
    if (!updateGenre) throw new NotFoundException('Actor not found!')
    return updateGenre
  }

  async delete(id: string) {
    const deleteGenre = await this.ActorModel.findByIdAndDelete(id).exec()
    if (!deleteGenre) throw new NotFoundException('Actor not found!')
    return deleteGenre
  }
}
