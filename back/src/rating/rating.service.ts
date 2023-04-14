import { MovieService } from './../movie/movie.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { RatingModel } from './rating.model'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { SetRatingDto } from './dto/setRating.dto'

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(RatingModel)
    private readonly RatingModel: ModelType<RatingModel>,
    private readonly MovieService: MovieService
  ) {}

  async getMovieValueByUser(movieId: Types.ObjectId, userId: Types.ObjectId) {
    return this.RatingModel.findOne({ movieId: movieId, userId: userId })
      .select('value')
      .exec()
      .then((data) => (data ? data.value : { message: 'Not found movie!' }))
  }

  async averageRatingByMovie(movieId: Types.ObjectId | string) {
    const ratingsMovie: RatingModel[] = await this.RatingModel.aggregate()
      .match({ movieId: new Types.ObjectId(movieId) }) //принудительно приводим movieId к формату Types.ObjectId
      .exec()
    return (
      ratingsMovie.reduce((acc, el) => acc + el.value, 0) / ratingsMovie.length
    )
  }

  async setRating(userId: Types.ObjectId, dto: SetRatingDto) {
    const { movieId, value } = dto

    const findMovie = await this.MovieService.findMovie(movieId)
    if (!findMovie) throw new NotFoundException('Not found movie!')

    const newRating = await this.RatingModel.findOneAndUpdate(
      //не только добавляет но и создает
      { movieId, userId },
      { movieId, userId, value },
      { new: true, upsert: true, setDefaultsOnInsert: true } //создает элемент коллекции если его нет
    ).exec()

    const averageRating = await this.averageRatingByMovie(movieId)

    await this.MovieService.updateRating(movieId, averageRating)

    return newRating
  }
}
