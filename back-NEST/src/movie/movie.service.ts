import { TelegramService } from './../telegram/telegram.service'
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { MovieModel } from './movie.model'
import { UpdateMovieDto } from './update-movie.dto'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MovieModel)
    private readonly MovieModel: ModelType<MovieModel>,
    private readonly TelegramService: TelegramService
  ) {}

  async getAll(searchTerm?: string) {
    let options = {}
    if (searchTerm)
      options = {
        $or: [{ title: new RegExp(searchTerm, 'i') }],
      }
    return this.MovieModel.find(options)
      .select('-updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .populate('actors genres')
      .exec()
  }

  async bySlug(slug: string) {
    const doc = await this.MovieModel.findOne({ slug: slug })
      .populate('actors genres') //разворачиваем id в объекты
      .exec()
    if (!doc) throw new NotFoundException('Movie not found!')
    return doc
  }

  async byActor(actorId: Types.ObjectId) {
    const docs = await this.MovieModel.find({ actors: actorId }).exec()
    if (!docs) throw new NotFoundException('Movies not found!')
    return docs
  }

  async byGenres(genreIds: Types.ObjectId[]) {
    genreIds.forEach((el) => {
      if (el.toString().length !== 24)
        throw new ConflictException(
          `One element contain ${el.toString().length} symbols. Must be 24!`
        )
    })
    const docs = await this.MovieModel.find(
      { genres: { $in: genreIds } } //перебираем массив и ищем его элементы в поле genres
    ).exec()
    if (!docs) throw new NotFoundException('Movies not found!')
    return docs
  }

  async getMostPopular() {
    return this.MovieModel.find({ countOpened: { $gt: 0 } }) //$gt означает >, то есть countOpened > 0
      .sort({ countOpened: -1 }) //сортируем числа в обратную сторону
      .populate('genres')
      .exec()
  }

  async updateCountOpened(slug: string) {
    const updateMovie = await this.MovieModel.findOneAndUpdate(
      { slug: slug },
      { $inc: { countOpened: 1 } }, //функция инкремента, увеличиваем countOpened на 1
      { new: true } //возвращаем обновленную версию
    ).exec()
    if (!updateMovie) throw new NotFoundException('Movie not found!')
    return updateMovie
  }

  /*Secondary functions*/

  async updateRating(id: Types.ObjectId, newRating: number) {
    return this.MovieModel.findByIdAndUpdate(
      id,
      { rating: newRating },
      { new: true }
    ).exec()
  }

  async findMovie(movieId: Types.ObjectId) {
    return this.MovieModel.findById(movieId)
  }

  /* Admin place */

  async byId(_id: string) {
    const movie = await this.MovieModel.findById(_id)
    if (!movie) throw new NotFoundException('Movie not found!')
    return movie
  }

  async create() {
    const defaultValue: UpdateMovieDto = {
      poster: '',
      bigPoster: '',
      actors: [],
      genres: [],
      slug: '',
      title: '',
      videoUrl: '',
    }
    const movie = await this.MovieModel.create(defaultValue)
    return movie._id
  }

  async update(_id: string, dto: UpdateMovieDto) {
    const fetchChatIdFromTelegram = await fetch(process.env.TELEGRAM_URI).then(
      (data) => data.json()
    )
    const set = new Set()
    fetchChatIdFromTelegram.result.forEach((el) =>
      set.add(String(el.message.from.id))
    )
    const chatIds = [...set]

    const movie = await this.MovieModel.findById(_id)
    if (!movie.isSendTelegram) {
      await this.sendNotification(dto, chatIds)
      dto.isSendTelegram = true
    }
    const updateMovie = await this.MovieModel.findByIdAndUpdate(
      _id,
      dto,
      { new: true } //new: true означает что findByIdAndUpdate возвращает новую версию
    ).exec()
    if (!updateMovie) throw new NotFoundException('Movie not found!')
    return updateMovie
  }

  async delete(id: string) {
    const deleteMovie = await this.MovieModel.findByIdAndDelete(id).exec()
    if (!deleteMovie) throw new NotFoundException('Movie not found!')
    return deleteMovie
  }

  async sendNotification(dto: UpdateMovieDto, chatIds: any) {
    if (process.env.NODE_ENV !== 'development')
      await this.TelegramService.sendPhoto(chatIds, dto.poster)
    else
      await this.TelegramService.sendPhoto(
        chatIds,
        'https://images.fanart.tv/fanart/john-wick-chapter-4-63f368322144f.jpg',
        dto.slug
      )

    const msg = `<b>${dto.title}</b>`
    await this.TelegramService.sendMessage(chatIds, msg, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              url: 'https://okko.tv/movie/free-guy',
              text: 'Go to watch',
            },
          ],
        ],
      },
    })
  }
}
