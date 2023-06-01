import { useQuery } from 'react-query'

import { MovieService } from '@/services/movie.service'

export const useUpdateCountOpened = (slug: string) => {
	const {} = useQuery('update count opened', () =>
		MovieService.updateCountOpened(slug)
	)
}
