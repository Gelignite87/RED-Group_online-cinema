import { useState } from 'react'
import { useQuery } from 'react-query'

import { useDebounce } from '@/hooks/useDebounce'

import { UserService } from '@/services/user.service'

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['user list', debouncedSearch],
		() => UserService.getAll(debouncedSearch),
		{
			select: ({ data }) => data,
		}
	)

	// const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setSearchTerm(e.target.value)
	// }

	return { queryData, searchTerm }
}
