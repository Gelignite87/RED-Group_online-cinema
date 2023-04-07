import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface UserModel extends Base {} //extends Base добавляем поля автоматически создаваемые MongoDB

export class UserModel extends TimeStamps {
  //extends TimeStamps добавляем поля при любом обновлении
  @prop({ unique: true })
  email: string

  @prop({})
  password: string

  @prop({ default: false })
  isAdmin?: boolean //? не обязательный

  @prop({ default: [] })
  favorites?: []
}
