import { IActor } from '@/shared/interfaces/movie.interfaces'

export interface IActorEditInput extends Omit<IActor, '_id'> {} //через Omit удаляем ненужное поле
