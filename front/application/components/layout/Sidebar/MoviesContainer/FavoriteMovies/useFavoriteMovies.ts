import { useQuery } from 'react-query'

import { UserService } from '@/services/user.service'

export const useFavoriteMovies = () => {
	const {
		isLoading,
		data: dataFavoriteMovies,
		refetch,
	} = useQuery('favorite movies', () => UserService.getFavoriteMovies(), {
		select: ({ data }) => data,
	})
	return { isLoading, dataFavoriteMovies, refetch }
}
