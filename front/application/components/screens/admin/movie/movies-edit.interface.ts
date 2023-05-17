import { IMovie } from '@/shared/interfaces/movie.interfaces'

export interface IMovieEditInput extends Omit<IMovie, '_id'> {} //через Omit удаляем ненужное поле
