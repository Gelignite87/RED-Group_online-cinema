import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface UserModel extends Base {} //создаем интерфейс

export class UserModel extends TimeStamps {
  //extends TimeStamps добавляем дефолтные поля при любом обновлении
  @prop({ unique: true })
  email: string

  @prop({})
  password: string

  @prop({ default: false })
  isAdmin?: boolean //? не обязательный

  @prop({ default: [] })
  favorites?: []
}
