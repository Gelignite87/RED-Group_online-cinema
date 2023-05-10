import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/adminHeader/AdminHeader'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import styles from './UserList.module.sass'
import { useUsers } from './useUsers'

const UserList: FC = () => {
	const {} = useUsers()
	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Users" />
			<AdminHeader
				handleSearch={() => {}}
				searchTerm="name"
				onClick={() => {}}
			/>
		</Meta>
	)
}

export default UserList
