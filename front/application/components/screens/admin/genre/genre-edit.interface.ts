import { IGenre } from '@/shared/interfaces/movie.interfaces'

export interface IGenreEditInput extends Omit<IGenre, '_id'> {} //через Omit удаляем ненужное поле
