import { Ref, prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { MovieModel } from 'src/movie/movie.model'

export interface UserModel extends Base {} //создаем интерфейс

export class UserModel extends TimeStamps {
  //extends TimeStamps добавляем дефолтные поля при любом обновлении
  @prop({ unique: true })
  email: string

  @prop({})
  password: string

  @prop({ default: false })
  isAdmin?: boolean //? не обязательный

  @prop({ default: [], ref: () => MovieModel })
  favorites?: Ref<MovieModel>[]
}
