import { Module } from '@nestjs/common'
import { RatingController } from './rating.controller'
import { RatingService } from './rating.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { RatingModel } from './rating.model'
import { MovieModule } from 'src/movie/movie.module'
import { MovieService } from 'src/movie/movie.service'
import { MovieController } from 'src/movie/movie.controller'

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: RatingModel,
        schemaOptions: {
          collection: 'Rating',
        },
      },
    ]),
    MovieModule, //чтобы использовать сервисы из MovieModule
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
