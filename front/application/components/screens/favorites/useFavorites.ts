import { useQuery } from 'react-query'

import { useAuth } from '@/hooks/useAuth'

import { UserService } from '@/services/user.service'

export const useFavorites = () => {
	const { user } = useAuth()
	const {
		isLoading,
		data: dataFavorites,
		refetch,
	} = useQuery('favorite movies', () => UserService.getFavoriteMovies(), {
		select: ({ data }) => data,
		enabled: !!user,
	})
	return { isLoading, dataFavorites, refetch }
}
