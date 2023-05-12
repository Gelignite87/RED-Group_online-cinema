import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/adminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/adminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useMovies } from './useMovies'

const MoviesList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useMovies()
	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Users" />
			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={() => {}}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Title', 'Genre', 'Rating']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default MoviesList
