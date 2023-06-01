import { axiosAuth, axiosClassic } from 'api/interceptors'

import { IMovieEditInput } from '@/screens/admin/movie/movies-edit.interface'

import { getMoviesUrl } from '@/config/api.config'

import { IMovie } from '@/shared/interfaces/movie.interfaces'

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},
	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		)
		return movies
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`)) //используем axios без авторизации так как этот сервис будет выполнятся только на серверной части
	},
	async getByActor(actorId: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`)) //используем axios без авторизации так как этот сервис будет выполнятся только на серверной части
	},
	async getByGenres(genreIds: string[]) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl('/by-genres'), { genreIds }) //используем axios без авторизации так как этот сервис будет выполнятся только на серверной части
	},
	async getById(_id: string) {
		return axiosAuth.get<IMovieEditInput>(getMoviesUrl(`/${_id}`)) //указывает IGenreEditInput чтобы потом в useQuery были подсказки какие поля есть в data.data
	},
	async create() {
		return axiosAuth.post<string>(getMoviesUrl(`/`))
	},
	async update(_id: string, data: IMovieEditInput) {
		return axiosAuth.put<string>(getMoviesUrl(`/${_id}`), data)
	},
	async delete(_id: string) {
		return axiosAuth.delete<string>(getMoviesUrl(`/${_id}`))
	},
	async updateCountOpened(slug: string) {
		return axiosClassic.put<string>(getMoviesUrl(`/update-count-opened`), {
			slug,
		})
	},
}
