import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/adminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/adminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useGenres } from './useGenres'

const GenresList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		createAsync,
		deleteAsync,
	} = useGenres()
	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Users" />
			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Name', 'Slug']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default GenresList
