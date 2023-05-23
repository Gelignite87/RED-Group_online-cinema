import { IMovie } from '@/shared/interfaces/movie.interfaces'

export interface ISlide extends Pick<IMovie, '_id' | 'bigPoster' | 'title'> {
	subTitle: string
	link: string
}
