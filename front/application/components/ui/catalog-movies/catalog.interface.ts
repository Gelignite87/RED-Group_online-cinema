import { IMovie } from '@/shared/interfaces/movie.interfaces'

export interface ICatalog {
	title: string
	description?: string
	movies: IMovie[]
}
