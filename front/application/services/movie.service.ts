import { axiosAuth, axiosBuild, axiosClassic } from 'api/interceptors'

import { IMovieEditInput } from '@/screens/admin/movie/movies-edit.interface'

import { IMovie } from '@/shared/interfaces/movie.interfaces'

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>('/movies', {
			params: searchTerm ? { searchTerm } : {},
		})
	},
	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			'/movies/most-popular'
		)
		return movies
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IMovie>(`/movies/by-slug/${slug}`) //используем axios без авторизации так как этот сервис будет выполнятся только на серверной части
	},
	async getByActor(actorId: string) {
		return axiosClassic.get<IMovie[]>(`/movies/by-actor/${actorId}`) //используем axios без авторизации так как этот сервис будет выполнятся только на серверной части
	},
	async getByGenres(genreIds: string[]) {
		return axiosClassic.post<IMovie[]>('/movies/by-genres', {
			genreIds,
		}) //используем axios без авторизации так как этот сервис будет выполнятся только на серверной части
	},
	async getById(_id: string) {
		return axiosAuth.get<IMovieEditInput>(`/movies/${_id}`) //указывает IGenreEditInput чтобы потом в useQuery были подсказки какие поля есть в data.data
	},
	async create() {
		return axiosAuth.post<string>('/movies')
	},
	async update(_id: string, data: IMovieEditInput) {
		return axiosAuth.put<string>(`/movies/${_id}`, data)
	},
	async delete(_id: string) {
		return axiosAuth.delete<string>(`/movies/${_id}`)
	},
	async updateCountOpened(slug: string) {
		return axiosClassic.put<string>(`/movies/update-count-opened`, {
			slug,
		})
	},
}

export const MovieServiceBuild = {
	async getAll(searchTerm?: string) {
		return axiosBuild.get<IMovie[]>('/movies', {
			params: searchTerm ? { searchTerm } : {},
		})
	},
	async getMostPopularMovies() {
		const { data: movies } = await axiosBuild.get<IMovie[]>(
			'/movies/most-popular'
		)
		return movies
	},
	async getBySlug(slug: string) {
		return axiosBuild.get<IMovie>(`/movies/by-slug/${slug}`)
	},
	async getByActor(actorId: string) {
		return axiosBuild.get<IMovie[]>(`/movies/by-actor/${actorId}`)
	},
	async getByGenres(genreIds: string[]) {
		return axiosBuild.post<IMovie[]>('/movies/by-genres', {
			genreIds,
		})
	},
}
