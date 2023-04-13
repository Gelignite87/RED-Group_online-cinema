import { Ref, prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ActorModel } from 'src/actor/actor.model'
import { GenreModel } from 'src/genre/genre.model'

export interface MovieModel extends Base {} //создаем интерфейс

export class Parameters {
  @prop()
  year: number

  @prop()
  duration: number

  @prop()
  country: string
}

export class MovieModel extends TimeStamps {
  //extends TimeStamps добавляем дефолтные поля при любом обновлении
  @prop()
  poster: string

  @prop()
  bigPoster: string

  @prop()
  title: string

  @prop({ unique: true })
  slug: string

  @prop()
  parameters?: Parameters

  @prop({ default: 4.0 })
  rating?: number

  @prop()
  videoUrl: string

  @prop({ default: 0 })
  countOpened?: number

  @prop({ ref: () => GenreModel })
  genres: Ref<GenreModel>[]

  @prop({ ref: () => ActorModel })
  actors: Ref<ActorModel>[]

  @prop({ default: false })
  isSendTelegram?: boolean
}
