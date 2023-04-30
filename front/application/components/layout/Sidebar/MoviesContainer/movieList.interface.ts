import { IMovie } from '@/shared/interfaces/movie.interfaces'

export interface IMovieList {
	title: string
	link: string
	movies: IMovie[]
}
