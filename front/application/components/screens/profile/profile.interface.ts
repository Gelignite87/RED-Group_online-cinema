import { IUser } from '@/shared/interfaces/user.interface'

export interface IProfileInput extends Pick<IUser, 'email' | 'password'> {}
