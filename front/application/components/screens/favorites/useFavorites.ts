import { useQuery } from 'react-query'

import { UserService } from '@/services/user.service'

export const useFavorites = () => {
	const {
		isLoading,
		data: dataFavorites,
		refetch,
	} = useQuery('favorite movies', () => UserService.getFavoriteMovies(), {
		select: ({ data }) => data,
	})
	return { isLoading, dataFavorites, refetch }
}
