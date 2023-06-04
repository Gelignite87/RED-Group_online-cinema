import { useQuery } from 'react-query'

import { useAuth } from '@/hooks/useAuth'

import { UserService } from '@/services/user.service'

export const useFavoriteMovies = () => {
	const { user } = useAuth()
	const {
		isLoading,
		data: dataFavoriteMovies,
		refetch,
	} = useQuery('favorite movies', () => UserService.getFavoriteMovies(), {
		select: ({ data }) => data,
		enabled: !!user, //отправляем запрос если есть user
	})
	return { isLoading, dataFavoriteMovies, refetch, user }
}
