import { Module } from '@nestjs/common'
import { MovieController } from './movie.controller'
import { MovieService } from './movie.service'
import { MovieModel } from './movie.model'
import { TypegooseModule } from 'nestjs-typegoose'
import { TelegramModule } from 'src/telegram/telegram.module'

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MovieModel,
        schemaOptions: {
          collection: 'Movie',
        },
      },
    ]),
    TelegramModule,
  ],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService], //чтобы использовать сервисы из MovieModule
})
export class MovieModule {}
