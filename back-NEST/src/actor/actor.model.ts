import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface ActorModel extends Base {} //создаем интерфейс

export class ActorModel extends TimeStamps {
  //extends TimeStamps добавляем дефолтные поля при любом обновлении
  @prop({ unique: true })
  name: string

  @prop({ unique: true })
  slug: string

  @prop({})
  photo: string
}
