import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface GenreModel extends Base {} //создаем интерфейс

export class GenreModel extends TimeStamps {
  //extends TimeStamps добавляем дефолтные поля при любом обновлении
  @prop({})
  name: string

  @prop({ unique: true })
  slug: string

  @prop({})
  description: string

  @prop({})
  icon: string
}
